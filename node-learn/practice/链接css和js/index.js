let http = require('http')
let fs = require('fs')

let app = http.createServer( (req,res)=>{
	let url = req.url
	let re = /\.(css|js)$/g

	if( re.test(url) ){
		let d = fs.readFileSync('./assets'+url);
		res.end(d)
	}else{
		if(url === '/a'){
			let d = fs.readFileSync('./views/a.html');
			res.end(d)
		}else if(url === '/b'){
			let d = fs.readFileSync('./views/b.html');
			res.end(d)
		}
	}
})

app.listen(3000,()=>{
	console.log('服務器開始啓動')
})