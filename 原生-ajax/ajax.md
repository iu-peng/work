# 本地服务建立


---

## wamp

* 建立本地服务的步骤：
    1. 运行wamp软件，颜色变为绿色
    2. 点击图标，依次找到apache-->httpd.conf-->找到中间靠上位置的ServerName localhost:80
    3. 将localhost:80 改为现在电脑的ip地址，如：192.168.2.110 保存生效
    4. 点击图标重启wamp
    5. 其他设备打开浏览器，地址栏输入192.168.2.110:80/目录名 , 就能访问www文件夹下的文件了。
    6. conf文件中Listen是修改的端口，默认是：80；--> 地址栏输入地址时不用带端口号；；修改为其他的端口如:8080，输入地址时要带端口号
    7. 只要修改了httpd.conf文件，就要重启wamp的所有服务。

> * wamp的所有可访问文件都在目录下的www文件夹中，查看本地服务器文件的方法：

> 1. 地址栏中输入localhost会转到图形界面，点击your projects下的目录即可运行文件。---->仅限本地访问
> 2. 地址栏中输入本机IP，非80端口加写端口号，也可以进入图形界面。---->用于在其他设备上共享

## Form表单

* get和post的区别（浏览器范围内）

    * 发送数据的方式不同
> get：在地址栏的?后面以queryString( key=value1&key=value2 )的形式
> post：发送数据 的方式，放在HTTP请求的body（主体）发送的

    * 地址栏数据长度的限制
> get：数据长度有限制
> post：理论上没有大小限制，服务端会有限制
    
    * 安全性
> get：不安全，发送一些不重要的信息
> post：相对安全

------------------------------------
> ### **请求**：request

> Method URL HTTP版本---请求头
> 字段：值-------------消息头
> ----------------主体body

-
> ### **响应**：response

> HTTP版本 状态码 响应短语--响应头
> -------------消息头
> -------------响应的主体（返回的数据）

------------------------------------

## AJAX

> ### **ajax**
> 定义：异步的js和XML，不刷新整个页面实现更新局部信息的技术。
> 作用：
        1. 发送数据和服务器进行交互 
        2. 实现异步更新，不需要刷新整个页面

### 工作步骤

1. 创建得到Ajax对象

    ```js
    let xhr = new XMLHttpRequest();//创建一个Ajax对象
    ```
2. 连接地址，准备好数据

    ```js
    xhr.open(
        'GET',//发送方式
        'localhost/php.php',//请求地址
        true//为true代表异步执行
    )
    ```
3. 发送

    ```js
    xhr.send();//发送
    ```
4. 接收数据完成

    ```js
    xhr.onload = function(){
        
    }
    ```

## Ajax工作流程
|工作流程|初始化，未发送|准备数据，连接地址|返回响应头|接收数据中| 接收数据完毕|
|:------:|  :------:  | :------:|:------:|:------:|:------:|
|英文表示|UNSENT|OPENED|HEADERS_RECEIVED|LOADING|DONE|
|意义|   |     |未返回内容，只返回响应头|返回内容,数据量大,分批返回|数据完全接收完成|
|**readyState**|**0**|**1**|**2**|**3**|**4**|

## Ajax监控
```js
xhr.onreadystatechange = function(){
    if( readyState === 4 ){//传输完成
    
    }
}
```

##get和post传输的不同
### get方式
> get方式是默认的传输方式，可以不用写GET，但是要在open()方法中的url地址后面跟上待验证的数据，手动添加上?和其他name标识，这样才能正确请求到数据，并返回验证结果

```js
btn.onclick = function(){
	let xhr = new XMLHttpRequest();

	xhr.open(
		'GET',//默认为get
		//请求的地址要与url的指向对应，后面添加待验证的数据
		'http://localhost/ajax/backend/php/get.php?user='+ username.value,
		true
	)

	xhr.send();
	//收到响应
	xhr.onload = function(){
		console.log(xhr.responseText);
		tip1.innerHTML = xhr.responseText;
	}

}
```


### post方式
> post传输方式和get传输的最大不同就是send()方法是否带参数，get不用带参数，数据都跟在open中url链接后面，post则不能直接跟在后面，必须把数据写在send()中，并且要加上name标记。

> post还要**设置请求头**，转为后端识别的编码。

