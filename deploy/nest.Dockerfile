# syntax=docker/dockerfile:1
# NestJS apps (api, socket). Build from the repo root:
#   docker build -f deploy/nest.Dockerfile --build-arg APP=api -t turbo-base-api .
#   docker build -f deploy/nest.Dockerfile --build-arg APP=api --target migrate -t turbo-base-migrate .

ARG NODE_VERSION=24-alpine

FROM node:${NODE_VERSION} AS base
RUN apk add --no-cache libc6-compat
RUN npm install -g pnpm@11.25.0
# Git hooks are for local development only
ENV HUSKY=0
WORKDIR /app

# --- Prune the monorepo down to $APP and its workspace dependencies
FROM base AS prepare
ARG APP
RUN npm install -g turbo@2.11.9
COPY . .
RUN turbo prune ${APP} --docker

# --- Install dependencies, then build
FROM base AS builder
ARG APP
COPY --from=prepare /app/out/json/ .
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile
COPY --from=prepare /app/out/full/ .
RUN pnpm turbo run build --filter=${APP}
# Isolated production node_modules for $APP (workspace packages ship their dist/)
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store \
    pnpm --filter=${APP} deploy --prod --legacy /prod/app

# --- @repo/db alone (schema, migrations, Prisma CLI) for the migrate image
FROM builder AS migrate-build
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store \
    pnpm --filter=@repo/db deploy --prod --legacy /prod/migrate

# --- One-shot job: apply Prisma migrations (needs DATABASE_URL)
FROM node:${NODE_VERSION} AS migrate
WORKDIR /app
ENV PRISMA_HIDE_UPDATE_MESSAGE=1
COPY --from=migrate-build --chown=node:node /prod/migrate ./
USER node
CMD ["node_modules/.bin/prisma", "migrate", "deploy"]

# --- Runtime
FROM node:${NODE_VERSION} AS runner
ARG APP
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder --chown=node:node /prod/app/package.json ./package.json
COPY --from=builder --chown=node:node /prod/app/node_modules ./node_modules
COPY --from=builder --chown=node:node /app/apps/${APP}/dist ./dist

USER node
CMD ["node", "--enable-source-maps", "dist/main.js"]
