### markdown使用


# 一级标题
## 二级标题
```
	console.log()
```
> 引用
> 
* 1
* 2
+ 列表1
	+ xx
		1. a
		2. b
	+ xxx
	- xxx
		1. a
		2. b

[link](http://www.baidu.com)


# node
## what
	+ chrome V8 runtime
	+ 事件驱动
	+ 非阻塞的i/o
	
	网络请求，数据库处理 ，文件的读写等等是阻塞的
	优点：高并发特别好

## why
	1. 防止甩锅,明确交互错误问题在谁
	2. 能够写api
	3. 了解前后端的交互流程

## api 接口

### js运行环境
	+ 浏览器
		- 基本语法
 		- BOM
		- DOM
		- Ajax
		- 系统文件数据库（出于安全性不能，语言本身能做到）
	+ 服务器
		- 基本语法
		- 能操作数据库
		- 能操作本地文件
### nvm

## 配置npm源
	查看源使用 npm config list 或 npm confit get registry
	1. 临时使用 安装包拖过--registry参数即可
		npm install express --registry https://registry.npm.taobao.org
	2. 全局使用(推荐)
		npm config set registry https://registry.npm.taobao.org
	3. cnpm
		安装 cnpm
		npm install -g cnpm --registry=https://registry.npm.taobao.org
		使用cnpm安装包
		cnpm install express
		
### node 运行环境 REPL
	直接在命令行写代码
	
### 模块化
+ 内置模块
	+ 第三方模块
	+ 自定模块
	 - 创建一个模块（一个js文件一个模块）
     - 导出一个模块（module.exports=name）
	 - 引用一个模块并且调用


## CS与BS
###  Client/Server , PC客户端，服务器架构
+ 特点
	- 在服务器当中就主要是一个数据库，把所有的业务逻辑以及界面都交给用户端完成
+ 优点 
	+ 较为安全，用户界面丰富，用户体验好
+ 缺点
	+ 每次升级都要重新安装，针对于不同的操作系统开发，可移植性差	

---

### Browser/Server,浏览器，服务器架构
1. 特点
	1. 基于浏览器访问应用
	2. 把业务层交给服务器来完成，客户端仅仅做页面的渲染和数据的交换
2. 优点
	+ 只开发服务器端，可以跨平台，移植性很强
3. 缺点
	+ 安全性较低，用户体验较差


## Http协议
  1. 什么是http协议
	1. 所有的WWW文件都必须遵守这个标准
	2. 设计http最初目的是伪类提供一种发布和接收html页面的方法
	3. 约束请求与响应的规则
  2. http组成部分
	1. 请求
	2. 响应
	3. 二者成对
  3. 请求的发送发式
	1. 浏览器的地址栏
	2. html中的from表单
	3. a链接
	4. src属性
  4. http请求
	1. 请求行
	  1. 请求方式
	    1. POST
		2. GET
	  2. 请求资源
	  3. 协议版本
	2. 请求头
	  1. 请求头是客户端发给服务器端的一些信息 
	  2. 使用键值对
	  3. 自动把客户端的信息发送给服务器
	3. 请求体
	  1. post时，请求体会有请求的参数
	  2. get时，请求参数不会出现在请求体中，会拼接在url地址后面
  5. http响应
	1. 响应行
	  1. http协议
	  2. 状态码
		1. 200：请求成功
		2. 302：请求重定向
		3. 304：请求资源没用改变，访问本地缓存
		4. 404：请求资源不存在，通常用户路径错误，也可能服务器资源已经删除
		5. 500：服务器内部错误，通常程序抛出异常
	  3. 其他
	2. 响应头
	  1. 服务器端将信息以键值对返回客户端
	  2. 请求头
	  3. 自动把服务器端的信息传给客户端
	3. 响应体
	  1. 响应体是把服务器回写给客户端页面的正文
	  2. 浏览器将正文加载到内存
	  3. 然后解析渲染显示页面内容
  6. http请求方式
    1. 8种请求类型
	 1. OPTIONS: 返回服务器针对特点资源所支持的http请求方法，也可以利用web服务器发送*的请求来测试服务器的功能性
	 2. HEAD： 请求指定的页面信息，并返回头部信息
	 3. GET： 请求指定的页面信息，并返回实体主体
	 4. POST： 想指定资源提交数据进行处理请求
	 5. PUT：想指定资源位置上传其最新内容
	 6. DELETE：请求服务器删除Request-URL所标识的资源
	 7. TRACE： 回显服务器收到的请求，主要用于测试或诊断
	 8. CONNECT： HTTP/1.1协议中预留给能够将链接改为管道方式的代理服务器
	2.常见两种
	 1. GET
	  1. GET方法向页面请求发送参数
	  2. 地址和参数信息中间用？字符分隔
	  3. 查询字符串会显示在地址栏的url中，不安全，不要用get提交敏感数据
	  4. 有大小限制，请求字符串中最多只能有1024个字符
	  5. 能够被缓存
	  6. 会保存在浏览器的浏览记录中
	  7. 可以添加书签
	  8. 编码类型为application/x-www-form-urlencoded
	  9. 只允许ASCII字符类型，不能用二进制流
	  10. 点击刷新时，不会有反应
	  11. GET请求主要用以获取数据
	 2. POST
	  1. POST方法向页面请求发送参数
	  2. 使用post方法时，查询字符串在post信息中单独存在，和http请求一起发送到服务器
	  3. 编码类型为 application/x-www-form-urlencoded or multipart/form-data，请为二进制数据使用multipart编码
	  4. 没用历史记录
	  5. 参数类型没有限制，可以是字符串也可以是二进制流
	  6. 数据不会显示在地址栏中，也不会被缓存或保存在浏览记录中，所以post请求比较安全，如需要传送敏感数据，使用加密方式传输
	  7. 查询字符串不会显示在地址栏中
	  8. 传输数据量大，可以达到2M，而get受到URL长度限制只能1024子节
	  9. post就是为了将数据传送到服务器端，get就是伪类从服务器端取得数据

## 进程和线程
  1. 进程
    1. 系统进行资源分配和调度的基本单位，是操作系统结构的基础，相当于工厂的车间
	2. 进程为程序的运行提供必备的环境
  2. 线程
	1. 计算机中的最小计算单位，否则执行进程中的程序，相当于车间工人
	2. 单线程
	  1. js是单线程
	  2. 时间片分割
	3. 多线程，根据任务决定开启几条线程
	4. node服务器
	  1. 单线程，但是很健壮，后台拥有一个io线程池进行调度
	  2. 分布式服务器部署


### node开发需要模块化
  1. ES6之前，ES存在以下问题
    1. 没有模块系统
	2. 官方标准库少/标准接口少
	3. 缺乏管理系统
  2. 模块化
    1. 如果程序设计的规模达到了一定程度，则必须模块化
	  1. 前端没多大必要
	  2. 服务器端开发，没有模块化开发思想就玩不转了
	2. 模块化可以有多种形式，但都提供了能够将代码分割为多个源文件的机制，Common。js
  3. CommonJS规范
    1. 主要是伪类弥补JS没有模块化标准的缺陷
	2. 对模块化的定义
	  1. 模块引用 require('路径')
	  2. 模块定义
	  3. 模块标识
  4. 总结
    1. 从文件角度看，每个js文件就是一个模块，从结构看，多个js文件之间可以相互require共同实现一个功能，整体上也是一个模块
	2. 在node。js中一个模块中定义的变量，函数等，都只能在者文件内部有效，当需要从此文件外部引用这些变量需要exports暴露，使用者reqire引用

### 数据库
  1. 分类
    1. RDBMS(关系型数据库)
	  1. 通过一张表来建立联系
	  2. 基本使用sql语言管理（structure query language）
    2. NoSQL(非关系数据库)
	  1. not only sql
	    1. 没有行，列概念，用json来存储数据，集合相当于表，文档就相当于行
		2. 标准化和非标准化的摩擦，非标准化不能统一，标准化限制创新
	  2. 特征
	    1. 键值存储数据库
		2. 列存储数据库
		3. 文档 型数据库
		4. 图形数据库（Graph）
	  3. MongoDB,CouchDB,HBase,Redis


### mongoose
  * node处理mongodb的模块

### express
  * express.js框架是目前最流行的node.js后端框架之一，相当于jq与js的关系
  * 它只是在node.js进行扩展web应用所需的基本功能
  * 类似的后端框架 koa.js egg.js hapi.js

### socket.io
  * 是什么
    1. 它将websocket和轮询（poling）机制以及其他的实时通信方式封装成了通用的接口，并且在服务器端实现了这些实时机制的响应代码
	2. H5的新技术websocket仅仅是socket。io实现实时通信的一个子集
	3. 安装 npm i socket.io -save
	4. let socketPackage = require('socket.io')
	5. let io = socketPackage(server) 针对http server 生成socket.IO实际对象
	6. 使用socket.IO的时候需要生成一个实例对象，生成这个实例对象的依赖原生node，已经建立好的httpserver对象



### 中间件
  关于 express中间件的问题
  express 中间件 （Middleware）
  中间件是一个函数,函数中参数有三个：
  
  request 请求
  response 响应
  next 请求和响应中间的循环流程
  Next的作用
  我们在定义express中间件函数的时候都会将第三个参数定义为next，
  next函数主要负责将控制权交给下一个中间件，
  如果当前中间件没有终结请求，并且next没有被调用那么请求将被挂起，后边定义的中间件将得不到被执行的机会。
  定义路由中间件的时候函数的第三个参数next和我们定义非路由中间件的函数的第三个参数next不是同一个next
  
  注意：app.use注册的中间件，如果path参数为空，则默认为"/"，而path为"/"的中间件默认匹配所有的请求。
  
  中间件有三种类型
  应用级中间件
	将应用级别的中间件绑定到Express实例--app上，使用app.use()和app.METHOD（此METHOD指get、post等方法）
	tips: 从一个路由到另一个路由（另一个路由使用app.METHOD定义的），使用next('route')
	
	app.get('/user/:id', function (req, res, next) {
	  // if the user ID is 0, skip to the next route
	  if (req.params.id === '0') next('route')
	  // otherwise pass the control to the next middleware function in this stack
	  else next()
	}, function (req, res, next) {
	  // send a regular response
	  res.send('regular')
	})
	
	// handler for the /user/:id path, which sends a special response
	app.get('/user/:id', function (req, res, next) {
	  res.send('special')
	})
 
  路由中间件
	同应用级别的中间件用法相同，不同之处的是它是绑定在router实例（express.Router()）上的
	tips: 同样也可以使用next('route') 从一个路由到另一个路由（另一个路由使用router.METHOD定义的）
	
  错误处理中间件
  与其他中间件函数的定义基本相同，不同之处在于错误处理函数多了一个变量：err，即它有4个变量：err, req, res, next
  
  app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });
  tips: next() 传入的参数除了字符串'route'外，其他参数会认为出错，交由错误处理函数处理。若未显式定义错误处理函数，则函数集的末尾有express隐式包含的默认错误处理程序。
  
  
  前端的请求方式有几种？
  
  get
  post
  put
  delete
  head
  all
  以上的请求方式统称为： restful api
  
  restful是一个规则，这个规则规定了数据接口的使用原则
  
  举例：
  http:localhost:300/shopcar/add
  http:localhost:300/shopcar/delete
  http://localhost:300/shopcar
  
  想： 如果能有一个接口来表示不同的请求功能，那会怎么样呢？
  
  解决： restful api 这个规则
  http://localhost:300/shopcar
  
  get
  post
  put
  delete

  Express路由分组机制
  
  Express的路由内部实现比较复杂，这里只挑跟题目有关的讲。
  
  
  
  Express中，路由是以组的形式添加的。什么意思呢，可以看下面伪代码
  
  
  
  app.get('/user/:id', fn1, fn2, fn3);
  
  app.get('/user/:id', fn4, fn5, fn6);
  
  在内部，Express把上面添加的路由，分成了两个组。继续看伪代码，可以看到，路由在内部被分成了两个组。
  
  
  
  var stack = [
  
    {path: '/user/:id', fns: [fn1, fn2, fn3], // 路由组1
  
    {path: '/user/:id', fns: [fn4, fn5, fn5] // 路由组2
  
  ];
  
  路由匹配就是个遍历的过程，略。
  
  
  
  next('route')是干嘛的
  
  答案：跳过当前路由分组中，剩余的handler（中间件）
  
  
  
  如果没有next('route')，一路next()调用下去的话，调用顺序是这样的：
  
  
  
  fn1 -> fn2 -> fn3 -> fn4 -> fn5 -> fn6
  
  假设某些情况下，在执行了fn1后，想要跳过fn2、fn3，怎么办？（比如楼主举的例子）
  
  
  
  答案就是在fn1里调用next('route')。
  
  
  
  然后就变成了
  
  
  
  fn1 -> fn4 -> fn5 -> fn6