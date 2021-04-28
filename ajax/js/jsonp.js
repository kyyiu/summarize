	function jsonp(options){
				var script = document.createElement('script');
				var params = '';
				for(var attr in options.data){
					params+='&' + attr + '=' + options.data[attr];
				}
				//fn2他已经不是一个全局函数了,我们想办法变成全局(不用再定义全局函数的方法)
				//要让函数名字改变,不然请求有可能被覆盖
				var fnName = 'MJ'+ Math.random().toString().replace('.','');
				//fnName是变量不能跟点,.fn2换成[fnName]即window下面的某个属性
				window[fnName] = options.success;
				script.src = options.url+'?callback=' + fnName + params;
				document.body.appendChild(script);
				script.onload = function(){
					document.body.removeChild(script);
				}
			}