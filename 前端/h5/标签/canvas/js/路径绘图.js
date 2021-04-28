

// 首先，你需要创建路径起始点。
// 然后你使用画图命令去画出路径。
// 之后你把路径封闭。
// 一旦路径生成，你就能通过描边或填充路径区域来渲染图形。
// 以下是所要用到的函数：

// beginPath()
// 新建一条路径，生成之后，图形绘制命令被指向到路径上生成路径。
// closePath()
// 闭合路径之后图形绘制命令又重新指向到上下文中。
// stroke()
// 通过线条来绘制图形轮廓。
// fill()
// 通过填充路径的内容区域生成实心的图形。
// 生成路径的第一步叫做beginPath()。本质上，路径是由很多子路径构成，这些子路径都是在一个列表中，所有的子路径（线、弧形、等等）构成图形。
// 而每次这个方法调用之后，列表清空重置，然后我们就可以重新绘制新的图形。

// 注意：当前路径为空，即调用beginPath()之后，或者canvas刚建的时候，第一条路径构造命令通常被视为是moveTo（），无论实际上是什么。
// 出于这个原因，你几乎总是要在设置路径之后专门指定你的起始位置。
// 第二步就是调用函数指定绘制路径，本文稍后我们就能看到了。

// 第三，就是闭合路径closePath(),不是必需的。这个方法会通过绘制一条从当前点到开始点的直线来闭合图形。如果图形是已经闭合了的，
// 即当前点为开始点，该函数什么也不做。

// 注意：当你调用fill()函数时，所有没有闭合的形状都会自动闭合，所以你不需要调用closePath()函数。但是调用stroke()时不会自动闭合。


// 移动笔触
// 一个非常有用的函数，而这个函数实际上并不能画出任何东西，也是上面所描述的路径列表的一部分，这个函数就是moveTo()。
// 或者你可以想象一下在纸上作业，一支钢笔或者铅笔的笔尖从一个点到另一个点的移动过程。
// moveTo(x, y)
// 将笔触移动到指定的坐标x以及y上。
// 绘制直线，需要用到的方法lineTo()。
// lineTo(x, y)
// 绘制一条从当前位置到指定x以及y位置的直线。
function triangle(obj){
	var ctx = obj
	// ctx.beginPath();
	// ctx.moveTo(75, 50);
	// ctx.lineTo(100, 75);
	// ctx.lineTo(100, 25);
	// ctx.fill();
	
	
	// 填充三角形
	 ctx.beginPath();
	 ctx.moveTo(25,25);
	 ctx.lineTo(105,25);
	 ctx.lineTo(25,105);
	 ctx.fill();
	
	 // 描边三角形
	 ctx.beginPath();
	 ctx.moveTo(125,125);
	 ctx.lineTo(125,45);
	 ctx.lineTo(45,125);
	 ctx.closePath();
	 ctx.stroke();
}

function smileFace(obj){
	var ctx = obj
	ctx.beginPath();
	ctx.arc(75,75,50,0,Math.PI*2,true); // 绘制
	// ctx.moveTo(110,75);
	ctx.arc(75,75,35,0,Math.PI,false);   // 口(顺时针)
	// ctx.moveTo(65,65);
	ctx.arc(60,65,5,0,Math.PI*2,true);  // 左眼
	// ctx.moveTo(95,65);
	ctx.arc(90,65,5,0,Math.PI*2,true);  // 右眼
	ctx.stroke();
	// 如果你想看到连续的线，你可以移除调用的moveTo()。
}


// 圆弧
// 绘制圆弧或者圆，我们使用arc()方法。当然可以使用arcTo()，不过这个的实现并不是那么的可靠，所以我们这里不作介绍。
// arc(x, y, radius, startAngle, endAngle, anticlockwise)
// 画一个以（x,y）为圆心的以radius为半径的圆弧（圆），从startAngle开始到endAngle结束，按照anticlockwise给定的方向（默认为顺时针）来生成。
// arcTo(x1, y1, x2, y2, radius)
// 根据给定的控制点和半径画一段圆弧，再以直线连接两个控制点。
// 这里详细介绍一下arc方法，该方法有六个参数：x,y为绘制圆弧所在圆上的圆心坐标。radius为半径。startAngle以及endAngle参数用弧度定义了开始以及结束的弧度。这些都是以x轴为基准
// 。参数anticlockwise为一个布尔值。为true时，是逆时针方向，否则顺时针方向。
// 注意：arc()函数中表示角的单位是弧度，不是角度。角度与弧度的js表达式:
// 弧度=(Math.PI/180)*角度。
function kindsOfCircle(obj){
	var ctx = obj
for(var i=0;i<4;i++){
 for(var j=0;j<3;j++){
 ctx.beginPath();
 var x = 25+j*50; // x 坐标值
 var y = 25+i*50; // y 坐标值
 var radius = 20; // 圆弧半径
 var startAngle = 0; // 开始点
 var endAngle = Math.PI+(Math.PI*j)/2; // 结束点
 var anticlockwise = i%2==0 ? false : true; // 顺时针或逆时针

 ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);

 if (i>1){
 ctx.fill();
 } else {
 ctx.stroke();
 }
 }
 }
}


