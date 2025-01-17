FROM node:20.17.0
LABEL name=MuseMe-backend
MAINTAINER kodymillar@hotmail.com
WORKDIR /backend
ENV PATH /backend/node_modules/.bin:$PATH
ENV NODE_ENV=Development
ENV URL=http://0.0.0.0:8000
COPY package.json /backend
COPY package-lock.json /backend
RUN npm install
COPY . .
CMD ["npm", "start"]