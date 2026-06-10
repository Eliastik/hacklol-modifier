#!/usr/bin/env bash
set -euo pipefail

./build-static-php-linux.sh
 
echo "Executing Electron build (npm run package-linux)..."
 
npm install --prefer-offline
npm run package-linux
 
echo ""
echo "Finished building Electron app for Linux."
ls -lh build/electron/ 2>/dev/null || true