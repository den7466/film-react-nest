FROM node:20-alpine

WORKDIR /app

COPY package.json ./

RUN npm i

COPY . .

ARG VITE_API_URL="//free2code.nomorepartiesco.ru/api/afisha"

ARG VITE_CDN_URL="//free2code.nomorepartiesco.ru/content/afisha"

RUN VITE_API_URL=${VITE_API_URL} VITE_CDN_URL=${VITE_CDN_URL} npm run build
