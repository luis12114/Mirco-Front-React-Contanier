# syntax=docker/dockerfile:1.4
FROM node:20-alpine AS build
WORKDIR /app

# Copiamos solo package.json y package-lock.json
COPY package*.json ./

# Instalamos dependencias
RUN npm install

# Copiamos el resto del código y construimos
COPY . .
RUN npm run build

# Etapa de producción con Nginx
FROM nginx:alpine AS production
WORKDIR /usr/share/nginx/html
COPY --from=build /app/dist ./
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
