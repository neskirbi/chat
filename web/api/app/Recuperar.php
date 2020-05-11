<?php
require_once"funciones/funciones.php";
include "app/Conexion.php";

// Import PHPMailer classes into the global namespace
// These must be at the top of your script, not inside a function


// Load Composer's autoloader


// Instantiation and passing `true` enables exceptions



    //Recipients
   /*
    echo 'Message has been sent';
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$this->mail->ErrorInfo}";
}
*/
class Recuperar{

	
	private $mysqli=null;

	
	public function __construct(){
		
		$mysql=new Conexion();
		$this->mysqli=$mysql->Conectar();
		$this->Envia();
	}

	private function Envia(){

		
		if ( function_exists( 'mail' ) )
		{
			$email=Inyeccion(param('mail'),$this->mysqli);
		    $sql="SELECT pass from usuarios where mail ='$email' ";
			$rows=$this->mysqli->query($sql);
			if($rows->num_rows!=0){
				$row=$rows->fetch_array(MYSQLI_ASSOC);
				$titulo="Recuperando contraseña.";
				$mensaje='Tu contraseña es: '.$row['pass'];

				
		        if(MailTo($email,$titulo,$mensaje)) {
		           echo ('[{"response":"OK"}]');
		        } else {
		           echo ('[{"response":"Error"}]');
		        }

			

			}else{
				echo ('[{"response":"Error"}]');
			}	
		}else
		{
		    echo 'mail() has been disabled';
		}
		
		
		
		
	}

	
}


?>