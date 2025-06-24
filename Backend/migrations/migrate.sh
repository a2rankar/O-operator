#!/bin/sh

# Ждем, пока база данных будет готова
until pg_isready -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER"; do
  echo "⏳ Ждём базу..."
  sleep 2
done

echo "✅ База доступна. Начинаем миграции..."

# Выполняем SQL-скрипт миграции
psql -h "$DB_HOST" -U "$DB_USER" -d "$DB_NAME" -f 001_create_tickets.sql

echo "✅ Миграции выполнены."
