<?php
header('content-type:text/html;charset=utf-8');
//echo phpinfo();
$username = $_POST['user'];

$users = array('leo','momo','dudu','刘伟','妙味');

//echo $users[0];

//sleep(10);

if( in_array( $username , $users ) ){
	
	echo $username.'已经被注册了！';

}else{

	echo $username.'可以注册';

}

?>