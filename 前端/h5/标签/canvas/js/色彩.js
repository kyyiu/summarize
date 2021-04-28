// 如果我们想要给图形上色，有两个重要的属性可以做到：fillStyle 和 strokeStyle。

// fillStyle = color
// 设置图形的填充颜色。
// strokeStyle = color
// 设置图形轮廓的颜色。
// color 可以是表示 CSS 颜色值的字符串，渐变对象或者图案对象。我们迟些再回头探讨渐变和图案对象。
// 默认情况下，线条和填充颜色都是黑色（CSS 颜色值 #000000）。

// 注意: 一旦您设置了 strokeStyle 或者 fillStyle 的值，那么这个新值就会成为新绘制的图形的默认值。,
// 如果你要给每个图形上不同的颜色，你需要重新设置 fillStyle 或 strokeStyle 的值。

// 您输入的应该是符合 CSS3 颜色值标准 的有效字符串。下面的例子都表示同一种颜色。

// 这些 fillStyle 的值均为 '橙色'
// ctx.fillStyle = "orange";
// ctx.fillStyle = "#FFA500";
// ctx.fillStyle = "rgb(255,165,0)";
// ctx.fillStyle = "rgba(255,165,0,1)";

// fillStyle 示例
// 在本示例里，我会再度用两层 for 循环来绘制方格阵列，每个方格不同的颜色。结果如右图，但实现所用的代码却没那么绚丽。
// 我用了两个变量 i 和 j 来为每一个方格产生唯一的 RGB 色彩值，其中仅修改红色和绿色通道的值，而保持蓝色通道的值不变。
// 你可以通过修改这些颜色通道的值来产生各种各样的色板。通过增加渐变的频率，你还可以绘制出类似 Photoshop 里面的那样的调色板。

function sheet1(ctx){
	for (var i=0;i<6;i++){
	    for (var j=0;j<6;j++){
	      ctx.fillStyle = 'rgb(' + Math.floor(255-42.5*i) + ',' + 
	                       Math.floor(255-42.5*j) + ',0)';
	      ctx.fillRect(j*25,i*25,25,25);
	    }
	  }
}

function sheet2(ctx){
	for (var i=0;i<6;i++){
	      for (var j=0;j<6;j++){
	        ctx.strokeStyle = 'rgb(0,' + Math.floor(255-42.5*i) + ',' + 
	                         Math.floor(255-42.5*j) + ')';
	        ctx.beginPath();
	        ctx.arc(12.5+j*25,12.5+i*25,10,0,Math.PI*2,true);
	        ctx.stroke();
	      }
	    }
}

// 透明度 Transparency
// 除了可以绘制实色图形，我们还可以用 canvas 来绘制半透明的图形。通过设置 globalAlpha 属性或者使用一个半透明颜色作为轮廓或填充的样式。

// globalAlpha = transparencyValue
// 这个属性影响到 canvas 里所有图形的透明度，有效的值范围是 0.0 （完全透明）到 1.0（完全不透明），默认是 1.0。
// globalAlpha 属性在需要绘制大量拥有相同透明度的图形时候相当高效。不过，我认为下面的方法可操作性更强一点。

// 因为 strokeStyle 和 fillStyle 属性接受符合 CSS 3 规范的颜色值，那我们可以用下面的写法来设置具有透明度的颜色。

// // 指定透明颜色，用于描边和填充样式
// ctx.strokeStyle = "rgba(255,0,0,0.5)";
// ctx.fillStyle = "rgba(255,0,0,0.5)";
// rgba() 方法与 rgb() 方法类似，就多了一个用于设置色彩透明度的参数。它的有效范围是从 0.0（完全透明）到 1.0（完全不透明）。

// globalAlpha 示例
// 在这个例子里，将用四色格作为背景，设置 globalAlpha 为 0.2 后，在上面画一系列半径递增的半透明圆。最终结果是一个径向渐变效果。圆叠加得越更多，
// 原先所画的圆的透明度会越低。通过增加循环次数，画更多的圆，从中心到边缘部分，背景图会呈现逐渐消失的效果。
function transparent(ctx){
	// 画背景
	  // ctx.fillStyle = '#FD0';
	  // ctx.fillRect(0,0,75,75);
	  // ctx.fillStyle = '#6C0';
	  // ctx.fillRect(75,0,75,75);
	  // ctx.fillStyle = '#09F';
	  // ctx.fillRect(0,75,75,75);
	  ctx.fillStyle = '#F30';
	  // ctx.fillRect(75,75,75,75);
	  // ctx.fillStyle = '#FFF';
	
	  // 设置透明度值
	  ctx.globalAlpha = 0.2;
	
	  // 画半透明圆
	  for (var i=0;i<7;i++){
	      ctx.beginPath();
	      ctx.arc(75,75,10+10*i,0,Math.PI*2,true);
	      ctx.fill();
	  }
}

// rgba() 示例
// 第二个例子和上面那个类似，不过不是画圆，而是画矩形。这里还可以看出，rgba() 可以分别设置轮廓和填充样式，因而具有更好的可操作性和使用灵活性。
function RGB(ctx){
	// 画背景
	  ctx.fillStyle = 'rgb(255,221,0)';
	  ctx.fillRect(0,0,150,37.5);
	  ctx.fillStyle = 'rgb(102,204,0)';
	  ctx.fillRect(0,37.5,150,37.5);
	  ctx.fillStyle = 'rgb(0,153,255)';
	  ctx.fillRect(0,75,150,37.5);
	  ctx.fillStyle = 'rgb(255,51,0)';
	  ctx.fillRect(0,112.5,150,37.5);
	
	  // 画半透明矩形
	  for (var i=0;i<10;i++){
	    ctx.fillStyle = 'rgba(255,255,255,'+(i+1)/10+')';
	    for (var j=0;j<4;j++){
	      ctx.fillRect(5+i*14,5+j*37.5,14,27.5)
	    }
	  }
}

var canvas = document.getElementById('va')
if(canvas.getContext){
	var ctx = canvas.getContext('2d')
	// sheet1(ctx)
	// sheet2(ctx)
	transparent(ctx)
	// RGB(ctx)
}