let express = require('express');

let app = express();

app.use(express.static('./static'))

app.get('/a', (req,res) => {
	res.sendFile(__dirname+'/views/index.html')
})

app.get('/b', (req,res) => {
	res.sendFile(__dirname+'/views/miaov.html')
})
app.get('*', (req,res) => {
	res.sendFile(__dirname+'/views/404.html')
})

app.listen(8080, () => {
	console.log("服务启动成功");
})