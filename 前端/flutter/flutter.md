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

#### 状态管理    
---    
Widget 管理自己的状态。    
Widget 管理子 Widget 状态。    
混合管理（父 Widget 和子 Widget 都管理状态）。     

官方给出的一些原则:     
如果状态是用户数据，如复选框的选中状态、滑块的位置，则该状态最好由父 Widget 管理。
如果状态是有关界面外观效果的，例如颜色、动画，那么状态最好由 Widget 本身来管理。
如果某一个状态是不同 Widget 共享的则最好由它们共同的父 Widget 管理。     

全局状态管理(目前主要有两种办法):        
1. 实现一个全局的事件总线，将语言状态改变对应为一个事件，然后在APP中依赖应用语言的组件的initState 方法中订阅语言改变的事件。当用户在设置页切换语言后，我们发布语言改变事件，而订阅了此事件的组件就会收到通知，收到通知后调用setState(...)方法重新build一下自身即可。
2. 使用一些专门用于状态管理的包，如 Provider、Redux，读者可以在 pub 上查看其详细信息。      

#### 路由管理      
---     
##### MaterialPageRoute      
MaterialPageRoute继承自PageRoute类，PageRoute类是一个抽象类，表示占有整个屏幕空间的一个模态路由页面，它还定义了路由构建及切换时过渡动画的相关接口及属性。MaterialPageRoute 是 Material组件库提供的组件，它可以针对不同平台，实现与平台页面切换动画风格一致的路由切换动画:      

对于 Android，当打开新页面时，新的页面会从屏幕底部滑动到屏幕顶部；当关闭页面时，当前页面会从屏幕顶部滑动到屏幕底部后消失，同时上一个页面会显示到屏幕上。        

对于 iOS，当打开页面时，新的页面会从屏幕右侧边缘一直滑动到屏幕左边，直到新页面全部显示到屏幕上，而上一个页面则会从当前屏幕滑动到屏幕左侧而消失；当关闭页面时，正好相反，当前页面会从屏幕右侧滑出，同时上一个页面会从屏幕左侧滑入。        
```dart
// MaterialPageRoute 构造函数的各个参数的意义
MaterialPageRoute({
  WidgetBuilder builder,
  RouteSettings settings,
  bool maintainState = true,
  bool fullscreenDialog = false,
})

/*
builder 是一个WidgetBuilder类型的回调函数，它的作用是构建路由页面的具体内容，返回值是一个widget。我们通常要实现此回调，返回新路由的实例。

settings 包含路由的配置信息，如路由名称、是否初始路由（首页）。

maintainState：默认情况下，当入栈一个新路由时，原来的路由仍然会被保存在内存中，如果想在路由没用的时候释放其所占用的所有资源，可以设置maintainState为 false。

fullscreenDialog表示新的路由页面是否是一个全屏的模态对话框，在 iOS 中，如果fullscreenDialog为true，新页面将会从屏幕底部滑入（而不是水平方向）。
*/
```       

#####  Navigator        
```dart
Navigator是一个路由管理的组件，它提供了打开和退出路由页方法。Navigator通过一个栈来管理活动路由集合。通常当前屏幕显示的页面就是栈顶的路由。Navigator提供了一系列方法来管理路由栈，最常用的两个方法： 

Future push(BuildContext context, Route route)
将给定的路由入栈（即打开新的页面），返回值是一个Future对象，用以接收新路由出栈（即关闭）时的返回数据。

bool pop(BuildContext context, [ result ])
将栈顶路由出栈，result 为页面关闭时返回给上一个页面的数据。
Navigator 还有很多其它方法，如Navigator.replace、Navigator.popUntil等，详情请参考API文档或SDK 源码注释，在此不再赘述。下面我们还需要介绍一下路由相关的另一个概念“命名路由”。


实例方法
Navigator类中第一个参数为context的静态方法都对应一个Navigator的实例方法， 比如Navigator.push(BuildContext context, Route route)等价于Navigator.of(context).push(Route route) ，下面命名路由相关的方法也是一样的。
```       


