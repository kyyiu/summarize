###  React 理念
---    
####  用 JavaScript 构建快速响应的大型 Web 应用程序   
制约快速响应的因素   
我们日常使用App，浏览网页时，有两类场景会制约快速响应：   
1. 当遇到大计算量的操作或者设备性能不足使页面掉帧，导致卡顿。   
2. 发送网络请求后，由于需要等待数据返回才能进一步操作导致不能快速响应。     

这两类场景可以概括为：       
1. **CPU的瓶颈**      

    主流浏览器刷新频率为60Hz，即每（1000ms / 60Hz）16.6ms浏览器刷新一次。    
    我们知道，JS可以操作DOM，GUI渲染线程与JS线程是互斥的。所以JS脚本执行和浏览器布局、绘制不能同时执行。    
    在每16.6ms时间内，需要完成如下工作：   
    JS脚本执行 => 样式布局 => 样式绘制    
    当JS执行时间过长，超出了16.6ms，这次刷新就没有时间执行样式布局和样式绘制了。     
    JS脚本执行时间过长，页面掉帧，造成卡顿。     

    如何解决这个问题呢？    
    答案是：在浏览器每一帧的时间中，预留一些时间给JS线程，React利用这部分时间更新组件（可以看到，在源码 (opens new window)中，预留的初始时间是5ms）。       
    
    当预留的时间不够用时，React将线程控制权交还给浏览器使其有时间渲染UI，React则等待下一帧时间到来继续被中断的工作。      

    这种将长任务分拆到每一帧中，像蚂蚁搬家一样一次执行一小段任务的操作，被称为时间切片（time slice）       
    **解决CPU瓶颈的关键是实现时间切片，而时间切片的关键是：将同步的更新变为可中断的异步更新。**       

2. **IO的瓶颈**    

    网络延迟是前端开发者无法解决的。如何在网络延迟客观存在的情况下，减少用户对网络延迟的感知？     
    先在当前页面停留了一小段时间，这一小段时间被用来请求数据。       
    当“这一小段时间”足够短时，用户是无感知的。如果请求时间超过一个范围，再显示loading的效果


#### React15架构     
---   
1. Reconciler（协调器）—— 负责找出变化的组件      
    我们知道，在React中可以通过this.setState、this.forceUpdate、ReactDOM.render等API触发更新。

    每当有更新发生时，Reconciler会做如下工作：

    调用函数组件、或class组件的render方法，将返回的JSX转化为虚拟DOM
    将虚拟DOM和上次更新时的虚拟DOM对比
    通过对比找出本次更新中变化的虚拟DOM
    通知Renderer将变化的虚拟DOM渲染到页面上
2. Renderer（渲染器）—— 负责将变化的组件渲染到页面上    
    由于React支持跨平台，所以不同平台有不同的Renderer。我们前端最熟悉的是负责在浏览器环境渲染的Renderer —— ReactDOM (opens new window)。

    除此之外，还有：

    ReactNative (opens new window)渲染器，渲染App原生组件
    ReactTest (opens new window)渲染器，渲染出纯Js对象用于测试
    ReactArt (opens new window)渲染器，渲染到Canvas, SVG 或 VML (IE8)
    在每次更新发生时，Renderer接到Reconciler通知，将变化的组件渲染在当前宿主环境。   

#### React15的缺点     
在Reconciler中，mount的组件会调用mountComponent (opens new window)，update的组件会调用updateComponent (opens new window)。这两个方法都会递归更新子组件,由于递归执行，所以更新一旦开始，中途就无法中断。当层级很深时，递归更新时间超过了16ms，用户交互就会卡顿。
Reconciler和Renderer是交替工作的.所以一旦中间需要中断则会出现渲染不完全的页面.    


