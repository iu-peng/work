<?php 
error_reporting(0);
$callback = $_GET['callback'];
$type = $_GET['type'];

$array = Array(1111,222,333,444);
$array2 = Array("aaa",'bbb','cccc','ddd');

echo $callback . '('. json_encode($array) .')';
 ?>