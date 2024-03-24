#! /bin/bash
export UID=$(id -u)
export GID=$(id -g)
docker build \
  --no-cache \
  --build-arg UID=$UID \
  --build-arg GID=$GID \
  --tag ember:5.4 \
  --file Dockerfile \
  .