#### React16的架构   
---   
1. Scheduler（调度器）调度任务的优先级，高优任务优先进入Reconciler     
    既然我们以浏览器是否有剩余时间作为任务中断的标准，那么我们需要一种机制，当浏览器有剩余时间时通知我们。

    其实部分浏览器已经实现了这个API，这就是requestIdleCallback (opens new window)。但是由于以下因素，React放弃使用：

    浏览器兼容性
    触发频率不稳定，受很多因素影响。比如当我们的浏览器切换tab后，之前tab注册的requestIdleCallback触发的频率会变得很低
    基于以上原因，React实现了功能更完备的requestIdleCallbackpolyfill，这就是Scheduler。除了在空闲时触发回调的功能外，Scheduler还提供了多种调度优先级供任务设置。
2. Reconciler（协调器）负责找出变化的组件     
    我们知道，在React15中Reconciler是递归处理虚拟DOM的。让我们看看React16的Reconciler (opens new window)。

    我们可以看见，更新工作从递归变成了可以中断的循环过程。每次循环都会调用shouldYield判断当前是否有剩余时间。

    ```javascript
    /** @noinline */
    function workLoopConcurrent() {
    // Perform work until Scheduler asks us to yield
    while (workInProgress !== null && !shouldYield()) {
        workInProgress = performUnitOfWork(workInProgress);
    }
    }
    ```
    那么React16是如何解决中断更新时DOM渲染不完全的问题呢？

    在React16中，Reconciler与Renderer不再是交替工作。当Scheduler将任务交给Reconciler后，Reconciler会为变化的虚拟DOM打上代表增/删/更新的标记，类似这样：

    ```javascript
    export const Placement = /*             */ 0b0000000000010;
    export const Update = /*                */ 0b0000000000100;
    export const PlacementAndUpdate = /*    */ 0b0000000000110;
    export const Deletion = /*              */ 0b0000000001000;
    ```
    全部的标记见这里(opens new window)

    整个Scheduler与Reconciler的工作都在内存中进行。只有当所有组件都完成Reconciler的工作，才会统一交给Renderer。
3. Renderer（渲染器） 负责将变化的组件渲染到页面上     
    Renderer根据Reconciler为虚拟DOM打的标记，同步执行对应的DOM操作。
    在执行renderer之前可能会由于以下原因中断:     
    1. 有其他更高优先级任务需要先更新
    2. 当前帧没有剩余时间
    但是在renderer之前的工作是在内存中进行的，所以不会 更新到页面上，所以即使反复的中断也不会出现更新不完全的情况 


** 代数效应
它可以把「做什么」和「怎么做」完全分离。

它可以让你写代码的时候先把注意力都放在「做什么」上：

```javascript
function enumerateFiles(dir) {
  const contents = perform OpenDirectory(dir);
  perform Log('Enumerating files in ', dir);
  for (let file of contents.files) {
    perform HandleFile(file);
  }
  perform Log('Enumerating subdirectories in ', dir);
  for (let directory of contents.dir) {
    // 我们可以递归或者调用别的有效应的函数
    enumerateFiles(directory);
  }
  perform Log('Done');
}
```
然后再把上面的代码用「怎么做」包裹起来：

```javascript
let files = [];
try {
  enumerateFiles('C:\\');
} handle (effect) {
  if (effect instanceof Log) {
    myLoggingLibrary.log(effect.message);
    resume;
  } else if (effect instanceof OpenDirectory) {
    myFileSystemImpl.openDir(effect.dirName, (contents) => {
      resume with contents;
    });
  } else if (effect instanceof HandleFile) {
    files.push(effect.fileName);
    resume;
  }
}
// `files`数组里现在有所有的文件了
```
这甚至意味着上面的函数可以被封装成代码库了：

```javascript
import { withMyLoggingLibrary } from 'my-log';
import { withMyFileSystem } from 'my-fs';

function ourProgram() {
  enumerateFiles('C:\\');
}

withMyLoggingLibrary(() => {
  withMyFileSystem(() => {
    ourProgram();
  });
});
```
与async/await不同的是，代数效应不会把中间的代码搞复杂。enumerateFile可能位于outProgram底下相当深的调用链条中，但是只要它的上方某处存在着效应处理块，我们的代码就能运行。

代数效应同样允许我们不用写太多脚手架代码就能把业务逻辑和实现它的效应的具体代码分离开。比如说，我们可以在测试中用一个伪造的文件系统和日志系统来代替上面的生产环境：

