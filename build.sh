#!/bin/sh -e
SCRIPT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
DIST_DIR=$SCRIPT_DIR/build/dist

# Use a build container to run Grunt.
docker build -t yjwong/docker-registry-ui-builder -f build/Dockerfile.builder .
docker run --rm \
    -v $DIST_DIR:/app/dist \
    -w /app \
    -e NODE_ENV=$1 \
    -t yjwong/docker-registry-ui-builder \
    /bin/sh -c "
        npm install;
        node_modules/.bin/bower --allow-root install;
        node_modules/.bin/grunt"

# Create the final container.
docker build -t yjwong/docker-registry-ui -f build/Dockerfile .
