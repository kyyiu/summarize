# React api
文档: [react-api](https://zh-hans.reactjs.org/docs/react-api.html)

## 组件类 api      

组件类，详细分的话有三种类，
第一类说白了就是我平时用于继承的基类组件Component,PureComponent,
还有就是react提供的内置的组件，比如Fragment,StrictMode,
另一部分就是高阶组件forwardRef,memo等。

### Component
```
Component是class组件的根基。类组件一切始于Component。对于React.Component使用，我们没有什么好讲的。我们这里重点研究一下react对Component做了些什么。
react/src/ReactBaseClasses.js

function Component(props, context, updater) {
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  this.updater = updater || ReactNoopUpdateQueue;
}
这就是Component函数，其中updater对象上保存着更新组件的方法。

我们声明的类组件是什么时候以何种形式被实例化的呢？
react-reconciler/src/ReactFiberClassComponent.js

constructClassInstance
function constructClassInstance(
    workInProgress,
    ctor,
    props
){
   const instance = new ctor(props, context);
    instance.updater = {
        isMounted,
        enqueueSetState(){
            /* setState 触发这里面的逻辑 */
        },
        enqueueReplaceState(){},
        enqueueForceUpdate(){
            /* forceUpdate 触发这里的逻辑 */
        }
    }
}
对于Component， react 处理逻辑还是很简单的，实例化我们类组件，然后赋值updater对象，负责组件的更新。然后在组件各个阶段，执行类组件的render函数，和对应的生命周期函数就可以了。
```
### PureComponent    
```
PureComponent和 Component用法，差不多一样，唯一不同的是，纯组件PureComponent会浅比较，props和state是否相同，来决定是否重新渲染组件。所以一般用于性能调优，减少render次数。
```

### memo    
```
React.memo和PureComponent作用类似，可以用作性能优化，React.memo 是高阶组件，函数组件和类组件都可以使用， 和区别PureComponent是 React.memo只能对props的情况确定是否渲染，而PureComponent是针对props和state。
React.memo 接受两个参数，第一个参数原始组件本身，第二个参数，可以根据一次更新中props是否相同决定原始组件是否重新渲染。是一个返回布尔值，true 证明组件无须重新渲染，false证明组件需要重新渲染，这个和类组件中的shouldComponentUpdate()正好相反 。
React.memo: 第二个参数 返回 true 组件不渲染 ， 返回 false 组件重新渲染。
shouldComponentUpdate: 返回 true 组件渲染 ， 返回 false 组件不渲染。
```


# React Dom api
文档 [react-dom-api](https://zh-hans.reactjs.org/docs/react-dom.html)
