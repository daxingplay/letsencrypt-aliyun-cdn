FROM alpine:3.4

ENV DOMAINS example.com
ENV EMAIL daxingplay@gmail.com
ENV DNS_TYPE  dnspod
ENV ACCESS_KEY_ID foo
ENV ACCESS_SECRET bar
ENV ENDPOINT https://cdn.aliyuncs.com
ENV API_VERSION 2014-11-11
ENV GOPATH /go

ADD . /srv/
COPY docker/tasks/ /etc/periodic/

RUN apk update && apk add nodejs ca-certificates go git && \
    rm -rf /var/cache/apk/* && \
    go get -u github.com/xenolf/lego && \
    cd /go/src/github.com/xenolf/lego && \
    go build -o /usr/bin/lego . && \
    apk del go git && \
    chmod -R +x /etc/periodic/ && \
    chmod +x /srv/docker/start.sh && \
    cd /srv && \
    npm i && \
    mkdir /etc/lego && \
    rm -rf /var/cache/apk/* && \
    rm -rf /go

ENTRYPOINT ["/srv/docker/start.sh"]