###  安装     
---      
将 Vue.js 添加到项目中主要有四种方式：       

1. 在页面上以 CDN 包的形式导入。        
>```html
对于制作原型或学习，你可以这样使用最新版本：
<script src="https://unpkg.com/vue@next"></script>
```     

2. 下载 JavaScript 文件并自行托管。      
>下载相关js文件并自行托管在你的服务器上。然后你可以通过 script 标签引入，与使用 CDN 的方法类似。        

3. 使用 npm 安装它。       
>在用 Vue 构建大型应用时推荐使用 npm 安装。npm 能很好地和诸如 webpack 或 Rollup 模块打包器配合使用。         
```sh
# 最新稳定版
$ npm install vue@next
```          
Vue 还提供了编写单文件组件的配套工具。如果你想使用单文件组件，那么你还需要安装 @vue/compiler-sfc：
```sh
$ npm install -D @vue/compiler-sfc
```        
如果你是从 Vue 2 过渡而来的，请注意 @vue/compiler-sfc 替换掉了 vue-template-compiler        
除了 @vue/compiler-sfc 之外，你还需要为已选择的打包工具选择一个配套的单文件组件 loader 或 plugin。         

4. 使用官方的 CLI 来构建一个项目，它为现代前端工作流程提供了功能齐备的构建设置 (例如，热重载、保存时的提示等等)。       
[vue-cli文档](https://cli.vuejs.org/zh/)       
```javascript
对于 Vue 3，你应该使用 npm 上可用的 Vue CLI v4.5 作为 @vue/cli。要升级，你应该需要全局重新安装最新版本的 @vue/cli：

yarn global add @vue/cli
# 或
npm install -g @vue/cli
然后在 Vue 项目中运行：

vue upgrade --next
```      
###  Vite       
---       
[element-plus](https://element-plus.gitee.io/zh-CN/guide/installation.html)
Vite 是一个 web 开发构建工具，由于其原生 ES 模块导入方式，可以实现闪电般的冷服务器启动（还有一个更早的快速构建工具snowpack）。         
通过在终端中运行以下命令，可以使用 Vite 快速构建 Vue 项目。     
```javascript

使用 npm：
# npm 6.x
$ npm init vite@latest <project-name> --template vue

# npm 7+，需要加上额外的双短横线
$ npm init vite@latest <project-name> -- --template vue

$ cd <project-name>
$ npm install
$ npm run dev

或者 yarn：
$ yarn create vite <project-name> --template vue
$ cd <project-name>
$ yarn
$ yarn dev
```      




