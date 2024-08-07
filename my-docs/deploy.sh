#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e



# 构建项目，生成静态文件
pnpm docs:build


git add -A
git commit -m "update sth"
git push origin master


