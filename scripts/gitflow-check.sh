#!/bin/sh
# GitFlow guard. Used by GitLab CI, GitHub Actions and the husky hooks.
#
#   feature/* fix/* chore/* docs/* refactor/* test/* ci/* deps/*  → develop (or another of these)
#   release/X.Y.Z  (from develop)                                 → main, develop (back-merge)
#   hotfix/X.Y.Z   (from main)                                    → main, develop
#   fix/*                                                         → release/*, hotfix/* (stabilise)
#   main                                                          → develop (back-merge)
#
# Usage:
#   scripts/gitflow-check.sh <source-branch> <target-branch>   merge/pull request
#   scripts/gitflow-check.sh --branch <name>                   branch name only
#   scripts/gitflow-check.sh --push <local-sha> <remote-ref> <remote-sha>
#                                                              one pre-push ref update
set -eu

SEMVER='[0-9]+\.[0-9]+\.[0-9]+'
PREFIXES='feature|fix|chore|docs|refactor|test|ci|deps'
WORK="^($PREFIXES)/[a-z0-9._-]+\$"
NAME_RULE="main, develop, release/X.Y.Z, hotfix/X.Y.Z or <type>/<name> with type in: $(echo "$PREFIXES" | tr '|' ' ') (name: a-z 0-9 . _ -)"

# Best-effort valid name for a rejected one: lowercase, safe characters,
# default prefix feature/.
suggest() {
  prefix=$(echo "$1" | sed -E 's#/.*##' | tr '[:upper:]' '[:lower:]')
  rest=$(echo "$1" | sed -E 's#^[^/]*/?##')
  case "$prefix" in # common aliases
    feat | features) prefix=feature ;;
    bug | bugfix | bugs | fixes) prefix=fix ;;
    doc) prefix=docs ;;
    refactoring) prefix=refactor ;;
    tests) prefix='test' ;;
    dep | dependencies) prefix=deps ;;
  esac
  echo "$prefix" | grep -Eq "^($PREFIXES)$" || { rest=$1; prefix=feature; }
  slug=$(echo "$rest" | tr '[:upper:]' '[:lower:]' | sed -E 's#[^a-z0-9._-]+#-#g; s#^-+|-+$##g')
  echo "$prefix/${slug:-my-change}"
}

check_name() {
  echo "$1" | grep -Eq "^(main|develop)\$|^(release|hotfix)/$SEMVER\$|$WORK"
}

if [ "${1:-}" = "--branch" ]; then
  BRANCH="${2:?branch name required}"
  if check_name "$BRANCH"; then
    echo "✔ GitFlow: branch '$BRANCH'"
    exit 0
  fi
  case "$BRANCH" in
    release/* | hotfix/*) hint="${BRANCH%%/*}/X.Y.Z (e.g. ${BRANCH%%/*}/1.3.0)" ;;
    *) hint=$(suggest "$BRANCH") ;;
  esac
  echo "✖ GitFlow: branch name '$BRANCH' is not allowed." >&2
  echo "  Allowed: $NAME_RULE" >&2
  echo "  Rename:  git branch -m '$BRANCH' $hint" >&2
  exit 1
fi

# ---------- pre-push: protected branches ----------
# main/master/develop: no direct push, force push or deletion (merge via MR/PR).
# release/*, hotfix/*: direct push allowed, no force push.
# Escape hatch for maintainers (e.g. bootstrapping the repo):
#   ALLOW_PROTECTED_PUSH=1 git push …
if [ "${1:-}" = "--push" ]; then
  LOCAL_SHA="${2:?local sha required}"
  REMOTE_REF="${3:?remote ref required}"
  REMOTE_SHA="${4:?remote sha required}"
  ZERO=0000000000000000000000000000000000000000
  case "$REMOTE_REF" in refs/heads/*) ;; *) exit 0 ;; esac # tags, notes…
  BRANCH="${REMOTE_REF#refs/heads/}"
  [ "${ALLOW_PROTECTED_PUSH:-}" = "1" ] && exit 0

  deny() {
    echo "✖ GitFlow: $1 '$BRANCH' is not allowed." >&2
    echo "  $2" >&2
    exit 1
  }

  # Non-fast-forward = rewrites remote history (git push --force / +ref)
  rewrites_history() {
    [ "$REMOTE_SHA" != "$ZERO" ] && [ "$LOCAL_SHA" != "$ZERO" ] || return 1
    # Remote commit unknown locally: cannot prove fast-forward
    git cat-file -e "$REMOTE_SHA^{commit}" 2>/dev/null || return 0
    ! git merge-base --is-ancestor "$REMOTE_SHA" "$LOCAL_SHA"
  }

  case "$BRANCH" in
    main | master | develop)
      [ "$LOCAL_SHA" = "$ZERO" ] && deny "deleting" "Protected branch."
      [ "$REMOTE_SHA" = "$ZERO" ] && exit 0 # first push creating the branch
      rewrites_history && deny "force-pushing to" "Protected branch: history is never rewritten."
      deny "pushing directly to" "Open a merge/pull request from feature/*, fix/*, release/* or hotfix/* instead."
      ;;
    release/* | hotfix/*)
      [ "$LOCAL_SHA" = "$ZERO" ] && exit 0 # deleting after the release
      rewrites_history && deny "force-pushing to" "Release/hotfix branches are shared: push new commits instead (git pull --rebase first)."
      ;;
  esac
  exit 0
fi

SOURCE="${1:?source branch required}"
TARGET="${2:?target branch required}"

fail() {
  echo "✖ GitFlow: '$SOURCE' → '$TARGET' is not allowed. $1" >&2
  exit 1
}

# Release/hotfix branches carry the version that becomes the vX.Y.Z tag.
case "$SOURCE" in
  release/* | hotfix/*)
    echo "$SOURCE" | grep -Eq "^(release|hotfix)/$SEMVER\$" ||
      fail "Name it release/X.Y.Z or hotfix/X.Y.Z (e.g. release/1.3.0)."
    ;;
esac

case "$TARGET" in
  main)
    echo "$SOURCE" | grep -Eq '^(release|hotfix)/' ||
      fail "Only release/* and hotfix/* merge into main."
    ;;
  develop)
    echo "$SOURCE" | grep -Eq "$WORK" ||
      echo "$SOURCE" | grep -Eq '^(release|hotfix)/|^main$' ||
      fail "Use a work branch: feature/<name>, fix/<name>, chore/<name>, …"
    ;;
  release/* | hotfix/*)
    echo "$SOURCE" | grep -Eq '^fix/' ||
      fail "Only fix/* branches go into $TARGET."
    ;;
  *)
    # Stacked work branches (feature/a → feature/b) are fine.
    echo "$SOURCE" | grep -Eq "$WORK" ||
      fail "Unexpected source branch."
    ;;
esac

echo "✔ GitFlow: '$SOURCE' → '$TARGET'"
