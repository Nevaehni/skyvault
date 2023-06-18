FROM node:alpine3.18

WORKDIR /app

COPY . .

RUN npm i --force

EXPOSE 3001

CMD ["npm", "run", "dev"]