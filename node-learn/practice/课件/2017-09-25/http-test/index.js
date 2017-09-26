let http = require('http');
let fs = require('fs');

// i/o操作 异步的
/*fs.readFile('./views/index.html',(error,data)=>{
	console.log(data);
})*/
// 同步的
let d = fs.readFileSync('./views/index.html');

console.log(d);

console.log("我先执行");

// 创建服务
// request, responese
let app = http.createServer((req,res) => {
	// 请求的是那个页面，index.html,响应的时候怎么做？

	// 读取index.html这个页面的内容，发送给客户端

	console.log(req.url);  // 拿到地址的路径

	if(req.url === '/index.html'){
		// 返回index.html，需要读取index.html里面的内容发送

		/*let d = getHtmlData('./views/index.html');

		d.then((data) => {
			res.write(data);
			res.end();
		})*/



		
		

	}else if(req.url === '/miaov.html'){
		getHtmlData('./views/miaov.html')
	}

	
	
})

function readFilePromise(filePath){
	return new Promise((resolve,reject) => {
		fs.readFile(filePath, (error,data) => {
			if(error){
				reject(error)
			}else{
				resolve(data)
			}
		})
	})	
}

async function getHtmlData(filePath, callback){
	return await readFilePromise(filePath)
}

app.listen(3000, () => {
	console.log("服务启动了");
})
