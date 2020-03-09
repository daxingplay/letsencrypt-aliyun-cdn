FROM alpine:3.6

ENV GOPATH /go
ENV DOMAINS example.com
ENV EMAIL daxingplay@gmail.com
ENV DNS_TYPE  dnspod
ENV ACCESS_KEY_ID foo
ENV ACCESS_SECRET bar
ENV ENDPOINT https://cdn.aliyuncs.com
ENV API_VERSION 2014-11-11

ADD . /srv/
COPY docker/tasks/ /etc/periodic/

RUN apk update && apk add ca-certificates wget musl-dev bash nodejs nodejs-npm make gcc g++ python && \
    wget https://github.com/go-acme/lego/releases/download/v3.4.0/lego_v3.4.0_linux_amd64.tar.gz -O /tmp/lego.tar.gz && \
    tar zvxf /tmp/lego.tar.gz && \
    cp /tmp/lego_v3.4.0_linux_amd64/lego /usr/bin/lego && \
    chmod +x /usr/bin/lego && \
    chmod -R +x /etc/periodic/ && \
    chmod +x /srv/docker/start.sh && \
    cd /srv && \
    npm i --production && \
    mkdir /etc/lego && \
    apk del musl-dev make gcc g++ python nodejs-npm && \
    rm -rf /var/cache/apk/* && \
    rm -rf /go

ENTRYPOINT ["/srv/docker/start.sh"]