FROM alpine:latest

RUN apk add --update nodejs nodejs-npm

WORKDIR /usr/src/beingzero

COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8500
CMD [ "node", "server.js" ]

LABEL maintainer="Being Zero Pvt Ltd, beingzeroin@gmail.com"
LABEL version="1.0.0"