<?php
if (isset($_GET['url'])) {
	$url=filter_input(INPUT_GET, 'url',FILTER_SANITIZE_URL);
	$function=explode("/",$url);
}

if (file_exists("app/".$function[0].".php")) {
	require_once("app/".$function[0].".php");
	//$arurl=explode("/",$url);

	
}else{
	echo "Error de ruta: app/".$function[0].".php";
}



//Para verificar la ruta
//print_r($function);
//echo "app/".$function[0].".php";

$nclass=$function[0];


$class=new $nclass();


switch (count($function)) {
	case 2:
		$nmetodo=$function[1];
		$class->$nmetodo();
		break;
	
	default:
		# code...
		break;
}



?> 
