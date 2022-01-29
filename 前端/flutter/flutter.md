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


#### 生命周期     
1. initState (类似es的constructor)    
> 当 widget 第一次插入到 widget 树时会被调用，对于每一个State对象，Flutter 框架只会调用一次该回调，所以，通常在该回调中做一些一次性的操作，如状态初始化、订阅子树的事件通知等。不能在该回调中调用BuildContext.dependOnInheritedWidgetOfExactType（该方法用于在 widget 树上获取离当前 widget 最近的一个父级InheritedWidget，关于InheritedWidget我们将在后面章节介绍），原因是在初始化完成后， widget 树中的InheritFrom widget也可能会发生变化，所以正确的做法应该在在build（）方法或didChangeDependencies()中调用它。       

2. didChangeDependencies()      
> 当State对象的依赖发生变化时会被调用；例如：在之前build() 中包含了一个InheritedWidget，然后在之后的build() 中Inherited widget发生了变化，那么此时InheritedWidget的子 widget 的didChangeDependencies()回调都会被调用。典型的场景是当系统语言 Locale 或应用主题改变时，Flutter 框架会通知 widget 调用此回调。需要注意，组件第一次被创建后挂载的时候（包括重创建）对应的didChangeDependencies也会被调用。       

3. build() (类似react的render)      
> 主要是用于构建 widget 子树的，会在如下场景被调用：      
在调用initState()之后。     
在调用didUpdateWidget()之后。     
在调用setState()之后。     
在调用didChangeDependencies()之后。    
在State对象从树中一个位置移除后（会调用deactivate）又重新插入到树的其它位置之后。     

4. reassemble()      
> 专门为了开发调试而提供的，在热重载(hot reload)时会被调用，此回调在Release模式下永远不会被调用。         

5. didUpdateWidget ()      
> 在 widget 重新构建时，Flutter 框架会调用widget.canUpdate来检测 widget 树中同一位置的新旧节点，然后决定是否需要更新，如果widget.canUpdate返回true则会调用此回调。正如之前所述，widget.canUpdate会在新旧 widget 的 key 和 runtimeType 同时相等时会返回true，也就是说在在新旧 widget 的key和runtimeType同时相等时didUpdateWidget()就会被调用。

6. deactivate()      
> 当 State 对象从树中被移除时，会调用此回调。在一些场景下，Flutter 框架会将 State 对象重新插到树中，如包含此 State 对象的子树在树的一个位置移动到另一个位置时（可以通过GlobalKey 来实现）。如果移除后没有重新插入到树中则紧接着会调用dispose()方法。       

7. dispose()     
> 当 State 对象从树中被永久移除时调用；通常在此回调中释放资源。     

