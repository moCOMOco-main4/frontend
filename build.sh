#!/bin/sh
mkdir -p output
cp -R public src *.json *.mjs *.js *.ts output/ 2>/dev/null || true
