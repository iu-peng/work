
let add = require('./test.js')
let fs = require('fs')

//console.log(add.ccc)

let http = require('http')
let app = http.createServer((req,res) => {
	if(req.url === '/index.html'){
		fs.readFile('./src/home.html',(error,data)=>{
			if(error){
				console.log(error)
			}else{
				//console.log(data.toString())
				res.write(data)
				res.end();
			}
		})
	}else if(req.url === '/sec.html'){
		fs.readFile('./src/section.html',(error,data)=>{
			if(error){
				console.log(error)
			}else{
				//console.log(data.toString())
				res.write(data)
				res.end();
			}
		})
	}
})

app.listen(3000,()=>{
	console.log('服务启动')
})
// listen的第一个参数是监听的端口，第二个参数是监听端口成功后的回调函数