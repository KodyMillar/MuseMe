FROM node:20.17.0
LABEL name=MuseMe-backend
MAINTAINER kodymillar@hotmail.com
WORKDIR /backend
ENV PATH /backend/node_modules/.bin:$PATH
ENV NODE_ENV=Development
ENV URL=http://0.0.0.0:8000
ENV DB_HOST=museme-db
ENV DB_PORT=3306
ENV DB_NAME=music_app
ENV DB_USER=kody
ENV DB_PASSWORD=ROMRAMRemRam!
ENV PORT=8000
ENV SECRET="jklf3!#@32Feq@4390fafeAEFja!%jfla_+?./jlkea"
ENV COOKIE_PATH='/'
ENV COOKIE_DOMAIN=Null
COPY package.json /backend
COPY package-lock.json /backend
RUN npm install
COPY . .
CMD ["npm", "start"]