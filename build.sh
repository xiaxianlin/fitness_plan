#!/bin/bash

rm -rf docs
yarn build
mv build docs
echo 'fitness.ixxl.me' > docs/CNAME

git add .
git commit -m 'deloy'
git push