```javascript
import { withFakeFileSystem } from 'fake-fs';

function withLogSnapshot(fn) {
  let logs = [];
  try {
    fn();
  } handle (effect) {
    if (effect instanceof Log) {
      logs.push(effect.message);
      resume;
    }
  }
  // Snapshot emitted logs.
  expect(logs).toMatchSnapshot();
}

test('my program', () => {
  const fakeFiles = [/* ... */];
  withFakeFileSystem(fakeFiles, () => {
    withLogSnapshot(() => {
      ourProgram();
     });
  });
});
```
因为这里没有「颜色」问题（夹在中间的代码不需要管代数效应），并且代数效应是可组合的（你可以把它嵌套起来），你可以用它创建表达能力超强的抽象。    

# <center>React17.0.2</center>
###  目录结构   
---   
```javascript
除去配置文件和隐藏文件夹，根目录的文件夹包括三个
根目录
├── fixtures        # 包含一些给贡献者准备的小型 React 测试项目
├── packages        # 包含元数据（比如 package.json）和 React 仓库中所有 package 的源码（子目录 src）
├── scripts         # 各种工具链的脚本，比如git、jest、eslint等
```
##### packages目录(主要)     
1.  react文件夹    
    react的核心，包含所有全局 React API,这些 API 是全平台通用的，它不包含ReactDOM、ReactNative等平台特定的代码。在 NPM 上作为单独的一个包发布。     

2. scheduler文件夹     
    Scheduler（调度器）的实现。     

3. shared文件夹  
    源码中其他模块公用的方法和全局变量，比如在shared/ReactSymbols.js 中保存React不同组件类型的定义。    

4. Renderer相关的文件夹     
    ```javascript
    - react-art
    - react-dom                 # 注意这同时是DOM和SSR（服务端渲染）的入口
    - react-native-renderer
    - react-noop-renderer       # 用于debug fiber（后面会介绍fiber）
    - react-test-renderer
    ```     

5. 试验性包的文件夹     
    React将自己流程中的一部分抽离出来，形成可以独立使用的包，由于他们是试验性质的，所以不被建议在生产环境使用。包括如下文件夹：   
    ```javascript
    - react-server        # 创建自定义SSR流
    - react-client        # 创建自定义的流
    - react-fetch         # 用于数据请求
    - react-interactions  # 用于测试交互相关的内部特性，比如React的事件模型
    - react-reconciler    # Reconciler的实现，你可以用他构建自己的Renderer
    ```     

6. 辅助包的文件夹    
    React将一些辅助功能形成单独的包。包括如下文件夹：
    ```javascript
    - react-is       # 用于测试组件是否是某类型
    - react-client   # 创建自定义的流
    - react-fetch    # 用于数据请求
    - react-refresh  # “热重载”的React官方实现
    ```     

7. react-reconciler文件夹     
    虽然他是一个实验性的包，内部的很多功能在正式版本中还未开放。但是他一边对接Scheduler，一边对接不同平台的Renderer，构成了整个 React16 的架构体系。

---    
####  Fiber    
---      
1. 作为架构来说:    
之前React15的Reconciler采用递归的方式执行，数据保存在递归调用栈中，所以被称为stack Reconciler。React16的Reconciler基于Fiber节点实现，被称为Fiber Reconciler。    
2. 作为静态的数据结构来说:    
每个Fiber节点对应一个React element，保存了该组件的类型（函数组件/类组件/原生组件...）、对应的DOM节点等信息。       
3. 作为动态的工作单元来说:      
每个Fiber节点保存了本次更新中该组件改变的状态、要执行的工作（需要被删除/被插入页面中/被更新...）。

文件位置: react-17.0.2/packages/react-reconciler/src/ReactFiber 这里有两个，一个是.new一个是.old


#### diff多节点(新旧对比都没有遍历完时),快速判断需要移动几个节点
在旧节点里面存在的情况下
找到开始降序时的峰值，后边出现比他小的就是需要移动的节点
