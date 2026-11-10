---
title: Logging và request id (api, socket)
status: reviewed
applies-to: api, socket
enforced-by:
  - packages/nest-common/src/logger/logger.module.ts (createLoggerModule, requestId)
  - packages/nest-common/src/env/base-env.ts (LOG_LEVEL, LOG_FORMAT)
  - apps/{api,socket}/src/app.module.ts, apps/{api,socket}/src/main.ts
---

# Logging và request id

## Quy tắc

- Log qua `Logger` của Nest (`new Logger(MyService.name)`) hoặc `PinoLogger` / `@InjectPinoLogger()` từ `@repo/nest-common/logger`. **Không** dùng `console.log`.
- **Không** log secret: token, password, header `authorization` / `cookie`, nội dung `.env`. Request log của pino chỉ chứa `method`, `url`, `statusCode` (không có header).
- Cần tìm kiếm theo field → dùng `PinoLogger` (cú pháp pino: object trước, message sau): `this.logger.info({ helloId: id }, 'hello created')`.

## Một dòng log

```json
{
  "level": 30,
  "time": 1794327265871,
  "service": "api",
  "env": "dev",
  "reqId": "abc-1",
  "req": { "method": "GET", "url": "/api/hellos" },
  "res": { "statusCode": 200 },
  "responseTime": 82,
  "msg": "request completed"
}
```

| Field            | Ý nghĩa                                                                                                          |
| ---------------- | ---------------------------------------------------------------------------------------------------------------- |
| `service`, `env` | App (`api`, `socket`) và `APP_ENV`, có trên mọi dòng                                                             |
| `reqId`          | Request id; có trên **mọi log ghi trong lúc xử lý request** (AsyncLocalStorage)                                  |
| `context`        | Tên class khi log qua `new Logger(X.name)`                                                                       |
| `level`          | `30` info, `40` warn (response 4xx), `50` error (5xx); request lỗi do exception kèm `err` (type, message, stack) |

Health probe (`/api/health*`, `/socket/health*`) không ghi request log (`quietPaths`).

## Request id

- Header `x-request-id`: client (web, mobile, gateway) gửi lên thì api dùng lại nếu hợp lệ (`[A-Za-z0-9_.:-]`, tối đa 128 ký tự); không có hoặc không hợp lệ → sinh UUID.
- Luôn trả lại trong response header `x-request-id` (CORS `exposedHeaders`, browser đọc được) → người dùng báo lỗi kèm id, tìm log theo `reqId`.

## Cấu hình (env, trong `BaseEnv`)

| Biến         | Mặc định | Giá trị                                                                  |
| ------------ | -------- | ------------------------------------------------------------------------ |
| `LOG_LEVEL`  | `info`   | `fatal` \| `error` \| `warn` \| `info` \| `debug` \| `trace` \| `silent` |
| `LOG_FORMAT` | `json`   | `json` (server, log collector) \| `pretty` (máy dev, một dòng có màu)    |

- `.env.example` của api/socket đặt `LOG_FORMAT=pretty`; image Docker / CI giữ `json`.
- e2e chạy `LOG_LEVEL=silent` (`apps/{api,socket}/vitest.e2e.config.ts`).

## Thêm app Nest mới

```ts
// app.module.ts
imports: [
  createLoggerModule({
    service: 'worker',
    env: env.APP_ENV,
    level: env.LOG_LEVEL,
    format: env.LOG_FORMAT,
    quietPaths: ['/worker/health'],
  }),
]

// main.ts
const app = await NestFactory.create(AppModule, { bufferLogs: true })
app.useLogger(app.get(Logger)) // Logger từ '@repo/nest-common/logger'
```

## Chưa làm

- Web (Server Component / Server Action) chưa gửi `x-request-id` khi gọi api → log web và api chưa nối được với nhau.
- Tracing (OpenTelemetry), error tracking (Sentry), gửi log về hệ thống tập trung (Loki, ELK, CloudWatch…): tuỳ hạ tầng từng dự án; stdout JSON là đầu vào chung.
