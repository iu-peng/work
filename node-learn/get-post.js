let express = require('express')
let app = express();

//定义指定静态文件目录
// 图片css和js等静态文件都是存放在这个文件夹下，在index.html中引用这些静态文件的时候，
//不是相对于这个html文件引用了，而是相对于定义的这个指定静态文件目录
app.use(express.static('./viewspage'))

app.get('/',(req,res)=>{
	console.log('有人请求0')
	res.sendFile(__dirname + '/viewspage/index.html' )
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
	console.log('这是登陆')
	res.sendFile(__dirname + '/viewspage/login.html' )
})

app.listen(3000,'localhost',()=>{

	console.log('可以请求了')
})