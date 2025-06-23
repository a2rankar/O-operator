# Этап сборки
FROM node:18-alpine AS build
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальной код
COPY . .

# Собираем проект
RUN npm run build

# Этап развертывания
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
