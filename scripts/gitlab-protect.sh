#!/bin/sh
# Server-side GitFlow protection for a GitLab project (the real guard: local
# hooks can be skipped with --no-verify).
#
#   main, master, develop   push: no one · merge: maintainers (develop: developers) · no force push
#   release/*, hotfix/*     push + merge: developers · no force push
#   tags v*                 create: maintainers
#   project                 merge only when the pipeline succeeds
#
# Usage (token: Maintainer, scope "api"):
#   GITLAB_TOKEN=glpat-… scripts/gitlab-protect.sh group/project            # apply
#   DRY_RUN=1 scripts/gitlab-protect.sh group/project                       # print only
# GITLAB_URL defaults to https://gitlab.com
set -eu

PROJECT="${1:?project path (group/project) or numeric id required}"
GITLAB_URL="${GITLAB_URL:-https://gitlab.com}"
API="$GITLAB_URL/api/v4/projects/$(printf '%s' "$PROJECT" | sed 's#/#%2F#g')"
NO_ONE=0 DEVELOPER=30 MAINTAINER=40

call() { # METHOD PATH [form fields…]
  method=$1 path=$2
  shift 2
  if [ "${DRY_RUN:-}" = "1" ]; then
    echo "$method $API$path $*"
    return 0
  fi
  set -- "$@" # remaining args are --data-urlencode pairs
  args=""
  for field in "$@"; do args="$args --data-urlencode $field"; done
  # shellcheck disable=SC2086
  curl --silent --show-error --fail-with-body --request "$method" \
    --header "PRIVATE-TOKEN: ${GITLAB_TOKEN:?GITLAB_TOKEN required}" \
    $args "$API$path" >/dev/null
}

protect_branch() { # NAME PUSH MERGE
  # Re-create so the settings are exactly these (GitLab protects the default branch already)
  name_enc=$(printf '%s' "$1" | sed 's#/#%2F#g; s#\*#%2A#g')
  call DELETE "/protected_branches/$name_enc" 2>/dev/null || true
  call POST "/protected_branches" "name=$1" "push_access_level=$2" \
    "merge_access_level=$3" "allow_force_push=false"
  echo "✔ protected branch $1"
}

protect_branch main "$NO_ONE" "$MAINTAINER"
protect_branch master "$NO_ONE" "$MAINTAINER"
protect_branch develop "$NO_ONE" "$DEVELOPER"
protect_branch 'release/*' "$DEVELOPER" "$DEVELOPER"
protect_branch 'hotfix/*' "$DEVELOPER" "$DEVELOPER"

call DELETE "/protected_tags/v%2A" 2>/dev/null || true
call POST "/protected_tags" "name=v*" "create_access_level=$MAINTAINER"
echo "✔ protected tags v*"

call PUT "" "only_allow_merge_if_pipeline_succeeds=true" \
  "only_allow_merge_if_all_discussions_are_resolved=true" \
  "remove_source_branch_after_merge=true"
echo "✔ merge requests require a green pipeline"
