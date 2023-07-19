FROM node:18.4.0
WORKDIR /app

COPY package*.json .
RUN npm install

ENV PATH "/app/node_modules/.bin:$PATH"

ENTRYPOINT [ "ergogen" ]
