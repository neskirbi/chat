<?php
require_once"funciones/funciones.php";
include "app/Conexion.php";

class GetSalas{

	
	private $mysqli=null;
	
	public function __construct(){
		$mysql=new Conexion();
		$this->mysqli=$mysql->Conectar();
		//$this->mysqli->set_charset('utf8mb4');
		$this->Get();
	}

	private function Get(){

		$id_categoria=Inyeccion(param('id_categoria'),$this->mysqli);
		$fecha=fechahora();
		
		$sql="SELECT  sal.id_sala,sal.id_categoria,sal.sala,sal.fecha,(SELECT TIMEDIFF(fecha,'$fecha') as numero from usuarios where TIMEDIFF(fecha,'$fecha')<'00:00:30') as numero from salas as sal where sal.id_categoria='$id_categoria' order by sal.sala asc ";
		
		GetRowsJson($this->mysqli->query($sql));	
		
		
	}

	
}


?>