// 二次贝塞尔曲线及三次贝塞尔曲线
// 下一个十分有用的路径类型就是贝塞尔曲线。二次及三次贝塞尔曲线都十分有用，一般用来绘制复杂有规律的图形。
// quadraticCurveTo(cp1x, cp1y, x, y)
// 绘制二次贝塞尔曲线，cp1x,cp1y为一个控制点，x,y为结束点。
// bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)
// 绘制三次贝塞尔曲线，cp1x,cp1y为控制点一，cp2x,cp2y为控制点二，x,y为结束点。
// 右边的图能够很好的描述两者的关系，二次贝塞尔曲线有一个开始点（蓝色）、一个结束点（蓝色）以及一个控制点（红色），而三次贝塞尔曲线有两个控制点。
// 参数x、y在这两个方法中都是结束点坐标。cp1x,cp1y为坐标中的第一个控制点，cp2x,cp2y为坐标中的第二个控制点。
// 使用二次以及三次贝塞尔曲线是有一定的难度的，因为不同于像Adobe Illustrators这样的矢量软件，我们所绘制的曲线没有给我们提供直接的视觉反馈。
// 这让绘制复杂的图形变得十分困难。在下面的例子中，我们会绘制一些简单有规律的图形，如果你有时间以及更多的耐心,很多复杂的图形你也可以绘制出来。

// 二次贝塞尔曲线
// 这个例子使用多个贝塞尔曲线来渲染对话气泡。
function conversationBulble(obj){
	var ctx = obj
	// 二次贝塞尔曲线
	 ctx.beginPath();
	 ctx.moveTo(75,25);
	 ctx.quadraticCurveTo(25,25,25,62.5);
	 ctx.quadraticCurveTo(25,100,50,100);
	 ctx.quadraticCurveTo(50,120,30,125);
	 ctx.quadraticCurveTo(60,120,65,100);
	 ctx.quadraticCurveTo(125,100,125,62.5);
	 ctx.quadraticCurveTo(125,25,75,25);
	 ctx.stroke();
}


// 三次贝塞尔曲线
// 这个例子使用贝塞尔曲线绘制心形。
function heart(obj){
	var ctx = obj
	//三次贝塞尔曲线
	 ctx.beginPath();
	 ctx.moveTo(75,40);
	 ctx.bezierCurveTo(75,37,70,25,50,25);
	 ctx.bezierCurveTo(20,25,20,62.5,20,62.5);
	 ctx.bezierCurveTo(20,80,40,102,75,120);
	 ctx.bezierCurveTo(110,102,130,80,130,62.5);
	 ctx.bezierCurveTo(130,62.5,130,25,100,25);
	 ctx.bezierCurveTo(85,25,75,37,75,40);
	 ctx.fill();
}

// 矩形
// 直接在画布上绘制矩形的三个额外方法，正如我们开始所见的绘制矩形，同样，也有rect()方法，将一个矩形路径增加到当前路径上。
// rect(x, y, width, height)
// 绘制一个左上角坐标为（x,y），宽高为width以及height的矩形。
// 当该方法执行的时候，moveTo()方法自动设置坐标参数（0,0）。也就是说，当前笔触自动重置回默认坐标。

// 封装的一个用于绘制圆角矩形的函数.
function roundedRect(ctx,x,y,width,height,radius){
  ctx.beginPath();
  ctx.moveTo(x,y+radius);
  ctx.lineTo(x,y+height-radius);
  ctx.quadraticCurveTo(x,y+height,x+radius,y+height);
  ctx.lineTo(x+width-radius,y+height);
  ctx.quadraticCurveTo(x+width,y+height,x+width,y+height-radius);
  ctx.lineTo(x+width,y+radius);
  ctx.quadraticCurveTo(x+width,y,x+width-radius,y);
  ctx.lineTo(x+radius,y);
  ctx.quadraticCurveTo(x,y,x,y+radius);
  ctx.stroke();
}

