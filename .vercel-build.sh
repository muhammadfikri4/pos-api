#!/bin/bash
apt-get update && apt-get install -y libbluetooth-dev
npm install
npm run build