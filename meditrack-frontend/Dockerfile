FROM node:21.3-slim
WORKDIR /react-app
COPY ./package.json ./package.json
RUN npm install
COPY . .
ENTRYPOINT ["npm", "start"]
