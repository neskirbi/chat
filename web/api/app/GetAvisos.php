<?php
require_once"funciones/funciones.php";
include "app/Conexion.php";

class GetAvisos{

	
	private $mysqli=null;
	
	public function __construct(){
		$mysql=new Conexion();
		$this->mysqli=$mysql->Conectar();
		$this->Get();
	}

	private function Get(){

		$id_grupo=Inyeccion(param('id_grupo'),$this->mysqli);
		
		$sql="SELECT * from avisos as avi 
		join usuarios as usu on usu.id_usuario=avi.id_usuario
		where avi.id_grupo ='$id_grupo' order by avi.fecha desc limit 10 ";
		
		GetRowsJson($this->mysqli->query($sql));	
		
		
	}

	
}


?>