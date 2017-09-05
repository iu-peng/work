<?php 
error_reporting(0);
$callback = $_GET['callback'];
//$type = $_GET('type');

$array = Array(111,2222,3333,4444);

echo $callback . '&&' . $callback . '(' . json_encode($array) . ');';


 ?>