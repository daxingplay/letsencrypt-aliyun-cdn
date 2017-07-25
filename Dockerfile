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

RUN apk update && apk add ca-certificates go git musl-dev bash nodejs nodejs-npm make gcc g++ python && \
    go get -u github.com/xenolf/lego && \
    cd /go/src/github.com/xenolf/lego && \
    go build -o /usr/bin/lego . && \
    chmod -R +x /etc/periodic/ && \
    chmod +x /srv/docker/start.sh && \
    cd /srv && \
    npm i --production && \
    mkdir /etc/lego && \
    apk del go git musl-dev make gcc g++ python nodejs-npm && \
    rm -rf /var/cache/apk/* && \
    rm -rf /go

ENTRYPOINT ["/srv/docker/start.sh"]