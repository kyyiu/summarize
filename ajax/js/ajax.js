function ajax(options){
				//存储默认值
				var defaults = {
					//请求方式
					type: 'get',
					url:'',
					data:{},
					header:{
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					//请求成功时调用
					success: function(data){
						console.log(data,'good');
					},
					error: function(data,xhr){
						console.log(data,xhr);
					}
				}
				//对象覆盖,使用defaults对象中的属性覆盖defaults对象中的属性
				Object.assign(defaults,options);
				
				var xhr = new XMLHttpRequest();
				var params = '';
				for(var attr in defaults.data){
					params+=attr+'='+defaults.data[attr]+'&';
				}
				//截取掉最后的&
				params=params.substr(0,params.length-1)
				//判断请求方式
				if(defaults.type == 'get'){
					defaults.url = defaults.url+ '?' + params;
				}
				
				xhr.open(defaults.type,defaults.url);
				if(defaults.type == 'post'){
					var contentType = defaults.header['Content-Type'];
					xhr.setRequestHeader('Content-Type',contentType);
					if(contentType == 'application/json'){
						xhr.send(JSON.stringify(defaults.data))
					}else{
						xhr.send(params);
					}
				}else{
					xhr.send();
				}
				xhr.onload = function (){
					
					//获取响应头中的数据xhr.getResponseHeader()
					var CT = xhr.getResponseHeader('Content-Type')
					//服务器端返回的数据
					var responseText = xhr.responseText;
					//如果响应类型中包含application/json
					if(CT.includes('application/json')){
						//将json字符串转换为json对象
						responseText = JSON.parse(responseText)
					}
					
					if(xhr.status == 200){
						//当http状态码200执行成功的函数
						defaults.success(responseText);
					}else{
						console.log('rr');
						defaults.error(responseText);
					}
					
				}
			}