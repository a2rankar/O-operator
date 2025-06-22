# Dockerfile для бекенда
FROM node:18-alpine

WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Установка зависимостей
RUN npm install

# Копируем остальной код
COPY . .

# Выполняем миграции (если есть скрипт)
CMD ["sh", "-c", "npm run migrate && npm run start"]
