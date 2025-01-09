#!/bin/bash
echo "DB_CONNECTION=${DB_CONNECTION}" > .env
echo "DB_HOST=${PG_HOST}" >> .env
echo "DB_PORT=${PG_PORT}" >> .env
echo "DB_USER=${PG_USER}" >> .env
echo "DB_NAME=${PG_DB_NAME}" >> .env
echo "DB_PASSWORD=${PG_PASSWORD}" >> .env
echo "APP_KEY=${APP_KEY}" >> .env
echo "NODE_ENV=${NODE_ENV}" >> .env
# Ajoutez toutes les autres variables nécessaires
