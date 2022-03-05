# 尺寸体系      
---     
fit-content     
如名一般，适配内容
如width: fit-content则宽度就是是内容的宽度
垂直居中新方式
```css
/* .o 意味着外层元素 */
.o{
    /* .o适配内容的宽高 */
    width: fit-content; height: fit-content;
    /* 
    margin当成.o的外层盒子比较好理解 
    本来应该占满屏幕，但是被限制了，所以剩余部分用margin补全
    自然垂直居中了
    */
    margin: auto;
    /* 本来绝对定位元素实现居中效果需要具体的width和height
        但是设置了fit-content就相当于给了元素的宽高
    */
    position: absolute;
    /* 占满屏幕 */
    top: 0; right: 0;bottom: 0;left: 0;
}
```    
[更多css实现垂直居中](https://www.cnblogs.com/hutuzhu/p/4450850.html)         

min-content       
最小内容宽度      
元素由4个盒子占据的尺寸决定，其中只有content-box随着内容的不同，最小内容宽度也会不同.      
1. 替换元素      
按钮，视频，图片等元素，他们的最小内容宽度是当前元素内容自身的宽度。    
```html
<section>
    <img src='1.jpg'/>
</section>
如果1.jpg原始尺寸是100x200则section最小内容宽度是200
```      

2. CJK文字     
中文，日文，韩文的英文首字母，以中文为例，如果是没有标点的中文，则最小内容宽度为单个汉字的宽度
```css
如
p {
    width: min-content;
    outline: 1px dotted;
}
<p>哈哈哈</p>
显示为一竖文字
```     
如果这段中文包含避头标点(不能在开头的标点，如句号，问号)或者避尾标点，同时line-break的属性值不是anywhere，则最终的最小内容宽度要计算这些标点字符的宽度     



# Css逻辑    
---     
css属性的定位都是基于方向的，而不是流
比如margin-right，如果改变流为rtl则会出现不符合预期的效果     
margin-inline-end是内联元素文档流结束的方向，等同于marign-right和rtl时的margin-left    

逻辑属性需要配合writing-mode，direction或者text-orientation属性才有使用意义.     


inset属性     
```css
.i {
    position: absolute;
    top: 0; right: 0;bottom: 0;left: 0;
}
等同于
.i {
   position: absolute;
   /* inset的参数类似margin这些 */
   inset: 0;
}
```      


# 深入了解Sticky属性值和粘性定位     
---     
粘性定位效果底层的渲染规则和固定定位没有任何关闭，而是相对定位的延伸    
粘性定位和相对定位的相似之处：   
1. 元素发生偏移时，元素的原始位置是保留的    
2. 创建了新的绝对定位包含块，也就是粘性定位元素里面如果有绝对定位的子元素，则这个子元素设置tlbr的偏移计算是相对于粘性元素的    
3. 支持z-index关闭重叠顺序     
不一样的地方：      
1. 偏移计算元素不一样，相对定位偏移计算的容器是父元素，粘性定位偏移计算的是层级最近的可滚动元素。如果没有则相对浏览器视口进行偏移     
2. 偏移计算规则不同。 粘性定位的计算复杂，涉及多个粘性定位专有概念。     
3. 重叠表现不同。相对定位彼此独立，重叠时表现为堆叠，粘性则会互斥   

流盒--指粘性定位元素最近的可滚动元素的尺寸     
粘性约束盒子--指包含粘性定位的元素（一般指父元素）    
粘性定位元素会在粘性约束盒子和流盒的交集盒子里面进行相对于流盒定位     


# 颜色    
1. tranparent
本质上就是rgba(0,0,0,0)
2. currentColor    
不是当前元素(或伪元素)所使用的color的计算值
3. HSL颜色   
色调（HUe）饱和度（Saturation）亮度（lightness）
色调相关的是角度，无论多少都会转换为360deg内如： -120deg=240deg
饱和度和亮度是百分比    
特殊点：red = 0deg， green=120deg， blue=240deg
通过改变亮度这些可以轻松实现交换反馈     


# background属性    
1. background-size属性     
cover & contain    
两者都不会改变背景图的原始比例
前者表示背景图尽可能把当前元素完全覆盖不留空白
后者表示尽可能把背景图包含在当前元素内，不进行任何裁剪     

auto关键字下的尺寸渲染规则    
需要知道的概念：内在尺寸（图像原始大小），内在比例（图像原始比例）
如果设置background-size: auto 或者 auto auto 或者不设置(按auto auto处理) 那么：
图像水平和垂直同时具有内在尺寸，则按照图像原始大小渲染;
图像没有内在尺寸也没有内在比例则按照背景定位区域的大小进行渲染，等同于设置100% ;
如果只有内在比例，等同于contain    
如果只有一个方向有内在尺寸， 但又具有内在比例，则图像会拉伸到该内在尺寸的大小，同时宽高比符合内在比例。   
如果只有一个方向又内在尺寸而没有内在比例，则图像有内在尺寸的一侧会拉伸到该内在尺寸大小，没有设置内在尺寸的一侧会拉伸到背景定位区域的大小     

# background-clip     
默认值是border-content     
即图像会占满border-content
可以利用backgroun的多图像特性实现渐变色border      


# background-origin    
默认值是padding-content     
即图像是从paddingbox左上角开始渲染的