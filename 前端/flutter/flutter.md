### 前言    
原生开发：   
1. 可访问平台的全部功能   
2. 速度快，性能高，可以实现复杂的动画及绘制，用户体验好
缺点：    
1. 平台特点，开发成本高
2. 内容固定，动态化弱，大多数情况下，功能更新需要发版      
跨平台：    
H5 + 原生 （微信小程序， Cordova， Ionic）      
js + 原生渲染（RN， weex， 快应用）
自绘ui + 原生 （QTMObile， flutter）
H5代码是运行在webview中的，而webview本质就是一个浏览器内核，所以js依然运行在一个盒子里面，对系统的功能大多数都是无法访问的。
对此，需要原生操作的都需要原生实现，并在代码中预先实现一些访问系统能力的api，然后暴露给webview供js调用
而消息的传递必须遵守一个标准的协议，其规定了消息的格式与含义。我们将这个依赖于webview的，用于js与原生之间通信并实现了某种传输协议的工具称为webview javascript bridge 简称 jsBridge，** 这是混合开发的核心 **。    
混合开发的优点是动态内容是h5，web技术栈，社区资源丰富。  缺点是性能不好，对于复杂的用户界面或动画，webview不堪重任

问题： js如何调用原生api
主要有两种：注入API 和 拦截URL SCHEME。
注入 API 方式的主要原理是，通过 WebView 提供的接口，向 JavaScript 的 Context（window）中注入对象或者方法，让 JavaScript 调用时，直接执行相应的 Native 代码逻辑，达到 JavaScript 调用 Native 的目的
URL SCHEME 是一种类似于url的链接，是为了方便app直接互相调用设计的，形式和普通的 url 近似，主要区别是 protocol 和 host 一般是自定义的。

例如:
qunarhy://hy/url?url=ymfe.tech，
protocol 是 qunarhy，host 则是 hy。
更加详细的例子：
对于Webview中发起的网络请求，Native都有能力去捕获/截取/干预。所以JSBridge的核心就是设计一套url方案，让Native可以识别，从而做出响应，执行对应的操作就完事。
例如，正常的网络请求可能是： https://img.alicdn.com/tps/TB17ghmIFXXXXXAXFXXXXXXXXXX.png
我们可以自定义协议，改成jsbridge://methodName?param1=value1&param2=value2。
Native拦截jsbridge开头的网络请求，做出对应的动作。
最常见的做法就是创建一个隐藏的iframe来实现通信。

拦截 URL SCHEME 的主要流程是：Web 端通过某种方式（例如 iframe.src）发送 URL Scheme 请求，之后 Native 拦截到请求并根据 URL SCHEME（包括所带的参数）进行相关操作。

在时间过程中，这种方式有一定的缺陷：

使用 iframe.src 发送 URL SCHEME 会有 url 长度的隐患。
有些方案为了规避 url 长度隐患的缺陷，在 iOS 上采用了使用 Ajax 发送同域请求的方式，并将参数放到 head 或 body 里。这样，虽然规避了 url 长度的隐患，但是 WKWebView 并不支持这样的方式。

为什么选择 iframe.src 不选择 locaiton.href ？
因为如果通过 location.href 连续调用 Native，很容易丢失一些调用。

创建请求，需要一定的耗时，比注入 API 的方式调用同样的功能，耗时会较长。
因此：JavaScript 调用 Native 推荐使用注入 API 的方式

问题： 为什么浏览器不做diff操作   如果做的话也不应该直接比较dom，应该比较vdom，所以会占用更多的内存，如果出现了dom操作会不可预期地影响diff结果， 因为浏览器的历史有太多的兼容，实现可能会出现奇怪的问题 


### 前置知识      
##### Dart     
1. 变量声明     
1.1 var： 变量一旦声明自动判别接受的赋值什么类型，之后不能改变       
1.2 dynamic和Object      
1.3 Object是Dart所有对象的根基类，所以，效果可以像js一样声明的类型之后可以赋值其他类型；     
dynamic 和 object不同的是，编译器会提供所有可能的组合，而Object声明的对象只能使用Object的属性与方法，否则编译器会报错，所以要特别注意使用该关键字，因为很容易引入运行时的错误     
final和const，如果从未打算改变一个变量，使用这两个关键字进行声明，区别在于，const变量是一个编译时常量，final变量则是在第一次使用时就被初始化     
问题：什么是编译时常量  编译时直接替换为常量值     
2. 函数     
2.1 Dart函数如果没有显示声明返回值的类型时，会默认当作dynamic处理，函数返回值没有类型推断。      
2.2 对于只包含一个表达式的函数，可以使用简写语法如： bool foo() => 1>2    
2.3 可选的位置参数，包装一组函数参数，用“[]”标记，如：String foo(String a, [String b]) {
    var res = '$a sss';
    if(b != null) {
        return '$res bbb $b'
    }
    return res
}
2.4 可选的命名参数，用{param1, param2} 可用于指定命名参数如：设置[a] 和 [b]标志 void foo({bool a, bool b})调用时可以指定命名参数foo(a: true)         
3. 异步支持      
3.1 dart类有很多返回future或者stream对象的函数。这些函数被称为异步函数       
futrue和promise非常像，future的所有api返回皆是future,所以可以像js一样链式调用future上的方法     
3.1.1 Future.then: 
```dart
使用Future.delayed创建一个延时任务，2秒后返回结果字符串，然后我们在then中接受打印
Future.delayed(new Duration(seconds: 2), () {
    return 'hi world!';
}).then((data) {
    print(data);
})
```
3.1.2 错误处理catchError(e), then里面的onError参数
```dart
Future.delayed(new Duration(seconds: 2), () {
    return '222'
}).then((data) {

}).catchError(e) {

}

Future.delayed(new Duration(seconds: 2), () {
    return '222'
}).then((data) {

}, onError(e) {
    print(e)
})
```
3.1.3 Futrue.whenComplete 类似 complete处理
3.1.4 Future.wait 类似 Promise.all 
```dart
Future.wait([
    Future.delayed(new Duration(seconds: 2), () {

    }),
    Future.delayed(new Duration(seconds: 4), () {

    })
]).then((res) {
    print(res[0] + res[1]);
})
```    
3.1.5 消除回调地狱    
```dart
1.利用Future
login('root', '12345').then((id) {
    return getNext(id);
}).then((info) {
    return getNext(info)
}).catchErro((e) {
    print(e)
});
每次返回一个Future，该Future会执行，结束后又会触发后面的then回调，这样就会依次向下，避免了层层嵌套
2.利用async/await
foo() async {
    try {
        String id = await login('root', '12345');
        String info = await getInfo(id);
        await ext(info)
    } catch (e) {
        print(e)
    }
}

async 用于表示函数是异步的， 定义的函数会返回一个Future对象，可以使用then方法添加回调函数
await 后面是一个Future， 表示等待该异步任务完成，异步任务完成之后才会继续往下运行
```

