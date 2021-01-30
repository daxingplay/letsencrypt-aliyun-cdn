FROM node:alpine

ADD . /srv/

RUN apk update && apk add ca-certificates wget && \
    wget https://github.com/go-acme/lego/releases/download/v4.2.0/lego_v4.2.0_linux_amd64.tar.gz -O /tmp/lego.tar.gz -q && \
    mkdir /tmp/lego && \
    tar zvxf /tmp/lego.tar.gz -C /tmp/lego/ && \
    cp /tmp/lego/lego /srv/lego && \
    chmod +x /srv/lego && \
    cd /srv && \
    npm i --production

FROM node:alpine

ENV DOMAINS example.com
ENV EMAIL daxingplay@gmail.com
ENV DNS_TYPE  dnspod
ENV ACCESS_KEY_ID foo
ENV ACCESS_SECRET bar
ENV ENDPOINT https://cdn.aliyuncs.com
ENV API_VERSION 2018-05-10

COPY docker/tasks/ /etc/periodic/
COPY --from=0 /srv /srv

RUN chmod -R +x /etc/periodic/ && \
    chmod +x /srv/docker/start.sh

ENTRYPOINT ["/srv/docker/start.sh"]