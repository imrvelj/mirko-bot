FROM node:latest

COPY package*.json ./
RUN npm i

COPY . .
RUN npm run build

EXPOSE 3030

CMD [ "node", "dist/index.js" ]
