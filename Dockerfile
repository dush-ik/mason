FROM node:18.12.1-alpine as build

WORKDIR /app

COPY ./package.json ./

RUN npm install

COPY . ./

RUN npm run build

FROM nginx
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf 

COPY --from=build /app/dist /usr/share/nginx/html 


