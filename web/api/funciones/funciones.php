<?php
session_start();
date_default_timezone_set('America/Mexico_City');
ini_set('upload_max_filesize','64M');
ini_set('post_max_size','64M');
ini_set('max_execution_time','300M');
ini_set('max_input_time', 300);
ini_set('display_errors', '1');


//pero tienes que guardar la conexion en una variable de session llamada data $_SESSION['data']
function GetConexion(){
	if($_SERVER['HTTP_HOST']==='localhost'){
		
		$datos['host']="localhost";
		$datos['user']="root";
		$datos['pass']="986532";
		$datos['db']="alerta";
					
					
	}else if($_SERVER['HTTP_HOST']==='192.168.1.143'){
		
		$datos['host']="localhost";
		$datos['user']="root";
		$datos['pass']="986532";
		$datos['db']="alerta";
	}else  {
		$datos['host']="localhost";
		$datos['user']="applabco_root";
		$datos['pass']="ramira1983cindy";
		$datos['db']="applabco_alarmavecinal";
	}
	return $datos;	
	
}

function GetRowsJson($rows){
	$result=array();
	if($rows->num_rows!=0){
		while($row=$rows->fetch_array(MYSQLI_ASSOC)){
		$result[]=$row;
		}

		echo json_encode($result);
	}else{
		echo ('[]');
	}
			
	
}



function uuid(){
    $data = random_bytes(16);
    $data[6] = chr(ord($data[6]) & 0x0f | 0x40); 
    $data[8] = chr(ord($data[8]) & 0x3f | 0x80); 
    return str_replace("-","",vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($data), 4)));
}

function param($parametro){
	
	if(isset($_REQUEST['data']) ){
		$param=json_decode($_REQUEST['data'],true);
		if(isset($param[$parametro])){
			return $param[$parametro];
		}else{
			return "";
		}
		
	}else{
		return "";
	}
	
}

function Inyeccion($string,$conexion){
	return $conexion->real_escape_string($string);
}


function Verificar($sql,$mysqli){
	//echo $sql;
	$sql=$mysqli->query($sql);
	
	if($row=$sql->fetch_array(MYSQLI_ASSOC)){
		return false;
	}else{
		return true;
	}
}

function Tipo(){
	return base64_decode($_SESSION['tipo']);
}

function fechahora(){
	return date('Y-m-d H:i:s');
}

function fecha(){
	return date('Y-m-d');
}

function rx_trim($string){
	return str_replace(" ", "", $string);
}



function Mailto($email,$titulo,$mensaje){
	require 'PHPMailer/PHPMailerAutoload.php';


	$mail = new PHPMailer;
	//$mail->SMTPDebug = SMTP::DEBUG_SERVER;                      
	// Enable verbose debug output   
    $mail->IsSMTP();                                        // Send using SMTP
    $mail->Host       = 'servidor1313.il.controladordns.com';                    // Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
    $mail->Username   = 'sistema@app-lab.com.mx';                     // SMTP username
    $mail->Password   = 'D@rcknes51983';                               // SMTP password
    //$mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;         // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` encouraged
    $mail->Port       = 465;  
    $mail->SMTPSecure = 'ssl';


	$mail->setFrom('sistema@app-lab.com.mx', 'Alarma Vecinal');
	$mail->addAddress($email);

	

    $mail->isHTML(true);

    $mail->Subject = $titulo;
    $mail->Body = $mensaje;

    if(!$mail->send()) {
       return false ;
    } else {
        return true;
    }


}




?>

