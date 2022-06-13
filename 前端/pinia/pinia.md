# 安装
npm i pinia -S

# 使用
```javascript
vue2 
import {PiniaVuePlugin} from 'pinia'
vue3
import {createPinia} from 'pinia'
const store = createPinia()
app.use(store)
```

# 初始化
```javascript
src/store/store-name.ts
export const enum Names {
    Test: 'TEST'
}

src/store/index.ts
import {defineStore} from 'pinia'
import {Names} from './store-name'
export const useTestStore = defineStore(Names.TEST, {
    state: () => {
        return {
            current: 1
        }
    },
    // computed 修饰一些值
    getters: {

    },
    // methods 可以做同步 异步，提交state
    actions: {

    }
})

使用
script setup lang='ts'
import {useTestStore} from './store'
const t = useTestStore()
script
div
    {{t.current}}
div
```

# state
```javascript
1. 修改可以直接修改，如上例子
t.current = 2
2. $patch
t.$patch({
    current: 2
})
3. 带逻辑的$patch
t.$patch((state) => {
    state.current = 2
})
4. $state (需要修改所有的值)
t.$state = {current: 2}
5. 在actions中
setCurrent(x) {
    this.current = x
}
t.setCurrent(x)
```

# 结构
```javascript
// pinia结构不具有响应式
const {current} = t
使用storeToRefs解决
import {storeToRefs} from 'pinia'
const {current} = storeToRefs(t) // 原理是先把t变成原始数据，再toRef,先变原始数据是为了防止重复引用
或者
current.value 来修改值
```


# Actions getters
```javascritp
src/store/index.ts
type User = {
    name: string,
    age: number
}
let res: User = {
    name: 'a',
    age: 1
}

const login = () => {
    return new Promise((resv) => {
        setTImeout(() => {
            resv({
                name: 'a',
                age: 1
            })
        })
    })
}

同步写法
actions: {
    setUser() {
        this.user = res;
    }
}
vue中使用setUser即可
异步
async setUser() {
        const r = await login();
        this.user = r;
    }

getters: {
    newName(): String {
        return `$-${this.name}
    }
}
t.newName
```

# Api
```javascritp
$reset
t.$reset() // 恢复到默认值

$subscribe
t.$subscribe((args, state) => {
    // 只要有值变化就会调用
})

$onAction
t.$onAction((args)=>{
    //args是传入的参数数组
    args.after(()=>{

    })
})
```

# 持久化
```javascript
main.ts
type Options = {
    key?:string
}

const __piniaKey__:string = 'h'

const setStorage = (key: string, value: any) => {
    localStorage.setItem(key, JSON.strigify(value))
}

const getStorage = (key:string) => {
    return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key) as string) : {}
}

const piniaPlugin = (options) => {
    // 柯里化
    return (context: PiniaPluginContext) => {
        const {store} = context
        const data = getStorage(`${options?.key ?? __piniaKey__}-${store.$id}`)
    store.$subscribe(() => {
        setStorage(`${options?.key ?? __piniaKey__}-${store.$id}`, toRaw(store.$state))
    })
    return {
        ...data
    }
    }
}

store.use(piniaPlugin({
    key: 'pinia'
}))
```