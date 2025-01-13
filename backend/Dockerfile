FROM node:20.17.0
LABEL name=MuseMe-backend
MAINTAINER kodymillar@hotmail.com
WORKDIR /backend
ENV PATH /backend/node_modules/.bin:$PATH
COPY package.json /backend
COPY package-lock.json /backend
RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "start"]