<?php
require_once"funciones/funciones.php";
include "app/Conexion.php";

class SetGrupo{

	
	private $mysqli=null;
	
	public function __construct(){
		$mysql=new Conexion();
		$this->mysqli=$mysql->Conectar();
		$this->Set();
	}

	private function Set(){

		$id_grupo=Inyeccion(param('id_grupo'),$this->mysqli);
		$id_usuario=Inyeccion(param('id_usuario'),$this->mysqli);
		$nombre=Inyeccion(param('nombre'),$this->mysqli);
		$descripcion=Inyeccion(param('descripcion'),$this->mysqli);
		$fecha=fechahora();
		
		$sql="INSERT into grupos (id_grupo,id_usuario,nombre,descripcion,fecha) values('$id_grupo','$id_usuario','$nombre','$descripcion','$fecha')  ";
		
		if($this->mysqli->query($sql)){
			echo '{"respuesta":"1"}';
			$sql="UPDATE usuarios set id_grupo='$id_grupo' where id_usuario='$id_usuario' ";
			$this->mysqli->query($sql);	
		}else{
			echo '{"respuesta":"0"}';
		}	
		
		
	}

	
}


?>