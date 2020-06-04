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

		$id_sala=Inyeccion(param('id_sala'),$this->mysqli);
		$id_usuario=Inyeccion(param('id_usuario'),$this->mysqli);
		$usuario=Inyeccion(param('usuario'),$this->mysqli);
		
		$fecha=Inyeccion(param('fecha'),$this->mysqli);
		$fecha_usuario=fechahora();

		$sql="INSERT INTO usuarios (id_usuario,usuario,id_sala,fecha) VALUES('$id_usuario', '$usuario', '$id_sala','$fecha_usuario') ON DUPLICATE KEY UPDATE usuario='$usuario', fecha='$fecha_usuario', id_sala='$id_sala'  ";
		
		$this->mysqli->query($sql);



		
		if($fecha==""){
			$sql="SELECT id_usuario,nombre,mensaje,fecha,DATE_FORMAT(fecha, '%H:%i') as hora from mensajes where id_sala ='$id_sala' and id_sala !=''  order by fecha desc limit 1";
		}else{
			$sql="SELECT id_usuario,nombre,mensaje,fecha,DATE_FORMAT(fecha, '%H:%i') as hora
			from mensajes  
			where id_sala ='$id_sala' and id_sala !='' and TIMEDIFF(fecha,'$fecha')>'00:00:00' order by fecha desc";
		}
		
		
		/*$sql="SELECT id_chat,mensaje, DATE_FORMAT(fecha, '%H:%i') as hora,fecha as fecha,tipo,TIMEDIFF(fecha,'$fecha')as diiff 
		from mensajes  
		where id_sala ='$id_sala' and id_sala !='' and TIMEDIFF(fecha,'$fecha')>'00:00:00' order by fecha desc";*/
		
		GetRowsJson($this->mysqli->query($sql));	
		
		
	}

	
}


?>