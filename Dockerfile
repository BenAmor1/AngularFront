FROM node:14-alpine

WORKDIR /app

COPY . .

RUN npm install -f

EXPOSE 4200

CMD ["npm", "run", "start"]