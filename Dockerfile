FROM xenolf/lego

ENV DOMAINS example.com
ENV EMAIL daxingplay@gmail.com
ENV DNS_TYPE  dnspod
ENV ACCESS_KEY_ID foo
ENV ACCESS_SECRET bar
ENV ENDPOINT https://cdn.aliyuncs.com
ENV API_VERSION 2014-11-11

ADD . /srv/
COPY docker/tasks/ /etc/periodic/

RUN apk update && apk add nodejs && \
    chmod -R +x /etc/periodic/ && \
    chmod +x /srv/docker/start.sh && \
    cd /srv && \
    npm i && \
    mkdir /etc/lego && \
    rm -rf /var/cache/apk/*

ENTRYPOINT ["/srv/docker/start.sh"]