<?php
require_once"funciones/funciones.php";
include "app/Conexion.php";

class GetAlertas{

	
	private $mysqli=null;
	
	public function __construct(){
		$mysql=new Conexion();
		$this->mysqli=$mysql->Conectar();
		$this->Get();
	}

	private function Get(){

		$id_grupo=Inyeccion(param('id_grupo'),$this->mysqli);
		
		$sql="SELECT * from alertas where id_grupo ='$id_grupo' order by fecha desc limit 10  ";
		
		GetRowsJson($this->mysqli->query($sql));	
		
		
	}

	
}


?>