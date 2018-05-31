/**
 * Created by Administrator on 2017/11/13.
 */
const host = '114.112.69.204';
const port = 8085;
module.exports.QUERY= {           // 声明服务名为MAPAPI
    // 请求协议与数据格式配置
    protocol: 'http',              // 使用http协议请求
    pack: 'querystring',           // 数据封装为query
    unpack: 'json',                // 约定服务端返回JSON数据
    encoding: 'utf-8',             // 服务器返回utf-8编码
    // 负载均衡与超时重试配置
    balance: 'roundrobin',         // 负载均衡策略
    timeout: 3000,                  // 请求最长超时时间500ms
    retry: 1,                      // 请求重试次数
    // HTTP协议特有配置
    method: 'GET',                 // 使用GET请求
    headers: {                     // 服务的全局headers
        'x-client': 'ral'
    },
    // 后端地址配置
    server: [                      // 可以配置多个后端地址
        {
            host: host,
            port: port
        }
    ]
};

module.exports.BODY= {           // 声明服务名为MAPAPI
    // 请求协议与数据格式配置
    protocol: 'http',              // 使用http协议请求
    pack: 'form',                   // 数据封装为query
    unpack: 'json',                // 约定服务端返回JSON数据
    encoding: 'utf-8',             // 服务器返回utf-8编码
    balance: 'random',         // 负载均衡策略
    timeout: 3000,                  // 请求最长超时时间500ms
    retry: 1,                      // 请求重试次数
    // HTTP协议特有配置
    method: 'POST',                 // 使用POST请求
    // 后端地址配置
    server: [                      // 可以配置多个后端地址
        {
            host: host,
            port: port
        }
    ]
};

/* 图片上传 */
module.exports.IMG_UPLOAD = {
    https: false,
    protocol: 'http',
    method: 'POST',
    //encoding: 'utf-8',
    pack: 'formdata',
    unpack: 'string',
    retry: 1,
    balance: 'random',
    timeout: 10000,
    server: [{
        host: host,
        port: port
    }]
};

