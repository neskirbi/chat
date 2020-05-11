<?php
require_once"funciones/funciones.php";
include "app/Conexion.php";

class SetAvisos{

	
	private $mysqli=null;
	
	public function __construct(){
		$mysql=new Conexion();
		$this->mysqli=$mysql->Conectar();
		$this->Set();
	}

	private function Set(){


		$id_aviso=uuid();
		$id_grupo=Inyeccion(param('id_grupo'),$this->mysqli);
		$id_usuario=Inyeccion(param('id_usuario'),$this->mysqli);
		$asunto=Inyeccion(str_replace(" ","+",param('asunto')),$this->mysqli);
		$mensaje=Inyeccion(str_replace(" ","+",param('mensaje')),$this->mysqli);
		$fecha=fechahora();
		
		$sql="INSERT into avisos (id_aviso,id_grupo,id_usuario,asunto,mensaje,fecha) values('$id_aviso','$id_grupo','$id_usuario','$asunto','$mensaje','$fecha')  ";
		
		if($this->mysqli->query($sql)){
			echo '{"respuesta":"1"}';
		}else{
			echo '{"respuesta":"0"}';
		}	
		
		
	}

	
}


?>