<?php
header('content-type:text/html;charset=utf-8');
//echo phpinfo();
$username = $_GET['user'];

$users = array('leo','momo','dudu','刘伟','妙味');

//echo $users[0];

//echo $username;
//sleep(5);

if( in_array( $username , $users ) ){

	echo $username.'已经被注册了！';

}else{

	echo $username.'可以注册';

}


?>