![生命周期流程](https://book.flutterchina.club/assets/img/2-5.a59bef97.jpg)      

##### 注意    
在继承StatefulWidget重写其方法时，对于包含@mustCallSuper标注的父类方法，都要在子类方法中先调用父类方法。     



#### 在 widget 树中获取State对象     
1. context对象有一个findAncestorStateOfType()方法，该方法可以从当前节点沿着 widget 树向上查找指定类型的 StatefulWidget 对应的 State 对象。         
```dart
Widget build(BuildContext context) {
  ...
  // 查找父级最近的Scaffold对应的ScaffoldState对象
  ScaffoldState _state = context.findAncestorStateOfType<ScaffoldState>()!; 
  ...
}  
```
通过 context.findAncestorStateOfType 获取 StatefulWidget 的状态的方法是通用的，我们并不能在语法层面指定 StatefulWidget 的状态是否私有，所以在 Flutter 开发中便有了一个默认的约定：如果 StatefulWidget 的状态是希望暴露出的，应当在 StatefulWidget 中提供一个of 静态方法来获取其 State 对象，开发者便可直接通过该方法来获取；如果 State不希望暴露，则不提供of方法。这个约定在 Flutter SDK 里随处可见。       
```dart
// 直接通过of静态方法来获取ScaffoldState
ScaffoldState _state=Scaffold.of(context);
// 我们想显示 snack bar 的话可以通过下面代码调用
ScaffoldMessenger.of(context).showSnackBar(
  SnackBar(content: Text("我是SnackBar")),
);
```      

2. Flutter还有一种通用的获取State对象的方法——通过GlobalKey来获取！ 步骤分两步:     
   
```dart
// 1.给目标StatefulWidget添加GlobalKey 
// 定义一个globalKey, 由于GlobalKey要保持全局唯一性，我们使用静态变量存储
static GlobalKey<ScaffoldState> _globalKey= GlobalKey();
...
Scaffold(
    key: _globalKey , //设置key
    ...  
)
// 2.通过GlobalKey来获取State对象
_globalKey.currentState.openDrawer()

GlobalKey 是 Flutter 提供的一种在整个 App 中引用 element 的机制。如果一个 widget 设置了GlobalKey，那么我们便可以通过globalKey.currentWidget获得该 widget 对象、globalKey.currentElement来获得 widget 对应的element对象，如果当前 widget 是StatefulWidget，则可以通过globalKey.currentState来获得该 widget 对应的state对象。

注意：使用 GlobalKey 开销较大，如果有其他可选方案，应尽量避免使用它。另外，同一个 GlobalKey 在整个 widget 树中必须是唯一的，不能重复。
```


### 通过 RenderObject 自定义 Widget     
实际上Flutter 最原始的定义组件的方式就是通过定义RenderObject 来实现，而StatelessWidget 和 StatefulWidget 只是提供的两个帮助类。下面我们简单演示一下通过RenderObject定义组件的方式：     
```dart
class CustomWidget extends LeafRenderObjectWidget{
  @override
  RenderObject createRenderObject(BuildContext context) {
    // 创建 RenderObject
    return RenderCustomObject();
  }
  @override
  void updateRenderObject(BuildContext context, RenderCustomObject  renderObject) {
    // 更新 RenderObject
    super.updateRenderObject(context, renderObject);
  }
}

class RenderCustomObject extends RenderBox{

  @override
  void performLayout() {
    // 实现布局逻辑
  }

  @override
  void paint(PaintingContext context, Offset offset) {
    // 实现绘制
  }
}
```

如果组件不会包含子组件，则我们可以直接继承自 LeafRenderObjectWidget ，它是 RenderObjectWidget 的子类，而 RenderObjectWidget 继承自 Widget ，我们可以看一下它的实现：     
```dart
abstract class LeafRenderObjectWidget extends RenderObjectWidget {
  const LeafRenderObjectWidget({ Key? key }) : super(key: key);

  @override
  LeafRenderObjectElement createElement() => LeafRenderObjectElement(this);
}
很简单，就是帮 widget 实现了createElement 方法，它会为组件创建一个 类型为 LeafRenderObjectElement 的 Element对象。如果自定义的 widget 可以包含子组件，则可以根据子组件的数量来选择继承SingleChildRenderObjectWidget 或 MultiChildRenderObjectWidget，它们也实现了createElement() 方法，返回不同类型的 Element 对象。

然后我们重写了 createRenderObject 方法，它是 RenderObjectWidget 中定义方法，该方法被组件对应的 Element 调用（构建渲染树时）用于生成渲染对象。我们的主要任务就是来实现 createRenderObject 返回的渲染对象类，本例中是 RenderCustomObject 。updateRenderObject 方法是用于在组件树状态发生变化但不需要重新创建 RenderObject 时用于更新组件渲染对象的回调。

RenderCustomObject 类是继承自 RenderBox，而 RenderBox 继承自 RenderObject，我们需要在 RenderCustomObject 中实现布局、绘制、事件响应等逻辑
```     

#### Flutter SDK内置组件库       
1. 基础组件
```dart
//需要先导入 import 'package:flutter/widgets.dart';
/*
Text (opens new window)：该组件可让您创建一个带格式的文本。

Row (opens new window)、 Column (opens new window)： 这些具有弹性空间的布局类 widget 可让您在水平（Row）和垂直（Column）方向上创建灵活的布局。其设计是基于 Web 开发中的 Flexbox 布局模型。

Stack (opens new window)： 取代线性布局 (译者语：和 Android 中的FrameLayout相似)，[Stack](https://docs.flutter.io/flutter/ widgets/Stack-class.html)允许子 widget 堆叠， 你可以使用 Positioned (opens new window)来定位他们相对于Stack的上下左右四条边的位置。Stacks是基于Web开发中的绝对定位（absolute positioning )布局模型设计的。

Container (opens new window)： Container (opens new window)可让您创建矩形视觉元素。Container 可以装饰一个BoxDecoration (opens new window), 如 background、一个边框、或者一个阴影。 Container (opens new window)也可以具有边距（margins）、填充(padding)和应用于其大小的约束(constraints)。另外， Container (opens new window)可以使用矩阵在三维空间中对其进行变换*/

```      

2. Material组件（ Android 默认的视觉风格组件库   
```dart
import 'package:flutter/material.dart';
/*
Flutter 提供了一套丰富 的Material 组件，它可以帮助我们构建遵循 Material Design 设计规范的应用程序。Material 应用程序以MaterialApp (opens new window) 组件开始， 该组件在应用程序的根部创建了一些必要的组件，比如Theme组件，它用于配置应用的主题。 是否使用MaterialApp (opens new window)完全是可选的，但是使用它是一个很好的做法。在之前的示例中，我们已经使用过多个 Material 组件了，如：Scaffold、AppBar、TextButton等。要使用 Material 组件，需要先引入它
*/
```     
3. Cupertino组件 (iOS视觉风格)      
```dart
import 'package:flutter/cupertino.dart';
/*
Flutter 也提供了一套丰富的 Cupertino 风格的组件，尽管目前还没有 Material 组件那么丰富，但是它仍在不断的完善中。值得一提的是在 Material 组件库中有一些组件可以根据实际运行平台来切换表现风格，比如MaterialPageRoute，在路由切换时，如果是 Android 系统，它将会使用 Android 系统默认的页面切换动画(从底向上)；如果是 iOS 系统，它会使用 iOS 系统默认的页面切换动画（从右向左）*/

```

### 注意
> 由于 Material 和Cupertino 都是在基础组件库之上的，所以如果我们的应用中引入了这两者之一，则不需要再引入flutter/ widgets.dart了，因为它们内部已经引入过了。






















# <center>Flutter</center>
---   

### 使用外部的package   
1. 寻找需要的包[地址](https://pub.flutter-io.cn/), 以english_words包为例
2. 在项目的pubspec.yaml 文件中添加对应的包和版本注意缩进    
> dependencies:   
&nbsp;&nbsp;flutter:   
&nbsp;&nbsp;&nbsp;&nbsp;sdk: flutter   
&nbsp;&nbsp;english_words: ^4.0.0   
3. 运行时控制台应该可以看到    
```
flutter pub get
Running "flutter pub get" in startup_namer...
Process finished with exit code 0
```
4. 在 lib/main.dart 中引入   
```
import 'package:english_words/english_words.dart';
```
5. 使用
