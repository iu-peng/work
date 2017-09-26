let http = require("http");

let app = http.createServer((req,res) => {
	// res.write('ok');

	let url = req.url  // 路径

	if(url === '/a'){
		// 发一个index.html
		res.end('a');
	}else if(url === '/b'){
		res.end('b');
	}else{
		//
		res.end('404');
	}

	
})

app.listen(8000, () => {
	console.log("服务启动成功");
})