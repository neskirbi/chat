//Corriendo funciones al cargar pantalla
var debug=0;
//cualquier mamada
function Conexion(url,data){
	if(debug==1){
		console.log("S: "+data);
	}
	
	var respuesta="";
	respuesta = $.ajax({
	  	type: "POST",   
	    url: url,
	    data:{data:data},   
	    async: false
	}).done(function(result) {
	  //return result;
	}).responseText;
	if(debug==1){
		console.log("R: "+respuesta);
	}
	return respuesta;
	
}

function Ingresar(){
	if($('#user').val() != "" && $('#pass').val() != "" ){
		var data=JSON.parse('{}');
		data.user=$('#user').val();
		data.pass=$('#pass').val();
		var res = JSON.parse(Conexion("api/Ingresar",JSON.stringify(data)));
		if(res.response=="1"){
			window.location.replace("panel/index.php");
		}else{
			alert(res.porque);
		}
		
	}else{
		alert("Debe llenar el formulario");
	}
}

$(document).ready(function(){
	FullBody();
	AltoPantalla();
	altoporciento();
	anchoporciento();
	cuadrar();
	altomitad();
	AltoTo();

	//inicializacion de elementos html fechas, dialogos, etc

	$( ".datepicker_anios" ).each(function(){
		$(this).datepicker({
	        changeMonth: false,
	        changeYear: true,
	        showButtonPanel: true,
	        dateFormat: 'MM yy',
	        onClose: function(dateText, inst) { 
	            var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
	            var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
	            $(this).datepicker('setDate', new Date(year, month, 1));
	        }
    	});
	});

	$( ".datepicker_meses" ).each(function(){
		$(this).datepicker({
	        changeMonth: true,
	        changeYear: true,
	        showButtonPanel: true,
	        dateFormat: 'MM yy',
	        onClose: function(dateText, inst) { 
	            var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
	            var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
	            $(this).datepicker('setDate', new Date(year, month, 1));
	        }
    	});
	});

	$( ".datepicker" ).each(function(){
		$(this).datepicker({
	        changeMonth: true,
	        changeYear: true,
	        showButtonPanel: true,
	        dateFormat: 'MM yy',
	        onClose: function(dateText, inst) { 
	            var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
	            var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
	            $(this).datepicker('setDate', new Date(year, month, 1));
	        }
    	});
	});
});

function FullBody(){
	$('.full').each(function(){
		var alto=$(window).height()-110;
		$(this).css('height',alto+'px');
	});
}

function AltoTo(){
	$('.altoto').each(function(){
		if($(this).data('alto')){
			var alto=($('#'+$(this).data('element')).height()*($(this).data('alto')/100));
			$(this).css('height',alto+'px');	
		}
	});
}

function Altomapa(element){
	$('#mapa').each(function(){
		var alto=($(this).parent().height()*(97/100));
		console.log($(this).parent().height());
		console.log(alto);
		$(this).css('height',alto+'px');	
		
	});
}

function AltoPantalla(){
	$('.alto-content').each(function(){
		if($(this).data('alto')){
			var alto=$('body').height();
			$(this).css('height',alto+'px');
			console.log(alto);	
		}
	});
}


function altoporciento(){
	
	$('.alto').each(function(){
		if($(this).data('alto')){
			var menos=0;
			if($(this).data('menos')){
				menos=$(this).data('menos');
			}
			var alto=($(this).parent().height()*($(this).data('alto')/100))-(menos);
			$(this).css('height',alto+'px');	
		}
	});

}

function anchoporciento(){
	
	$('.ancho').each(function(){
		if($(this).data('ancho')){	
			var ancho=($(this).parent().width()*($(this).data('ancho')/100));		
			$(this).css('width',ancho+'px');	
		}
	});

}

function cuadrar(){
	
	$('.cuadrar').each(function(){
		if($(this).data('alto')){	
			var alto=($(this).parent().height()*($(this).data('alto')/100));		
			$(this).css('width',alto+'px');
			$(this).css('height',alto+'px');
			$(this).css('margin','0px');	
		}

		if($(this).data('ancho')){	
			var ancho=($(this).parent().width()*($(this).data('ancho')/100));	
			$(this).css('width',ancho+'px');
			$(this).css('height',ancho+'px');
			$(this).css('margin','0px');	
		}
	});

}



function altomitad(){
	
	$('.altomitad').each(function(){
		if($(this).data('ancho')){	
			var ancho=($(this).parent().width()*($(this).data('ancho')/100));	
			$(this).css('width',ancho+'px');
			$(this).css('height',(ancho/2)+'px');	
		}
	});

}

function CopiaAlto(de,a){

	var alto=$('#'+de).height();
	$('#'+a).css('height',alto+'px');	
	

}
	
$(document).ready(function(){
	

	$( "#form-registro" ).submit(function( event ) {
		event.preventDefault();
		if($('#mail').val() != "" && $('#nombre').val() && $('#telefono').val() != "" && $('#user').val() != "" && $('#pass').val() != "" && $('#pass2').val() != "" ){
			if($('#pass').val() == $('#pass2').val()){
				var data='{"mail":"'+$('#mail').val()+'","nombre":"'+$('#nombre').val()+'","telefono":"'+$('#telefono').val()+'","user":"'+$('#user').val()+'","pass":"'+$('#pass').val()+'","pass2":"'+$('#pass2').val()+'"}';
				
				var res = JSON.parse(Conexion("api/RegistrarCliente",data));
				if(res.response=="1"){
					alert("Registro exitoso.");
					window.location.replace("index.php");
				}else{
					alert(res.porque);
				}
			}else{
				alert("Las contraseñas no coinciden.");
			}
			
			
		}else{
			alert("Debe llenar el formulario");
		}
	});
	
});

function Redireccion(url){
	window.location.replace(url);
}


function AvatarDef(){
	return 'https://cdn.pixabay.com/photo/2017/01/25/17/35/picture-2008484_960_720.png';
}

function OpenClosNav(){

	if($('#sidebar').attr('class')=='sidebar-close'){
		$('#sidebar').attr('class','sidebar-open');
		$('#content-wrapper').attr('class','content-wrapper-open');
	}else{
		$('#sidebar').attr('class','sidebar-close');
		$('#content-wrapper').attr('class','content-wrapper-close');
	}
	
}

//No mover por que saca el nivel de bateria y datos del usuario al tiempo que pinta tarjetas de usuario tanto como pinta la Última localizacion de el usuario
function Location_gps(){
	var location_gps="";
    $("#content").html('<div id="mapa" style="height: 1px; width: 100%; position: relative; outline: none;" class="leaflet-container leaflet-touch leaflet-fade-anim leaflet-grab leaflet-touch-drag leaflet-touch-zoom" tabindex="0"></div>');
	Altomapa();

      var  fecha='';
      var  id_usuario='';
      var data='{"id_usuario":"'+id_usuario+'","fecha":"'+fecha+'"}';

      var obj=JSON.parse(Conexion("../api/GetGps",data));

      if(typeof (obj[0].lat)=="undefined" || typeof(obj[0].lon)=="undefined"){
            location_gps=result;
           
      }else{

       
        var map = L.map('mapa').setView([obj[0].lat, obj[0].lon], 21);
        var GRaster = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{subdomains:['mt0','mt1','mt2','mt3']});
		var OSMRoads =  L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
        L.control.locate().addTo(map);
	    L.control.layers({
		    'Satelite image' :GRaster,
		    'Road maps':OSMRoads
	    }).addTo(map);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        
        var latlngs = [];
       
        var tarjeta="";

        for(var i in obj){
         

          var tag =obj[i].nombre+"<br>"+obj[i].fecha;
           
          L.marker([obj[i].lat, obj[i].lon]).addTo(map).bindPopup(tag).openPopup();

            //diseño var latlngs = [[37, -109.05],[41, -109.03],[41, -102.05],[37, -102.04]];
          latlngs[i] = [obj[i].lat,obj[i].lon];
        	
	        tarjeta+='<div class="media border-round margin-top-15 ">';
			tarjeta+='<div class="media-left">';
			tarjeta+='<img src="'+obj[i].foto+'" class="media-object img-circle" style="width:80px; height:80px;"> ';
			tarjeta+='</div>';
			tarjeta+='<div class="media-body">';
			tarjeta+='<div style="height:50px;"><span class="bold">'+obj[i].nombre+'</span></div>';
			//tarjeta+='<div  class="">Última Ubicación'+obj[i].fecha+'</div>';
			tarjeta+='<div class="controls">';
			tarjeta+='<a title="Última ubicación." onclick="GetGpsNow(\''+obj[i].id_usuario+'\')" href="#" class="btn btn-default btn-xs"><img src="iconcolor/map-marker-green.png" ></img></a>';
			tarjeta+='<a title="Recorrido por fecha" onclick="TrazarHoy(\''+obj[i].id_usuario+'\')" href="#" class="btn btn-default btn-xs"><img src="iconcolor/route.png" ></img></a>';
			var img_bateria="0";

			if(obj[i].nivel_bateria!="NA" ){
				if((obj[i].nivel_bateria*1)>0 && (obj[i].nivel_bateria*1)<=25){
				img_bateria="25";
				}
				if((obj[i].nivel_bateria*1)>26 && (obj[i].nivel_bateria*1)<=50){
					img_bateria="50";
				}
				if((obj[i].nivel_bateria*1)>51 && (obj[i].nivel_bateria*1)<=75){
					img_bateria="75";
				}
				if((obj[i].nivel_bateria*1)>76 && (obj[i].nivel_bateria*1)<=100){
					img_bateria="100";
				}
			}else{
				img_bateria="100";
			}

			
			tarjeta+='<a title="'+obj[i].nivel_bateria+'%" onclick="" href="#" class="btn btn-default btn-xs"><img src="iconcolor/'+img_bateria+'.png" ></img></a>';
			tarjeta+='<a title="Avance" onclick="" href="#" class="btn btn-default btn-xs"><img src="iconcolor/reportes.png" ></img></a>';
			tarjeta+='</div>';
			tarjeta+='</div>';
			tarjeta+='</div>';

			

        }

         
        $('#content-equipo').html(tarjeta);         

		
        
         //L.polyline(latlngs, {color: 'red'}).addTo(map);
       

                        
      }

     
    
}


