#!/bin/bash

git pull superOrigin master &&
npm i &&
cp src/configs/git/hooks/pre-push .git/hooks/ &&
chmod +x .git/hooks/pre-push
