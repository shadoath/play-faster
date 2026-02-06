#!/bin/bash

# Enhanced Video & Audio Speed Control - Chrome Web Store Build Script

set -e  # Exit on error

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}Building Enhanced Video & Audio Speed Control for Chrome Web Store...${NC}"

# Clean previous build
echo "Cleaning previous build..."
rm -rf build/
rm -f enhanced-video-audio-speed.zip

# Create build directory
echo "Creating build directory..."
mkdir -p build/

# Copy required files
echo "Copying extension files..."
cp manifest.json build/
cp background.js build/
cp content.js build/
cp inject.js build/
cp popup.html build/
cp popup.js build/
cp icon-16.png build/
cp icon-48.png build/
cp icon-128.png build/
cp README.md build/

# Create zip
echo "Creating zip archive..."
cd build
zip -r -q ../enhanced-video-audio-speed.zip .
cd ..

# Get zip size
SIZE=$(du -h enhanced-video-audio-speed.zip | cut -f1)

echo -e "${GREEN}✓ Build complete!${NC}"
echo ""
echo "Package: enhanced-video-audio-speed.zip"
echo "Size: $SIZE"
echo ""
echo "Ready to upload to Chrome Web Store Developer Dashboard:"
echo "https://chrome.google.com/webstore/devconsole"

# Clean up build directory
rm -rf build/
