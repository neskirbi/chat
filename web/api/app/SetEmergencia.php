<?php
require_once"funciones/funciones.php";
include "app/Conexion.php";

class SetEmergencia{

	
	private $mysqli=null;
	
	public function __construct(){
		$mysql=new Conexion();
		$this->mysqli=$mysql->Conectar();
		$this->Set();
	}

	private function Set(){

		$id_emergencia=uuid();
		$id_usuario=Inyeccion(param('id_usuario'),$this->mysqli);
		$id_grupo=Inyeccion(param('id_grupo'),$this->mysqli);
		$tipo=Inyeccion(param('tipo'),$this->mysqli);
		$fecha=fechahora();

		if($id_grupo!=""){
			$sql="INSERT into emergencias (id_emergencia,id_usuario,id_grupo,tipo,fecha) values('$id_emergencia','$id_usuario','$id_grupo','$tipo','$fecha')  ";
		
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