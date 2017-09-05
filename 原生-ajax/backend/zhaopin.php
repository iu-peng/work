<?php
header('content-type:text/html;charset=utf-8');
$type = $_GET['type'];

if(isset($_GET['page'])){
	$page = $_GET['page'];
}else{
	$page = 0;
}

$world = array();

for( $i = 0; $i < 50000; $i++ ){
	Array_push($world,array(
		'num'=> $i+1,
		'job'=> '社会招聘',
		'pNum'=> $i+2,
		'ask'=>' 岗位要求：1)helpdesk支持；2)熟悉计算机软、硬件及网络维护；3)有相关工作经验，态度端正；4)有一定的服务意识',
		'data'=> '2014-04-10'
	));
};
$school = array();

for( $i = 0; $i < 50000; $i++ ){
	Array_push($school,array(
		'num'=> $i+1,
		'job'=> '校园招聘',
		'pNum'=> 2,
		'ask'=>' 岗位要求：1)helpdesk支持；2)熟悉计算机软、硬件及网络维护；3)有相关工作经验，态度端正；4)有一定的服务意识',
		'data'=> '2014-04-10'
	));
};

if( $type === "world" ){
	$data = $world;
}else if($type === "school"){
	$data = $school;
}else{
	$data = array();
}


if( $page === 0 ){
	$nums = sizeof($data);
	$page = 1;
}else{
	$nums = 5;
}

$worldData = array(
	'list' => array_slice( $data,($page-1)*5,$nums ),
	'total' => sizeof($data),
	'pages' => $page,
	'num' => $nums
);

//sleep(2);

echo json_encode($worldData,true);

