FROM node:24-alpine AS builder
WORKDIR /app
COPY client/package*.json ./
RUN npm install
COPY client .
RUN npm run build

FROM nginx:1.27-alpine
COPY client/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]