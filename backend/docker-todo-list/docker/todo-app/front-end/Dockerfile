FROM node:14-alpine AS build
WORKDIR /app/front-end
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
