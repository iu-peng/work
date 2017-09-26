const express = require('express')
const app = express();

//-------------------------解析post数据的配置
const bodyParser = require('body-parser')
app.use(bodyParser.json())  // 解析json的格式
app.use(bodyParser.urlencoded({ extended: true }))


//------------------------处理上传
const multer  = require('multer');  // 处理上传的模块
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname+'/uploads/'); // 设置存储的位置
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // 村粗文件的名字
  }
})
var upload = multer({ storage }); // 指定上传的信息

// APi用来做上传的
app.post('/upload',upload.single('miaov'), (req, res) => {
	res.send('上传ok')
})

//-----------------------------设置静态文件目录
app.use(express.static('./viewspage'))

//-----------------------------设置模板引擎和模板目录配置
let swig = require('swig');
app.set('views', './abc'); 
app.engine('html', swig.renderFile)
app.set('view engine', 'html')

//-----------------------------主页请求
app.get('/',(req,res)=>{
	console.log('有人请求0')
	res.sendFile(__dirname + '/viewspage/get-post请求.html' )
})

//-----------------------------express路由
let dataApi = require('./api/user.js')
app.use('/api',dataApi)

//-----------------------------起服务
app.listen(3000,'localhost',()=>{
	console.log('可以请了')
})