#####  路由传值     
很多时候，在路由跳转时我们需要带一些参数，比如打开商品详情页时，我们需要带一个商品id，这样商品详情页才知道展示哪个商品信息；又比如我们在填写订单时需要选择收货地址，打开地址选择页并选择地址后，可以将用户选择的地址返回到订单页等等。下面我们通过一个简单的示例来演示新旧路由如何传参。     
```dart
/*
例子
创建一个TipRoute路由，它接受一个提示文本参数，负责将传入它的文本显示在页面上，另外TipRoute中我们添加一个“返回”按钮，点击后在返回上一个路由的同时会带上一个返回参数
*/

class TipRoute extends StatelessWidget {
  TipRoute({
    Key key,
    @required this.text,  // 接收一个text参数
  }) : super(key: key);
  final String text;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("提示"),
      ),
      body: Padding(
        padding: EdgeInsets.all(18),
        child: Center(
          child: Column(
            children: <Widget>[
              Text(text),
              ElevatedButton(
                onPressed: () => Navigator.pop(context, "我是返回值"),
                child: Text("返回"),
              )
            ],
          ),
        ),
      ),
    );
  }
}

//下面是打开新路由TipRoute的代码
class RouterTestRoute extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Center(
      child: ElevatedButton(
        onPressed: () async {
          // 打开`TipRoute`，并等待返回结果
          var result = await Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) {
                return TipRoute(
                  // 路由参数
                  text: "我是提示xxxx",
                );
              },
            ),
          );
          //输出`TipRoute`路由返回结果
          print("路由返回值: $result");
        },
        child: Text("打开提示页"),
      ),
    );
  }
}


在TipRoute页中有两种方式可以返回到上一页；第一种方式是直接点击导航栏返回箭头，第二种方式是点击页面中的“返回”按钮。这两种返回方式的区别是前者不会返回数据给上一个路由，而后者会
```      


##### 命名路由    
所谓“命名路由”（Named Route）即有名字的路由，我们可以先给路由起一个名字，然后就可以通过路由名字直接打开新的路由了，这为路由管理带来了一种直观、简单的方式。     
```dart
/*

路由表
要想使用命名路由，我们必须先提供并注册一个路由表（routing table），这样应用程序才知道哪个名字与哪个路由组件相对应。其实注册路由表就是给路由起名字，路由表的定义如下：
Map<String, WidgetBuilder> routes;
它是一个Map，key为路由的名字，是个字符串；value是个builder回调函数，用于生成相应的路由widget。我们在通过路由名字打开新路由时，应用会根据路由名字在路由表中查找到对应的WidgetBuilder回调函数，然后调用该回调函数生成路由widget并返回。


注册路由表
路由表的注册方式很简单，我们回到之前“计数器”的示例，然后在MyApp类的build方法中找到MaterialApp，添加routes属性，代码如下：
MaterialApp(
  title: 'Flutter Demo',
  theme: ThemeData(
    primarySwatch: Colors.blue,
  ),
  //注册路由表
  routes:{
   "new_page":(context) => NewRoute(),
    ... // 省略其它路由注册信息
  } ,
  home: MyHomePage(title: 'Flutter Demo Home Page'),
);

现在我们就完成了路由表的注册。上面的代码中home路由并没有使用命名路由，如果我们也想将home注册为命名路由应该怎么做呢？其实很简单，直接看代码：

MaterialApp(
  title: 'Flutter Demo',
  initialRoute:"/", //名为"/"的路由作为应用的home(首页)
  theme: ThemeData(
    primarySwatch: Colors.blue,
  ),
  //注册路由表
  routes:{
   "new_page":(context) => NewRoute(),
   "/":(context) => MyHomePage(title: 'Flutter Demo Home Page'), //注册首页路由
  } 
);

可以看到，我们只需在路由表中注册一下MyHomePage路由，然后将其名字作为MaterialApp的initialRoute属性值即可，该属性决定应用的初始路由页是哪一个命名路由。


通过路由名打开新路由页
要通过路由名称来打开新路由，可以使用Navigator 的pushNamed方法：
Future pushNamed(BuildContext context, String routeName,{Object arguments})
Navigator 除了pushNamed方法，还有pushReplacementNamed等其他管理命名路由的方法
Navigator.pushNamed(context, "new_page");



命名路由参数传递
先注册一个路由

routes:{
  "new_page":(context) => EchoRoute(),
} ,
在路由页通过RouteSetting对象获取路由参数

class EchoRoute extends StatelessWidget {

  @override
  Widget build(BuildContext context) {
    //获取路由参数  
    var args=ModalRoute.of(context).settings.arguments;
    //...省略无关代码
  }
}

在打开路由时传递参数
Navigator.of(context).pushNamed("new_page", arguments: "hi");

假设我们也想将上面路由传参示例中的TipRoute路由页注册到路由表中，以便也可以通过路由名来打开它。但是，由于TipRoute接受一个text 参数，我们如何在不改变TipRoute源码的前提下适配这种情况？其实很简单
MaterialApp(
  ... //省略无关代码
  routes: {
   "tip2": (context){
     return TipRoute(text: ModalRoute.of(context).settings.arguments); // 把argumets给text
   },
 }, 
);


路由生成钩子
MaterialApp有一个onGenerateRoute属性，它在打开命名路由时可能会被调用，之所以说可能，是因为当调用Navigator.pushNamed(...)打开命名路由时，如果指定的路由名在路由表中已注册，则会调用路由表中的builder函数来生成路由组件；如果路由表中没有注册，才会调用onGenerateRoute来生成路由。onGenerateRoute回调签名如下：    
Route<dynamic> Function(RouteSettings settings)

有了onGenerateRoute回调，要实现上面控制页面权限的功能就非常容易：我们放弃使用路由表，取而代之的是提供一个onGenerateRoute回调，然后在该回调中进行统一的权限控制，如：

MaterialApp(
  ... //省略无关代码
  onGenerateRoute:(RouteSettings settings){
	  return MaterialPageRoute(builder: (context){
		   String routeName = settings.name;
       // 如果访问的路由页需要登录，但当前未登录，则直接返回登录页路由，
       // 引导用户登录；其它情况则正常打开路由。
     }
   );
  }
);
onGenerateRoute 只会对命名路由生效



统一使用命名路由的管理方式，这将会带来如下好处：

语义化更明确。
代码更好维护；如果使用匿名路由，则必须在调用Navigator.push的地方创建新路由页，这样不仅需要import新路由页的dart文件，而且这样的代码将会非常分散。
可以通过onGenerateRoute做一些全局的路由跳转前置处理逻辑。
*/

```      

