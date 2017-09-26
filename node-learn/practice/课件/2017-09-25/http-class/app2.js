let http = require("http");
let fs = require("fs");

let app = http.createServer((req,res) => {
	// res.write('ok');

	let url = req.url  // 路径
	/*
		路径是否有后缀，有后缀看是js,css,png,gif jpg
	*/

	let re = /\.(js|css)$/g;

	if(re.test(url)){
		// 静态目录static
		let d = fs.readFileSync('./static'+url);
		res.end(d);
	}else{
		if(url === '/a'){
			// 发送的是index.html文件内容

			let d = fs.readFileSync('./views/index.html');
			res.end(d);

		}else if(url === '/b'){
			// 发送的是miaov.html文件内容
			let d = fs.readFileSync('./views/miaov.html');
			res.end(d);
		}else{
			//// 发送的是404.html文件内容
			let d = fs.readFileSync('./views/404.html');
			res.end(d);
		}
	}

	

	
})

app.listen(8000, () => {
	console.log("服务启动成功");
})