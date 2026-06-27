FROM node:22.18.0-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build -- --configuration production

FROM nginx:alpine
COPY --from=builder /app/dist/fantasy-e-store/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["sh", "-c", "echo \"Web ready -> ${APP_URL:-http://localhost:8080}\"; exec nginx -g 'daemon off;'"]