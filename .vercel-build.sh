#!/bin/bash
apt-get update && apt-get install -y libbluetooth-dev
yarn install
yarn build
