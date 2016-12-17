FROM alpine:3.4
MAINTAINER Wong Yong Jie <yjwong92@gmail.com>

RUN apk add --update nginx && rm -rf /var/cache/apk/*
ADD build/dist /app
ADD build/nginx/nginx.conf /etc/nginx/nginx.conf
RUN mkdir -p /run/nginx
CMD ["nginx", "-g", "daemon off;"]

EXPOSE 80

