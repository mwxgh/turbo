# Deploy (dev, stg, prod)

Repo chỉ build image. File compose chạy trên server nằm **trên server**, không nằm trong repo
(`/srv/<stack>/docker-compose.yaml`, mỗi dự án một thư mục, dùng chung stack `infra` và `edge`).
Sau khi đẩy image, CI gọi server để cập nhật. Lý do: [ADR 0008](../decisions/0008-tu-deploy-stg-qua-ssh-forced-command.md).

```
push develop       ─▶ check ─▶ images (:dev, :dev-sha-<7>)   ─▶ deploy ─ssh─▶ /srv/turbo-dev/deploy.sh  dev-sha-<7>
push release/X.Y.Z ─▶ check ─▶ images (:stg, :stg-sha-<7>)   ─▶ deploy ─ssh─▶ /srv/turbo-stg/deploy.sh  stg-sha-<7>
tag vX.Y.Z (main)  ─▶ check ─▶ images (:prod, :X.Y.Z, …)     ─▶ deploy ─ssh─▶ /srv/turbo-prod/deploy.sh prod-sha-<7>
```

| Môi trường | Domain                                           | Stack trên server | Tự deploy khi                        |
| ---------- | ------------------------------------------------ | ----------------- | ------------------------------------ |
| dev        | `dev.turbo-dev.site` (`api.dev.`, `socket.dev.`) | `/srv/turbo-dev`  | mỗi lần merge / push vào `develop`   |
| stg        | `stg.turbo-dev.site` (`api.stg.`, `socket.stg.`) | `/srv/turbo-stg`  | push `release/X.Y.Z`, `hotfix/X.Y.Z` |
| prod       | `turbo-dev.site` (`api.`, `socket.`)             | `/srv/turbo-prod` | tạo tag `vX.Y.Z` trên `main`         |

Prod chưa bật _Required reviewers_: tạo tag là deploy prod luôn. Muốn duyệt tay thì bật trong
GitHub → Settings → Environments → `prod`.

## GitHub Environment (`dev`, `stg`, `prod`)

| Loại     | Tên                  | Giá trị                                     |
| -------- | -------------------- | ------------------------------------------- |
| variable | `PUBLIC_API_URL`     | `https://api.<domain>/api`                  |
| variable | `PUBLIC_SOCKET_URL`  | `https://socket.<domain>`                   |
| variable | `DEPLOY_HOST`        | `ubuntu@<server>`                           |
| variable | `DEPLOY_KNOWN_HOSTS` | host key của server (`ssh-keyscan <host>`)  |
| secret   | `DEPLOY_SSH_KEY`     | private key **chỉ** dùng cho môi trường này |

Environment không có `DEPLOY_*` → job `deploy` bỏ qua (chỉ build image).

## Phía server

Mỗi môi trường một key, bị khoá vào script của chính nó bằng forced command: không mở được shell,
không chạy được lệnh khác; đầu vào duy nhất là tag image (`stg`, `prod`, `X.Y.Z` hoặc
`<env>-sha-<hex>`).

```
# ~ubuntu/.ssh/authorized_keys
command="/srv/turbo-dev/deploy.sh",restrict ssh-ed25519 AAAA… ci-deploy turbo dev
command="/srv/turbo-stg/deploy.sh",restrict ssh-ed25519 AAAA… ci-deploy turbo stg
```

`/srv/turbo-<env>/deploy.sh`: lock → ghi `TAG` vào `.env` → `docker compose pull` → `up -d`
(migrate chạy trước) → chờ `turbo-<env>-api-1` healthy → xoá image turbo cũ. Pull / up lỗi → trả
`TAG` cũ về `.env`.

Mỗi môi trường có dữ liệu riêng trên `infra` dùng chung:

| Môi trường | Schema Postgres | Redis DB | Bucket RustFS |
| ---------- | --------------- | -------- | ------------- |
| dev        | `turbo_dev`     | 4        | `turbo-dev`   |
| stg        | `turbo_stg`     | 2        | `turbo-stg`   |
| prod       | `turbo_prod`    | 3        | `turbo`       |

### Thêm một môi trường

1. `/srv/turbo-<env>/`: copy `docker-compose.yaml` và `deploy.sh` từ stack có sẵn (đổi tên container
   `turbo-stg` → `turbo-<env>`); `.env` (chmod 600) với `DOMAIN`, `APP_ENV`, `POSTGRES_SCHEMA`,
   `REDIS_DB`, `STORAGE_BUCKET`, `JWT_SECRET` riêng. Schema được tạo khi migrate chạy lần đầu; bucket
   phải tạo tay trong RustFS.
2. `/srv/edge/sites/turbo-<env>.caddy` (upstream theo **tên container**), rồi
   `docker exec edge-caddy-1 caddy reload --config /etc/caddy/Caddyfile`.
3. DNS: bản ghi A `<env>` và `*.<env>` → IP server. Caddy tự lấy chứng chỉ.
4. Key deploy mới (`ssh-keygen -t ed25519`), public key vào `authorized_keys` với forced command,
   private key vào secret `DEPLOY_SSH_KEY` của Environment; điền các variable ở bảng trên.
5. OAuth: thêm redirect URI của `api.<domain>` vào client của từng provider.

## Deploy tay / rollback

```bash
ssh ubuntu@<server> '/srv/turbo-stg/deploy.sh stg-sha-<7 hex>'
```

Tag `<env>-sha-…` nào còn trên ghcr đều deploy lại được bằng lệnh này. Tag sha **có tên môi trường**:
`develop` và `release/*` có thể build cùng một commit (release vừa tách từ develop); tag `sha-…`
chung từng bị image dev đè, stg kéo nhầm bản dev.

Chạy lại deploy dev cho commit hiện tại của `develop` mà không cần push: GitHub → Actions → run của
`develop` → _Re-run all jobs_.
