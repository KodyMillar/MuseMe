FROM node:20.17.0
LABEL name=MuseMe-frontend
MAINTAINER kodymillar@hotmail.com
WORKDIR /frontend
ENV PATH /frontend/node_modules/.bin:$PATH
ENV REACT_APP_BACKEND_HOST=http://localhost
ENV REACT_APP_BACKEND_PORT=8000
COPY package.json /frontend
COPY package-lock.json /frontend
RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "start"]