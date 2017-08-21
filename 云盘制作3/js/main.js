//提示框位置
var warning = $('.warning')[0];
warning.style.left = (document.documentElement.clientWidth - warning.offsetWidth)/2  + 'px';

var yesorno = $('.yesorno');
for(var i=0; i<yesorno.length; i++){
	yesorno[i].style.left = (document.documentElement.clientWidth - yesorno[i].offsetWidth)/2  + 'px';
	yesorno[i].style.top = (document.documentElement.clientHeight - yesorno[i].offsetHeight)/2  + 'px';
}

//移动文件框

var moveshow = $('.moveshow')[0];
var moveLeft;
var moveTop;

moveCenter()
//改变窗口尺寸时剧中
window.onresize = function(){
	moveCenter()
}
//滚动时剧中
window.onscroll = function(){
	var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
	var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
	moveCenter(scrollLeft,scrollTop);
}
//窗口调整时的函数处理
function moveCenter(scrollLeft,scrollTop){
	moveLeft = (document.documentElement.clientWidth - moveshow.offsetWidth)/2;
	moveTop = (document.documentElement.clientHeight - moveshow.offsetHeight)/2;
	if(scrollLeft){
		moveLeft += scrollLeft;
	}
	if(scrollTop){
		moveLeft += scrollTop;
	}
	moveshow.style.left = moveLeft + 'px';
	moveshow.style.top = moveTop + 'px';
}
//移动文件框的拖拽
moveshow.onmousedown = function (ev){
	var disX = ev.clientX - moveshow.offsetLeft;  //X轴	
	var disY = ev.clientY - moveshow.offsetTop;  //Y轴	
	//最大移动距离
	var maxX = document.documentElement.clientWidth - moveshow.clientWidth;
	var maxY = document.documentElement.clientHeight - moveshow.clientHeight;
	document.onmousemove = function (ev){
		var l = ev.clientX	- disX;
		var t = ev.clientY	- disY;

		if(l < 0) l = 0;
		if(t < 0) t = 0;
		if(l >= maxX) l = maxX;
		if(t >= maxY) t = maxY;

		moveshow.style.left = l + 'px';
		moveshow.style.top = t + 'px';
	};

	document.onmouseup = function (){
		document.onmousemove = null;	
	};
};
//---------------------侧边菜单------------------------
function getChildsById(id){  // id 父id
	var arr = [];
	for(var attr in data){
		if(data[attr].pid == id){
			arr.push(data[attr])
		}
	}

	return arr;
}

var side = $('.side')[0];
var initId = -1;
var initN = 0;

var str = '';
function sidehtml(id,initN){
	initN++;

	str += `<ul>`;
	var arr = getChildsById(id);
	arr.forEach(function(item){
		var childsarr = getChildsById(item.id);
		str += `<li>
					<span data-index='${item.id}' style="padding-left:${initN*20+25}px;"><b class="${childsarr.length?'have':''}"></b>${item.title}</span>`;
		if(childsarr.length){
			sidehtml(item.id,initN)
		}			
		str += `</li>`;
	});
	str += `</ul>`;
	return str;
}
side.innerHTML = sidehtml(initId,initN)

//内容区域 

var list = $('#list')
var sect = $('.sect')[0];
var lis = $('li',list);
var spans = $('span',list);
var checkAll = document.querySelector('.checkAll');

var headnav = $('.headnav')[0];

//-------------------------生成结构函数----------------------------
function secthtml(id){
	var sectarr = getChildsById(id);//获取子元素组成数组
	//没有内容时显示背景
	if(sectarr.length == 0){
		list.classList.add('nonecont')
	}else{
		list.className = '';
	}
	var sectstr = sectarr.map(function(item){
		return `<li data-index="${item.id}">
					<div></div>
					<p>${item.title}</p>
					<span></span>
				</li>`
	}).join('');

	list.innerHTML = sectstr;
	//新进一级，清除样式
	checkAll.classList.remove('active');
	//渲染结构
	sectclick()
	stopPropa()
}

//取消li和span的点击冒泡
function stopPropa(){
	//取消文件夹和小方块的冒泡
	for(var i=0;i<spans.length;i++ ){
		spans[i].onmousedown = function(ev){
			ev.stopPropagation();
		}
		lis[i].onmousedown = function(ev){
			ev.stopPropagation();
		}
	}
}

