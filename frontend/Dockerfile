# Etapa 1: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json* pnpm-lock.yaml* ./
RUN npm install
COPY . .

# --- AGREGA ESTO AQUÍ (VITAL) ---
# 1. Recibimos el argumento desde GitHub Actions
ARG VITE_API_URL
# 2. Lo convertimos en variable de entorno para que Vite lo lea
ENV VITE_API_URL=$VITE_API_URL
# --------------------------------

# Ahora sí, construimos la app con la URL inyectada
RUN npm run build

# Etapa 2: Servir estáticos con Nginx
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
# Asegúrate de que este archivo nginx.conf exista en tu repo, si no, borra esta línea
# COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]