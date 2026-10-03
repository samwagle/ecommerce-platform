# Stage 1: Build the React application
FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build


# Stage 2: Serve the production build with Nginx
FROM nginx:alpine

# Copy custom reverse proxy config into Nginx configuration directory
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy production static files from build stage
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
