<?php

class Conexion{

	private $datos=array();
	private $mysqli;

	public function __construct(){

		$this->datos=GetConexion();
		
	
		$this->mysqli=new mysqli($this->datos['host'],$this->datos['user'],$this->datos['pass'],$this->datos['db']);

		if ($this->mysqli->connect_error) {
		    //printf("Falló la conexión failed: %s\n", $this->mysqli->connect_error);
		    //return null;
		}else{
			
			//$this->Conectar();
			
		}

		
	}
		

	public function Conectar(){
		if($this->mysqli!==null){
			$this->mysqli->set_charset('utf8');
			//echo"Conectado";
			return $this->mysqli;
		}
		else{
			return null;
		}
	}
	

	

	
}

?>