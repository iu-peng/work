function add(a,b){
	return a+b
}

function abc(){
	console.log(1111)
}

/*module.exports = {
	add:add,
	abc:abc
}*/

module.exports.add = add;
module.exports.ccc = abc;
//结果一样

