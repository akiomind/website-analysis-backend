#!/usr/bin/env bash
echo "Installing dependencies..."
npm install

echo "Installing headless Chromium for Puppeteer..."
npx puppeteer browsers install chrome