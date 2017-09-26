let http = require('http');

// 创建服务
// request, responese
let app = http.createServer((req,res) => {
	// 当有请求过来了，会触发这个函数
	console.log("有请求来了");
	// request对象 	保存的是请求的信息
	// responese对象 保存的是响应的功能
	//console.log(req);

	res.write('ok'); //向客户端响应内容
	res.end();
})

app.listen(3000, () => {
	console.log("服务启动了");
})
