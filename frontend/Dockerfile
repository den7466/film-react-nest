FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

ARG VITE_API_URL="//localhost:3000/api/afisha"

ARG VITE_CDN_URL="//localhost:3000/content/afisha"

RUN VITE_API_URL=${VITE_API_URL} VITE_CDN_URL=${VITE_CDN_URL} npm run build
