<?php
require_once"funciones/funciones.php";
include "app/Conexion.php";

class GetCategorias{

	
	private $mysqli=null;
	
	public function __construct(){
		$mysql=new Conexion();
		$this->mysqli=$mysql->Conectar();
		//$this->mysqli->set_charset('utf8mb4');
		$this->Get();
	}

	private function Get(){

		$ini=Inyeccion(param('ini'),$this->mysqli);
		$id_grupo=Inyeccion(param('id_grupo'),$this->mysqli);
		
		
		$sql="SELECT * from categorias order by categoria asc";
		
		GetRowsJson($this->mysqli->query($sql));	
		
		
	}

	
}


?>