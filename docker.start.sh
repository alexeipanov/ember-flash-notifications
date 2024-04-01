#! /bin/bash
docker-compose run \
  --rm \
  --user node \
  --workdir /source \
  --publish 4200:4200 \
  --publish 7200:7200 \
  app bash
docker-compose down
