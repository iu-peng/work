let fs = require('fs');

let arr = [
	{
		name:'momo',
		age:30,
		sex: '男'
	}
]

// 保存一个数据放在一个文件中
/*
	users.json文件中
	文件可能存在也可能不存在
		存在，直接写入
		不存在，创建写入
*/
// 判断文件是否存在的。
let isExist = fs.existsSync('./data/users.json');

// 默认的flag是w： 以写入模式打开文件。文件会被创建（如果文件不存在）或截断（如果文件存在）。
/*fs.writeFile('./data/users.json', 'miaov123' ,{flag: 'wx'},(err,data) => {
	console.log(err,data);
})*/

if(isExist){  // 存在
	let d = fs.readFileSync('./data/users.json');
	let d2 = d.toString();
	let d3 = JSON.parse(d2);
	fs.writeFile('./data/users.json', JSON.stringify([...d3,...arr]) ,{flag: 'w'},(err,data) => {
		console.log(err,data);
	})

}else{ // 不存在
	fs.writeFile('./data/users.json', JSON.stringify(arr) ,{flag: 'wx'},(err,data) => {
		console.log(err,data);
	})
}



