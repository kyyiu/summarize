```
1. 以流的视角看布局
2. 盒子模型的新视角
   比如
   外在盒子负责元素是可以一行显示，还是只能换行显示；
   内在盒子负责宽高、内容呈现什么的。
   那么display: inline-block 就是外面的表现为内联，内容盒子表现为块级
   所以display: block 其实是 display: block-block
3. 格式化宽度/高度, 相对于最近的具有定位特性（position
    属性值不是static
    ）的祖先元素计算。
    例如，下面一段CSS代码：
    div { position: absolute; left: 20px; right: 20px; }
    假设该<div>
    元素最近的具有定位特性的祖先元素的宽度是1000像素，则这个<div>
    元素的宽度是960（即1000-20-20）像素。

    具有完全的流体性

4. 绝对定位元素的百分比计算和非绝对定位元素的百分比计算是有区别的，区别在于绝对定位的宽高百分比计算是相对于padding box的，
也就是说会把padding大小值计算在内，
但是，非绝对定位元素则是相对于content box计算的。


5. min-width/min-height
的初始值是auto
，max-width/max-height
的初始值是none

none
的原因是因为要防止覆盖width/height导致不生效

而且这种覆盖规则权重是大于!important的
 min-width 的优先级大于max-width

 6.任意高度元素的展开收起动画技术
 http://demo.cssworld.cn/3/3-2.php


 7.内联盒模型的幽灵空白节点
```

#  什么是替换元素
    通过修改某个属性值呈现的内容就可以被替换的元素就称为“替换元素”。因此，<img>
    、<object>
    、<video>
    、<iframe>
    或者表单元素<textarea>
    和<input>
    都是典型的替换元素。

# 替换元素特性
1. 内容的外观不受页面上的CSS的影响
。用专业的话讲就是在样式表现在CSS作用域之外。如何更改替换元素本身的外观？需要类似appearance
属性，或者浏览器自身暴露的一些样式接口，例如::-ms-check{}
可以更改高版本IE浏览器下单复选框的内间距、背景色等样式，但是直接input[type='checkbox']{}
却无法更改内间距、背景色等样式。

2. 有自己的尺寸。
在Web中，很多替换元素在没有明确尺寸设定的情况下，其默认的尺寸（不包括边框）是300像素×150像素

3. 在很多CSS属性上有自己的一套表现规则。

#  替换元素的尺寸计算规则
1. 固有尺寸
    指的是替换内容原本的尺寸。例如，图片、视频作为一个独立文件存在的时候，都是有着自己的宽度和高度的
2. HTML尺寸
    比如 <img width="300" height="100"/>
    <input type="file" size="30"><textarea cols="20" rows="5></textarea>
3. CSS尺寸。
    通过width和height或者max-width/min-width和max-height/min-height设置的尺寸
如果没有CSS尺寸和HTML尺寸，则使用固有尺寸作为最终的宽高;
如果“固有尺寸”含有固有的宽高比例，同时仅设置了宽度或仅设置了高度，则元素依然按照固有的宽高比例显示

# 图片滚动懒加载优化
透明的占位图片也是多余的资源，我们直接：
<img>
然后配合下面的CSS可以实现一样的效果：
img { visibility: hidden; }
img[src] { visibility: visi
ble; }
注意，这里的<img>
直接没有src
属性，再强调一遍，是直接没有，不是src=""
，src=""
在很多浏览器下依然会有请求，而且请求的是当前页面数据。当图片的src
属性缺省的时候，图片不会有任何请求，是最高效的实现方式。

# 图片还没加载时就把alt信息呈现
https://demo.cssworld.cn/4/1-2.php
# 图片切换
https://demo.cssworld.cn/4/1-4.php

# “正在加载中...”
```
dot {　  
    display: inline-block;
 　  height: 1em;　  
 line-height: 1;　  
 text-align: left;　  
vertical-align: -.25em;　  
overflow: hidden;
}
dot::before {　  
    display: block;　  
    content: '...\A..\A.';
　  white-space: pre-wrap;
　  animation: dot 3s infinite step-start both;}
@keyframes dot {　  
    33% { transform:translateY(-2em); }　  
    66% { transform:translateY(-1em); 
    }
```


