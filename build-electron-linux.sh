#!/usr/bin/env bash
set -euo pipefail
 
PHP_VERSION="8.5"
DOCKER_IMAGE="alpine:3.24"
OUTPUT_DIR=".electron/binary/linux"
SPC_WORKDIR="/tmp/spc-build"
 
echo "Compiling ${PHP_VERSION} with StaticPHP (Docker)..."
 
mkdir -p "$OUTPUT_DIR"
 
docker run --rm \
  -v "$(pwd)/craft.yml:/app/craft.yml:ro" \
  -v "$(pwd)/${OUTPUT_DIR}:/output" \
  "${DOCKER_IMAGE}" \
  sh -c "
    set -e
    apk add --no-cache curl bash
 
    curl -#fSL https://dl.static-php.dev/v3/spc-bin/nightly/spc-linux-x86_64 -o /usr/local/bin/spc
    chmod +x /usr/local/bin/spc
 
    mkdir -p /build && cd /build
    cp /app/craft.yml .
    spc doctor --auto-fix
    spc craft -v
    cp buildroot/bin/php /output/php
    echo 'PHP binary built successfully and copied to output directory.'
  "
 
echo "PHP binary available in ${OUTPUT_DIR}/php"
 
if [ ! -f "${OUTPUT_DIR}/php" ]; then
  echo "Error: PHP binary not found after build" >&2
  exit 1
fi
 
chmod +x "${OUTPUT_DIR}/php"
file "${OUTPUT_DIR}/php"
 
echo "Executing Electron build (npm run package-linux)..."
 
npm install --prefer-offline
npm run package-linux
 
echo ""
echo "Finished building Electron app for Linux."
ls -lh build/electron/ 2>/dev/null || true