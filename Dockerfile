FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:18-alpine

WORKDIR /app

COPY --from=build /app/build ./build

COPY . .

RUN npm install --only=production

EXPOSE 3001

ENV NODE_ENV production

CMD ["node", "server.js"]
