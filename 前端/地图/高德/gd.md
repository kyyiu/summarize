高德地图官网
https://lbs.amap.com/
1. 注册完成后进入控制台
2. 进入我的应用, 如下图
![图片](./img/%E6%B3%A8%E5%86%8C/j.jpg)
3. 创建新应用并添加
![图片](./img/%E6%B3%A8%E5%86%8C/2.jpg)
4. 然后就能得到key和安全密钥
5. 安装高德依赖包
```
相关文档: https://lbs.amap.com/api/javascript-api-v2/guide/abc/load
npm i @amap/amap-jsapi-loader --save 
```
# POI
是“Point of Interest”的缩写,可以翻译成“信息点”,每个POI包含四方面信息,名称、类别、经度纬度、附近的酒店饭店商铺等信息。我们可以叫它为“导航地图信息”,导航地图数据是整个导航产业的基石

# 遇到的问题

```
1. Invalid Object: LngLat(NaN, NaN)
解决方法1.
    原因可能是容器足够大小容纳地图
    设置好容器的样式尺寸即可解决
```