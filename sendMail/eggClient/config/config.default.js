'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1542248452753_4882';

  // add your config here
  config.middleware = [];
  
  // 关闭默认的安全校验
  config.security = {
    csrf: false,
    // domainWhiteList: [ 'http://localhost:8080' ]
  };

  // 跨域请求配置
  config.cors = {
    origin: '*', // 星号代表允许所有的请求源
    // allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
    allowMethods: 'GET,POST', // 允许的请求方式
    credentials: true,
  };

  // 允许上传文件类型
  config.multipart = {
    // 设置支持的上传文件类型
    whitelist: [ '.apk', '.pptx', '.doc', '.docx', '.xlsx', '.csv', '.doc', '.ppt', '.pdf', '.pages', '.wav', '.mov', '.txt', '.png', '.jpg', '.img' ],
    // 设置最大可以上传300M
    fileSize: '300mb',
    // 表单提交最大参数个数
    fields: '100',
  };

  return config;
};