secthtml(0)

var checkedNum = null;//选中的个数
var checkIndex = null;//选中的id


//判断选中的span对应父级的dataindex，计算选中个数
var recheckSpan = $('.checked',list);
function whichSpanCheck(){
	
	if( recheckSpan.length == 1 ){
		checkIndex = recheckSpan[0].parentNode.dataset.index;
		checkedNum = 1;
	}else if( recheckSpan.length == 0 ){
		checkedNum = 0;
	}else{
		checkedNum = null;
		checkIndex = null;
	}
	//return recheckSpan.length;
}

function sectclick(){
	stopPropa()
	for( var i=0; i<lis.length; i++ ){

		lis[i].onclick = function(ev){
			//单选
			
			if(ev.target.nodeName == 'SPAN'){

				//只有选中的时候才重新赋值
				ev.target.classList.toggle('checked');
				this.classList.toggle('active');

				whichSpanCheck()

				chenkOr()
				
			}else{//进到下一级
				var lin = this.dataset.index;
				//var liarr = getChildsById(lin);
				secthtml(lin);
				navhtml(lin);
				clickside(lin);
			}
			ev.stopPropagation();
		}
	}
}
//判断文件多选个数和li的合数是否相等
function chenkOr(){
	//var recheckSpan = $('.checked',list);

	if(lis.length == 0){//没有内容不能选
		checkAll.classList.remove('active')
		return;
	}

	if(recheckSpan.length==lis.length){
		checkAll.classList.add('active')
	}else{
		checkAll.classList.remove('active')
	}
}

// ----------------生成nav结构--------------------


function navhtml(id){
	//获取点击元素的所有祖先元素
	function getparents(id){
		var arr = [];
		function parents(id){
			for( var attr in data ){
				if( data[attr].id == id ){
					arr.push(data[attr]);
					parents(data[attr].pid);
					break;
				}
			}
		}
		parents(id)
		return arr;
	}
	var parentsNode = getparents(id).reverse();

	var navcont = '';
	for( var i=0; i<parentsNode.length-1; i++ ){
		navcont += `<s></s><a data-index="${parentsNode[i].id}" href="javascript:;">${parentsNode[i].title}</a>`;
	}
	navcont += `<s></s><span data-index="${parentsNode[parentsNode.length-1].id}">${ parentsNode[parentsNode.length-1].title }</span>`;
	

	headnav.innerHTML = navcont;
		//---------------导航栏点击事件-----------------
	navclick(headnav)

}
navhtml(0)
function navclick(headnav){
	var headAs = $('a',headnav);
	for( var i=0; i<headAs.length; i++ ){
		headAs[i].onclick = function(){
			navn = this.dataset.index
			clickside(navn)
			secthtml(navn);//内容区域
			navhtml(navn);//nav区域
		}
	}
}

//---------------点击左侧菜单------------------
sideclick()
var sidespans = $('span',side);

function sideclick(){
	//点击左侧显示内容区域
	sidespans = $('span',side);
	for( var i=0; i<sidespans.length; i++ ){
		
		sidespans[i].onclick = function(){
			okn = this.dataset.index
			clickside(okn)
			secthtml(okn);//内容区域
			navhtml(okn);//nav区域
		}
	}
}
//点击添加class
function clickside(okn){
	for(var i=0; i<sidespans.length; i++){
		sidespans[i].className = '';
	}
	for(var i=0; i<sidespans.length; i++){
		if(sidespans[i].dataset.index == okn){
			sidespans[i].className = 'active';
		}
	}
	
}
clickside(0)

//---------------点击全选中------------------

checkAll.onclick = function(){
	var listspans2 = $('span',list);
	var claname = this.className;
	//没有内容不能全选
	if(listspans2.length==0){
		return;
	}

	if(claname.indexOf('active') == -1){//点击后全选
		for( var i=0; i<listspans2.length; i++ ){
			listspans2[i].classList.add('checked');
			listspans2[i].parentNode.classList.add('active');
		}
		this.classList.add('active');
	}else{
		for( var i=0; i<listspans2.length; i++ ){
			listspans2[i].classList.remove('checked');
			listspans2[i].parentNode.classList.remove('active');
		}
		this.classList.remove('active');
	}
}

