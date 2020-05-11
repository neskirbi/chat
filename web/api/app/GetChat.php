<?php
require_once"funciones/funciones.php";
include "app/Conexion.php";

class GetChat{

	
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
		$limite="desc LIMIT 1";

		if($ini=="0"){
			$limite="asc";
		}
		
		$sql="SELECT cha.id_chat,cha.mensaje,usu.id_usuario,usu.nombres,usu.apellidos, DATE_FORMAT(cha.fecha, '%H:%i') as fecha from chat as cha 
		join usuarios as usu on usu.id_usuario=cha.id_usuario
		where cha.id_grupo ='$id_grupo' order by cha.fecha  $limite ";
		
		GetRowsJson($this->mysqli->query($sql));	
		
		
	}

	
}


?>