function GetGpsNow(id_usuario){
	var location_gps="";
    $("#content").html('<div id="mapa" style="height: 1px; width: 100%; position: relative; outline: none;" class="leaflet-container leaflet-touch leaflet-fade-anim leaflet-grab leaflet-touch-drag leaflet-touch-zoom" tabindex="0"></div>');
	Altomapa();

      var fecha=$('#fecha').val();
      var id_usuario=id_usuario;
      var data='{"id_usuario":"'+id_usuario+'","fecha":"'+fecha+'"}';

      var obj=JSON.parse(Conexion("../api/GetGpsNow",data));

      if(typeof (obj[0].lat)=="undefined" || typeof(obj[0].lon)=="undefined"){
            location_gps=result;
           
      }else{

       
        var map = L.map('mapa').setView([obj[0].lat, obj[0].lon], 21);
        var GRaster = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{subdomains:['mt0','mt1','mt2','mt3']});
		var OSMRoads =  L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
        L.control.locate().addTo(map);
	    L.control.layers({
		    'Satelite image' :GRaster,
		    'Road maps':OSMRoads
	    }).addTo(map);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        
        var latlngs = [];

       

        for(var i in obj){
         

          var tag =obj[i].nombre+"<br>"+obj[i].fecha;
           
          L.marker([obj[i].lat, obj[i].lon]).addTo(map).bindPopup(tag).openPopup();

            //diseño var latlngs = [[37, -109.05],[41, -109.03],[41, -102.05],[37, -102.04]];
          latlngs[i] = [obj[i].lat,obj[i].lon];
        	

        }

                        
      }

     
	    
}


function TrazarHoy(id_usuario){
	var location_gps="";
    $("#content").html('<div id="mapa" style="height: 1px; width: 100%; position: relative; outline: none;" class="leaflet-container leaflet-touch leaflet-fade-anim leaflet-grab leaflet-touch-drag leaflet-touch-zoom" tabindex="0"></div>');
	Altomapa();

    if(id_usuario!=""){

      var  fecha=$('#fecha').val();
      var  id_usuario=id_usuario;
      var data='{"id_usuario":"'+id_usuario+'","fecha":"'+fecha+'"}';

      var obj=JSON.parse(Conexion("../api/GetGps",data));

      if(typeof (obj[0].lat)=="undefined" || typeof(obj[0].lon)=="undefined"){
            location_gps=result;
           
      }else{

       
        var map = L.map('mapa').setView([obj[0].lat, obj[0].lon], 21);
        var GRaster = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{subdomains:['mt0','mt1','mt2','mt3']});
		var OSMRoads =  L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
        L.control.locate().addTo(map);
	    L.control.layers({
		    'Satelite image' :GRaster,
		    'Road maps':OSMRoads
	    }).addTo(map);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        
        var latlngs = [];
        $html_usuarios='<option value=""></option>';
        var tarjeta="";

        var inicioflag = L.icon({
		    iconUrl: 'images/misimagenes/greenflag.png',
		    //shadowUrl: 'leaf-shadow.png',

		    iconSize:     [40, 40], // size of the icon
		   /* shadowSize:   [50, 64], // size of the shadow
		    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
		    shadowAnchor: [4, 62],  // the same for the shadow
		    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
		    */
		});

		var finflag = L.icon({
		    iconUrl: 'images/misimagenes/cuadrosflag.png',
		    //shadowUrl: 'leaf-shadow.png',

		    iconSize:     [40, 40], // size of the icon
		    /*shadowSize:   [50, 64], // size of the shadow
		    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
		    shadowAnchor: [4, 62],  // the same for the shadow
		    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
		    */
		});

        for(var i in obj){
          
          if(!$html_usuarios.includes('<option value="'+obj[i].id_usuario+'">'+obj[i].nombre+'</option>')){
          	$html_usuarios += '<option value="'+obj[i].id_usuario+'">'+obj[i].nombre+'</option>';
          }
            


          var tag =obj[i].nombre+"<br>"+obj[i].fecha;
          console.log(i);
          if(i==(obj.length-1)){
          	console.log(i);
          	L.marker([obj[i].lat, obj[i].lon],{icon:inicioflag}).addTo(map).bindPopup(tag).openPopup();
          }else if(i==0){
          	console.log(i);
          	L.marker([obj[i].lat, obj[i].lon],{icon:finflag}).addTo(map).bindPopup(tag).openPopup();
          }else if( i > 0 && i < (obj.length-1) ){
          	L.marker([obj[i].lat, obj[i].lon]).addTo(map).bindPopup(tag).openPopup();
          }
           
          

            //diseño var latlngs = [[37, -109.05],[41, -109.03],[41, -102.05],[37, -102.04]];
          latlngs[i] = [obj[i].lat,obj[i].lon];
        	
	        
            

        }
         
         L.polyline(latlngs, {color: 'red'}).addTo(map);
                    
      }

     
    }
    
}

function AgregarUsuario(){
	CargarFormulario();
	CargarBotonesUsu();
	$('.modal-title').html('<i class="fas fa-user-edit"></i> Agregar Usuario');
}

function CargarBotonesUsu(){
	var html='<button id="enviar" type="button" class="btn btn-primary" onclick="Agregar_Usuario();">Enviar</button>';
    html+='<button id="cancelar" type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>';
    $('#modal-footer').html(html);
}

function CargarBotonesEdiUsu(id_usuario){
	var html='<button id="enviar" type="button" class="btn btn-primary" onclick="Actualizar_Usuario(\''+id_usuario+'\');">Actualizar</button>';
    html+='<button id="cancelar" type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>';
    $('#modal-footer').html(html);
}

function Agregar_Usuario(){
	var foto64=$('#foto64').val();
	var nombre=$('#nombre').val();
	var mail=$('#mail').val();
	var telefono=$('#telefono').val();
	var user=$('#user').val();
	var pass=$('#pass').val();
	if((foto64.length*nombre.length*user.length*pass.length*telefono.length*mail.length)!=0){
		var data='{"foto64":"'+foto64+'","nombre":"'+nombre+'","user":"'+user+'","pass":"'+pass+'","telefono":"'+telefono+'","mail":"'+mail+'"}';
		
		var obj=JSON.parse(Conexion('../api/CargarUsuario',data));
		if(obj.response=="1"){
			
			$('#modal').modal('hide');
			CargarBrigada(ref);
		}else{
			alert(obj.porque);
			
		}
		
	}else{
		alert("¡Debe llenar todos los campos!");
	}
	
}

function Actualizar_Usuario(id_usuario){
	var foto64=$('#foto64').val();
	var nombre=$('#nombre').val();
	var mail=$('#mail').val();
	var telefono=$('#telefono').val();
	var user=$('#user').val();
	var pass=$('#pass').val();
	if((nombre.length*user.length*pass.length*telefono.length*mail.length)!=0){
		var data='{"id_usuario":"'+id_usuario+'","foto64":"'+foto64+'","nombre":"'+nombre+'","user":"'+user+'","pass":"'+pass+'","telefono":"'+telefono+'","mail":"'+mail+'"}';
		
		var obj=JSON.parse(Conexion('../api/ActualizarUsuario',data));
		if(obj.response=="1"){
			
			$('#modal').modal('hide');
			CargarBrigada(ref);
		}else{
			alert(obj.porque);
			
		}
		
	}else{
		alert("¡Debe llenar todos los campos!");
	}
	
}

function CargarBrigada(id_coordinador){
	$('#list').html('');
	var data='{"id_coordinador":"'+id_coordinador+'"}';
	var obj=JSON.parse(Conexion("../api/GetBrigada",data));
	for(var i in obj){

	    var tag='<li>';
	    tag +='<form action="perfil.php" method="post" id="'+obj[i].id_usuario+'" >';//<i class="fas fa-ellipsis-v"></i>
	    
	    
	    tag +='<div class="dropdown">';
	    tag +='<button type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="close"><i class="fa fa-ellipsis-v"></i></button>';
		
		tag +='<div class="dropdown-menu">';
		tag +='<div class="drop-option with-bborder"><a onclick="EditarUsuario(\''+obj[i].id_usuario+'\');" data-toggle="modal" data-target="#modal" href="#">Editar</a></div>';
		tag +='<div class="drop-option "><a onclick="EliminarUsuario(\''+obj[i].id_usuario+'\',\''+obj[i].nombre+'\');" href="#">Borrar</a></div>';
		tag +='</div>';
		tag +='</div>';
	    tag +='<img style="cursor: pointer;" src="'+obj[i].foto+'" alt="User Image" width="128" heigth="128" onclick="Perfil(this);"" data-id="'+obj[i].id_usuario+'" >';
	    tag +='<span class="users-list-name" >'+obj[i].nombre+'</span>';
	    tag +='<span class="users-list-phone" >'+obj[i].telefono+'</span>';
	    tag +='<input type="text" style="display:none;" name="id" value="'+obj[i].id_usuario+'" />';
	    tag +='</form>';
	    tag +='</li>';
	    $('#list').append(tag);
	}
}

