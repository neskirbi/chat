<?php
require_once"funciones/funciones.php";
include "app/Conexion.php";

class SetAlertas{

	
	private $mysqli=null;
	
	public function __construct(){
		$mysql=new Conexion();
		$this->mysqli=$mysql->Conectar();
		$this->Set();
	}

	private function Set(){

		$id_alerta=uuid();
		$id_grupo=Inyeccion(param('id_grupo'),$this->mysqli);
		$id_usuario=Inyeccion(param('id_usuario'),$this->mysqli);
		$asunto=Inyeccion(param('asunto'),$this->mysqli);
		$mensaje=Inyeccion(param('mensaje'),$this->mysqli);
		$fecha=fechahora();

		if($id_grupo!=""){
			$sql="INSERT into alertas (id_alerta,id_grupo,id_usuario,asunto,mensaje,fecha) values('$id_alerta','$id_grupo','$id_usuario','$asunto','$mensaje','$fecha')  ";
		
			if($this->mysqli->query($sql)){
				echo '{"respuesta":"1"}';
			}else{
				echo '{"respuesta":"0"}';
			}	
		}else{
			echo '{"respuesta":"0"}';
		}
		
		
		
		
	}

	
}


?>