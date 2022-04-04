<center>tsconfig.json</center>
# 降级编译    
---    
把target的值修改为es5则会将文件编译成低版本

# 严格模式   
---
strict =  noImplicity + strictNullChecks 


<center>常用类型</center>

# 基本类型(首字母大小写均可)
1. string/String
2. number/Number
3. boolean/Boolean

# 数组  
type[] or Array<type>

# 对象
两队键值之间可用分号或者逗号间隔

# 联合类型(管道符| 联合多种类型)
# 类型别名（type 关键字声明）如type p = {x: number; y: number}
# 类型别名扩展（&符合)   
type a = {
    a: number
}
type b =  a & {b: string}

# 类型断言    
xxx as someType
<someType>xxx      

<center>泛型函数</center>

# 基本
```
function foo<Type>(arr: Type[]): Type | undefined {
    return arr[0]
}

例子
function map<Input, Output>(arr: Input[], func:(arr: Input)=> Output): Output[] {
    return arr.map(func)
}

const res = map(['1','2'], (n)=>parseInt(n))
自动推导n为string,则Input为string，
parseInt返回number,则output为number
```

# 限制条件
<Type extends {x: number}>


<center>函数内this声明</center>
```typescript
const user = {
    admin: false,
    foo: function() {
        this.admin = true;
    }
}

interface User{
    admin: boolean
}
interface DB {
    foo2(filter: (this: User) => Boolean): User[]
}

const db: DB = {
    foo2: (filter: (this: User) => boolean) => {
        let u1 = {
            admin: true
        }
        return [u1]
    }
}

<!-- 注意不能是箭头函数 -->
const a = db.foo2(function(this: User)) {
    return this.admin
}
```


# 参数解构
```typescript
function foo({a,b,c}: {a: number, b: number, c: number}){}
foo({a:1, b: 2, c: 3})
```

# 接口和交叉类型(&)的区别
接口重复定义会叠加， type重复定义会冲突
如
```typescript
interface a {
    a: number
}
interface a {
    b: number
}
上面a相当于{
    a: number
    b: number
}
type a = {
    a: number
}
// 下面错误
type a = {
    b: number
}

```

# extends keyof
```typescript
function foo<T, key extends keyof T>(arg: T, k: key) {
    return arg[k]
}
// key必须是T中存在的属性
let x = {
    a: 1
}
foo(a, 'a')
```


<center>模块</center>

# 主要考虑
```
1. 语法
用什么语法导入导出
2. 模块解析
模块名称（或者路径）和磁盘上的文件之间是什么关系
3. 模块输出目标
编译出来的js模块应该是什么样的
```

# es模块语法
export default --- import

# ts 特定的模块语法
```
a.ts
export type Cat = {
    breed: strig
    age: number
}
export interface Dog {
    b: string
}

export const d = () => 'str'

b.ts
improt {type Cat ,type Dog, d } from './a'

type c = Cat | Dog

commonjs
module或者module.exports或者exports --- require
// 一次性
a.ts
module.exports = {
    pi: 3.14
}
// 分多次
exports.pi = 3.14

b.ts
const a = require('./a.ts')
a.pi

使用commonjs特殊行为
import fs = require('fs)
fs.readFileSync
```


<center>类型声明文件</center>

```
ts中有两种文件类型
1. ts
既包含类型信又有可执行代码
可以被编译成js文件
这是编写程序的地方
2. d.ts
只有类型信息的类型声明文件
不能生成js文件，仅仅提供类型信息,不能写可执行代码
为js提供类型信息

如果要给js库提供类型信息，需要.d.ts文件
```

# 第三方库的类型声明文件

有两种存在形式
1. 库自己带有类型声明文件： 如axios，这种情况下，正常导入这个库，ts就会自动加载库自己的类型声明文件
是通过package.josn中的typings选项指定类型文件自动导入的，还可以使用types字段指定类型声明文件
2. 由DefinitelyTyped提供
如果第三方没有ts类型声明，可以使用@types/xx来下载DefinitelyTyped里面的这个包的声明文件(前提是存在这个第三方的类型文件);这种方式ts也会自动加载声明包
可以在ts官方文档搜索这个第三方包是否存在类型声明文件


# 创建自己的类型声明文件
1. 项目内共享类型
```
步骤
1.创建xx.d.ts
2.创建共享类型， 使用export导出
3.在需要使用共享类型的ts文件中通过import导入即可(.d.ts后缀导入时直接省略)
```
2. 为已有js文件提供类型声明文件(需要ts-loader)
```
1. 将js项目迁移到ts项目时，为了让js文件有类型声明
2. 称为库作者，创建库给别人使用
```

```
在导入js文件时，ts会自动加载与js同名的.d.ts文件，来提供类型声明
declare 关键字：用于类型声明，为其他地方（如js文件) 已存在的变量声明类型，而不是创建一个新的变量
1. 对于type，interface等这些明确就是ts类型的（只能在ts中使用），可以省略declare关键字
2. 对于let，function等具有双重含义（在js，ts中都能用的）应该使用declare这个关键字，明确用于类型声明

比如
a.js
let c = 1
let p = {
    x: 1
    y: 2
}
a.d.ts 为已存在的变量提供类型声明
declare let c: number
interface P{
    x: number
    y: number
}
declare let p: P

声明好后还需要导出
export {
    c,
    p
}
```

# 三斜线指令   
在.d.ts文件中指定依赖的其他类型声明文件，types表示依赖的类型声明文件包的名称
如在react-app-env.d.ts(react项目默认的类型声明文件)中
/// <reference types="react-scripts"/>
告诉ts帮我们加载react-scripts这个包提供的类型声明
react-scripts的类型声明文件包括两个部分
1. react,react-dom,node的类型
2. 图片，样式等模块的类型，以允许在代码中导入图片，svg等文件
CRA,ts模板里面ts会自动加载该.d.ts文件,以提供类型声明（通过修改tsconfig。json中的include配置来验证)