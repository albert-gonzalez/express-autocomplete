FROM node:7

RUN mkdir -p /usr/autocomplete/app
WORKDIR /usr/autocomplete

VOLUME /usr/autocomplete/app

RUN npm install pm2 -g

COPY package.json /usr/autocomplete/
RUN npm install

COPY webpack.config.js /usr/autocomplete/

EXPOSE 8888

#CMD [ "npm", "start" ]
CMD [ "npm", "run", "cluster"]
