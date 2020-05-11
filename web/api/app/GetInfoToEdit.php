<?php
require_once"funciones/funciones.php";
include "app/Conexion.php";

class GetInfoToEdit{

	
	private $mysqli=null;
	
	public function __construct(){
		$mysql=new Conexion();
		$this->mysqli=$mysql->Conectar();
		$this->Get();
	}

	private function Get(){

		$id_usuario=Inyeccion(param('id_usuario'),$this->mysqli);
		
		$sql="SELECT * from usuarios where id_usuario='$id_usuario' ";
		
		GetRowsJson($this->mysqli->query($sql));	
		
		
	}

	
}


?>