<?php
require_once"funciones/funciones.php";
include "app/Conexion.php";

class GetPreAlertas{

	
	private $mysqli=null;
	
	public function __construct(){
		$mysql=new Conexion();
		$this->mysqli=$mysql->Conectar();
		$this->Get();
	}

	private function Get(){

		$id_grupo=Inyeccion(param('id_grupo'),$this->mysqli);
		
		$sql="SELECT * from prealertas order by asunto asc   ";
		
		GetRowsJson($this->mysqli->query($sql));	
		
		
	}

	
}


?>