# 锚点定位优化
```

<h3 id="hash">标题</h3>
h3 {　  line-height: 30px;
　  font-size: 14px;}

成：
<h3><span id="hash">标题</span></h3>
h3 {　  line-height: 30px;　  font-size: 14px;}h3 > span {　  padding-top: 58px;}

这样既不影响原来的布局和定位，同时又把http://www.cssword.cn/xxxx/#hash
定位位置往下移动了50像素
```

# 锚点定位行为是基于什么条件触发的?
```
下面两种情况可以触发锚点定位行为的发生：
（1）URL地址中的锚链与锚点元素对应并有交互行为；
（2）可focus的锚点元素处于focus状态
```

# margin 合并发生
1. 块级元素，但不包括浮动和绝对定位元素，尽管浮动和绝对定位可以让元素块状化

2. 只发生在当前文档流垂直方向

# margin 常见合并场景
1. 相邻兄弟元素margin合并
2. 父级和第一个/最后一个子元素(子元素的margin露出到父级)
    解决方案
    父元素设置为块状格式化上下文元素；
    父元素设置border-top值；
    父元素设置padding-top值；
    父元素和第一个子元素之间添加内联元素进行分隔

3. 空块级元素的margin合并
```
p { margin: 1em 0; }
<p>第一行</p><div></div><p>第二行</p
```
    解决方案
    置垂直方向的border；
    设置垂直方向的padding；
    里面添加内联元素（直接Space键空格是没用的）；
    设置height或者min-height。

# 合并取值规则
1. 同号取绝对值最大
2. 不同号相加


# margin:auto
触发margin:auto计算有一个前提条件，
就是width或height为auto时，元素是具有对应方向的自动填充特性的
填充规则如下。
（1）如果一侧定值，一侧auto，则auto为剩余空间大小。
（2）如果两侧均是auto，则平分剩余空间。


# line-height 大值特性
当.box元素设置line-height:96px时，
“字符”高度96px；当设置line-height:20px时，
<span>元素的高度则变成了96px，
而行框盒子的高度是由高度最高的那个“内联盒子”决定的，
这就是.box元素高度永远都是最大的那个line-height的原因。

那么设置<span>元素display:inline-block，
创建一个独立的“行框盒子”，这样<span>元素设置的line-height:20px
就可以生效了

# 图标文字对齐方案
http://demo.cssworld.cn/5/3-7.php

# 基于vertical-align的弹框永远居中(兼容ie7)
http://demo.cssworld.cn/5/3-10.php

# float 特性
包裹性；
块状化并格式化上下文；
破坏文档流；
没有任何margin合并 

# clear
处理float属性带来的高度塌陷等问题的属性
none：默认值，左右浮动来就来。
left：左侧抗浮动。
right：右侧抗浮动。
both：两侧抗浮动。

clear属性是让自身不能和前面的浮动元素相邻

clear属性只有块级元素才有效的，而::after等伪元素默认都是内联水平，
这就是借助伪元素清除浮动影响时需要设置display属性值的原因。

clear:both
的作用本质是让自己不和float
元素在一行显示，并不是真正意义上的清除浮动，因此float
元素一些不好的特性依然存在，于是，会有类似下面的现象。
（1）如果clear:both
元素前面的元素就是float
元素，则margin-top
负值即使设成-9999px
，也不见任何效果。
（
2）clear:both
后面的元素依旧可能会发生文字环绕的现象。


# BFC
BFC全称为block formatting context，中文为“块级格式化上下文”
触发BFC呢？常见的情况如下：
<html>
根元素；
float的值不为none； 但是会破环元素本身的流动性
overflow的值为auto、scroll或hidden； 很好只是会隐藏溢出的场景
display的值为table-cell、table-caption和inline-block中的任何一个； 会让元素事情水平流动性
position的值不为relative和static。脱离文档流难以和非定位元素一起

# 滚动条
整体部分
，::-webkit-scrollbar；
两端按钮
，::-webkit-scrollbar-button；
外层轨道
，::-webkit-scrollbar-track；
内层轨道
，::-webkit-scrollbar-track-piece；
滚动滑块
，::-webkit-scrollbar-thumb；
边角
，::-webkit-scrollbar-corner