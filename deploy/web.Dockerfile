# syntax=docker/dockerfile:1
# Build from the repo root:
#   docker build -f deploy/web.Dockerfile -t turbo-base-web \
#     --build-arg NEXT_PUBLIC_API_URL=https://api.example.com/api \
#     --build-arg NEXT_PUBLIC_SOCKET_URL=https://socket.example.com .

ARG NODE_VERSION=24-alpine

FROM node:${NODE_VERSION} AS base
RUN apk add --no-cache libc6-compat
RUN npm install -g pnpm@11.25.0
# Git hooks are for local development only
ENV HUSKY=0
WORKDIR /app

# --- Prune the monorepo down to `web` and its workspace dependencies
FROM base AS prepare
RUN npm install -g turbo@2.11.9
COPY . .
RUN turbo prune web --docker

# --- Install dependencies, then build
FROM base AS builder
COPY --from=prepare /app/out/json/ .
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile
COPY --from=prepare /app/out/full/ .
# NEXT_PUBLIC_* are inlined into the browser bundle at build time
ARG NEXT_PUBLIC_API_URL=http://localhost:4000/api
ARG NEXT_PUBLIC_SOCKET_URL=http://localhost:4001
# dev | stg | prod – one web image per environment
ARG NEXT_PUBLIC_APP_ENV=dev
ENV NEXT_OUTPUT=standalone \
    NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL} \
    NEXT_PUBLIC_SOCKET_URL=${NEXT_PUBLIC_SOCKET_URL} \
    NEXT_PUBLIC_APP_ENV=${NEXT_PUBLIC_APP_ENV} \
    NEXT_TELEMETRY_DISABLED=1
RUN pnpm turbo run build --filter=web

# --- Runtime (Next.js standalone output)
FROM node:${NODE_VERSION} AS runner
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0

COPY --from=builder --chown=node:node /app/apps/web/.next/standalone ./
COPY --from=builder --chown=node:node /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=builder --chown=node:node /app/apps/web/public ./apps/web/public

USER node
EXPOSE 3000
CMD ["node", "apps/web/server.js"]
