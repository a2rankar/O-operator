# Dockerfile для бекенда
FROM node:18-alpine

WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Установка зависимостей
RUN npm install

# Копируем остальной код
COPY . .
# В Dockerfile, после COPY . .
# Копируем файл migrate.sh из папки migration
COPY migrations/migrate.sh /app/migrate.sh
RUN chmod +x /app/migrate.sh



RUN apk add --no-cache postgresql-client


CMD ["sh", "-c", "npm run migrate && npm run start"]