function EditarUsuario(id_usuario){
	CargarFormulario();
	CargarBotonesEdiUsu(id_usuario);
	$('.modal-title').html('<i class="fas fa-user-edit"></i> Editar Usuario');

	var data='{"id_usuario":"'+id_usuario+'"}';
	var obj=JSON.parse(Conexion("../api/GetPerfil",data));
	
	$('#preview').attr('src',obj[0].foto);
	$('#nombre').val(obj[0].nombre);
	$('#mail').val(obj[0].mail);
	$('#telefono').val(obj[0].telefono);
	$('#user').val(obj[0].user);
	$('#pass').val(obj[0].pass);
}

function EliminarUsuario(id_usuario,nombre){
	if(confirm('Esta seguro que desea borrar a '+nombre+'?' )){
		var data='{"id_usuario":"'+id_usuario+'"}';		
		var obj=JSON.parse(Conexion('../api/BorrarUsuario',data));

		if(obj.response=="1"){
			alert(nombre+" se elimino correctamente.");			
			CargarBrigada(ref);
		}else{
			alert(obj.porque);
			
		}
	}
}




function AgregarCoordinador(){
	CargarFormulario();
	CargarBotonesCoo();
	$('.modal-title').html('<i class="fas fa-user-edit"></i> Agregar Coordinador');
}

function CargarBotonesCoo(){
	var html='<button id="enviar" type="button" class="btn btn-primary" onclick="Agregar_Coordinador();">Enviar</button>';
    html+='<button id="cancelar" type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>';
    $('#modal-footer').html(html);
}

function CargarBotonesEdiCoo(id_coordinador){
	var html='<button id="enviar" type="button" class="btn btn-primary" onclick="Actualizar_Coordinador(\''+id_coordinador+'\');">Actualizar</button>';
    html+='<button id="cancelar" type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>';
    $('#modal-footer').html(html);
}

function Agregar_Coordinador(){
	var foto64=$('#foto64').val();
	var nombre=$('#nombre').val();
	var mail=$('#mail').val();
	var telefono=$('#telefono').val();
	var user=$('#user').val();
	var pass=$('#pass').val();
	if((foto64.length*nombre.length*user.length*pass.length*telefono.length*mail.length)!=0){
		var data='{"foto64":"'+foto64+'","nombre":"'+nombre+'","user":"'+user+'","pass":"'+pass+'","telefono":"'+telefono+'","mail":"'+mail+'"}';
		
		var obj=JSON.parse(Conexion('../api/CargarCoordinador',data));
		if(obj.response=="1"){
			
			$('#modal').modal('hide');
			CargarCoordinador(ref);
		}else{
			alert(obj.porque);
			
		}
		
	}else{
		alert("¡Debe llenar todos los campos!");
	}
	
}

function Actualizar_Coordinador(id_coordinador){
	var foto64=$('#foto64').val();
	var nombre=$('#nombre').val();
	var mail=$('#mail').val();
	var telefono=$('#telefono').val();
	var user=$('#user').val();
	var pass=$('#pass').val();
	if((nombre.length*user.length*pass.length*telefono.length*mail.length)!=0){
		var data='{"id_coordinador":"'+id_coordinador+'","foto64":"'+foto64+'","nombre":"'+nombre+'","user":"'+user+'","pass":"'+pass+'","telefono":"'+telefono+'","mail":"'+mail+'"}';
		
		var obj=JSON.parse(Conexion('../api/ActualizarCoordinador',data));
		if(obj.response=="1"){
			
			$('#modal').modal('hide');
			CargarCoordinador(ref);
		}else{
			alert(obj.porque);			
		}
		
	}else{
		alert("¡Debe llenar todos los campos!");
	}
	
}


function CargarCoordinador(id_cliente){
	$('#list').html('');
	var data='{"id_cliente":"'+id_cliente+'"}';
	var obj=JSON.parse(Conexion("../api/GetCoordinadores",data));
	for(var i in obj){

	    var tag='<li>';
	    tag +='<form action="perfil.php" method="post" id="'+obj[i].id_coordinador+'" >';//<i class="fas fa-ellipsis-v"></i>
	    
	    
	    tag +='<div class="dropdown">';
	    tag +='<button type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="close"><i class="fa fa-ellipsis-v"></i></button>';
		
		tag +='<div class="dropdown-menu">';
		tag +='<div class="drop-option with-bborder"><a onclick="EditarCoordinador(\''+obj[i].id_coordinador+'\');" data-toggle="modal" data-target="#modal" href="#">Editar</a></div>';
		tag +='<div class="drop-option "><a onclick="EliminarCoordinador(\''+obj[i].id_coordinador+'\',\''+obj[i].nombre+'\');" href="#">Borrar</a></div>';
		tag +='</div>';
		tag +='</div>';
	    tag +='<img style="cursor: pointer;" src="'+obj[i].foto+'" alt="User Image" width="128" heigth="128" onclick="Perfil(this);"" data-id="'+obj[i].id_coordinador+'" >';
	    tag +='<span class="users-list-name" >'+obj[i].nombre+'</span>';
	    tag +='<span class="users-list-phone" >'+obj[i].telefono+'</span>';
	    tag +='<input type="text" style="display:none;" name="id" value="'+obj[i].id_coordinador+'" />';
	    tag +='</form>';
	    tag +='</li>';
	    $('#list').append(tag);
	}
}


function EditarCoordinador(id_coordinador){
	CargarFormulario();
	CargarBotonesEdiCoo(id_coordinador);
	$('#modal-title').html('<i class="fas fa-user-edit"></i> Editar Coordinador');

	var data='{"id_usuario":"'+id_coordinador+'"}';
	var obj=JSON.parse(Conexion("../api/GetPerfil",data));
	
	$('#preview').attr('src',obj[0].foto);
	$('#nombre').val(obj[0].nombre);
	$('#mail').val(obj[0].mail);
	$('#telefono').val(obj[0].telefono);
	$('#user').val(obj[0].user);
	$('#pass').val(obj[0].pass);
}

function EliminarCoordinador(id_coordinador,nombre){
	if(confirm('Esta seguro que desea borrar a '+nombre+'?' )){
		var data='{"id_coordinador":"'+id_coordinador+'"}';		
		var obj=JSON.parse(Conexion('../api/BorrarCoordinador',data));

		if(obj.response=="1"){
			alert(nombre+" se elimino correctamente.");			
			CargarCoordinador(ref);
		}else{
			alert(obj.porque);
			
		}
	}
}

/*
function Filtro(este){
	
	var buscar=$(este).val().toLowerCase();	
	$('.users-list-name').each(function(){
		$(this).parent().parent().css({"display": "none"});
		if($(this).html().toLowerCase().includes(buscar)  ){

		  $(this).parent().parent().css({"display": ""});

		}

	});
}
*/


function Perfil(este){
	$('#'+$(este).data('id')).submit();
}

function CargarPerfil(id_usuario){
	var data='{"id_usuario":"'+id_usuario+'"}';
	var obj=JSON.parse(Conexion("../api/GetPerfil",data));
	$('#foto').attr('src',obj[0].foto);
	$('#nombre').html(obj[0].nombre);
	$('#mail').html(obj[0].mail);
	$('#telefono').html(obj[0].telefono);
	$('#user').html(obj[0].user);
	$('#pass').html(obj[0].pass);
	
}

//Variable para solo refrescar cuando sea diferente
var obj_comp;
function Rastreando(id_usuario){
	var data='{"id_usuario":"'+id_usuario+'"}';
	obj_temp=Conexion("../api/Rastreando",data)
	var obj=JSON.parse(obj_temp);
	if(obj_temp!=obj_comp){
		Mapear(obj);
		obj_comp=obj_temp;
	}
	
}

function Mapear(obj,polyline=true){
	var location_gps="";
	$("#content").html('<div id="mapa" style="height: 1px; width: 100%; position: relative; outline: none;" class="leaflet-container leaflet-touch leaflet-fade-anim leaflet-grab leaflet-touch-drag leaflet-touch-zoom" tabindex="0"></div>');
	Altomapa();

	if(typeof (obj[0].lat)=="undefined" || typeof(obj[0].lon)=="undefined"){
	    location_gps=result;
	       
	}else{

		var map = L.map('mapa').setView([obj[0].lat, obj[0].lon], 21);
		var GRaster = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{subdomains:['mt0','mt1','mt2','mt3']});
		var OSMRoads =  L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
		L.control.locate().addTo(map);
	    L.control.layers({
		    'Satelite image' :GRaster,
		    'Road maps':OSMRoads
	    }).addTo(map);

	    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
	    }).addTo(map);

	    
	    var latlngs = [];
	    for(var i in obj){
	     
	     var tag =obj[i].nombre+"<br>"+obj[i].fecha;
	       
	      L.marker([obj[i].lat, obj[i].lon]).addTo(map).bindPopup(tag).openPopup();

	        //diseño var latlngs = [[37, -109.05],[41, -109.03],[41, -102.05],[37, -102.04]];
	      latlngs[i] = [obj[i].lat,obj[i].lon];
	    
	        

	    }
	   

	    if(polyline){      
	      L.polyline(latlngs, {color: 'red'}).addTo(map);
	    }	                    
	}

     
    
}

