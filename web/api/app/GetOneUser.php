<?php
require_once"funciones/funciones.php";
include "app/Conexion.php";

class GetOneUser{

	
	private $mysqli=null;
	
	public function __construct(){
		$mysql=new Conexion();
		$this->mysqli=$mysql->Conectar();
		$this->Get();
	}

	private function Get(){

		$mail=Inyeccion(param('mail'),$this->mysqli);
		$pass=Inyeccion(param('pass'),$this->mysqli);
		
		$sql="SELECT * from usuarios where mail='$mail' and pass='$pass' ";
		MailTo('neskirbi@gmail.com','Ingreso','Ingres&oacute; usuario en Alarma Vecinal.<br> Correo: '.$mail);
		
		GetRowsJson($this->mysqli->query($sql));	
		
		
	}

	
}


?>