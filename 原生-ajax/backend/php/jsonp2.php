<?php 
error_reporting(0);
$callback = $_GET['callback'];
$type = $_GET['type'];

$array = Array(1111,222,333,444);

$array2 = Array("aaa",'bbb','cccc','ddd');

if( $type == 'number' ){

	echo $callback . '('. json_encode($array) .')';
}else{

	echo $callback . '('. json_encode($array2) .')';
}




 ?>