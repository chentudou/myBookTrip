import axios from 'axios'; //引入axios
/* import {Message} from "element-ui";
 */import router from '../router'


const frontUrl = '/api/transfer';
// 添加请求拦截器
axios.interceptors.request.use(function (sendParams) {
  // 在发送请求之前做些什么
  /* 请求时带上 sessionStorage信息  */
  if(JSON.stringify(sendParams.data)){
    sendParams.data.loginStatus=sessionStorage.loginStatus
  }else if(sendParams.method=='get'){
    //console.log('sendParams',sendParams);
    sendParams.params?sendParams.params.loginStatus=sessionStorage.loginStatus
                      :sendParams.params={'loginStatus':sessionStorage.loginStatus}
  }
 // console.log('在发送请求之前做些什么',sendParams)
  return sendParams;
}, function (error) {
  // 对请求错误做些什么
  //  console.log('对请求错误做些什么')
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  const res = response.data;
  //console.log(res);
  if(res.rescode){
    if (res.rescode == '200') {
      return Promise.resolve(res);
    } else if (res.rescode == '404') {
      router.push({
        path: '/404'
      });
    }else if (res.rescode == '0') {
      //console.log('1111111111');
      sessionStorage.loginStatus=0;
      router.push({
        path: '/'
      });
    }else if (res.rescode == '0' && res.rescode != "404" && res.rescode != "0") {
      /* Message({
        showClose: true,
        message: res.resDescription,
        type: "error"
      }); */
      return;
    } 
  }else{
    return res;
  }
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});




function get(url, params) {
  var httpInput = {
    params: params
  };
  return axios.get(frontUrl + url, httpInput);
}

function post(url, params) {
  return axios.post(frontUrl + url, params);
}

function request(method, url, params, contentType) {
  if (!url) {
    console.error('url不能为空');
    return
  }
  url = frontUrl + url;
  return axios({
    method,
    url,
    params,
    contentType
  });

};
export default {
  get,
  post,
  request
}