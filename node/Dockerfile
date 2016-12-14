FROM node:7

RUN mkdir -p /usr/app
WORKDIR /usr/app

VOLUME /usr/app/src

COPY package.json /usr/app/
RUN npm install

EXPOSE 8888

CMD [ "npm", "start" ]