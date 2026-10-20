#!/bin/sh
# Convert source documents (docx, pdf, pptx, xlsx, html…) to Markdown under docs/
# so people and AI agents read one text format. Runs markitdown in Docker, so
# nothing has to be installed locally.
#
# Usage:
#   pnpm docs:convert docs/_sources/SRS-v1.2.docx            # → docs/product/srs-v1-2.md
#   pnpm docs:convert -o docs/architecture diagram-notes.pdf  # custom output dir
set -eu

MARKITDOWN_VERSION=0.1.8
IMAGE="turbo-base/markitdown:${MARKITDOWN_VERSION}"
OUT_DIR=docs/product

if [ "${1:-}" = "-o" ]; then
  OUT_DIR="${2:?output dir required after -o}"
  shift 2
fi
[ "$#" -gt 0 ] || { sed -n '2,9p' "$0"; exit 1; }

ROOT=$(git rev-parse --show-toplevel 2>/dev/null || pwd)
cd "$ROOT"
mkdir -p "$OUT_DIR"

if ! docker image inspect "$IMAGE" >/dev/null 2>&1; then
  echo "Building $IMAGE (first run only)…"
  docker build -q -t "$IMAGE" - <<DOCKERFILE >/dev/null
FROM python:3.13-slim
RUN pip install --no-cache-dir "markitdown[docx,pdf,pptx,xlsx,xls]==${MARKITDOWN_VERSION}"
ENTRYPOINT ["markitdown"]
DOCKERFILE
fi

for SRC in "$@"; do
  [ -f "$SRC" ] || { echo "✖ Not found: $SRC" >&2; exit 1; }
  NAME=$(basename "$SRC")
  SLUG=$(echo "${NAME%.*}" | tr '[:upper:]' '[:lower:]' | sed -E 's/[^a-z0-9]+/-/g; s/^-+|-+$//g')
  OUT="$OUT_DIR/$SLUG.md"
  DIR=$(cd "$(dirname "$SRC")" && pwd)

  {
    printf -- '---\n'
    printf 'source: %s\n' "$SRC"
    printf 'converted: %s\n' "$(date +%Y-%m-%d)"
    printf 'status: draft # review the conversion, then set to "reviewed"\n'
    printf -- '---\n\n'
    docker run --rm --user "$(id -u):$(id -g)" -v "$DIR":/in:ro "$IMAGE" "/in/$NAME"
  } > "$OUT"

  echo "✔ $SRC → $OUT"
done

# Same formatting as the rest of the repo
pnpm exec prettier --write "$OUT_DIR" --log-level warn
