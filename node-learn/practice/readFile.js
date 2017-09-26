
let add = require('./test.js')
let fs = require('fs')

let arr = [
	{
		user:'lee',
		age:30,
		sex:'男'
	},
	{
		user:'leck',
		age:20,
		sex:'男'
	}
]

let isExist = fs.existsSync('./src/user.json')//判断文件是否存在

//console.log(isExist)

if(isExist){//如果存在，添加数据
	let data = fs.readFileSync('./src/user.json')
	let data2 = data.toString()
	let data3 = JSON.parse(data2)
	console.log(data.toString())
	fs.writeFile('./src/user.json',JSON.stringify([...data3,...arr]),(err,data)=>{
		
	})
}else{//如果不存在，添加文件
	fs.writeFile('./src/user.json', JSON.stringify(arr) ,{flag: 'wx'},(err,data) => {
		console.log(err,data);
	})
}