//--------------------------框选------------------------

sect.onmousedown = function(ev){
	checkedNum = null;
	if(!lis.length){
		return;
	}
	//点击空白清除选中情况；
	if(!moveto.onOff){
		for(var i=0; i<lis.length; i++){
			lis[i].classList.remove('active');
			spans[i].classList.remove('checked');
		}
			checkAll.classList.remove('active');
	}
	

	
	//框选块
	var quok = document.createElement('div');
	sect.appendChild(quok);

	var sectbound = sect.getBoundingClientRect();

	var X = ev.clientX;
	var Y = ev.clientY;

	var l = X - sectbound.left;
	var t = Y - sectbound.top;

	document.onmousemove = function(ev){

		var moveX = ev.clientX;
		var moveY = ev.clientY;

		if(moveX<sectbound.left) moveX=sectbound.left;
		if(moveY<sectbound.top) moveY=sectbound.top;

		if(moveX>sectbound.right) moveX=sectbound.right;
		if(moveY>sectbound.bottom) moveY=sectbound.bottom;

		quok.style.width = Math.abs(moveX - X) + 'px';
		quok.style.height = Math.abs(moveY - Y) + 'px';

		var ll = ev.clientX - sectbound.left;
		var tt = ev.clientY - sectbound.top;

		if(ll < 0) ll=0;
		if(tt < 0) tt=0;

		quok.style.left = Math.min(l,ll) + 'px';
		quok.style.top = Math.min(t,tt) + 'px';

		for(var i=0; i<lis.length; i++){
			if(getBound(quok,lis[i])){//未选中情况
				lis[i].classList.remove('active');
				spans[i].classList.remove('checked')

			}else{//选中情况


				lis[i].classList.add('active');
				spans[i].classList.add('checked');
				whichSpanCheck();
			}
		}
		
		
	}
	document.onmouseup = function(){
		chenkOr()
		document.onmousemove = null;
		quok.remove();
		
	}
	ev.preventDefault();
}





//碰撞是否接触判断
function getBound(move,get){
	var moveobj = move.getBoundingClientRect();
	var getobj = get.getBoundingClientRect();

	if(moveobj.right<getobj.left || moveobj.bottom<getobj.top || moveobj.left>getobj.right || moveobj.top>getobj.bottom ){
		return true;//没有接触
	}else{
		return false;//接触
	}
}


//------------------新建文件夹----------------------

var newfile = $('.newfile')[0];

var buildfile = function (){
	return `<li class="test">
				<div></div>
				<input type="text" />
				<span></span>
			</li>`;
}

newfile.onmouseup = function(ev){
	
	if(lis.length == 0){//没有内容不能选
		list.className = '';
	}
	document.onOff = false;
	var dataspanN = $('span',headnav)[0].dataset.index;
	//secthtml(dataspanN,buildfile);
	list.innerHTML = `<li class="test">
				<div></div>
				<input type="text" />
				<span></span>
			</li>`+list.innerHTML 
	var oinput = $('input',list)[0];
	oinput.onmousedown = function(ev){
		ev.stopPropagation();
	}
	var test = $('.test')[0];
	oinput.focus();
	//console.table(data)
	document.onmousedown = function(){
		if(document.onOff){
			return;
		}
		var oinputvalue = oinput.value;
		//console.log( fileNameDiff(oinputvalue,dataspanN) )
		//为空去掉添加的li;
		if(oinputvalue == ''){
			list.removeChild(list.firstElementChild);
			said('newfilewarn2')
		//有内容则生成结构
		//文件名重复
		}else if( fileNameDiff(oinputvalue,dataspanN) ){

			list.removeChild(list.firstElementChild);
			//警告框
			said('newfilewarn');
		}else{//新建成功
			var timedit = Date.now();
			//添加数据
			var newarr = {};
			newarr.id = timedit;
			newarr.pid = Number(dataspanN);
			newarr.title = oinputvalue;

			data[timedit] = newarr;

			var newP = document.createElement('p');
			newP.innerHTML = oinputvalue;
			test.replaceChild(newP,oinput);
			//添加后给li添加data-index属性
			test.setAttribute('data-index',timedit)
			//新建成功提示框
			said('newfilesucess');

		}
		//重生成结构 从新添加事件
		reEvent(dataspanN)
		rectclassOr()

		oinputvalue = null;
		document.onOff = true;
	}
}
//重新绑定事件
function reEvent(dataspanN){
	//重新生成树形结构
	str = '';
	side.innerHTML = sidehtml(-1,0)

	//重新添加事件
	sideclick()
	sectclick()
	navclick(headnav)
	//侧栏显示菜单那个点中
	clickside(dataspanN);
}