function myTimer() {
  var d = new Date();
  $('#tiempo').html( d.toLocaleTimeString());
}



function VerImagen(este){
	var idfoto=$(este).attr('id').replace("b","f");
	var idtexto=$(este).attr('id').replace("b","t");
	console.log(idtexto);
	 if (este.files && este.files[0]) {
	 	var reader = new FileReader();

	    reader.onload = function (e) {
	        $('#'+idfoto).attr('src', e.target.result);

	        var pre64=e.target.result.split(',');
	        $('#'+idtexto).val(pre64[1]);
	    }
	    reader.readAsDataURL(este.files[0]);
	}else{
		$('#'+idfoto).attr('src',AvatarDef());
		$('#'+idtexto).val('');
	}
	
}

function CargarFormulario(){
	$('#Box-Body').html(LeerArchivo('formularios/FormUsuario.php'));
}

function LeerArchivo(nombre){
	var stringData = $.ajax({
	    url: nombre  ,
	    async: false
	 }).responseText;
	return stringData;
}

function Clock(){
	$('#time').html(Time());
}

function Time(){
	var date = new Date();

	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var day = date.getDate();

	var hours = date.getHours();
	var minutes = date.getMinutes();
	var seconds = date.getSeconds();

	return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
}

function Pagar(tipo){
	if(tipo==2){

		var monto ='0.01';
		paypal.Buttons({
		    createOrder: function(datapp, actions) {
		      // This function sets up the details of the transaction, including the amount and line item details.
		      return actions.order.create({
		        purchase_units: [{
		          amount: {
		            value: monto
		          }
		        }]
		      });
		    },
		    onApprove: function(datapp, actions) {
		      // This function captures the funds from the transaction.
		      return actions.order.capture().then(function(details) {
		        // This function shows a transaction Info message to your buyer.        
		        var data='{"monto":"'+monto+'","id_pago":"'+details.id+'","id_payer":"'+details.payer.payer_id+'","status":"'+details.status+'"}';
				var obj=JSON.parse(Conexion("../api/GuardaPago",data));
				if(obj.response=="1"){
					alert('Gracias por realizar tu pago.');
					GetPagos();
				}else{
					alert(obj.porque);
				}
		      });
		    }
		  }).render('#paypal-button-container');
  		//This function displays Smart Payment Buttons on your web page.
	}else{
		window.location.replace("index.php");
	}
	
}

function GetPagos(){
	var data='{}';
	var obj=JSON.parse(Conexion("../api/GetPagos",data));
	var html='<table class="table table-striped">';
	html+='<thead> <tr> <th>#</th> <th>Nombre</th> <th>Id_pago</th> <th>monto</th> <th>status</th> </tr> </thead><tbody>';
	for (var i in obj) {
		html+='<tr> <th scope="row">'+i+'</th>';
		html+=' <td>'+obj[i].nombre+'</td>';
		html+=' <td>'+obj[i].id_pago+'</td>';
		html+=' <td>'+obj[i].monto+'</td>';
		html+=' <td>'+obj[i].status+'</td> </tr>';
	}
	html+='</tbody></table>';

	$('#pagos').html(html);
}

function CrearEncuesta(){
	var titulo=$('#Etitulo').val();
	if(titulo.length!=0){
		var data='{"titulo":"'+titulo+'"}';
		var obj=JSON.parse(Conexion("../api/CargarEncuesta",data));
		if(obj.response=="1"){
			GetEncuestas();
			EditarEncuesta(obj.id_encuesta,titulo);
		}else{
			alert(obj.porque);		
		}
	}else{
	 	alert('Debe Ingreasar un titulo.');		
	}
	
}

var IdEditandoEncuesta='';
function EditarEncuesta(id_encuesta,titulo){
	IdEditandoEncuesta=id_encuesta;
	$('#ModalHoja').modal();
	$('#titulo').text(titulo);
	console.log(titulo);
	CargarBarraHerramientas();
	RefrescarVistaEncuesta(id_encuesta);
}

function GetEncuestas(){
	var data='{}';
	var obj=JSON.parse(Conexion("../api/GetEncuestas",data));

	var html='<table class="table table-striped">';
	html+='<thead> <tr> <th>#</th> <th>Título</th> <th>Hecha por</th> <th>Fecha</th> <th>Acciones</th> </tr> </thead><tbody>';
	for (var i in obj) {
		html+='<tr> <th scope="row">'+((i*1)+1)+'</th> <td>'+obj[i].titulo+'</td>';
		html+='<td>'+obj[i].nombre+'</td> <td>'+obj[i].fecha+'</td>';
		html+='<td><button onclick="EditarEncuesta(\''+obj[i].id_encuesta+'\',\''+obj[i].titulo+'\');" class="btn btn-primary btn-sm margin-left-5" ><i class="fas fa-pen"></i></button>';
		html+='<button onclick="BorraEncuesta(\''+obj[i].id_encuesta+'\',\''+obj[i].titulo+'\');" class="btn btn-danger btn-sm margin-left-5" ><i class="fas fa-times"></i></button></td> </tr>';
	}
	html+='</tbody></table>';

	$('#tab_encuestas').html(html);
}

function BorraEncuesta(id_encuesta,titulo){
	if (confirm('Esta seguro que desea borrar la encuesta: '+titulo+'?' )) {
		var data='{"id_encuesta":"'+id_encuesta+'"}';
		var obj=JSON.parse(Conexion("../api/BorrarEncuesta",data));
		if(obj.response=="1"){
			alert("Se elimino correctamente.");			
			GetEncuestas();
		}else{
			alert(obj.porque);
			
		}
	}
	
}

function CargarBarraHerramientas(){
	$('.barra_h').html(LeerArchivo('controles/BarraHerramientas.php'));
} 

function OpenModal(modal){
	$('#'+modal).modal('show');
}

function closemodal(modal){
	$('#'+modal).modal('hide');
}


//Creando tipo de pregunta
var TipodePregunta=0;
function CargarPreguntaAbierta(){
	$('#titulo-preguntas').html('Pregunta Abierta');
	$('#modal-pregunta-body').html(LeerArchivo('formularios/FormPreguntaAbierta.php'));
	TipodePregunta=1;
}

function CargarMultiple(){
	$('#titulo-preguntas').html('Selección');
	$('#modal-pregunta-body').html(LeerArchivo('formularios/FormMulti.php'));
	inputMas=1;
	TipodePregunta=2;
}

function CargarRadio(){
	$('#titulo-preguntas').html('Selección');
	$('#modal-pregunta-body').html(LeerArchivo('formularios/FormMulti.php'));
	inputMas=1;
	TipodePregunta=3;
}

function CargarUbicaion(){
	$('#titulo-preguntas').html('Ubicación');
	$('#modal-pregunta-body').html(LeerArchivo('formularios/FormPreguntaUbicacion.php'));
	TipodePregunta=4;
}

function CargarSelect(){
	$('#titulo-preguntas').html('Selección');
	$('#modal-pregunta-body').html(LeerArchivo('formularios/FormMulti.php'));
	inputMas=1;
	TipodePregunta=5;
}

var inputMas=1;
function InputMenos(){
	
	var ultimo = $('#conte_input').children().last();
	if (ultimo.children().attr('id') != "i0") {
		ultimo.remove();
		inputMas--;
	}
}

function InputMas(){
	var contenedor = $('#conte_input');
	html='<div class=" margin-top-15">';
	html+='<input name="io" id="i'+inputMas+'" class="form-control"  type="text" placeholder="Opción '+(1+inputMas)+'">';
	html+='</div>';
	contenedor.append(html);
	inputMas++;

}
var tituloencuesta='';
function RefrescarVistaEncuesta(id_encuesta){
	
	$('.encuesta-body').html('');
	data='{"id_encuesta":"'+id_encuesta+'"}'
	var obj=JSON.parse(Conexion("../api/GetPreguntas",data));

	for(var i in obj){
		console.log(obj[i]);
		var html='';
		switch(obj[i].tipo){
			case"1":
				html='<div class="margin-top-55">';
				html +='<p><b>'+obj[i].pregunta+'</b><button class="close" onclick="BorrarPregunta(\''+obj[i].id_pregunta+'\');">×</button></p>';
				html +='</div>';
			break;

			case"2":
				html='<div class="pregunta"><p><b>'+obj[i].pregunta+'</b><button class="close" onclick="BorrarPregunta(\''+obj[i].id_pregunta+'\');">×</button></p>';
				var extra = JSON.parse(obj[i].extra);
				for(var j in extra){
					html+='<div>';
					html +='<label>'+extra[j].texto+'&nbsp;<input type="checkbox" >';
					html +='</label>';
					html +='</div></div>';
				}
			break;

			case"3":
				html='<div class="pregunta"><p><b>'+obj[i].pregunta+'</b><button class="close" onclick="BorrarPregunta(\''+obj[i].id_pregunta+'\');">×</button></p>';
				var extra = JSON.parse(obj[i].extra);
				for(var j in extra){
					html+='<div>';
					html +='<label>'+extra[j].texto+'&nbsp;<input type="radio" >';
					html +='</label>';
					html +='</div></div>';
				}
			break;

			case"4":
				html +='<div class="pregunta"><p><b>'+obj[i].pregunta+'</b><button class="close" onclick="BorrarPregunta(\''+obj[i].id_pregunta+'\');">×</button></p>';
				html +='<img src="images/misimagenes/mapamundi.jpg"  width="300px"></div>';
			break;

			case"5":
				html='<div class="pregunta"><p><b>'+obj[i].pregunta+'</b><button class="close" onclick="BorrarPregunta(\''+obj[i].id_pregunta+'\');">×</button></p>';
				var extra = JSON.parse(obj[i].extra);
				html+='<div><select>';
				for(var j in extra){
					
					html +='<option value="'+extra[j].texto+'">'+extra[j].texto+'</option>';
					
				}
				html +='</select></div>';

			break;

		}
		$('.encuesta-body').append(html);
	}
	
}

