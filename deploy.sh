#!/usr/bin/env sh

set -e
npm install
npm run build

cd dist
git config --global user.email "azat.developer@gmail.com"
git config --global user.name "ufaboy"
git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:ufaboy/game-memory.git developer:gh-pages

cd -