# <center>HTTP/1.1</center>
---   
### 请求方法
1. **GET** - 查  
    GET ：获取资源   
    GET 方法用来请求访问已被 URI 识别的资源。指定的资源经服务器端解析后返回响应内容。
2. **POST** - 增  
    POST：传输实体主体  
    虽然用 GET 方法也可以传输实体的主体，但一般不用 GET 方法进行传输，而是用 POST 方法。虽说 POST 的功能与GET 很相似，但 POST 的主要目的并不是获取响应的主体内容。
3. **PUT** - 改  
    PUT：传输文件  
    PUT 方法用来传输文件。就像 FTP 协议的文件上传一样，要求在请求报文的主体中包含文件内容，然后保存到请求URI 指定的位置。
    但是，鉴于 HTTP/1.1 的 PUT 方法自身不带验证机制，任何人都可以上传文件 , 存在安全性问题，因此一般的 Web 网站不使用该方法。若配合 Web 应用程序的验证机制，或架构设计采用 REST（Representational State Transfer，表征状态转移）标准的同类 Web 网站，就可能会开放使用 PUT 方法。
4. **DELETE** - 删  
    DELETE：除文件  
    DELETE 方法用来删除文件，是与 PUT 相反的方法。DELETE 方法按请求 URI 删除指定的资源。  
    但是，HTTP/1.1 的 DELETE 方法本身和 PUT 方法一样不带验证机制，所以一般的Web 网站也不使用 DELETE 方法。当配合 Web 应用程序的验证机制，或遵守 REST 标准时还是有可能会开放使用的。

5. **HEAD**  
    HEAD：获得报文首部  
    HEAD 方法和 GET 方法一样，只是不返回报文主体部分。用于确认 URI 的有效性及资源  更新的日期时间等。  
    ```javascript
    HEAD /index.html HTTP/1.1  
    Host: www.hackr.jp  
    返回index.html有关的响应
    ```

6. **OPTIONS**  
    OPTIONS：询问支持的方法  
    OPTIONS 方法用来查询针对请求 URI 指定的资源支持的方法。  
    ```javascript
    OPTIONS * HTTP/1.1  
    Host: www.hackr.j  
    Allow: GET, POST, HEAD, OPTIONS（返回服务器支持的方法）
    ```

7. **TRACE**  
    TRACE：追踪路径  
    TRACE 方法是让 Web 服务器端将之前的请求通信返回给客户端的方法。  
    发送请求时，在 Max-Forwards 首部字段中填入数值，每经过一个服务器端就将该数字减 1，当数值刚好减到 0 时，就停止继续传输，最后接收到请求的服务器端则返回状态码 200 OK 的响应。  
    客户端通过 TRACE 方法可以查询发送出去的请求是怎样被加工修改 / 篡改的。这是因为，请求想要连接到源目标服务器可能会通过代理中转，TRACE 方法就是用来确认连接过程中发生的一系列操作。  
    但是，TRACE 方法本来就不怎么常用，再加上它容易引发 XST（Cross-Site Tracing，跨站追踪）攻击，通常就更不会用到了。
    可以用来查找服务器哪一个环节出问题  
    客户端发送一个请求的时候，这个请求可能会穿过防火墙、代理、网关和一些其它应用程序，每个中间节点都可能修改HTTP请求，TRACE方法允许客户端在最终请求发往服务器的时候，看看它变成了什么样子。TRACE请求会在目的服务器端发送一个“闭环”诊断，形成最后一站服务器会弹回一条TRACE响应。

8. **CONNECT**  
    CONNECT：要求用隧道协议连接代   
    CONNECT这个方法的作用就是把服务器作为跳板，让服务器代替用户去访问其它网页，之后把数据原原本本的返回给用户。这样用户就可以访问到一些只有服务器上才能访问到的网站了，这就是HTTP代理。  
    ```javascript
    CONNECT www.bb.com HTTP/1.1    
    Host: www.hackr.j   
    通过www.hackr.j 访问 www.bb.com
    ``` 


### 持久连接节省通信量  

在 HTTP/1.0 中，一个 http 请求收到服务器响应后，会断开对应的 TCP 连接。  

这样每次请求，都需要重新建立 TCP 连接，这样一直重复建立和断开的过程，比较耗时。  

所以为了充分利用 TCP 连接，可以设置头字段 Connection: keep-alive，这样 http 请求完成后，就不会断开当前的 TCP 连接，后续的 http 请求可以使用当前 TCP 连接进行通信。   

HTTP/1.1 将 Connection 写入了标准，默认值为 keep-alive。除非强制设置为 Connection: close，才会在请求后断开 TCP 连接。  

以当年的通信情况来说，因为都是些容量很小的文本传输，所以即使这样也没有多大问题。可随着 HTTP 的普及，文档中包含大量图片的情况多了起来。   

比如，使用浏览器浏览一个包含多张图片的 HTML 页面时，在发送请求访问 HTML 页面资源的同时，也会请求该 HTML 页面里包含的其他资源。因此，每次的请求都会造成无谓的 TCP 连接建立和断开，增加通信量的开销。

### 管线化（pipelining）  

持久连接使得多数请求以管线化（pipelining）方式发送成为可能。  

从前发送请求后需等待并收到响应，才能发送下一个请求。管线化技术出现后，不用等待响应亦可直接发送下一个请求。   

这样就能够做到同时并行发送多个请求，而不需要一个接一个地等待响应了。   

页面资源请求时，浏览器会同时和服务器建立多个TCP连接，在同一个TCP连接上顺序处理多个HTTP请求。所以浏览器的并发性就体现在可以建立多个TCP连接，来支持多个http同时请求。  

