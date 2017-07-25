# letsencrypt-aliyun-cdn

[![Docker Automated buil](https://img.shields.io/docker/automated/daxingplay/letsencrypt-aliyun-cdn.svg)](https://hub.docker.com/r/daxingplay/letsencrypt-aliyun-cdn/) [![Docker Stars](https://img.shields.io/docker/stars/daxingplay/letsencrypt-aliyun-cdn.svg)](https://hub.docker.com/r/daxingplay/letsencrypt-aliyun-cdn/) [![Docker Pulls](https://img.shields.io/docker/pulls/daxingplay/letsencrypt-aliyun-cdn.svg)](https://hub.docker.com/r/daxingplay/letsencrypt-aliyun-cdn/) [![](https://badge.imagelayers.io/daxingplay/letsencrypt-aliyun-cdn:latest.svg)](https://imagelayers.io/?images=daxingplay/letsencrypt-aliyun-cdn:latest 'Get your own badge on imagelayers.io') [![](https://images.microbadger.com/badges/image/daxingplay/letsencrypt-aliyun-cdn.svg)](https://microbadger.com/images/daxingplay/letsencrypt-aliyun-cdn "Get your own image badge on microbadger.com") [![](https://images.microbadger.com/badges/version/daxingplay/letsencrypt-aliyun-cdn.svg)](https://microbadger.com/images/daxingplay/letsencrypt-aliyun-cdn "Get your own version badge on microbadger.com")

[中文文档](README.zh.md)

Automatically apply and renew certificates for domains hosted on aliyun cdn. It is based on [xenolf/lego](https://github.com/xenolf/lego) and [ali-sdk/aliyun-cdn-sdk](https://github.com/ali-sdk/aliyun-cdn-sdk), thanks for their great works!

## Features

* Letsencrypt certificates only. It is free!
* Apply for certs automatically. Auto renew certs 10 days before it is expired.
* Support a lot of DNS providers such as dnspod、Route 53、vultr、digitalocean. [DNS Providers Full List](https://github.com/xenolf/lego/tree/master/providers/dns)

## Usage

```bash

$ docker pull daxingplay/letsencrypt-aliyun-cdn
$ docker start -e ACCESS_KEY_ID='ACCESS KEY for your aliyun account' \
  -e ACCESS_SECRET='ACCESS SECRET for your aliyun account' \
  -e DOMAINS='example.com,cdn1.example.com,cdn2.example.com' \
  -e EMAIL='admin@example.com' \
  -e DNS_TYPE='dnspod' \
  -e DNSPOD_API_KEY='xxx' \
  daxingplay/letsencrypt-aliyun-cdn

```

## Environment Viarables

* `ACCESS_KEY_ID`: ACCESS KEY for aliyun account, we suggest you to use ram account for minimum privileges.
* `ACCESS_SECRET`: ACCESS SECRET for aliyun account.
* `DOMAINS`: The domains need to apply for free certs. These domains must be using aliyun CDN services already. Multiple domains should be separeted by comma, and they must use the same DNS provider.
* `DNS_TYPE`: The DNS provider used by the domains above.
* According to the DNS provider you use, you need to set different environment viarables for proper API token:
  * dnspod:
    * `DNSPOD_API_KEY`: The format is `id,token`, eg: `1235,abcdefghigj`
  * digitalocean:
    * `DO_AUTH_TOKEN`：The API token you applied at DO admin console.  

## Links

- [CDN API docs](https://help.aliyun.com/document_detail/27148.html?spm=5176.doc27148.6.603.5Tehoi)
