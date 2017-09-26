let http = require('http');
let fs = require('fs');

// 创建服务
// request, responese
let app = http.createServer((req,res) => {
	// 请求的是那个页面，index.html,响应的时候怎么做？

	// 读取index.html这个页面的内容，发送给客户端

	console.log(req.url);  // 拿到地址的路径

	if(req.url === '/index.html'){
		// 返回index.html，需要读取index.html里面的内容发送

		fs.readFile('./views/index.html', (error,data) => {
			if(error){
				console.log(error);
			}else{
				console.log(data);  // buffer类型的里面存的额是二进制的
				console.log( data.toString('utf-8') );
				res.write(data); //向客户端响应内容
				res.end();
			}
			
		})
	}else if(req.url === '/miaov.html'){
		fs.readFile('./views/miaov.html', (error,data) => {
			if(error){
				console.log(error);
			}else{
				console.log(data);  // buffer类型的里面存的额是二进制的
				console.log( data.toString('utf-8') );
				res.write(data); //向客户端响应内容
				res.end();
			}
			
		})
	}

	
	
})

app.listen(3000, () => {
	console.log("服务启动了");
})
