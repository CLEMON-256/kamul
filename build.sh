#!/usr/bin/env bash
# exit on error
set -o errexit

echo "Starting build process..."

# Navigate to the Backend directory and run its build script
cd Backend
sh build.sh

echo "Build process completed successfully."
