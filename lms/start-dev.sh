#!/usr/bin/env bash
export PATH="/opt/homebrew/bin:/Users/gregorybaranes/.nvm/versions/node/v20.20.2/bin:$PATH"
cd /Users/gregorybaranes/Downloads/formation-immobiliere/lms
exec node node_modules/next/dist/bin/next dev
