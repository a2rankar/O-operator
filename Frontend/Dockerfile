FROM node:18-alpine AS builder
WORKDIR /app
COPY frontend-react--/ .    
RUN npm install
RUN npm run build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
