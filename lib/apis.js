'use strict';

/**
 * 配置 sdk 配置的方法。 https://help.aliyun.com/document_detail/27148.html?spm=5176.doc27148.6.603.5Tehoi
 */
module.exports = [
  {
    action: 'DescribeDomainBpsData',  // 查询网络带宽
    method: 'GET',
    params: [
      {
        name: 'DomainName',            // 支持数组, 逗号分隔
        required: true,
      },
      {
        name: 'StartTime',
        required: true,
      },
      {
        name: 'EndTime',
        required: true,
      },
    ],
  },
  {
    action: 'DescribeDomainFlowData',     // 查询流量数据
    method: 'GET',
    params: [
      {
        name: 'DomainName',
        required: true,
      },
      {
        name: 'StartTime',
        required: true,
      },
      {
        name: 'EndTime',
        required: true,
      },
    ],
  },
  {
    action: 'DescribeDomainSrcBpsData',     // 查询回源带宽
    method: 'GET',
    params: [
      {
        name: 'DomainName',
        required: true,
      },
      {
        name: 'StartTime',
        required: true,
      },
      {
        name: 'EndTime',
        required: true,
      },
    ],
  },
  {
    action: 'DescribeDomainSrcFlowData',     // 查询回源流量
    method: 'GET',
    params: [
      {
        name: 'DomainName',
        required: true,
      },
      {
        name: 'StartTime',
        required: true,
      },
      {
        name: 'EndTime',
        required: true,
      },
    ],
  },
  {
    action: 'DescribeDomainHitRateData',     // 查询字节缓存命中率
    method: 'GET',
    params: [
      {
        name: 'DomainName',
        required: true,
      },
      {
        name: 'StartTime',
        required: true,
      },
      {
        name: 'EndTime',
        required: true,
      },
    ],
  },
  {
    action: 'DescribeDomainReqHitRateData',     // 查询字节请求缓存命中率
    method: 'GET',
    params: [
      {
        name: 'DomainName',
        required: true,
      },
      {
        name: 'StartTime',
        required: true,
      },
      {
        name: 'EndTime',
        required: true,
      },
    ],
  },


  {
    action: 'DescribeDomainQpsData',     // 查询访问QPS
    method: 'GET',
    params: [
      {
        name: 'DomainName',
        required: true,
      },
      {
        name: 'StartTime',
        required: true,
      },
      {
        name: 'EndTime',
        required: true,
      },
    ],
  },
  {
    action: 'DescribeDomainHttpCodeData',     // 查询返回码
    method: 'GET',
    params: [
      {
        name: 'DomainName',
        required: true,
      },
      {
        name: 'StartTime',
        required: true,
      },
      {
        name: 'EndTime',
        required: true,
      },
    ],
  },
  {
    action: 'DescribeDomainPvData',     // 查询PV数据
    method: 'GET',
    params: [
      {
        name: 'DomainName',
        required: true,
      },
      {
        name: 'StartTime',
        required: true,
      },
      {
        name: 'EndTime',
        required: true,
      },
    ],
  },
  {
    action: 'DescribeDomainTopUrlVisit',     // top url
    method: 'GET',
    params: [
      {
        name: 'DomainName',
        required: true,
      },
      {
        name: 'StartTime',
      },
    ],
  },
  {
    action: 'RefreshObjectCaches',     // 刷新
    method: 'GET',
    params: [
      {
        name: 'ObjectPath',
        required: true,
      },
      {
        name: 'ObjectType',
      },
    ],
  },
  {
    action: 'DescribeRefreshTasks',     // 查询刷新预热状态
    method: 'GET',
    params: [
      {
        name: 'TaskId',
      },
      {
        name: 'ObjectPath',
      },
      {
        name: 'PageSize',
      },
      {
        name: 'PageNumber',
      },
    ],
  },
  {
    action: 'DescribeCdnDomainLogs',  // https://help.aliyun.com/document_detail/27224.html?spm=5176.doc27155.6.702.NHsuzU
    method: 'GET',
    params: [
      {
        name: 'DomainName',
      },
      {
        name: 'LogDay',
      },
      {
        name: 'PageSize',
      },
      {
        name: 'PageNumber',
      }
    ],
  },
  {
    action: 'DescribeCdnDomainDetail',  // https://help.aliyun.com/document_detail/27163.html
    method: 'GET',
    params: [
      {
        name: 'DomainName',
        required: true,
      },
    ],
  },
  {
    action: 'SetDomainServerCertificate', // https://help.aliyun.com/document_detail/45014.html
    method: 'GET',
    params: [
      {
        name: 'DomainName',
        required: true,
      },
      {
        name: 'CertName',
        required: true,
      },
      {
        name: 'ServerCertificateStatus',
        required: true,
      },
      {
        name: 'ServerCertificate',
      },
      {
        name: 'PrivateKey',
      },
    ],
  },
];
