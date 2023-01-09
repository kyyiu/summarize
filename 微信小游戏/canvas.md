# 原理   
小游戏的画面和动画都是canvas实现的。和h5的用法完全一样。
区别是h5是通过标签声明的画布对象，js通过dom获取；
小游戏中，没有html页面。 收益官方给的libs中的weapp-adapter.js给我们创建了一个全局的canvas对象，只需要在game.js通过import方式将libs下的两个文件引入，入环我们的任何一个js文件都可以使用这个canvas对象了

```javascript
html 
<canvas id='c'/>
const c = document.getElementById('c')
const ctx = c.getContext('2d')

小游戏 game.js
import ./js/libs/symbol
import ./js/libs/weapp-adapter

const ctx = canvas.getContext('2d')
```

# 坐标系
左上角为原点
向右为正
向下为正