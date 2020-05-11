<?php
require_once"funciones/funciones.php";
include "app/Conexion.php";

class SetInfoEdit{

	
	private $mysqli=null;
	
	public function __construct(){
		$mysql=new Conexion();
		$this->mysqli=$mysql->Conectar();
		$this->Set();
	}

	private function Set(){


		$id_usuario=Inyeccion(param('id_usuario'),$this->mysqli);
		$nombres=Inyeccion(param('nombres'),$this->mysqli);
		$apellidos=Inyeccion(param('apellidos'),$this->mysqli);
		$direccion=Inyeccion(param('direccion'),$this->mysqli);
		$pass=Inyeccion(param('pass'),$this->mysqli);
		
		$sql="UPDATE  usuarios set nombres='$nombres',apellidos='$apellidos',direccion='$direccion',pass='$pass' where id_usuario='$id_usuario'  ";
		
		if($this->mysqli->query($sql)){
			echo '{"respuesta":"1"}';
		}else{
			echo '{"respuesta":"0"}';
		}	
		
		
	}

	
}


?>