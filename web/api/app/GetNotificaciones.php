<?php
require_once"funciones/funciones.php";
include "app/Conexion.php";

class GetNotificaciones{

	
	private $mysqli=null;
	
	public function __construct(){
		$mysql=new Conexion();
		$this->mysqli=$mysql->Conectar();
		$this->Get();
	}

	private function Get(){

		$id_grupo=Inyeccion(param('id_grupo'),$this->mysqli);
		$fecha=fechahora();
		
		$sql="SELECT eme.id_emergencia,TIMEDIFF('$fecha', eme.fecha)as emergencia,usu.nombres,usu.apellidos,usu.direccion from grupos as gru 
		join emergencias as eme on eme.id_grupo=gru.id_grupo
		join usuarios as usu on usu.id_usuario=eme.id_usuario
		where gru.id_grupo ='$id_grupo' order by emergencia asc LIMIT 1 ";
		$rows=$this->mysqli->query($sql);

		
		$result=array();
		while($row=$rows->fetch_array(MYSQLI_ASSOC)){
			$arreglo=explode(":", $row['emergencia']);
			if($arreglo[0]=="00" && intval($arreglo[1])<=0 ){
				$row["extra"]=intval($arreglo[0])."---".intval($arreglo[1])."---".intval($arreglo[2]);
				$result[]=$row;
			}
		
		}

		$sql="SELECT id_aviso,asunto,mensaje,TIMEDIFF('$fecha', fecha)as fecha from avisos where id_grupo ='$id_grupo' order by fecha asc limit 1 ";
		$rows=$this->mysqli->query($sql);
		while($row=$rows->fetch_array(MYSQLI_ASSOC)){
			$arreglo=explode(":", $row['fecha']);
			if($arreglo[0]=="00" && intval($arreglo[1])<=2 ){
				$result[]=$row;
			}
		
		}

		$sql="SELECT id_alerta,asunto,TIMEDIFF('$fecha', fecha)as fecha from alertas where id_grupo ='$id_grupo' order by fecha asc limit 1  ";
		$rows=$this->mysqli->query($sql);
		while($row=$rows->fetch_array(MYSQLI_ASSOC)){
			$arreglo=explode(":", $row['fecha']);
			if($arreglo[0]=="00" && intval($arreglo[1])<=2 ){
				$result[]=$row;
			}
		
		}

		echo json_encode($result);
		
		//GetRowsJson($this->mysqli->query($sql));	
		
		
	}

	
}


?>