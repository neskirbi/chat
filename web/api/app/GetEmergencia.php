<?php
require_once"funciones/funciones.php";
include "app/Conexion.php";

class GetEmergencia{

	
	private $mysqli=null;
	
	public function __construct(){
		$mysql=new Conexion();
		$this->mysqli=$mysql->Conectar();
		$this->Get();
	}

	private function Get(){

		$id_emergencia=Inyeccion(param('id_emergencia'),$this->mysqli);
		$fecha=fechahora();
		
		$sql="SELECT eme.id_emergencia,TIMEDIFF('$fecha', eme.fecha)as emergencia,usu.nombres,usu.apellidos,usu.direccion,gru.nombre 
		from grupos as gru 
		join emergencias as eme on eme.id_grupo=gru.id_grupo
		join usuarios as usu on usu.id_usuario=eme.id_usuario
		where eme.id_emergencia ='$id_emergencia'  ";
		
		GetRowsJson($this->mysqli->query($sql));	
		
		
	}

	
}


?>