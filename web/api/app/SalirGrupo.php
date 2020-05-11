<?php
require_once"funciones/funciones.php";
include "app/Conexion.php";

class SalirGrupo{

	
	private $mysqli=null;
	
	public function __construct(){
		$mysql=new Conexion();
		$this->mysqli=$mysql->Conectar();
		$this->Salir();
	}

	private function Salir(){

	
		$id_usuario=Inyeccion(param('id_usuario'),$this->mysqli);

		$sql="UPDATE usuarios set id_grupo='' where id_usuario='$id_usuario' ";
		
		if($this->mysqli->query($sql)){
			echo'[{"response":"1"}]';
		}else{
			echo'[{"response":"0"}]';
		}

		
		
	}

	
}


?>