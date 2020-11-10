FROM node:12.16.3-alpine

RUN apk add --no-cache git

ENV ENV_SILENT=true

RUN mkdir -p /app

WORKDIR /app

COPY . /app

RUN yarn install

RUN chown -R node:node /app

USER node

EXPOSE 3333

CMD ["npm", "start"]
