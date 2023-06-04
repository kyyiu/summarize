# 直接下载官方的文件

```
下载地址
https://github.com/mrdoob/three.js/releases
找到对应的版本Assets下载即可
```

# 查看对应版本的文档

```
由于官方文档为最新版本
我们下载完官方对应版本的包后
执行npm i下载依赖
npm run start启动
打开https://localhost:8080/docs/即可查看
其他还有一些东西到https://localhost:8080按需要查看
比如examples下就是使用案例
```

# npm 安装

```
npm install three@0.148.0 --save

需要注意版本，three更新很频繁
```

# 引入

```
// 引入three.js
import * as THREE from 'three';
```

# 引入 three.js 其他扩展库

```
// 引入扩展库OrbitControls.js
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// 引入扩展库GLTFLoader.js
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
```