//文件名不重复
function fileNameDiff(oinputvalue,dataspanN){

	var thischildsarr = getChildsById(dataspanN);
	

	for( var i=0; i<thischildsarr.length; i++ ){
		if(thischildsarr[i]['title'] === oinputvalue){
			return true;
		}
	}
	return false;
}
//小提示框函数
	var warnTimer
function said(evname){
	//重复点击先返回原位置
	warning.style.top = '-40px';
	if(warnTimer){
		clearTimeout(warnTimer);
	}
	
	//改变提示框的内容
	warning.innerHTML = info[evname]['txt'];
	warning.style.background = info[evname]['bg'];
	
	mTween(warning,{top:0},500,'bounceOut',function(){

		warnTimer = setTimeout(function(){
			mTween(warning,{top:-40},500)
		},1000)
	})
}
//
function rectclassOr(){
	//判断是否添加背景
	if(lis.length == 0){
		list.classList.add('nonecont')
	}else{
		list.className = '';
	}
	//判断全选按钮的显示
	chenkOr();
}


//----------------重命名---------------------

var rename = $('.rename')[0];
var dataspanN,checkLi,checkP,checkPHtml,newInput;
rename.onclick = function(){
	whichSpanCheck();
	//判断选中个数和获取选中的li的dataindex;
	if(checkedNum == 0){//未选中
		said('renamewarn');
		return;
	}else if(checkedNum == null){//选中多个
		said('renamewarn2');
		return;
	}
	//选中一个
	if(checkIndex && checkedNum==1){
		rename.isrename = true;
		dataspanN = $('span',headnav)[0].dataset.index;//父级标记

		checkLi = list.querySelector(`li[data-index="${checkIndex}"]`);//获取选中的li 
		checkP = checkLi.querySelector('p');
		checkPHtml = checkP.innerHTML

		newInput = document.createElement('input');//生成input标签
		newInput.value = checkPHtml;


		checkLi.replaceChild(newInput,checkP);//替换p
		newInput.focus();//获取焦点
		newInput.select();//全选
	}else{
		rename.isrename = false;
	}
}
//点击document清除
document.addEventListener('mousedown',function(){
	if(rename.isrename){
		reNameEvent(dataspanN,checkLi,checkP,checkPHtml,newInput);
		
	}
	rename.isrename = false;
})

function reNameEvent(dataspanN,checkLi,checkP,checkPHtml,newInput){
	//输入内容为空或和源文件名相同不做处理，直接用原来的替换input
	if(newInput.value == '' || newInput.value == checkPHtml){
		checkLi.replaceChild(checkP,newInput);//替换input
		said('renamewarn3')
	}else{
		//判断是否文件名重复
		if( fileNameDiff(newInput.value,dataspanN) ){
			checkLi.replaceChild(checkP,newInput);//替换input
			said('newfilewarn');
			return;
		}else{
			//内容和元文件夹名不同时处理
			checkP.innerHTML = newInput.value;
			checkLi.replaceChild(checkP,newInput);//替换input
			data[checkIndex].title = checkP.innerHTML;
			said("renamesucess")
			//重生成结构 从新添加事件
			reEvent(dataspanN)
		}
	}
}

//------------------删除文件夹-------------------------

var delet = $('.delet')[0];

delet.onclick = function(){
	whichSpanCheck();
	dataspanN = $('span',headnav)[0].dataset.index;//父级标记
	//判断选中个数和获取选中的li的dataindex;
	if(checkedNum == 0){//未选中
		said('deletwarn');
	}
	if(recheckSpan.length){
		showFlor(dataspanN)
	}
}