3.1.6 空安全（null-safety）    
Dart 中一切都是对象，这意味着如果我们定义一个数字，在初始化它之前如果我们使用了它，假如没有某种检查机制，则不会报错，比如：
```dart
test() {
  int i; 
  print(i*8);
}
在 Dart 引入空安全之前，上面代码在执行前不会报错，但会触发一个运行时错误，原因是 i 的值为 null 。但现在有了空安全，则定义变量时我们可以指定变量是可空还是不可空。
int i = 8; //默认为不可空，必须在定义时初始化。
int? j; // 定义为可空类型，对于可空变量，我们在使用前必须判空。

// 如果我们预期变量不能为空，但在定义时不能确定其初始值，则可以加上late关键字，
// 表示会稍后初始化，但是在正式使用它之前必须得保证初始化过了，否则会报错
late int k;
k=9;
如果一个变量我们定义为可空类型，在某些情况下即使我们给它赋值过了，但是预处理器仍然有可能识别不出，这时我们就要显式（通过在变量后面加一个”!“符号）告诉预处理器它已经不是null了，比如：
class Test{
  int? i;
  Function? fun;
  say(){
    if(i!=null) {
      print(i! * 8); //因为已经判过空，所以能走到这 i 必不为null，如果没有显式申明，则 IDE 会报错
    }
    if(fun!=null){
      fun!(); // 同上
    }
  }
}
上面中如果函数变量可空时，调用的时候可以用语法糖：
fun?.call() // fun 不为空时则会被调用
```

3.1.7 Stream     
Stream 也是用于接收异步事件数据，和 Future 不同的是，它可以接收多个异步操作的结果（成功或失败）。 也就是说，在执行异步任务时，可以通过多次触发成功或失败事件来传递结果数据或错误异常。 Stream 常用于会多次读取数据的异步任务场景，如网络内容下载、文件读写等。举个例子：
```dart
Stream.fromFutures([
  // 1秒后返回结果
  Future.delayed(Duration(seconds: 1), () {
    return "hello 1";
  }),
  // 抛出一个异常
  Future.delayed(Duration(seconds: 2),(){
    throw AssertionError("Error");
  }),
  // 3秒后返回结果
  Future.delayed(Duration(seconds: 3), () {
    return "hello 3";
  })
]).listen((data){
   print(data);
}, onError: (e){
   print(e.message);
},onDone: (){

});

上面的代码依次会输出：

hello 1
Error
hello 3
```

问题： 总结一下订阅者模式
观察者模式： 观察者（Observer）直接订阅（Subscribe）主题（Subject），而当主题被激活的时候，会触发（Fire Event）观察者里的事件。
布订阅模式： 订阅者（Subscriber）把自己想订阅的事件注册（Subscribe）到调度中心（Topic），当发布者（Publisher）发布该事件（Publish topic）到调度中心，也就是该事件触发时，由调度中心统一调度（Fire Event）订阅者注册到调度中心的处理代码。

例子：     
有一个冒险公会
但是是冒险者互相自己处理事务的，A和B之间会直接交流，这是观察者模式；
如果公会有一个前台，事务会交给前台，冒险者通过前台获取自己适合的任务信息等，这是订阅者模式


3.1.8 mixin    
Dart 是不支持多继承的，但是它支持 mixin，简单来讲 mixin 可以 “组合” 多个类，我们通过一个例子来理解。

定义一个 Person 类，实现吃饭、说话、走路和写代码功能，同时定义一个 Dog 类，实现吃饭、和走路功能：    
```dart
class Person {
  say() {
    print('say');
  }
}

mixin Eat {
  eat() {
    print('eat');
  }
}

mixin Walk {
  walk() {
    print('walk');
  }
}

mixin Code {
  code() {
    print('key');
  }
}

class Dog with Eat, Walk{}
class Man extends Person with Eat, Walk, Code{}

我们定义了几个 mixin，然后通过 with 关键字将它们组合成不同的类。有一点需要注意：如果多个mixin 中有同名方法，with 时，会默认使用最后面的 mixin 的，mixin 方法中可以通过 super 关键字调用之前 mixin 或类中的方法。
```