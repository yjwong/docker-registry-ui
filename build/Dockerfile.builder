FROM node:0.12
MAINTAINER Wong Yong Jie <yjwong92@gmail.com>

RUN npm install -g grunt-cli bower
ADD . /app

