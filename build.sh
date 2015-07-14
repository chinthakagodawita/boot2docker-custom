#!/usr/bin/env bash

# Remove any existing builds
rm -f boot2docker.iso

# Build ISO.
docker build -t boot2docker .
docker run -i boot2docker > boot2docker.iso