##### 包管理    
---    
各种开发生态或编程语言官方通常都会提供一些包管理工具，比如在 Android 提供了 Gradle 来管理依赖，iOS 用 Cocoapods 或 Carthage 来管理依赖，Node 中通过 npm 等。而在 Flutter 开发中也有自己的包管理工具。本节我们主要介绍一下 Flutter 如何使用配置文件pubspec.yaml（位于项目根目录）来管理第三方依赖包。        
```yaml
name: flutter_in_action
description: First Flutter Application.

version: 1.0.0+1

dependencies:
  flutter:
    sdk: flutter
  cupertino_icons: ^0.1.2

dev_dependencies:
  flutter_test:
    sdk: flutter
    
flutter:
  uses-material-design: true


name：应用或包名称。
description: 应用或包的描述、简介。
version：应用或包的版本号。
dependencies：应用或包依赖的其它包或插件。
dev_dependencies：开发环境依赖的工具包（而不是flutter应用本身依赖的包）。
flutter：flutter相关的配置选项。
```      
##### 使用外部的package   
1. 寻找需要的包[地址](https://pub.flutter-io.cn/), 以english_words包为例
2. 在项目的pubspec.yaml 文件中添加对应的包和版本注意缩进    
> dependencies:   
&nbsp;&nbsp;flutter:   
&nbsp;&nbsp;&nbsp;&nbsp;sdk: flutter   
&nbsp;&nbsp;english_words: ^4.0.0   
3. 运行时控制台应该可以看到    
```c
flutter packages get
Running "flutter pub get" in startup_namer...
Process finished with exit code 0
```
4. 在 lib/main.dart 中引入   
```dart
import 'package:english_words/english_words.dart';
```
5. 使用      
```dart
import 'package:english_words/english_words.dart';
```      

#####    其它依赖方式      
上文所述的依赖方式是依赖Pub仓库的。但我们还可以依赖本地包和git仓库。   
1. 依赖本地包     
```yaml
如果我们正在本地开发一个包，包名为pkg1，我们可以通过下面方式依赖：
dependencies:
	pkg1:
    path: ../../code/pkg1

路径可以是相对的，也可以是绝对的。

依赖Git：你也可以依赖存储在Git仓库中的包。如果软件包位于仓库的根目录中，请使用以下语法
dependencies:
  pkg1:
    git:
      url: git://github.com/xxx/pkg1.git
上面假定包位于Git存储库的根目录中。如果不是这种情况，可以使用path参数指定相对位置，例如
```     
[其他依赖方式](https://www.dartlang.org/tools/pub/dependencies)      


##### 资源管理    
Flutter APP 安装包中会包含代码和 assets（资源）两部分。Assets 是会打包到程序安装包中的，可在运行时访问。常见类型的 assets 包括静态数据（例如JSON文件）、配置文件、图标和图片等。     
和包管理一样，Flutter 也使用pubspec.yaml (opens new window)文件来管理应用程序所需的资源，举个例子:
```yaml
flutter:
  assets:
    - assets/my_icon.png
    - assets/background.png

assets指定应包含在应用程序中的文件， 每个 asset 都通过相对于pubspec.yaml文件所在的文件系统路径来标识自身的路径。asset 的声明顺序是无关紧要的，asset的实际目录可以是任意文件夹（在本示例中是assets 文件夹）。

在构建期间，Flutter 将 asset 放置到称为 asset bundle 的特殊存档中，应用程序可以在运行时读取它们（但不能修改）。


Asset 变体（variant）

构建过程支持“asset变体”的概念：不同版本的 asset 可能会显示在不同的上下文中。 在pubspec.yaml的assets 部分中指定 asset 路径时，构建过程中，会在相邻子目录中查找具有相同名称的任何文件。这些文件随后会与指定的 asset 一起被包含在 asset bundle 中。

例如，如果应用程序目录中有以下文件:

…/pubspec.yaml
…/graphics/my_icon.png
…/graphics/background.png
…/graphics/dark/background.png
…etc.
然后pubspec.yaml文件中只需包含:
flutter:
  assets:
    - graphics/background.png

那么这两个graphics/background.png和graphics/dark/background.png 都将包含在您的 asset bundle中。前者被认为是_main asset_ （主资源），后者被认为是一种变体（variant）。

在选择匹配当前设备分辨率的图片时，Flutter会使用到 asset 变体

加载 assets
您的应用可以通过AssetBundle (opens new window)对象访问其 asset 。有两种主要方法允许从 Asset bundle 中加载字符串或图片（二进制）文件

加载文本assets
通过rootBundle (opens new window)对象加载：每个Flutter应用程序都有一个rootBundle (opens new window)对象， 通过它可以轻松访问主资源包，直接使用package:flutter/services.dart中全局静态的rootBundle对象来加载asset即可。

通过 DefaultAssetBundle (opens new window)加载：建议使用 DefaultAssetBundle (opens new window)来获取当前 BuildContext 的AssetBundle。 这种方法不是使用应用程序构建的默认 asset bundle，而是使父级 widget 在运行时动态替换的不同的 AssetBundle，这对于本地化或测试场景很有用。

通常，可以使用DefaultAssetBundle.of()在应用运行时来间接加载 asset（例如JSON文件），而在widget 上下文之外，或其它AssetBundle句柄不可用时，可以使用rootBundle直接加载这些 asset，例如：
import 'dart:async' show Future;
import 'package:flutter/services.dart' show rootBundle;

Future<String> loadAsset() async {
  return await rootBundle.loadString('assets/config.json');
}

加载图片 
声明分辨率相关的图片 assets
AssetImage (opens new window)可以将asset的请求逻辑映射到最接近当前设备像素比例（dpi）的asset。为了使这种映射起作用，必须根据特定的目录结构来保存asset：

…/image.png
…/Mx/image.png
…/Nx/image.png
…etc.
其中 M 和 N 是数字标识符，对应于其中包含的图像的分辨率，也就是说，它们指定不同设备像素比例的图片。

主资源默认对应于1.0倍的分辨率图片。看一个例子：

…/my_icon.png
…/2.0x/my_icon.png
…/3.0x/my_icon.png
在设备像素比率为1.8的设备上，.../2.0x/my_icon.png 将被选择。对于2.7的设备像素比率，.../3.0x/my_icon.png将被选择。

如果未在Image widget上指定渲染图像的宽度和高度，那么Image widget将占用与主资源相同的屏幕空间大小。 也就是说，如果.../my_icon.png是72px乘72px，那么.../3.0x/my_icon.png应该是216px乘216px; 但如果未指定宽度和高度，它们都将渲染为72像素×72像素（以逻辑像素为单位）。
即如果没有指定尺寸，则渲染主资源

pubspec.yaml中asset部分中的每一项都应与实际文件相对应，但主资源项除外。当主资源缺少某个资源时，会按分辨率从低到高的顺序去选择 ，也就是说1x中没有的话会在2x中找，2x中还没有的话就在3x中找。
资源的寻找是从主到次寻找的
```        


要加载图片，可以使用 AssetImage (opens new window)类。例如，我们可以从上面的asset声明中加载背景图片       
```dart
Widget build(BuildContext context) {
  return DecoratedBox(
    decoration: BoxDecoration(
      image: DecorationImage(
        image: AssetImage('graphics/background.png'),
      ),
    ),
  );
}

注意，AssetImage 并非是一个widget， 它实际上是一个ImageProvider，有些时候你可能期望直接得到一个显示图片的widget，那么你可以使用Image.asset()方法，如：

Widget build(BuildContext context) {
  return Image.asset('graphics/background.png');
}

使用默认的 asset bundle 加载资源时，内部会自动处理分辨率等，这些处理对开发者来说是无感知的。


要加载依赖包中的图像，必须给AssetImage提供package参数。
例如，假设您的应用程序依赖于一个名为“my_icons”的包，它具有如下目录结构：

…/pubspec.yaml
…/icons/heart.png
…/icons/1.5x/heart.png
…/icons/2.0x/heart.png
…etc.
然后加载图像，使用

AssetImage('icons/heart.png', package: 'my_icons')
或
Image.asset('icons/heart.png', package: 'my_icons')

包在使用本身的资源时也应该加上package参数来获取


打包包中的 assets
如果在pubspec.yaml文件中声明了期望的资源，它将会打包到相应的package中。特别是，包本身使用的资源必须在pubspec.yaml中指定。

包也可以选择在其lib/文件夹中包含未在其pubspec.yaml文件中声明的资源。在这种情况下，对于要打包的图片，应用程序必须在pubspec.yaml中指定包含哪些图像。 例如，一个名为“fancy_backgrounds”的包，可能包含以下文件：

…/lib/backgrounds/background1.png
…/lib/backgrounds/background2.png
…/lib/backgrounds/background3.png

要包含第一张图像，必须在pubspec.yaml的assets部分中声明它：
flutter:
  assets:
    - packages/fancy_backgrounds/backgrounds/background1.png

lib/是隐含的，所以它不应该包含在资产路径中


特定平台 assets
上面的资源都是flutter应用中的，这些资源只有在Flutter框架运行之后才能使用，如果要给我们的应用设置APP图标或者添加启动图，那我们必须使用特定平台的assets


设置APP图标
更新Flutter应用程序启动图标的方式与在本机Android或iOS应用程序中更新启动图标的方式相同。
Android
在 Flutter 项目的根目录中，导航到.../android/app/src/main/res目录，里面包含了各种资源文件夹（如mipmap-hdpi已包含占位符图像 “ic_launcher.png”，见图2-15）。 只需按照Android开发人员指南 (opens new window)中的说明， 将其替换为所需的资源，并遵守每种屏幕密度（dpi）的建议图标大小标准。

如果您重命名.png文件，则还必须在您AndroidManifest.xml的<application>标签的android:icon属性中更新名称。

iOS
在Flutter项目的根目录中，导航到.../ios/Runner。该目录中Assets.xcassets/AppIcon.appiconset已经包含占位符图片（见图2-16）， 只需将它们替换为适当大小的图片，保留原始文件名称

在 Flutter 框架加载时，Flutter 会使用本地平台机制绘制启动页。此启动页将持续到Flutter渲染应用程序的第一帧时
这意味着如果您不在应用程序的main()方法中调用runApp (opens new window)函数 （或者更具体地说，如果您不调用window.render (opens new window)去响应window.onDrawFrame (opens new window)）的话， 启动屏幕将永远持续显示。


Android
要将启动屏幕（splash screen）添加到您的Flutter应用程序， 请导航至.../android/app/src/main。在res/drawable/launch_background.xml，通过自定义drawable来实现自定义启动界面（你也可以直接换一张图片）

iOS
要将图片添加到启动屏幕（splash screen）的中心，请导航至.../ios/Runner。在Assets.xcassets/LaunchImage.imageset， 拖入图片，并命名为LaunchImage.png、LaunchImage@2x.png、LaunchImage@3x.png。 如果你使用不同的文件名，那您还必须更新同一目录中的Contents.json文件，图片的具体尺寸可以查看苹果官方的标准。

您也可以通过打开Xcode完全自定义storyboard。在Project Navigator中导航到Runner/Runner然后通过打开Assets.xcassets拖入图片，或者通过在LaunchScreen.storyboard中使用Interface Builder进行自定义，
```       

##### 调试Flutter应用      
---      
1. debugger() 声明       
当使用Dart Observatory（或另一个Dart调试器，例如IntelliJ IDE中的调试器）时，可以使用该debugger()语句插入编程式断点。要使用这个，你必须添加import 'dart:developer';到相关文件顶部。
```dart
debugger()语句采用一个可选when参数，我们可以指定该参数仅在特定条件为真时中断，如下所示：

void someFunction(double offset) {
  debugger(when: offset > 30.0);
  // ...
}
```     
2. 调试模式断言      
要关闭调试模式并使用发布模式，请使用flutter run --release运行我们的应用程序。 这也关闭了Observatory调试器。一个中间模式可以关闭除Observatory之外所有调试辅助工具的，称为“profile mode”，用--profile替代--release即可       

3. 断点     

4. 调试应用程序层     
Flutter框架的每一层都提供了将其当前状态或事件转储(dump)到控制台（使用debugPrint 如果你一次输出太多，那么Android有时会丢弃一些日志行。为了避免这种情况，我们可以使用Flutter的foundation库中的debugPrint() (opens new window)。 这是一个封装print，它将输出限制在一个级别，避免被Android内核丢弃。）的功能      

要转储Widgets树的状态，请调用debugDumpApp() (opens new window)。 只要应用程序已经构建了至少一次（即在调用build()之后的任何时间），我们可以在应用程序未处于构建阶段（即，不在build()方法内调用 ）的任何时间调用此方法（在调用runApp()之后）。     

渲染树
如果我们尝试调试布局问题，那么Widget树可能不够详细。在这种情况下，我们可以通过调用debugDumpRenderTree()转储渲染树。 正如debugDumpApp()，除布局或绘制阶段外，我们可以随时调用此函数。作为一般规则，从frame 回调 (opens new window)或事件处理器中调用它是最佳解决方案。

要调用debugDumpRenderTree()，我们需要添加import'package:flutter/rendering.dart';到我们的源文件。     
当调试布局问题时，关键要看的是size和constraints字段。约束沿着树向下传递，尺寸向上传递。    

如果我们编写自己的渲染对象，则可以通过覆盖debugFillProperties() (opens new window)将信息添加到转储。 将DiagnosticsProperty (opens new window)对象作为方法的参数，并调用父类方法      


5. 可视化调试      
我们也可以通过设置debugPaintSizeEnabled为true以可视方式调试布局问题。 这是来自rendering库的布尔值。它可以在任何时候启用，并在为true时影响绘制。 设置它的最简单方法是在void main()的顶部设置。

当它被启用时，所有的盒子都会得到一个明亮的深青色边框，padding（来自widget如Padding）显示为浅蓝色，子widget周围有一个深蓝色框， 对齐方式（来自widget如Center和Align）显示为黄色箭头. 空白（如没有任何子节点的Container）以灰色显示。     

6. 调试性能问题    
要了解我们的应用程序导致重新布局或重新绘制的原因，我们可以分别设置debugPrintMarkNeedsLayoutStacks (opens new window)和 debugPrintMarkNeedsPaintStacks (opens new window)标志。 每当渲染盒被要求重新布局和重新绘制时，这些都会将堆栈跟踪记录到控制台。如果这种方法对我们有用，我们可以使用services库中的debugPrintStack()方法按需打印堆栈痕迹       


7. 统计应用启动时间      
要收集有关Flutter应用程序启动所需时间的详细信息，可以在运行flutter run时使用trace-startup和profile选项。

```html
$ flutter run --trace-startup --profile
跟踪输出保存为start_up_info.json，在Flutter工程目录在build目录下。输出列出了从应用程序启动到这些跟踪事件（以微秒捕获）所用的时间：

进入Flutter引擎时
展示应用第一帧时
初始化Flutter框架时
完成Flutter框架初始化时  
```   

8. DevTools(官网查看Flutter DevTools )     

9. 跟踪Dart代码性能      
要执行自定义性能跟踪和测量Dart任意代码段的wall/CPU时间（类似于在Android上使用systrace (opens new window)）。 使用dart:developer的Timeline (opens new window)工具来包含你想测试的代码块，例如：

```dart
Timeline.startSync('interesting function');
// iWonderHowLongThisTakes();
Timeline.finishSync(); 
```     


##### 异常捕获       
```dart
在Flutter中，还有一些Flutter没有为我们捕获的异常，如调用空对象方法异常、Future中的异常。在Dart中，异常分两类：同步异常和异步异常，同步异常可以通过try/catch捕获，而异步异常则比较麻烦，如下面的代码是捕获不了Future的异常的：
try{
    Future.delayed(Duration(seconds: 1)).then((e) => Future.error("xxx"));
}catch (e){
    print(e)
}

Dart中有一个runZoned(...) 方法，可以给执行对象指定一个Zone。Zone表示一个代码执行的环境范围，为了方便理解，读者可以将Zone类比为一个代码执行沙箱，不同沙箱的之间是隔离的，沙箱可以捕获、拦截或修改一些代码行为，如Zone中可以捕获日志输出、Timer创建、微任务调度的行为，同时Zone也可以捕获所有未处理的异常。下面我们看看runZoned(...)方法定义：

R runZoned<R>(R body(), {
    Map zoneValues, 
    ZoneSpecification zoneSpecification,
}) 

zoneValues: Zone 的私有数据，可以通过实例zone[key]获取，可以理解为每个“沙箱”的私有数据。
zoneSpecification：Zone的一些配置，可以自定义一些代码行为，比如拦截日志输出和错误等，举个例子：
runZoned(
  () => runApp(MyApp()),
  zoneSpecification: ZoneSpecification(
    // 拦截print 蜀西湖
    print: (Zone self, ZoneDelegate parent, Zone zone, String line) {
      parent.print(zone, "Interceptor: $line");
    },
    // 拦截未处理的异步错误
    handleUncaughtError: (Zone self, ZoneDelegate parent, Zone zone,
                          Object error, StackTrace stackTrace) {
      parent.print(zone, '${error.toString()} $stackTrace');
    },
  ),
);


如果我们想自己上报异常，只需要提供一个自定义的错误处理回调即可，如
void main() {
  FlutterError.onError = (FlutterErrorDetails details) {
    reportError(details);
  };
 ...
}


最终的异常捕获和上报代码大致如下：
void collectLog(String line){
    ... //收集日志
}
void reportErrorAndLog(FlutterErrorDetails details){
    ... //上报错误和日志逻辑
}

FlutterErrorDetails makeDetails(Object obj, StackTrace stack){
    ...// 构建错误信息
}

void main() {
  var onError = FlutterError.onError; //先将 onerror 保存起来
  FlutterError.onError = (FlutterErrorDetails details) {
    onError?.call(details); //调用默认的onError
    reportErrorAndLog(details); //上报
  };
  runZoned(
  () => runApp(MyApp()),
  zoneSpecification: ZoneSpecification(
    // 拦截print 蜀西湖
    print: (Zone self, ZoneDelegate parent, Zone zone, String line) {
      collectLog(line);
      parent.print(zone, "Interceptor: $line");
    },
    // 拦截未处理的异步错误
    handleUncaughtError: (Zone self, ZoneDelegate parent, Zone zone,
                          Object error, StackTrace stackTrace) {
      reportErrorAndLog(details);
      parent.print(zone, '${error.toString()} $stackTrace');
    },
  ),
 );
}
```     


### 基础组件       
---     
1. Text      
用于显示简单样式文本，它包含一些控制文本显示样式的一些属性      
textAlign：文本的对齐方式；可以选择左对齐、右对齐还是居中。注意，对齐的参考系是Text widget 本身。本例中虽然是指定了居中对齐，但因为 Text 文本内容宽度不足一行，Text 的宽度和文本内容长度相等，那么这时指定对齐方式是没有意义的，只有 Text 宽度大于文本内容长度时指定此属性才有意义。下面我们指定一个较长的字符串：
```dart
  Text("Hello world "*6,  //字符串重复六次
    textAlign: TextAlign.center,
  )；


  字符串内容超过一行，Text 宽度等于屏幕宽度，第二行文本便会居中显示
```     

maxLines、overflow：指定文本显示的最大行数，默认情况下，文本是自动折行的，如果指定此参数，则文本最多不会超过指定的行。如果有多余的文本，可以通过overflow来指定截断方式，默认是直接截断，本例中指定的截断方式TextOverflow.ellipsis，它会将多余文本截断后以省略符“...”表示；TextOverflow 的其它截断方式请参考 SDK 文档。     

textScaleFactor：代表文本相对于当前字体大小的缩放因子，相对于去设置文本的样式style属性的fontSize，它是调整字体大小的一个快捷方式。该属性的默认值可以通过MediaQueryData.textScaleFactor获得，如果没有MediaQuery，那么会默认值将为1.0       

TextStyle用于指定文本显示的样式如颜色、字体、粗细、背景等      
```dart
Text("Hello world",
  style: TextStyle(
    color: Colors.blue,
    fontSize: 18.0,
    height: 1.2,  
    fontFamily: "Courier",
    background: Paint()..color=Colors.yellow,
    decoration:TextDecoration.underline,
    decorationStyle: TextDecorationStyle.dashed
  ),
);
```        
值得注意的是：

height：该属性用于指定行高，但它并不是一个绝对值，而是一个因子，具体的行高等于fontSize*height。

fontFamily ：由于不同平台默认支持的字体集不同，所以在手动指定字体时一定要先在不同平台测试一下。

fontSize：该属性和 Text 的textScaleFactor都用于控制字体大小。但是有两个主要区别：

fontSize可以精确指定字体大小，而textScaleFactor只能通过缩放比例来控制。
textScaleFactor主要是用于系统字体大小设置改变时对 Flutter 应用字体进行全局调整，而fontSize通常用于单个文本，字体大小不会跟随系统字体大小变化。      

TextSpan     
Text 的所有文本内容只能按同一种样式，如果我们需要对一个 Text 内容的不同部分按照不同的样式显示，这时就可以使用TextSpan，它代表文本的一个“片段”。我们看看 TextSpan 的定义     
```dart
const TextSpan({
  TextStyle style, 
  Sting text,
  List<TextSpan> children,
  GestureRecognizer recognizer,
});

其中style 和 text属性代表该文本片段的样式和内容。 children是一个TextSpan的数组，也就是说TextSpan可以包括其他TextSpan。而recognizer用于对该文本片段上用于手势进行识别处理


Text.rich(TextSpan(
    children: [
     TextSpan(
       text: "Home: "
     ),
     TextSpan(
       text: "https://flutterchina.club",
       style: TextStyle(
         color: Colors.blue
       ),  
       recognizer: _tapRecognizer
     ),
    ]
))

上面代码中，我们通过 TextSpan 实现了一个基础文本片段和一个链接片段，然后通过Text.rich 方法将TextSpan 添加到 Text 中，之所以可以这样做，是因为 Text 其实就是 RichText 的一个包装，而RichText 是可以显示多种样式(富文本)的 widget。
_tapRecognizer，它是点击链接后的一个处理器（代码已省略）
```     

DefaultTextStyle     
在 Widget 树中，文本的样式默认是可以被继承的（子类文本类组件未指定具体样式时可以使用 Widget 树中父级设置的默认样式），因此，如果在 Widget 树的某一个节点处设置一个默认的文本样式，那么该节点的子树中所有文本都会默认使用这个样式，而DefaultTextStyle正是用于设置默认文本样式的      
```dart
DefaultTextStyle(
  //1.设置文本默认样式  
  style: TextStyle(
    color:Colors.red,
    fontSize: 20.0,
  ),
  textAlign: TextAlign.start,
  child: Column(
    crossAxisAlignment: CrossAxisAlignment.start,
    children: <Widget>[
      Text("hello world"),
      Text("I am Jack"),
      Text("I am Jack",
        style: TextStyle(
          inherit: false, //2.不继承默认样式
          color: Colors.grey
        ),
      ),
    ],
  ),
);


上面代码中，我们首先设置了一个默认的文本样式，即字体为20像素(逻辑像素)、颜色为红色。然后通过DefaultTextStyle 设置给了子树 Column 节点处，这样一来 Column 的所有子孙 Text 默认都会继承该样式，除非 Text 显示指定不继承样式，如代码中注释2。
```      

字体      
在 Flutter 中使用字体分两步完成。首先在pubspec.yaml中声明它们，以确保它们会打包到应用程序中。然后通过TextStyle (opens new window)属性使用字体       
在asset中声明       
要将字体文件打包到应用中，和使用其它资源一样，要先在pubspec.yaml中声明它。然后将字体文件复制到在pubspec.yaml中指定的位置，如     
```yaml
flutter:
  fonts:
    - family: Raleway
      fonts:
      - asset: assets/fonts/Raleway-Regular.ttf
      - asset: assets/fonts/Raleway-Medium.ttf
        weight: 500
      - asset: assets/fonts/Raleway-SemiBold.ttf
        weight: 600
    - family: AbrilFatface
      fonts:
      - asset: assets/fonts/abrilfatface/AbrilFatface-Regular.ttf
```     

使用字体      
```dart 
// 声明文本样式
const textStyle = const TextStyle(
  fontFamily: 'Raleway',
);

// 使用文本样式
var buttonText = const Text(
  "Use the font for this text",
  style: textStyle,
);

要使用 Package 中定义的字体，必须提供package参数。例如，假设上面的字体声明位于my_package包中。然后创建 TextStyle 的过程如下：

const textStyle = const TextStyle(
  fontFamily: 'Raleway',
  package: 'my_package', //指定包名
);
```















