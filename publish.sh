#!/usr/bin/env bash
# Publish Elevator Town to GitHub and turn on GitHub Pages.
# Needs: git and the GitHub CLI (gh), logged in with `gh auth login`.
set -e
USER_NAME="aiden-azarnoush"
REPO="elevator-town"
DESC="A simple 3D elevator game for young kids: ride glass and solid elevators in a hotel, parking garage and mall."
SITE="https://${USER_NAME}.github.io/${REPO}/"

cd "$(dirname "$0")"

# 1. Local git repo + commit
[ -d .git ] || git init -b main
git branch -M main
git add -A
git commit -m "Update Elevator Town" || echo "Nothing new to commit."

# 2. Create the GitHub repo (or reuse it if it already exists)
if gh repo view "${USER_NAME}/${REPO}" >/dev/null 2>&1; then
  echo "Repo already exists, pushing to it."
  git remote get-url origin >/dev/null 2>&1 || git remote add origin "https://github.com/${USER_NAME}/${REPO}.git"
else
  gh repo create "${USER_NAME}/${REPO}" --public --description "${DESC}" --homepage "${SITE}"
  git remote remove origin 2>/dev/null || true
  git remote add origin "https://github.com/${USER_NAME}/${REPO}.git"
fi

# 3. Push
git push -u origin main

# 4. About box: website link + topics
gh repo edit "${USER_NAME}/${REPO}" --homepage "${SITE}" --description "${DESC}" \
  --add-topic game --add-topic kids --add-topic threejs --add-topic elevator \
  --add-topic javascript --add-topic github-pages --add-topic browser-game --add-topic educational-game || true

# 5. Turn on GitHub Pages (main branch, root folder)
gh api -X POST "repos/${USER_NAME}/${REPO}/pages" -f "source[branch]=main" -f "source[path]=/" >/dev/null 2>&1 \
  && echo "GitHub Pages turned on." \
  || echo "GitHub Pages was already on (or turn it on by hand: Settings -> Pages -> main / root -> Save)."

echo ""
echo "Done. Repo: https://github.com/${USER_NAME}/${REPO}"
echo "Game (live in 1-2 minutes): ${SITE}"
