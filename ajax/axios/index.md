###  axios方法
axios.request(config)
axios.get(url[, config])
axios.delete(url[, config])
axios.head(url[, config])
axios.post(url[, data[, config]])
axios.put(url[, data[, config]])
axios.patch(url[, data[, config]])

### 不同的方法的键名
get 传入的data要是
{
  params: {

  }
}这种形式
其他是
{
  data: {

  }
}
形式

### 拦截器
```javascript
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 这里config会合并上面axios方法传入的data
    // 所以这里的config是{...config, ...data}
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });
```