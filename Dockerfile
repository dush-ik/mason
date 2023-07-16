FROM --platform=linux/amd64 node:18.12.1-alpine

WORKDIR /APP

COPY ./package.json ./

RUN npm install

COPY . ./

RUN npm run build

CMD ["npm", "run", "start"]
