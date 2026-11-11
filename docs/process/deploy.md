# Deploy (stg)

Repo chỉ build image. File compose chạy trên server nằm **trên server**, không nằm trong repo
(`/srv/<stack>/docker-compose.yaml`, mỗi dự án một thư mục, dùng chung stack `infra` và `edge`).
Sau khi đẩy image, CI gọi server để cập nhật. Lý do: [ADR 0008](../decisions/0008-tu-deploy-stg-qua-ssh-forced-command.md).

```
push release/X.Y.Z ─▶ check ─▶ images (:stg, :stg-sha-<7>) ─▶ deploy ─ssh─▶ /srv/turbo-stg/deploy.sh stg-sha-<7>
```

## GitHub Environment `stg`

| Loại     | Tên                  | Giá trị                                      |
| -------- | -------------------- | -------------------------------------------- |
| variable | `PUBLIC_API_URL`     | `https://api.<domain>/api`                   |
| variable | `PUBLIC_SOCKET_URL`  | `https://socket.<domain>`                    |
| variable | `DEPLOY_HOST`        | `root@<server>`                              |
| variable | `DEPLOY_KNOWN_HOSTS` | host key của server (`ssh-keygen -F <host>`) |
| secret   | `DEPLOY_SSH_KEY`     | private key **chỉ** dùng cho việc deploy này |

Environment không có `DEPLOY_*` → job `deploy` bỏ qua (dev / prod hiện tại).

## Phía server

Key deploy bị khoá vào script bằng forced command: không mở được shell, không chạy được lệnh
khác; đầu vào duy nhất là tag image (`stg`, `prod`, `X.Y.Z` hoặc `<env>-sha-<hex>`).

```
# /root/.ssh/authorized_keys
command="/srv/turbo-stg/deploy.sh",restrict ssh-ed25519 AAAA… ci-deploy turbo stg
```

`/srv/turbo-<env>/deploy.sh` (stg: `/srv/turbo-stg`, prod: `/srv/turbo-prod`): lock → ghi `TAG` vào `.env` → `docker compose pull` → `up -d`
(migrate chạy trước) → chờ `turbo-<env>-api-1` healthy → xoá image turbo cũ. Pull / up lỗi → trả
`TAG` cũ về `.env`.

## Deploy tay / rollback

```bash
ssh root@<server> '/srv/turbo-stg/deploy.sh stg-sha-<7 hex>'
```

Tag `stg-sha-…` nào còn trên ghcr đều deploy lại được bằng lệnh này. Tag sha **có tên môi trường**: `develop` và `release/*` có thể build cùng một commit (release vừa tách từ develop); tag `sha-…` chung từng bị image dev đè, stg kéo nhầm bản dev.