Chrome浏览器最多允许对同一个域名Host建立6个TCP连接，不同的浏览器有所区别。

但是由于在同一个tcp上如果通过pipeling发送请求，可能出现上一个请求时间长，造成阻塞--线头阻塞，所以很多浏览器还是默认不使用这个功能

1 如果tcp连接保持长连接，Connection:keep-alive && http(s) 1.1 只要在tcp连接（默认两小时）不断开，可以一直串行发送数量无上限；

2 如果tcp连接不保持长连接，Connection:close 只能发一次请求；

3 如果http2 ,采用多路复用技术Multiplexing，一个tcp可以并发多个http请求，同样也是无上限；

4 如果和服务器建立多个tcp连接（chrome 浏览器一个host默认tcp连接并发数6，这个限制是有原因的，Ipv4地址稀有资源，涉及到NAT转换，内网外网的端口映射详见  
[【NAT】一个公网出口NAT服务设备最多可同时支持多少内网IP并发访问外网服务？](https://blog.csdn.net/qfzhangwei/article/details/90614129)


###  请求首部字段    

请求首部字段是从客户端往服务器端发送请求报文中所使用的字段，用于补充请求的附加信息、客户端信息、对响应内容相关的优先级等内容。   

```javascript
AcceptAccept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8 
```  

Accept 首部字段可通知服务器，用户代理能够处理的媒体类型及媒体类型的相对优先级。可使用 type/subtype 这种形式，一次指定多种媒体类型。
下面我们试举几个媒体类型的例子。    
文本文件   
```javascript
text/html, text/plain, text/css ...
application/xhtml+xml, application/xml ...
```
图片文件    
```javascript
image/jpeg, image/gif, image/png ...
```
视频文件   
```javascritp
video/mpeg, video/quicktime ...
```
应用程序使用的二进制文件   
```javascript
application/octet-stream, application/zip ...
```    
比如，如果浏览器不支持 PNG 图片的显示，那 Accept 就不指定 image/png，而指定可处理的 image/gif 和image/jpeg 等图片类型。    
若想要给显示的媒体类型增加优先级，则使用 q= 来额外表示权重值 1
，用分号（;）进行分隔。权重值 q 的范围是0~1（可精确到小数点后 3 位），且 1 为最大值。不指定权重 q 值时，默认权重为 q=1.0。
当服务器提供多种内容时，将会首先返回权重值最高的媒体类型。   


1. Accept-Charset   
```javascript
Accept-Charset: iso-8859-5, unicode-1-1;q=0.8
```    
Accept-Charset 首部字段可用来通知服务器用户代理支持的字符集及字符集的相对优先顺序。另外，可一次性指定多种字符集。与首部字段 Accept 相同的是可用权重 q 值来表示相对优先级。    
该首部字段应用于内容协商机制的服务器驱动协商。   

2. Accept-Encoding   
```javascript
Accept-Encoding: gzip, deflate
```    
Accept-Encoding 首部字段用来告知服务器用户代理支持的内容编码及内容编码的优先级顺序。可一次性指定多种内容编码。    
下面试举出几个内容编码的例子。    
gzip    
由文件压缩程序 gzip（GNU zip）生成的编码格式（RFC1952），采用 Lempel-Ziv 算法（LZ77）及 32 位循环冗余校验（Cyclic Redundancy Check，通称 CRC）。    
compress    
由 UNIX 文件压缩程序 compress 生成的编码格式，采用 Lempel-Ziv-Welch 算法（LZW）。    
deflate     
组合使用 zlib 格式（RFC1950）及由 deflate 压缩算法（RFC1951）生成的编码格式。    
identity    
不执行压缩或不会变化的默认编码格式    
采用权重 q 值来表示相对优先级，这点与首部字段 Accept 相同。另外，也可使用星号（*）作为通配符，指定任意的编码格式。     


3. Accept-Language
```javascript
Accept-Language: zh-cn,zh;q=0.7,en-us,en;q=0.3
```    
首部字段 Accept-Language 用来告知服务器用户代理能够处理的自然语言集（指中文或英文等），以及自然语言集的相对优先级。可一次指定多种自然语言集。    
和 Accept 首部字段一样，按权重值 q 来表示相对优先级。在上述图例中，客户端在服务器有中文版资源的情况下，会请求其返回中文版对应的响应，没有中文版时，则请求返回英文版响应。
   

4. Authorization    
```javascript
Authorization: Basic dWVub3NlbjpwYXNzd29yZA==
```   
首部字段 Authorization 是用来告知服务器，用户代理的认证信息（证书值）。通常，想要通过服务器认证的用户代理会在接收到返回的 401 状态码响应后，把首部字段 Authorization 加入请求中。共用缓存在接收到含有 Authorization 首部字段的请求时的操作处理会略有差异。     

5. Referer    
```javascript
Referer: http://www.hackr.jp/index.htm
```    
首部字段 Referer 会告知服务器请求的原始资源的 URI。     
客户端一般都会发送 Referer 首部字段给服务器。但当直接在浏览器的地址栏输入 URI，或出于安全性的考虑时，也可以不发送该首部字段。   
因为原始资源的 URI 中的查询字符串可能含有 ID 和密码等保密信息，要是写进 Referer 转发给其他服务器，则有可能导致保密信息的泄露。    


### 实体首部字段     
实体首部字段是包含在请求报文和响应报文中的实体部分所使用的首部，用于补充内容的更新时间等与实体相关的信息。    
1. Content-Type    