var ordenpregunta = 0;
function CargarPregunta(){
	var data="";
	var temp=[];
	var extra="";
	var pregunta="";
	switch(TipodePregunta){
		case 1:
		pregunta=$('[name="pa"]').val();
		
		break;
/*
		case 2:
		pregunta=$('[name="pa"]').val();
			$('[name="pc"]').each(function(){
				temp.push('{"texto":"'+$(this).val()+'"}');

			});
		break;

		case 3:
		pregunta=$('[name="pa"]').val();
			$('[name="pr"]').each(function(){
				temp.push('{"texto":"'+$(this).val()+'"}');
			});

		break;*/

		case 4:
			pregunta='Localización';
		break;

		default:
			pregunta=$('[name="pa"]').val();
			$('[name="io"]').each(function(){
				temp.push('{"texto":"'+$(this).val()+'"}');
			});

		break;
	}
	extra=temp.join(',');
	data='{"id_encuesta":"'+IdEditandoEncuesta+'","pregunta":"'+pregunta+'","extra":['+extra+'],"tipo":"'+TipodePregunta+'","orden":"'+ordenpregunta+'"}';
	var obj=JSON.parse(Conexion("../api/CargarPregunta",data));
	if(obj.response=="1"){			
		RefrescarVistaEncuesta(IdEditandoEncuesta);
	}else{
		alert(obj.porque);
		
	}
	
	ordenpregunta ++;
}


function BorrarPregunta(id_pregunta){
	if(confirm('Esta seguro de borrar la pregunta?' )){
		var data='{"id_pregunta":"'+id_pregunta+'"}';
		var obj=JSON.parse(Conexion("../api/BorrarPregunta",data));
		if(obj.response=='1'){
			RefrescarVistaEncuesta(IdEditandoEncuesta);
		}else{
			alert(obj.porque);
		}
	}
}

function AvanceporEncuesta(){
	var data='{}';
	var obj = JSON.parse(Conexion("../api/GetAvance/PorEncuesta",data));

	var html='<table class="table table-striped">';
	html+='<thead> <tr>';
	html+=' <th>#</th>';
	html+=' <th>Título</th>';
	//html+=' <th>Fecha</th>';
	html+=' <th>Avance</th>';
	html+=' </tr> </thead><tbody>';
	for (var i in obj) {
		html+='<tr> <th scope="row">'+((i*1)+1)+'</th>';
		html+='<td>'+obj[i].titulo+'</td>';
		//html+='<td>'+obj[i].fecha+'</td>';
		html+='<td>'+obj[i].avance+'</td>';
		
		html+='</tr>';
	}
	html+='</tbody></table>';

	$('#tab_encuesta').html(html);				
}

function GetAvance(){
	var data='{}';
	var obj = JSON.parse(Conexion("../api/GetAvance/Avance",data));

	var html='<table class="table table-striped">';
	html+='<thead> <tr>';
	html+=' <th>#</th>';
	html+=' <th>Nombre</th>';
	html+=' <th>Título</th>';
	//html+=' <th>Fecha</th>';
	html+=' <th>Avance</th>';
	html+=' </tr> </thead><tbody>';
	for (var i in obj) {
		html+='<tr> <th scope="row">'+((i*1)+1)+'</th>';
		html+='<td>'+obj[i].nombre+'</td>';
		html+='<td>'+obj[i].titulo+'</td>';
		//html+='<td>'+obj[i].fecha+'</td>';
		html+='<td>'+obj[i].avance+'</td>';
		
		html+='</tr>';
	}
	html+='</tbody></table>';

	$('#tab_avance').html(html);				
}

function GetAvanceHistorico(){
	var data='{}';
	var obj = JSON.parse(Conexion("../api/GetAvance/Historico",data));

	var html='<table class="table table-striped">';
	html+='<thead> <tr> <th>#</th>';
	html+=' <th>Nombre</th>';
	//html+=' <th>Fecha</th>';
	html+=' <th>Avance</th>';
	html+=' </tr> </thead><tbody>';
	for (var i in obj) {
		html+='<tr> <th scope="row">'+((i*1)+1)+'</th>';
		html+='<td>'+obj[i].nombre+'</td>';
		//html+='<td>'+obj[i].fecha+'</td>';
		html+='<td>'+obj[i].avance+'</td>';
		
		html+='</tr>';
	}
	html+='</tbody></table>';

	$('#tab_avance_historico').html(html);				
}


function GraficarAvance(){

	var colores=['#f56954','#00a65a','#f39c12','#00c0ef','#3c8dbc','#d2d6de'];
	var data='{}';
	var obj = JSON.parse(Conexion("../api/GetAvance/Historico",data));
	var lista=$('#lista_avance');
	lista.html();

	 //-------------
    //- PIE CHART -
    //-------------
    // Get context with jQuery - using jQuery's .get() method.
    var pieChartCanvas = $('#pieChart').get(0).getContext('2d');
    var pieChart       = new Chart(pieChartCanvas);
    var PieData        = [];
    for (var i in obj) {
    	lista.append('<div style="font-size:11px; " ><font style=" color:'+colores[i]+';"><i class="fas fa-square"></i></font> '+obj[i].nombre+'</div>');
    	PieData.push({
        value    : obj[i].avance*1,
        color    : colores[i],
        highlight: '#f56954',
        label    : obj[i].nombre
      });
    }

    var pieOptions     = {
      //Boolean - Whether we should show a stroke on each segment
      segmentShowStroke    : true,
      //String - The colour of each segment stroke
      segmentStrokeColor   : '#fff',
      //Number - The width of each segment stroke
      segmentStrokeWidth   : 2,
      //Number - The percentage of the chart that we cut out of the middle
      percentageInnerCutout: 50, // This is 0 for Pie charts
      //Number - Amount of animation steps
      animationSteps       : 100,
      //String - Animation easing effect
      animationEasing      : 'easeOutBounce',
      //Boolean - Whether we animate the rotation of the Doughnut
      animateRotate        : true,
      //Boolean - Whether we animate scaling the Doughnut from the centre
      animateScale         : false,
      //Boolean - whether to make the chart responsive to window resizing
      responsive           : true,
      // Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
      maintainAspectRatio  : true,
      //String - A legend template
      legendTemplate       : '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<segments.length; i++){%><li><span style="background-color:<%=segments[i].fillColor%>"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>'
    }
    //Create pie or douhnut chart
    // You can switch between pie and douhnut using the method below.
    pieChart.Doughnut(PieData, pieOptions);
}


function PieChart2(){
	var data='{}';
	var obj = JSON.parse(Conexion("../api/GetAvance/Historico",data));
	var lista=$('#lista_avance');
	lista.html();

	
    var Labels= [];
    var PieData= [];
    var Color= ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"];
    for (var i in obj) {
    	lista.append('<div style="font-size:11px; " ><font style=" color:'+Color[i]+';"><i class="fas fa-square"></i></font> '+obj[i].nombre+'</div>');
    	PieData.push(obj[i].avance*1);
        Labels.push(obj[i].nombre);
    }

	new Chart(document.getElementById("pieChart"), {
    type: 'pie',
    data: {
      labels: Labels,
      visible: false,
      datasets: [{
        label: "Population (millions)",
        backgroundColor: Color,
        data: PieData
      }]
    },
    options: {
      title: {
        display: true,
        text: 'Avance por grupo'
      }
    }
});
}



///////////////////////////Nuevo taller/////////////////////////////////////////////////
function FiltroLi(este){	
	var buscar=$(este).val().toLowerCase();	
	
	$('.producto-list-name').each(function(){
		$(this).parent().css({"display": "none"});
		if($(this).val().toLowerCase().includes(buscar)  ){
		  $(this).parent().css({"display": ""});

		}

	});
}

