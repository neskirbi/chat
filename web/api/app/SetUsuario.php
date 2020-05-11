<?php
require_once"funciones/funciones.php";
include "app/Conexion.php";

class SetUsuario{

	
	private $mysqli=null;
	
	public function __construct(){
		$mysql=new Conexion();
		$this->mysqli=$mysql->Conectar();
		$this->Set();
	}

	private function Set(){


		$id_usuario=uuid();
		$nombres=Inyeccion(param('nombres'),$this->mysqli);
		$apellidos=Inyeccion(param('apellidos'),$this->mysqli);
		$direccion=Inyeccion(param('direccion'),$this->mysqli);
		$mail=Inyeccion(param('mail'),$this->mysqli);
		$pass=Inyeccion(param('pass'),$this->mysqli);

		$fecha=fechahora();
		
		$sql="INSERT into usuarios (id_usuario,nombres,apellidos,direccion,mail,pass,fecha) values('$id_usuario','$nombres','$apellidos','$direccion','$mail','$pass','$fecha')  ";
		
		if($this->mysqli->query($sql)){
			

			MailTo($mail,'Alarma Vecinal','Gracias por registrarse en Alarma Vecinal esperamos poder brindarle un buen servicio.<br>Sus datos de ingreso:<br> Nombre: '.$nombres.' '.$apellidos.'<br> Correo: '.$mail.'<br> Contraeña: '.$pass);
			
			

			echo '{"respuesta":"1"}';
		}else{
			echo '{"respuesta":"0"}';
		}	
		
		
	}

	
}


?>