```js
username.onblur = function(){
    //创建Ajax对象
	let xhr = new XMLHttpRequest();
	//准备好链接和地址
	xhr.open(
		'post',//指定传输方式
		//请求的地址要与url的指向对应
		'http://localhost/ajax/backend/php/post.php',
		true
	)

	//设置post的传输类型，后端没有前端的三种类型，需要手动设置。
	xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded')
	
	//传输的数据写在send中。
	xhr.send('user='+username.value);
	
	//收到响应
	xhr.onload = function(){
		console.log(xhr.responseText);
		tip1.innerHTML = xhr.responseText;
	}
}
```

## json--javascript Object Notation
> 从后端返回的数据，流行的数据格式是json数据格式，是一个字符串。是一种轻量级的数据交换格式。

> json数据结构格式：
1. “名称/值”对的集合'{"key":value,"key2":value}'
key值必须写双引号，value值可以是除了函数以外的任意类型。 如：

```js
'{"name":"abc","age":18}'
```

### JSON.parse(json)---将json字符串转为对象

```js
let obj = [
	{
		name:'abcd',
		age:12
	},
	{
		name:'abcd',
		age:12
	},
	{
		name:'abcd',
		age:12
	}
]

let strjson = JSON.stringify(obj)//转为json字符串

console.log( JSON.parse(strjson) )//将json字符串转为对象
//[{…}, {…}, {…}]
```

> JSON是全局函数，此方法是高版本浏览器提供的方法
> 低版本浏览器在JSON官网有提供的json2.js兼容

> 前端向后端发送数据只能是json字符串，后端发送过来的也是json字符串。

### JSON.stringify(jsonObj,null,5)---将对象转为json字符串

* JSON.stringify(jsonObj,null,5)
> 将一大堆的json字符串转为格式化后的可直观看的数据。数字5代表每行数据的缩进单位，缩进几个空格。


```js
let obj = [
	{
		name:'abcd',
		age:12
	},
	{
		name:'abcd',
		age:12
	},
	{
		name:'abcd',
		age:12
	}
]

let a = false;
let b = 1009;
let c = null;

let strjson = JSON.stringify(obj)//转为json字符串

console.log( JSON.stringify(obj,null,3) )//将对象转为json字符串，3个空格缩进
/*'[
   {
      "name": "abcd",
      "age": 12
   },
   {
      "name": "abcd",
      "age": 12
   },
   {
      "name": "abcd",
      "age": 12
   }
]'*/

console.log( JSON.stringify(a) )//将布尔值转为json字符串
//'false'

console.log( JSON.stringify(b) )//将数字转为json字符串
//'1009'

console.log( JSON.stringify(c) )//将数字转为json字符串
//'null'
```

## 上传的两种方式

### 通过form表单上传
```html
<form 
	action="http://localhost/ajax/backend/post_file.php"
	method="post"
	enctype="multipart/form-data"
    >
	<input type="file" name="file" id="fileUp">
	<input type="submit" id="btn">
</form>
```
> action指向上传到服务器的地址。
> enctype：指定上传类型为二进制形式
> method：上传都为post类型

    点击submit会直接进行跳转。

### 通过Ajax进行上传
```js
let xhr = new XMLHttpRequest();

xhr.open('post','http://localhost/ajax/backend/post_file.php',true)

console.dir( fileUp )

let fileth = new FormData();//创建一个对象。
fileth.append('file',fileUp.files[0])//append方法将文件转为二进制。

xhr.send(fileth);//将创建的对象发送出去。

xhr.onload = function(){
	//console.log(xhr.responseText)
}
```

> 利用input中file类型中有个属性files，它会记录选中文件的名称，size等特性。利用通过FormData()新创建的fileth对象对文件进行二进制编码上传。

* 修改apache上传发送文件大小的限制 在目录：**C:\wamp\bin\apache\Apache2.2.21\bin** 中修改
post_max_size = 999M
upload_max_filesize = 999M

## 监控上传进度---xhr.upload.onprogress

> 每次上传的过程中都会触发ajax对象的upload.onprogress事件。

  
```js
xhr.upload.onprogress = function(ev){
    console.log(ev.loaded);//上传了多少
    console.log(ev.total); //上传文件总大小
}
```

## 跨域
> ### **域名**：
baidu.com --- 一级域名
baike.baidu.com --- 二级域名
abc.baike.baidu.com --- 三级域名

-
> ### **协议**
有多种协议：
http
https
ftp
mail
file

-
> ### **端口**
默认端口
http:80
http:443

## jsonp

> jsonp = json + padding

* 允许跨域的标签：img，script，a，link，

流程：
先创建一个script标签，src地址赋值远程地址，


