let express = require('express')
let app = express();


app.use(function(req,res,next){
	console.log(req.url)

	let addressArr = ['/a','/b']

	if(addressArr.includes(req.url)){
		if(true){
			res.redirect('/login')
		}else{
			next()
		}
	}else{
		next()
	}
})
/*app.use(function(req,res,next){
	console.log('触发2')
	next()
})
app.use(function(req,res,next){
	console.log('触发3')
	next()
})*/


app.get('/',(req,res)=>{
	console.log('有人请求0')
	res.sendFile(__dirname + '/viewspage/home.html' )
})
app.get('/a',(req,res)=>{
	console.log('有人请求a')
	res.sendFile(__dirname + '/viewspage/a.html' )
})
app.get('/b',(req,res)=>{
	console.log('有人请求b')
	res.sendFile(__dirname + '/viewspage/b.html' )
})
app.get('/login',(req,res)=>{
	console.log('有人请求b')
	res.sendFile(__dirname + '/viewspage/login.html' )
})

app.listen(3000,'localhost',()=>{

	console.log('可以请求了')
})