function Filtro(este,table){
	
	var value = $(este).val().toLowerCase();
    $("#"+table+" tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
}

function FiltroProductos(este){
	
    var value = $(este).val().toLowerCase();
    $("#table_productos tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
}


function FiltroInventario(este){
	
    var value = $(este).val().toLowerCase();
    $("#table_inventario tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
}

function FiltroVentas(este){
	
    var value = $(este).val().toLowerCase();
    $("#table_ventas tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
}

function FiltroGastos(este){
	
    var value = $(este).val().toLowerCase();
    $("#table_gastos tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
}

function FiltroStock(este){
	
    var value = $(este).val().toLowerCase();
    $("#table_stock tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
}






function CargarProducto(){
	var codigo=$('#codigo').val();
	var descripcion=$('#descripcion').val();
	var modelo=$('#modelo').val();
	if(codigo.length!=0 && descripcion.length!=0 && modelo.length!=0){
		var data='{"codigo":"'+codigo+'","descripcion":"'+descripcion+'","modelo":"'+modelo+'"}';
		var obj=JSON.parse(Conexion("../api/CargarProducto",data));
		if(obj.response=="1"){
			alert("Se guardo correctamente.");	
			GetProductos();
			closemodal('productosm');
			$('#codigo').val('');
			$('#descripcion').val('');
			$('#modelo').val('');
		}else{
			alert(obj.porque);		
		}
	}else{
	 	alert('Debe Ingreasar los campos.');		
	}
	
}


function GetProductos(){
	var data='{}';
	var obj = JSON.parse(Conexion("../api/GetProductos",data));

	var html='<table class="table table-striped" >';
	html+='<thead> <tr>';
	html+=' <th>Fotos</th>';
	html+=' <th>Descripción</th>';
	html+=' <th>Código</th>';
	html+=' <th>Modelo</th>';
	html+=' <th>Opciones</th>';
	html+=' </tr> </thead><tbody id="table_productos">';
	for (var i in obj) {
		var fotos=JSON.parse(obj[i].fotos);
		
		if (fotos.length==0) {
			fotos[0]=JSON.parse('{"foto":"images/catalogo/sinfotos.png"}');
		}
		
		html+='<td class="td-catalogo" ><img onclick="OpenModal(\'imagenesm\'); CargarCarousel(\''+ToStringComas(obj[i].fotos)+'\',\'indicators\',\'carousel\');" class="img-catalogo" src="'+fotos[0].foto+'" width="50px" height="50px"></td>';
		html+='<td style="width:200px;">'+obj[i].descripcion+'</td>';
		html+='<td>'+obj[i].codigo+'</td>';
		html+='<td>'+obj[i].modelo+'</td>';
		html+='<td><button title="Borrar del catálogo" onclick="BorraProducto(\''+obj[i].id_producto+'\',\''+obj[i].descripcion+'\');" class="btn btn-danger btn-sm " ><i class="fas fa-times"></i></button>';
		html+='<button title="Agregar a inventario" onclick="SetValuesRefa(\''+obj[i].id_producto+'\',\''+obj[i].descripcion+'\');" type="button"  class="btn btn-primary btn-sm margin-left-5"  data-toggle="modal" data-target="#inventariom"><i class="fas fa-plus"></i></button>';
		html+='<button title="Agregar fotos" onclick="ImagPrepara(); SetValuesFotos(\''+obj[i].id_producto+'\',\''+obj[i].descripcion+'\');" type="button"  class="btn btn-info btn-sm margin-left-5"  data-toggle="modal" data-target="#cargafotosm"><i class="far fa-image"></i></button>';
		html+='</td>';		
		html+='</tr>';
	}
	html+='</tbody></table>';

	$('#tab_productos').html(html);				
}

function BorraProducto(id_producto,descripcion){
	if (confirm('Quieres borrar: '+descripcion+' del inventario?' )) {
		var data='{"id_producto":"'+id_producto+'"}';
		var obj=JSON.parse(Conexion("../api/BorrarProducto",data));
		if(obj.response=="1"){
			alert("Se elimino correctamente.");			
			GetProductos();
		}else{
			alert(obj.porque);
			
		}
	}
	
}


//Cargar inventario en select
function SetValuesRefa(id_producto,descripcion){
	$('#descripcion_temp').val(descripcion).prop("disabled", true).prop("title", descripcion);
	$('#id_producto').val(id_producto).prop("disabled", true);		
}

function SetValuesFotos(id_producto,descripcion){
	$('#descripcion_fotos').val(descripcion).prop("disabled", true).prop("title", descripcion);
	$('#id_producto_fotos').val(id_producto).prop("disabled", true);		
}


function CargarInventario(){
	var id_producto=$('#id_producto').val();
	var precio_entrada=$('#precio_entrada').val();
	var precio_salida=$('#precio_salida').val();
	var cantidad=$('#cantidad').val();
	if(parseInt(cantidad)>0){
		if(id_producto!=0 && precio_entrada.length!=0 && precio_salida.length!=0){
			if(confirm("Realmente quiere agregar: "+cantidad+" productos al inventario.")){
				var data='{"id_producto":"'+id_producto+'","precio_entrada":"'+precio_entrada+'","precio_salida":"'+precio_salida+'","cantidad":"'+cantidad+'"}';
				var obj=JSON.parse(Conexion("../api/CargarInventario",data));
				if(obj.response=="1"){
					alert("Se guardo correctamente.");	
					ActualizaTabs();
					closemodal('inventariom');
				}else{
					alert(obj.porque);		
				}
			}
			
		}else{
		 	alert('Debe Ingreasar los campos.');		
		}
		}else{
			alert("La cantidad no puede ser 0.");
		}
	
	
}

function GetInventario(){
	var data='{}';
	var obj = JSON.parse(Conexion("../api/GetInventario/Inventario",data));

	var html='<table class="table table-striped">';
	html+='<thead> <tr>';
	html+=' <th>#</th>';
	html+=' <th>Descripción</th>';
	html+=' <th>Costo</th>';
	html+=' <th>Venta</th>';
	html+=' </tr> </thead><tbody id="table_inventario">';
	for (var i in obj) {
		html+='<tr> <th scope="row">'+((i*1)+1)+'</th>';
		html+='<td>'+obj[i].descripcion+'</td>';
		html+='<td>$'+obj[i].costo+'</td>';
		html+='<td>$'+obj[i].venta+'</td>';
		html+='<td><button title="Eliminar del inventario" onclick="BorraInventario(\''+obj[i].id_inventario+'\',\''+obj[i].descripcion+'\');" class="btn btn-danger btn-sm margin-left-5" ><i class="fas fa-times"></i></button></td>';
		html+='</tr>';
	}
	html+='</tbody></table>';

	$('#tab_inventario').html(html);				
}

function BorraInventario(id_inventario,descripcion){
	if (confirm('Quieres borrar: '+descripcion+' del inventario?' )) {
		var data='{"id_inventario":"'+id_inventario+'"}';
		var obj=JSON.parse(Conexion("../api/BorrarInventario",data));
		if(obj.response=="1"){
			alert("Se elimino correctamente.");			
			ActualizaTabs();
		}else{
			alert(obj.porque);
			
		}
	}
	
}

function GetVentas(){
	var data='{}';
	var obj = JSON.parse(Conexion("../api/GetInventario/Ventas",data));

	var html='<table class="table table-striped">';
	html+='<thead> <tr>';
	html+=' <th>#</th>';
	html+=' <th>Cliente</th>';
	html+=' <th>Piezas</th>';
	html+=' <th>Costo</th>';
	html+=' <th>Venta</th>';
	html+=' <th>Ganacia</th>';
	html+=' <th>Fecha</th>';
	html+=' <th>Opciones</th>';
	html+=' </tr> </thead><tbody id="table_ventas">';
	for (var i in obj) {
		html+='<tr>'; 
		html+='<th scope="row">'+((i*1)+1)+'</th>';
		html+='<td>'+obj[i].nombre+'</td>';
		html+='<td>'+obj[i].piezas+'</td>';
		html+='<td>$'+obj[i].costo+'</td>';
		html+='<td>$'+obj[i].venta+'</td>';
		html+='<td>$'+(Math.round((parseFloat(obj[i].venta)-parseFloat(obj[i].costo))*100)/100)+'</td>';
		html+='<td>'+obj[i].fecha.substr(0,10)+'</td>';
		html+='<td><button title="Cancelar Venta" onclick="CancelarVenta(\''+obj[i].id_venta+'\',\''+obj[i].id_venta+'\');" class="btn btn-danger btn-sm margin-left-5" ><i class="fas fa-times"></i></button></td>';		
		html+='</tr>';
	}
	html+='</tbody></table>';

	$('#tab_ventas').html(html);				
}

function CancelarVenta(id_venta,descripcion){
	if (confirm('Quieres cancelar: '+descripcion+' del inventario?' )) {
		var data='{"id_venta":"'+id_venta+'"}';
		var obj=JSON.parse(Conexion("../api/CancelarVenta/Venta",data));
		if(obj.response=="1"){
			alert("Se canceló correctamente.");			
			ActualizaTabs();
		}else{
			alert(obj.porque);
			
		}
	}
	
}

function GetVentaspP(){
	var data='{}';
	var obj = JSON.parse(Conexion("../api/GetInventario/GetVentaspP",data));

	var html='<table class="table table-striped">';
	html+='<thead> <tr>';
	html+=' <th>#</th>';
	html+=' <th>Descripción</th>';
	html+=' <th>Costo</th>';
	html+=' <th>Venta</th>';
	html+=' <th>Ganacia</th>';
	html+=' <th>Opciones</th>';
	html+=' </tr> </thead><tbody id="table_ventas">';
	for (var i in obj) {
		html+='<tr> <th scope="row">'+((i*1)+1)+'</th>';
		html+='<td>'+obj[i].descripcion+'</td>';
		html+='<td>$'+obj[i].costo+'</td>';
		html+='<td>$'+obj[i].venta+'</td>';
		html+='<td>$'+(Math.round((parseFloat(obj[i].venta)-parseFloat(obj[i].costo))*100)/100)+'</td>';
		//Esta en por ver por que no se sabe de que venta se esta borrando 
		//html+='<td><button title="Cancelar Venta" onclick="CancelarVentapP(\''+obj[i].id_inventario+'\',\''+obj[i].descripcion+'\');" class="btn btn-danger btn-sm margin-left-5" ><i class="fas fa-times"></i></button></td>';		
		html+='</tr>';
	}
	html+='</tbody></table>';

	$('#tab_ventaspP').html(html);				
}


function CancelarVentapP(id_inventario,descripcion){
	if (confirm('Quieres cancelar: '+descripcion+' del inventario?' )) {
		var data='{"id_inventario":"'+id_inventario+'"}';
		var obj=JSON.parse(Conexion("../api/CancelarVenta/VentapP",data));
		if(obj.response=="1"){
			alert("Se canceló correctamente.");			
			ActualizaTabs();
		}else{
			alert(obj.porque);
			
		}
	}
	
}

function CargarGasto(){
	var descripcion=$('#descripciong').val();
	var salida=$('#salida').val();
	var date = new Date($('#fecha_gasto').val());
	var day = date.getDate();
  	var month = date.getMonth() + 1;
  	var year =  date.getFullYear();
  	console.log(year+"-"+month+"-"+day+"----"+descripcion+"----"+salida);
	var fecha_gasto=year+"-"+month+"-"+day;
	if(descripcion.length!=0 && salida.length!=0 && !fecha_gasto.includes("NaN")){
		var data='{"descripcion":"'+descripcion+'","salida":"'+salida+'","fecha_gasto":"'+fecha_gasto+'"}';
		var obj=JSON.parse(Conexion("../api/CargarGasto",data));
		if(obj.response=="1"){
			alert("Se guardo correctamente.");	
			GetProductos();
			ActualizaTabs();
			closemodal('gastom');
		}else{
			alert(obj.porque);		
		}
	}else{
	 	alert('Debe Ingreasar los campos.');		
	}
	
}

function GetGastos(){
	var data='{}';
	var obj = JSON.parse(Conexion("../api/GetGastos",data));

	var html='<table class="table table-striped">';
	html+='<thead> <tr>';
	html+=' <th>#</th>';
	html+=' <th>Descripción</th>';
	html+=' <th>Nombre</th>';
	html+=' <th>Salida</th>';
	html+=' <th>Fecha</th>';
	html+=' <th>Opciones</th>';
	html+=' </tr> </thead><tbody id="table_gastos">';
	for (var i in obj) {
		html+='<tr> <th scope="row">'+((i*1)+1)+'</th>';
		html+='<td>'+obj[i].descripcion+'</td>';
		html+='<td>'+obj[i].nombre+'</td>';
		html+='<td>$'+obj[i].salida+'</td>';
		html+='<td>'+obj[i].fecha.substr(0,10)+'</td>';
		html+='<td><button tile="Borrar Gasto" onclick="BorraGasto(\''+obj[i].id_gasto+'\',\''+obj[i].descripcion+'\');" class="btn btn-danger btn-sm margin-left-5" ><i class="fas fa-times"></i></button></td>';		
		html+='</tr>';
	}
	html+='</tbody></table>';

	$('#tab_gastos').html(html);				
}


function BorraGasto(id_gasto,descripcion){
	if (confirm('Quieres borrar: '+descripcion+' de los gastos?' )) {
		var data='{"id_gasto":"'+id_gasto+'"}';
		var obj=JSON.parse(Conexion("../api/Borrargasto",data));
		if(obj.response=="1"){
			alert("Se elimino correctamente.");			
			ActualizaTabs();
		}else{
			alert(obj.porque);
			
		}
	}
	
}

function GetStock(){
	var data='{}';
	var obj = JSON.parse(Conexion("../api/GetInventario/Stock",data));

	var html='<table class="table table-striped">';
	html+='<thead> <tr>';
	html+=' <th>#</th>';
	html+=' <th>Descripción</th>';
	html+=' <th>Código</th>';
	html+=' <th>Modelo</th>';
	html+=' <th>Stock</th>';
	html+=' </tr> </thead><tbody id="table_stock">';
	for (var i in obj) {
		html+='<tr> <th scope="row">'+((i*1)+1)+'</th>';
		html+='<td>'+obj[i].descripcion+'</td>';
		html+='<td>'+obj[i].codigo+'</td>';
		html+='<td>'+obj[i].modelo+'</td>';
		html+='<td>'+obj[i].stock+'</td>';
		html+='</tr>';
	}
	html+='</tbody></table>';

	$('#tab_stock').html(html);				
}

function ActualizaTabs(){
	GetStock();
	GetInventario();
	GetVentas();
	GetVentaspP();
	GetGastos();
}


function GetInventarioVentas(){
	/*var ids=GetPedidoIds();
	var data='{"ids":"'+ids+'"}';*/
	var data='{}';
	var obj = JSON.parse(Conexion("../api/GetInventario/StockVenta",data));

	/*var html='<table class="table table-striped" >';
	html+='<thead> <tr>';
	html+='<th>Fotos</th>';
	html+='<th>Descripción</th>';
	html+='<th>Modelo</th>';
	html+='<th>Precio</th>';
	html+='<th>Stock</th>';
	html+='<th>Vender</th>';
	html+='</tr> </thead><tbody id="table_productos">';*/
	for (var i in obj) {//https://cdn.pixabay.com/photo/2017/01/25/17/35/picture-2008484_960_720.png

		var fotos=JSON.parse(obj[i].fotos);
		var html='<li>';
		var descripcion=obj[i].descripcion;
		if(descripcion.length>=10){
			var descripcion=descripcion.substr(0,9);
		}	   
	    
	    
	    html +='<img onclick="Vender(\''+obj[i].id_producto+'\',\''+obj[i].descripcion+'\',\''+obj[i].precio+'\',\''+obj[i].modelo+'\');" style="cursor: pointer;" src="'+fotos[0].foto+'" title="'+obj[i].descripcion+'" onclick="Perfil(this);"" data-id="'+obj[i].id_producto+'" >';
	    html +='<span class="product-list-name"><font size="2">'+descripcion+'</font></span>';
	    html+='<input  class="form-control producto-list-name" type="hidden"  value="'+obj[i].descripcion+'"/>';
	    html+='<input id="'+obj[i].id_producto+'"  class="form-control" type="hidden"  value="'+obj[i].stock+'"/>';

	    html +='</li>';
	    $('#list').append(html);

	    /*
		var fotos=JSON.parse(obj[i].fotos);
		html+='<td class="td-catalogo" ><img onclick="OpenModal(\'imagenesm\'); CargarCarousel(\''+ToStringComas(obj[i].fotos)+'\',\'indicators\',\'carousel\');" class="img-catalogo" src="'+fotos[0].foto+'" width="50px" height="50px"></td>';
		html+='<td>'+obj[i].descripcion+'</td>';
		html+='<td>'+obj[i].modelo+'</td>';
		html+='<td>$'+obj[i].precio+'</td>';
		html+='<td>'+obj[i].stock+'</td>';		
		html+='<td><button title="Agregar a venta" onclick="Vender(\''+obj[i].id_producto+'\',\''+obj[i].descripcion+'\',\''+obj[i].precio+'\',\''+obj[i].modelo+'\');" type="button"  class="btn btn-primary btn-sm margin-left-5" ><i class="fas fa-cart-plus"></i></button>';
		html+='<input id="'+obj[i].id_producto+'"  class="form-control" type="hidden"  value="'+obj[i].stock+'"/>';
		html+='</td>';		
		html+='</tr>';*/
	}
	//html+='</tbody></table>';
	//$('#list').append(html);

	//$('#tab_productos').html(html);				
}

function Vender(id_producto){
	if(DesContar(id_producto)){

		var data='{"id_producto":"'+id_producto+'"}';
		var obj = JSON.parse(Conexion("../api/GetInventario/InventariopP",data));	

		html="";
		html+='<tr>';
		html+='<td style="width:30%;">'+obj[parseInt($('#'+id_producto).val())].descripcion+'<input name="producto"  class="form-control" type="hidden"  value="'+obj[parseInt($('#'+id_producto).val())].id_inventario+'"/></td>';
		html+='<td>'+obj[parseInt($('#'+id_producto).val())].modelo+'</td>';
		html+='<td name="precio">$'+obj[parseInt($('#'+id_producto).val())].precio+'</td>';
		html+='<td><button title="Quitar del pedído" class="btn btn-danger btn-sm margin-left-5" onclick="BorrarPedido(this); Contar(\''+id_producto+'\');">&times;</button></td>';
		html+="</tr>";	

		$('#table_pedido').append(html);
	}
	Totalizar();	
	
}
function BorrarPedido(este){
	$(este).parent().parent().remove();
	Totalizar();
}
function Contar(id){
	var contador=parseInt($('#'+id).val());
	contador++;
	$('#'+id).val(contador);

}

function DesContar(id){
	var contador=parseInt($('#'+id).val());
	if(contador>0){
		contador--;
		$('#'+id).val(contador);
		return true;
	}else{
		alert("No puede agregar mas, no hay mercacia disponible. ");
		return false;
	}
	

}

function GetPedidoIds(){
	console.log('cargando');
	var ids=[];
	$('input[name ="producto"]').each(function(){
		console.log($(this).val());
		ids.push($(this).val());
	});
	return "'"+ids.join("','")+"'";
}

function Totalizar(){
	var suma=0;
	$('td[name ="precio"]').each(function(){
		suma+=parseInt($(this).html().replace("$",""));
	});

	$('#total').html(suma);
}

function CerrarVenta(){
	if($('#table_pedido').html()==''){
		alert('Tienes que agregar al menos un producto.');
	}else{
		if(confirm("Deseas cerrar la venta?")){
			var cliente=$('#cliente').val();
			var ids=GetPedidoIds();
			//if(cliente.length!=0){
				var data='{"ids":"'+ids+'","cliente":"'+cliente+'"}';
				var obj = JSON.parse(Conexion("../api/CargarVenta",data));
				if(obj.response=="1"){
						
					alert("Venta realizada");
					$('#table_pedido').html('');
					$('#cliente').val('');
					$('#total').html('0.0');
				}else{
					alert(obj.porque);
					
				}
			/*}else{
				alert("Falta nombre del cliente.");
			}*/
			
		}
	}
	
}

function CargarCarousel(fotos,indicators,carousel){
	var foto=fotos.split(",");
	html="";
	html2="";
	console.log(foto);
	for(var i in foto)
	{
		var active="active";
		if(i>0){
			active="";
		}
		html+='<li data-target="#demo" data-slide-to="'+i+'" class="'+active+'"></li>';
		
		html2+='<div class="carousel-item '+active+'">';
		html2+='<img src="'+foto[i]+'" alt="REM1979" width="1100" height="500">';
		html2+='</div>';

		html2+='<a class="carousel-control-prev" href="#demo" data-slide="prev">';
		html2+='<span class="carousel-control-prev-icon"></span>';
		html2+='</a>';
		html2+='<a class="carousel-control-next" href="#demo" data-slide="next">';
		html2+='<span class="carousel-control-next-icon"></span>';
		html2+='</a>';
	}
	$('#'+indicators).html(html);
	$('#'+carousel).html(html2);

	/*<div class="carousel-item active">
      <img src="images/catalogo/REM1979_5.webp" alt="REM1979" width="1100" height="500">
    </div>*/
}

function ToStringComas(string){

	var json=JSON.parse(string);
	var array=[];
	for(var i in json)
	{
		array.push(json[i].foto);		
		
	}
	return array.join(",");
}

var ImgMas=1;
function ImagMenos(){
	
	var ultimo = $('#fotos').children().last();

	if (ImgMas > 1) {
		ultimo.remove();
		ImgMas--;
	}
}

function ImagPrepara(){
	ImgMas=1;
	var contenedor = $('#fotos');
    html='<div class="margin-top-15 imgps">';
    html+='<img id="f0" src="images/misimagenes/sinfotos.png" onclick="CargarImagen(\'0\');" >';
    html+='<input onchange="VerImagen(this);" id="b0" type="file" style="visibility: hidden;" />';
    html+='<input type="hidden" id="t0" class="form-control">';
    html+='</div>';
		
	
	contenedor.html(html);
	
	

}

function ImagMas(){
	if(ImgMas<5){
		var contenedor = $('#fotos');
	    html='<div class="margin-top-15 imgps">';
	    html+='<img id="f'+ImgMas+'" src="images/misimagenes/sinfotos.png" onclick="CargarImagen(\''+ImgMas+'\');" >';
	    html+='<input onchange="VerImagen(this);" id="b'+ImgMas+'" type="file" style="visibility: hidden;" />';
	    html+='<input type="hidden" id="t'+ImgMas+'" class="form-control">';
	    html+='</div>';
	
	contenedor.append(html);
	ImgMas++;
	}else{
		alert('Solo puedes agregar 5');
	}
	

}

function CargarImagen(id){
	$('#b'+id).click();
}

function SubirImagenes(id){
	var id_producto=$('#id_producto_fotos').val();
	var fotos=[];
	for(var i =0; i < ImgMas;i++){
		fotos.push('{"foto":"'+$('#t'+i).val()+'"}');
	}

	var data='{"id_producto":"'+id_producto+'","fotos":['+fotos.join(",")+']}';
	var obj = JSON.parse(Conexion("../api/CargarFotosCatalogo",data));
	if(obj.response=="1"){
		GetProductos();
		alert("Se subieron bien.");

	}else{
		alert(obj.porque);
		
	}
}

function GVentasInventario(){
	var data='{}';
	var obj = JSON.parse(Conexion("../api/GetData/Ventas",data));
	var datag=[0],labelsv=[""];
	for (var i in obj) {
		if(!labelsv.includes(obj[i].fecha.substr(0,10))){
			labelsv.push(obj[i].fecha.substr(0,10));
			
		}
		datag[obj[i].fecha.substr(0,10)]=(!isNaN(parseInt(datag[obj[i].fecha.substr(0,10)])) ? parseInt(datag[obj[i].fecha.substr(0,10)]) : 0 )+parseInt(obj[i].venta);
		
		
	}

	var dataf=[];
	for(var i in datag){
		dataf.push(datag[i]);
	}


	obj = JSON.parse(Conexion("../api/GetData/Inventario",data));
	var datagi=[0],labelsi=[""];
	for (var i in obj) {
		if(!labelsi.includes(obj[i].fecha.substr(0,10))){
			labelsi.push(obj[i].fecha.substr(0,10));
			
		}
		datagi[obj[i].fecha.substr(0,10)]=(!isNaN(parseInt(datagi[obj[i].fecha.substr(0,10)])) ? parseInt(datagi[obj[i].fecha.substr(0,10)]) : 0 )+parseInt(obj[i].venta);
		
		
	}

	var datagif=[];
	for(var i in datagi){
		datagif.push(datagi[i]);
	}
	
	

	
	var titulos=["Ventas","Inventario"];
	var datos=[dataf,datagif];
	var colors=["#ffc600","#3E95CD"];
	var labels=[];
	if(labelsv.length>labelsi.length){
		labels=labelsv;
	}else{
		labels=labelsi;
	}
	GLineas(labels,datos,titulos,colors,"gventas");
}


function GVentas(fecha=""){
	var data='{"fecha":"'+fecha+'"}';
	try{
	var obj = JSON.parse(Conexion("../api/GetData/Ventas",data));
	var datag=[0],labels=[""];
	for (var i in obj) {
		labels.push(obj[i].fecha.substr(0,10));		
		datag.push(parseInt(obj[i].venta));
	}
	
	var titulos=["Ventas"];
	var colors=["#ffc600","#3E95CD"];
	var datagf=[];
	datagf[0]=datag;
	GLineas(labels,datagf,titulos,colors,"gventas");
	}catch(error){

	}
}

function GVentasMeses(fecha=""){
	var data='{"fecha":"'+fecha+'"}';
	var obj = JSON.parse(Conexion("../api/GetData/VentasMes",data));
	
	var datag=[],labels=[];
	for (var i in obj) {
		labels.push(obj[i].fecha.substr(0,7));		
		datag.push(parseInt(obj[i].venta));
	}

	var colors=["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"];
	GBarras(labels,datag,colors,"gventas-mes","GVentas");
}

function GInventario(fecha=""){
	var data='{"fecha":"'+fecha+'"}';
	try{
	var obj = JSON.parse(Conexion("../api/GetData/Inventario",data));
	var datag=[0],labels=[""];
	for (var i in obj) {
		labels.push(obj[i].fecha.substr(0,10));		
		datag.push(parseInt(obj[i].venta));
	}
	
	var titulos=["Inventario"];
	var colors=["#3E95CD"];
	var datagf=[];
	datagf[0]=datag;
	GLineas(labels,datagf,titulos,colors,"ginventario");
}catch(error){}
}

function GInventarioMeses(fecha=""){
	var data='{"fecha":"'+fecha+'"}';
	var obj = JSON.parse(Conexion("../api/GetData/InventarioMes",data));	
	var datag=[],labels=[];
	for (var i in obj) {
		labels.push(obj[i].fecha.substr(0,7));		
		datag.push(parseInt(obj[i].venta));
	}

	var colors=["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"];
	GBarras(labels,datag,colors,"ginventario-mes","GInventario");
}

function GLineas(labels,data,titulos,colors,donde){
	//Line char
	$('#'+donde).html('<canvas id="G'+donde+'" width="800" height="250"></canvas>');
	
	var datasets=[];
	for(var i in titulos){
		datasets.push(
			{ 
		        data: data[i],
		        label: titulos[i],
		        borderColor: colors[i],
		        fill: false
	      });
	}
	//Line char
	var chat = new Chart(document.getElementById('G'+donde), {
	  type: 'line',
	  data: {
	    labels: labels,
	    datasets: datasets
	  },
	  
	  options: {
	  	scales: {
	        yAxes: [{
	            ticks: {
	                beginAtZero: true
	            }
	        }]
	    },
	    title: {
	      display: true,
	      text: ''
	    }
	  }
	});

	chat.clear();
}


function GBarras(labels,data,colors,donde,funsion=""){
	//["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"]
	$('#'+donde).html('<canvas id="G'+donde+'" width="800" height="250"></canvas>');
	var datasets=[];
	datasets.push({
      label: "",
      backgroundColor: colors,
      data: data
    });
	// Bar chart
	var chat=new Chart(document.getElementById('G'+donde), {
	    type: 'bar',
	    data: {
	      labels: labels,
	      datasets: datasets
	    },
	    options: {
	    	scales: {
		        yAxes: [{
		            ticks: {
		                beginAtZero: true
		            }
		        }]
	    	},
		    legend: { display: false },
		    title: {
		      display: true,
		      text: ''
		    }
	    }
	});
	if(funsion!=""){
		$("#"+donde).click( 
		    function(evt){
		        //var activePoints = chat.getSegmentsAtEvent(evt);
		        var firstPoint = chat.getElementAtEvent(evt)[0]; 
		        if (firstPoint) {
		        	//console.log(chat.data.labels[firstPoint._index]);
		        	eval(funsion+"(chat.data.labels[firstPoint._index]);");
		        	/*if(donde=="gventas-mes"){
		        		GVentas(chat.data.labels[firstPoint._index]);
		        	}else{
		        		GInventario(chat.data.labels[firstPoint._index]);
		        	}*/
		        	
				    //var label = myChart.data.labels[firstPoint._index];
				    //var value = myChart.data.datasets[firstPoint._datasetIndex].data[firstPoint._index];
				}          
		        
		    }

		); 
	}

	
}

