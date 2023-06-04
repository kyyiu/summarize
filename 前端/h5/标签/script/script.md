# type=module

在 script 标签中写 js 代码，或者使用 src 引入 js 文件时，
默认不能使用 module 形式，即不能使用 import 导入文件，
但是我们可以再 script 标签上加上 type=module 属性来改变方式。

```html
// index.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    // 方法 1 ： 引入module.js，然后在script标签里面调用
    <script type="module">
      import test from "./module.js";
      console.log(test());
    </script>

    // 方法 2 ： 直接引入index.js，使用src引入
    <script type="module" src="./index.js"></script>
  </body>
</html>
```

# type=importmap

```html
<script type="importmap">
  {
    "imports": {
      "react": "https://cdn.skypack.dev/react@17.0.1",
      "react-dom": "https://cdn.skypack.dev/react-dom",
      "square": "./modules/square.js",
      "lodash": "/node_modules/lodash-es/lodash.js"
    }
  }
</script>
<script type="module">
  import { cloneDeep } from "lodash";

  const objects = [{ a: 1 }, { b: 2 }];

  const deep = cloneDeep(objects);
  console.log(deep[0] === objects[0]);
</script>

import map 是通过HTML document中的
<script type="importmap">
  标签指定的。
  这个script 标签必须放在 document 中的中第一个 <script type="module">标签之前（最好是在<head>中），
  以便在进行模块解析之前对它进行解析。此外，目前每个 document 只允许有一个 import map，未来可能会取消这一限制。

  当在映射中指定相对URL时，确保它们总是以/、./或./开头。
  请注意，在 import map 中出现包并不意味着它一定会被浏览器加载。
  任何没有被页面上的 script 使用的模块都不会被浏览器加载，即使它存在于import map中。


  -------------
  将指定者映射到整个包中

  <script type="importmap">
  {
    "imports": {
      "lodash/": "/node_modules/lodash-es/"
    }
  }
</script>
<script type="module">
  import toUpper from "lodash/toUpper.js";
  import toLower from "lodash/toLower.js";

  console.log(toUpper("hello"));
  console.log(toLower("HELLO"));
</script>
============= 动态地构建 import map
<script>
  const importMap = {
    imports: {
      lazyload:
        "IntersectionObserver" in window
          ? "./lazyload.js"
          : "./lazyload-fallback.js",
    },
  };

  const im = document.createElement("script");
  im.type = "importmap";
  im.textContent = JSON.stringify(importMap);
  document.currentScript.after(im);
</script>

想使用这种方法，请确保在创建和插入 import map
脚本标签之前进行（如上所述），因为修改一个已经存在的导入地图对象不会有任何效果。
```
