<?php
require_once"funciones/funciones.php";
include "app/Conexion.php";

class SetChat{

	
	private $mysqli=null;
	
	public function __construct(){
		$mysql=new Conexion();
		$this->mysqli=$mysql->Conectar();
		//$this->mysqli->set_charset('utf8mb4');
		$this->Set();
	}

	private function Set(){


		$id_mensaje=Inyeccion(param('id_mensaje'),$this->mysqli);
		if($id_mensaje==""){
			$id_mensaje=uuid();
		}

		$id_sala=Inyeccion(param('id_sala'),$this->mysqli);
		$id_usuario=Inyeccion(param('id_usuario'),$this->mysqli);
		$nombre=Inyeccion(param('nombre'),$this->mysqli);
		$mensaje=str_replace(" ","+",Inyeccion(param('mensaje'),$this->mysqli));
		$tipo=Inyeccion(param('tipo'),$this->mysqli);
		$fecha=fechahora();
		
		$sql="INSERT into mensajes (id_mensaje,id_sala,id_usuario,nombre,mensaje,tipo,fecha) values('$id_mensaje','$id_sala','$id_usuario','$nombre','$mensaje','$tipo','$fecha')  ";
		
		if($this->mysqli->query($sql)){
			echo '{"respuesta":"1"}';
		}else{
			echo '{"respuesta":"0"}';
		}	
		
		
	}

	
}


?>