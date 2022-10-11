const express = require('express')
const app = express()
// 创建一个websocket服务
const io = require('nodejs-websocket')

app.get('/', function(req, res) {
  res.send('hello')
})
var game1 = null,game2 = null , game1Ready = false , game2Ready = false;
// 执行websocket处理连接方法
io.createServer(connection => {
  console.log('new connection');
  //处理客户端发送过来的消息	
  connection.on('text', function(str) {
    
    console.log("收到的信息为:"+str)
    if(str==="game1"){
        game1 = connection;
        game1Ready = true;
        connection.sendText("success");
    }
    if(str==="game2"){
        game2 = connection;
        game2Ready = true;
    }
    if(game1Ready&&game2Ready){
        game2.sendText(str);
        return
    }
    

    connection.sendText('服务器返回数据: ' + str)
  })
  // 监听关闭
  connection.on('close', function(code, reason) {
    console.log('关闭了');
  })
  connection.on('error', () => {
    console.log('异常');
  })

  connection.on('connection', function() {
    console.log('ccc');
  })

}).listen(2222)

// 创建web服务，设定端口号和ip地址 
var server = app.listen(8088, function () {
  var host = server.address().address
  var port = server.address().port
  console.log(server.address());
  console.log(`应用实例，访问地址为 http://${host}:${port}`) 
  // 调用 listen 的时候没有传入地址，默认绑定到 ipv6 上去，:: 等价于 ipv4 下的 0.0.0.0
  // 使用app.listen(8088, localhost, function () {})即可
})