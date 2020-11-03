# letsencrypt-aliyun-cdn

[![Docker Automated buil](https://img.shields.io/docker/automated/daxingplay/letsencrypt-aliyun-cdn.svg)](https://hub.docker.com/r/daxingplay/letsencrypt-aliyun-cdn/) [![Docker Stars](https://img.shields.io/docker/stars/daxingplay/letsencrypt-aliyun-cdn.svg)](https://hub.docker.com/r/daxingplay/letsencrypt-aliyun-cdn/) [![Docker Pulls](https://img.shields.io/docker/pulls/daxingplay/letsencrypt-aliyun-cdn.svg)](https://hub.docker.com/r/daxingplay/letsencrypt-aliyun-cdn/) [![](https://badge.imagelayers.io/daxingplay/letsencrypt-aliyun-cdn:latest.svg)](https://imagelayers.io/?images=daxingplay/letsencrypt-aliyun-cdn:latest 'Get your own badge on imagelayers.io') [![](https://images.microbadger.com/badges/image/daxingplay/letsencrypt-aliyun-cdn.svg)](https://microbadger.com/images/daxingplay/letsencrypt-aliyun-cdn "Get your own image badge on microbadger.com") [![](https://images.microbadger.com/badges/version/daxingplay/letsencrypt-aliyun-cdn.svg)](https://microbadger.com/images/daxingplay/letsencrypt-aliyun-cdn "Get your own version badge on microbadger.com")

自动为您在阿里云CDN上的域名申请 letsencrypt 的免费证书，并自动帮您完成配置

## 特点

* 只支持 letsencrypt 证书申请
* 自动申请、如果已经申请了，自动再过期前10天进行续约
* 支持 dnspod、Route 53、vultr、digitalocean 等 DNS 服务商，列表详见：[DNS Providers](https://github.com/xenolf/lego/tree/master/providers/dns)

## 使用方法

```bash

$ docker pull daxingplay/letsencrypt-aliyun-cdn
$ docker run -e ACCESS_KEY_ID='阿里云的 ACCESS KEY' \
  -e ACCESS_SECRET='阿里云的 ACCESS SECRET' \
  -e DOMAINS='example.com,cdn1.example.com,cdn2.example.com' \
  -e EMAIL='admin@example.com' \
  -e DNS_TYPE='dnspod' \
  -e DNSPOD_API_KEY='xxx' \
  daxingplay/letsencrypt-aliyun-cdn

```

对应 AccessKey 和 AccessSecret 需要有以下权限：

```json
{
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "cdn:DescribeCdnCertificateDetail",
                "cdn:SetDomainServerCertificate",
                "cdn:DescribeDomainCertificateInfo"
            ],
            "Resource": "*"
        }
    ],
    "Version": "1"
}
```

## 环境变量说明

* `ACCESS_KEY_ID`：阿里云的 ACCESS KEY，建议使用最小权限
* `ACCESS_SECRET`：阿里云的 ACCESS SECRET，建议使用最小权限
* `DOMAINS`：需要申请证书的域名列表，这些域名也必须是正在使用阿里云CDN服务的，多个域名列表以英文逗号分隔，这些域名必须使用同一个 DNS 服务商
* `DNS_TYPE`：上述域名所使用的 DNS 服务商
* 根据 DNS 服务商的不同，需要配置额外的环境变量：
  * dnspod：
    * `DNSPOD_API_KEY`：格式为 `id` + 英文逗号 + `token`，比如 `1235,abcdefghigj`
  * digitalocean:
    * `DO_AUTH_TOKEN`：DO 申请的 API TOKEN  

## FAQ

### 使用 dnspod 的时候无法生成证书

在错误日志里可以看到类似这种错误：Post "https://dnsapi.cn/Domain.List": context deadline exceeded (Client.Timeout exceeded while awaiting headers)

一般是因为请求 dnspod API 超时导致的，可以尝试设置环境变量 `DNSPOD_HTTP_TIMEOUT` 为一个较大的值（比如 15、20 等）来规避这个问题。

## 链接

- [CDN 接口文档](https://help.aliyun.com/document_detail/27148.html?spm=5176.doc27148.6.603.5Tehoi)
