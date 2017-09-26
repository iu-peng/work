
let add = require('./test.js')

//console.log(add.ccc)

let http = require('http')
let app = http.createServer((req,res) => {
	//console.log(req)
	// 第一个参数是请求的所有信息
	//console.log(res)
	//第二个参数是响应的方法
	res.write('返回给你数据')//返回给客户端数据 -- 有乱码
	res.write('ok!')//不会覆盖之前返回的数据
	res.end();//结束响应
})

app.listen(3000,()=>{
	console.log('服务启动')
})
// listen的第一个参数是监听的端口，第二个参数是监听端口成功后的回调函数