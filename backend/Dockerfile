FROM node:22.13.1-slim

WORKDIR /backend

COPY package.json package-lock.json ./
RUN npm install

RUN npm install -g @nestjs/cli

CMD ["npm", "run", "start:debug"]