function game(ctx){
	 roundedRect(ctx,12,12,150,150,15);
	 roundedRect(ctx,19,19,150,150,9);
	 roundedRect(ctx,53,53,49,33,10);
	 roundedRect(ctx,53,119,49,16,6);
	 roundedRect(ctx,135,53,49,33,10);
	 roundedRect(ctx,135,119,25,49,10);
	
	 ctx.beginPath();
	 ctx.arc(37,37,13,Math.PI/7,-Math.PI/7,false);
	 ctx.lineTo(31,37);
	 ctx.fill();
	
	 for(var i=0;i<8;i++){
	 ctx.fillRect(51+i*16,35,4,4);
	 }
	
	 for(i=0;i<6;i++){
	 ctx.fillRect(115,51+i*16,4,4);
	 }
	
	 for(i=0;i<8;i++){
	 ctx.fillRect(51+i*16,99,4,4);
	 }
	
	 ctx.beginPath();
	 ctx.moveTo(83,116);
	 ctx.lineTo(83,102);
	 ctx.bezierCurveTo(83,94,89,88,97,88);
	 ctx.bezierCurveTo(105,88,111,94,111,102);
	 ctx.lineTo(111,116);
	 ctx.lineTo(106.333,111.333);
	 ctx.lineTo(101.666,116);
	 ctx.lineTo(97,111.333);
	 ctx.lineTo(92.333,116);
	 ctx.lineTo(87.666,111.333);
	 ctx.lineTo(83,116);
	 ctx.fill();
	
	 ctx.fillStyle = "white";
	 ctx.beginPath();
	 ctx.moveTo(91,96);
	 ctx.bezierCurveTo(88,96,87,99,87,101);
	 ctx.bezierCurveTo(87,103,88,106,91,106);
	 ctx.bezierCurveTo(94,106,95,103,95,101);
	 ctx.bezierCurveTo(95,99,94,96,91,96);
	 ctx.moveTo(103,96);
	 ctx.bezierCurveTo(100,96,99,99,99,101);
	 ctx.bezierCurveTo(99,103,100,106,103,106);
	 ctx.bezierCurveTo(106,106,107,103,107,101);
	 ctx.bezierCurveTo(107,99,106,96,103,96);
	 ctx.fill();
	
	 ctx.fillStyle = "black";
	 ctx.beginPath();
	 ctx.arc(101,102,2,0,Math.PI*2,true);
	 ctx.fill();
	
	 ctx.beginPath();
	 ctx.arc(89,102,2,0,Math.PI*2,true);
	 ctx.fill();
}

// Path2D 对象
// 正如我们在前面例子中看到的，你可以使用一系列的路径和绘画命令来把对象“画”在画布上。为了简化代码和提高性能，
// Path2D对象已可以在较新版本的浏览器中使用，用来缓存或记录绘画命令，这样你将能快速地回顾路径。
// 怎样产生一个Path2D对象呢？
// Path2D()
// Path2D()会返回一个新初始化的Path2D对象（可能将某一个路径作为变量——创建一个它的副本，或者将一个包含SVG path数据的字符串作为变量）。
// new Path2D();     // 空的Path对象
// new Path2D(path); // 克隆Path对象
// new Path2D(d);    // 从SVG建立Path对象
// 所有的路径方法比如moveTo, rect, arc或quadraticCurveTo等，如我们前面见过的，都可以在Path2D中使用。
// Path2D API 添加了 addPath作为将path结合起来的方法。当你想要从几个元素中来创建对象时，这将会很实用。比如：
// Path2D.addPath(path [, transform])​
// 添加了一条路径到当前路径（可能添加了一个变换矩阵）。


function p2D(ctx){
	var rectangle = new Path2D();
    rectangle.rect(10, 10, 50, 50);

    var circle = new Path2D();
    circle.moveTo(125, 35);
    circle.arc(100, 35, 25, 0, 2 * Math.PI);

    ctx.stroke(rectangle);
    ctx.fill(circle);
}



// 使用 SVG paths
// 新的Path2D API有另一个强大的特点，就是使用SVG path data来初始化canvas上的路径。这将使你获取路径时可以以SVG或canvas的方式来重用它们。
// 这条路径将先移动到点 (M10 10) 然后再水平移动80个单位(h 80)，然后下移80个单位 (v 80)，接着左移80个单位 (h -80)，再回到起点处 (z)。
function sP(ctx){
	let p = new Path2D('M10 10 h 80 v 80 h -80 Z');
	ctx.fill(p);
}


var canvas = document.getElementById('va');
if (canvas.getContext){
	var ctx = canvas.getContext('2d');
	// triangle(ctx)
	// smileFace(ctx)
	// kindsOfCircle(ctx)
	// conversationBulble(ctx)
	// heart(ctx)
	// game(ctx)
	// p2D(ctx)
	sP(ctx)
} else {
	 // canvas-unsupported code here
}