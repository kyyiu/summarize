	// canvas起初是空白的。为了展示，首先脚本需要找到渲染上下文，然后在它的上面绘制。<canvas> 元素有一个叫做 getContext() 的方法，
			// 这个方法是用来获得渲染上下文和它的绘画功能。getContext()只有一个参数，上下文的格式。对于2D图像而言，你可以使用 CanvasRenderingContext2D。
			// 语法,详情见文档，通常用2d足够
			// var ctx = canvas.getContext(contextType);
			// var ctx = canvas.getContext(contextType, contextAttributes);
			// "2d", 建立一个 CanvasRenderingContext2D 二维渲染上下文。
			
			// 矩形的绘制中。canvas提供了三种方法绘制矩形：
			
			// fillRect(x, y, width, height)
			// 绘制一个填充的矩形
			// strokeRect(x, y, width, height)
			// 绘制一个矩形的边框
			// clearRect(x, y, width, height)
			// 清除指定矩形区域，让清除部分完全透明。
			var canvas = document.getElementById('va');
			
			if (canvas.getContext){
			  var ctx = canvas.getContext('2d');
			  // drawing code here
			  ctx.fillStyle = "rgb(200,0,0)";
			  ctx.fillRect (5, 5, 55, 50);
			   // ctx.clearRect(0,0,60,60)
			  ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
			  ctx.fillRect (30, 30, 55, 50);
			  
			 
			  ctx.strokeRect(30,80,10,10)
			  
			 
			} else {
			  // canvas-unsupported code here
			}