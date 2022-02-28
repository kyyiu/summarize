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