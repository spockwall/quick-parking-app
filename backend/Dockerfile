FROM node:latest

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "start"]
# FROM node:latests
# WORKDIR /app
# COPY package* yarn.lock ./
# RUN yarn install
# COPY public ./public
# COPY src ./src
# RUN yarn run build