//删除数据结构函数
function selDataSect(dataspanN){
	//删除数据
	for( var i=0; i<recheckSpan.length; i++ ){
		var delLiIndex = recheckSpan[i].parentNode.dataset.index;
		var delarr = getAllChilds(delLiIndex);
		afterArr(delarr);
		//重新生成结构重新添加事件
		reEvent(dataspanN);
	}
	//删除结构
	for( var i=0; i<recheckSpan.length; i++ ){
		recheckSpan[i].parentNode.remove();
		i = i-1;
	}
	//判断是否为空和 全选是否显示
	rectclassOr()

	said('deletsucess')
}

//找到指定id下所有的子孙数据
function getAllChilds(id){
	var delarr = [];
	//添加上选中的li
	delarr.push(data[id])
	for(var attr in data){
		for(var i=0; i<delarr.length; i++){
			if(data[attr].pid == delarr[i].id && delarr.indexOf(data[attr]) == -1){
				delarr.push(data[attr])
			}
		}
	}
	return delarr;
}
//找到所有的子孙数据后把他们清掉，返回一个新的data
function afterArr(delarr){
	for( var i=0; i<delarr.length; i++ ){
		for(var attr in data){
			if( data[attr].id == delarr[i].id ){
				data[attr] = '';
				attr = "";
			}
		}
	}
	
}

//删除弹出框//弹出函数
var flor = $('.flor')[0];
var sure = $('.sure')[0];
var no = $('.no')[0];

function showFlor(dataspanN){
	mTween(flor,{zIndex:5},100,'linear')
	sure.onclick = function(){
		selDataSect(dataspanN)//删除数据和结构

		mTween(flor,{zIndex:-1},10,'linear',function(){
			said('deletsucess')
		})
	}
	no.onclick = function(){
		mTween(flor,{zIndex:-1},10,'linear',function(){
			said('deletno')
		})
	}
}


// -------------------移动到-------------------------

var movecont = $('.movecont')[0];
var moveto = $('.moveto')[0];
var movejudge = $('.movejudge')[0];//提示信息

var move = $('.move')[0];
var msure = $('.msure')[0];
var mno = $('.mno')[0];

var moveChooseIndex = null;//
 moveto.onclick = function (){
	whichSpanCheck();
	if(checkedNum == 0){
		said('movewarn');
		return;
	}
	moveto.onOff = true;
	dataspanN = $('span',headnav)[0].dataset.index;//父级标记
	//选中的时候可以移动
	if(recheckSpan.length){//移动框出现
		mTween(moveshow,{zIndex:5},50,'linear')
		//弹框内的树形结构生成
		str = '';
		movecont.innerHTML = sidehtml(-1,-1);
		//movespans = $('span',movecont);
		
		getMoveIndexEvent()//改变点击的dataindex
		
		showmove(dataspanN)//执行的确定取消事件
	}
}
//移动到弹框
var movesure = $('.movesure')[0];
var moveno = $('.moveno')[0];

function showmove(dataspanN){
	//确定按钮
	movesure.onclick = function(ev){
		if(!movesure.onOff){//如果是父级和子集和自己的话，就return；
			return;
		}

		//点中的文件夹下的直接子集
		var clickSpanChilds = getChildsById( moveChooseIndex )
		//选中的文件夹下的直接子集
		var checkedSpanChilds = getcheckedSpanChilds();
		//选中文件夹与目标文件夹中的子文件有重名，则把选中的重名的留下
		for(var i=0; i<checkedSpanChilds.length; i++){
			for(var j=0; j<clickSpanChilds.length; j++){
				if(checkedSpanChilds[i].title == clickSpanChilds[j].title){
					mTween(move,{zIndex:15},100,'linear');
					move.onOff = true;
					break;
				}
			}
		}
		//小弹框出现
		//取消合并：
		if( move.onOff ){
			//取消操作
			mno.onclick = function(){
				mTween(move,{zIndex:-2},10,'linear',function(){
					mTween(moveshow,{zIndex:-1},10)
					said('movewarn2')
				})
			}
			//有重名文件时,把重名选中的文件留在源文件中
			msure.onclick = function(){
				mTween(move,{zIndex:-2},10,'linear',function(){

					for(var i=0; i<checkedSpanChilds.length; i++){
						for(var j=0; j<clickSpanChilds.length; j++){
							//在获取选中文件夹之前，把重名文件的span去掉checked，这样函数调用的时候就只能获取去重后的文件了
							
							if(checkedSpanChilds[i].title == clickSpanChilds[j].title){
								//获取选中的文件的li
								var moveCheckLi = list.querySelector(`li[data-index="${checkedSpanChilds[i].id}"]`);//获取选中的li 
								//获取选中的li里的span
								var moveCheckSpan = moveCheckLi.querySelector('span')
								//把重名的文件里的span去掉checked
								moveCheckSpan.classList.remove('checked')
							}
						}
					}
					//确定取消弹框隐藏
					mTween(moveshow,{zIndex:-1},10)
					//改变去重之后的文件的pid
					changePid(moveChooseIndex)

					//结构重生成
					secthtml(dataspanN)//生成结构函数
					navhtml(dataspanN)//生成导航函数
					reEvent(dataspanN);//添加事件函数 包括了侧栏树形菜单的生成

					said('movecopywarn')
				})
				
			}
			//无重名文件时
		}else{
			mTween(moveshow,{zIndex:-1},10)
			//修改选中的文件夹的pid
			changePid(moveChooseIndex)
			secthtml(dataspanN)//生成结构函数
			navhtml(dataspanN)//生成导航函数

			reEvent(dataspanN);//添加事件函数 包括了侧栏树形菜单的生成
		
			said('movesucess')
		}
		//
		move.onOff = false;
	}
	//取消按钮
	moveno.onclick = function(){
		mTween(moveshow,{zIndex:-1},10,'linear',function(){
			said('movewarn2')
		})
	}
	//设为true，方便点击document时取消选中的文件夹
	moveto.onOff = false;
}
//点击空白取消移动框的显示
/*document.addEventListener('mousedown',function(){
	if(moveto.onOff){
		mTween(moveshow,{zIndex:-1},10,'linear',function(){
			moveto.onOff = false;
			said('movewarn2');
		})
	}
		
})*/

function getMoveIndexEvent(){
	movejudge.innerHTML = '';
	var movespans= $('span',movecont);//弹框的span的集合
	//微云刚开始显示样式
	movespans[0].className = 'active';
	for(var i=0; i<movespans.length; i++){
		movespans[i].onclick = function(){
			moveChooseIndex = this.dataset.index;//改变选中的span的dataindex

			//点击目标文件夹添加样式
			for(var i=0; i<movespans.length; i++){
				movespans[i].className = '';
			}
			for(var i=0; i<movespans.length; i++){
				if(movespans[i].dataset.index == moveChooseIndex){
					movespans[i].className = 'active';
				}
			}

			//选中文件夹本身及子孙节点的集合
			var allChildsArr = checkedFolderChilds();

			//判断1：移动到的文件夹包含或在选中的文件夹中
			for(var i=0; i<allChildsArr.length; i++){
				if(allChildsArr[i].id == moveChooseIndex){
					movejudge.innerHTML = info['movejudgewarn2'];
					movesure.onOff = false;
					return;
				}
			}

			//判断2：选择的是选中的文件的父级不能移动
			if(dataspanN == moveChooseIndex){
				movejudge.innerHTML = info['movejudgewarn']
				movesure.onOff = false;
			}else{
				movejudge.innerHTML = '';
				movesure.onOff = true;
			}
			//console.log(moveChooseIndex)
		}
	}
}
//返回选中的文件夹的所有的数据子集组成数组
function checkedFolderChilds(){
	var arr = [];
	for(var i=0; i<recheckSpan.length; i++){
		var recheckspanParentIndex = recheckSpan[i].parentNode.dataset.index;
		arr = arr.concat( getAllChilds(recheckspanParentIndex) )
	}
	return arr;
}
//点击移动到的文件夹后，如果可以移动，则把选中的文件夹的pid改为点击的id.
function changePid(pid){
	for(var i=0; i<recheckSpan.length; i++){
		var recheckspanParentIndex = recheckSpan[i].parentNode.dataset.index;
		data[recheckspanParentIndex].pid = Number(pid);
	}
}
//获取选中的文件夹组成集合
function getcheckedSpanChilds(){
	var arr = [];
	for(var i=0; i<recheckSpan.length; i++){
		var recheckspanParentIndex = recheckSpan[i].parentNode.dataset.index;
		arr.push(data[recheckspanParentIndex])
	}
	return arr;
}


