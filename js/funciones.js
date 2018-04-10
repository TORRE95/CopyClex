function inicioSesion() {
	
	var mail = document.getElementById('mail').value;
	var pass = document.getElementById('pass').value;
	var aux = 0;
	if(mail != "" && pass != ""){
		inicioAjax = new XMLHttpRequest();
		inicioAjax.open('GET', 'https://torreextra.000webhostapp.com/selectUsuarios.php?mail='+mail+'&pass='+pass);
		inicioAjax.send();
		
		inicioAjax.onreadystatechange = function(){
			

			if (inicioAjax.readyState == 4 && inicioAjax.status == 200) {



				inicio = JSON.parse(inicioAjax.responseText);

				if(inicio.length > 0){
					if (inicio[0].tipoUsuario =="0") {
					localStorage.setItem('idUsuario',  inicio[0].idUsuario);
						window.location.assign('dashboard.html');
						//localStorage.setItem('idUsuario',  inicio[0].idUsuario);
						aux = 1;
					}

				if (inicio[0].tipoUsuario=="1") {
					localStorage.setItem('idUsuario',  inicio[0].idUsuario);
							window.location.assign('dashboardS.html');
							aux=1;
						}

				}
				else{
					alert("Usuario o contraseña incorrectos");
				}
				
			}
		}
	}
} 

function registrar() {
	var nombre = document.getElementById("nombre").value;
	var mail = document.getElementById("mail").value;
	var pass1 = document.getElementById("pass1").value;
	var pass2 = document.getElementById("pass2").value;
	if (nombre != "" && mail != "" && pass1 != "" && pass2 != "") {
		if (pass1 == pass2) {
			registroAjax = new XMLHttpRequest();
			registroAjax.open('GET', "https://torreextra.000webhostapp.com/registrarUsuarios.php?nombre="+nombre+"&mail="+mail+"&pass1="+pass1);
			registroAjax.send();
			registroAjax.onreadystatechange = function(){
				if (registroAjax.readyState == 4 && registroAjax.status == 200) {
					
					if (registroAjax.responseText=="1") {
						sessionStorage.setItem("nombre", nombre);
						//lo que hace cuando sale bien el registro
						location.href='index.html';
					}
					else{

						alert("Error inesperado, intente más tarde")
					}
				}
			}
		}
	}
}

function registrarServidor() {
	var nombre = document.getElementById("nombre").value;
	var mail = document.getElementById("mail").value;
	var pass1 = document.getElementById("pass1").value;
	var pass2 = document.getElementById("pass2").value;
	var ubicacion = document.getElementById("ubicacion").value;
	if (nombre != "" && mail != "" && pass1 != "" && pass2 != "" && ubicacion != "") {
		if (pass1 == pass2) {
			registroAjax = new XMLHttpRequest();
			registroAjax.open('GET', "https://torreextra.000webhostapp.com/registrarServer.php?nombre="+nombre+"&mail="+mail+"&pass1="+pass1+"&ubicacion="+ubicacion+"");
			registroAjax.send();
			registroAjax.onreadystatechange = function(){
				if (registroAjax.readyState == 4 && registroAjax.status == 200) {
					
					if (registroAjax.responseText=="1") {
						sessionStorage.setItem("nombre", nombre);
						//lo que hace cuando sale bien el registro
						window.location.assign('index.html');
					}
					else{

						// lo que quieras hacer si no se registra bien
					}
				}
			}
		}
	}
}

function cargarHistorial() {
	var id = localStorage.getItem('idUsuario');
	historialAjax = new XMLHttpRequest();
	historialAjax.open('GET', "https://torreextra.000webhostapp.com/selectHistorial.php?id="+id);
	historialAjax.send();
	historialAjax.onreadystatechange = function(){
		if (historialAjax.readyState == 4 && historialAjax.status == 200) {
			historial = JSON.parse(historialAjax.responseText);
			for (var i = 0; i < historial.length; i++) {
				var info = 
						"<div class='estadisticas'>"+
							"<span> ID Orden: "+historial[i].idOrden+"</span><br>"+
							"<span> Total de Impresiones: "+historial[i].Impresiones+"</span><br>"+
							"<span> Monto total: "+historial[i].Monto+"</span>"+
						"</div>";
				document.querySelector('section').innerHTML += info;
			}
			
			
		}
	}
}

function llenarOrden() {
	var random100 = Math.floor((Math.random() * 200) + 1);
	var costoTotal = random100 * 0.50;
	var llenado =
		"<span>Resumen de pedido:<br>"+
		"<span>"+random100+"</span> <span>impresiones</span><br>"+
		"<span>Costo por impresión: $</span><span>0.50</span><br>"+
		"<span>Total: $</span><span>"+costoTotal+"</span>";
	document.querySelector('section').innerHTML = llenado;

	sessionStorage.setItem("numImpresiones", random100);
	sessionStorage.setItem("costoTotal", costoTotal);

}

function orden() {
	var numImpresiones = sessionStorage.getItem("numImpresiones");
	var costoTotal = sessionStorage.getItem("costoTotal");
	var idUsuario = localStorage.getItem("idUsuario");
	var nombreServer = localStorage.getItem("Nombre");
	var url = "https://torreextra.000webhostapp.com/insertarOrden.php?idUsuario="+idUsuario+"&nombreServer="+nombreServer+"&montoTotal="+costoTotal+"&numImpresiones="+
				numImpresiones;
	ordenAjax = new XMLHttpRequest();
	ordenAjax.open('GET', url);
	ordenAjax.send();
	ordenAjax.onreadystatechange = function(){
		if (ordenAjax.readyState == 4 && ordenAjax.status == 200) {
			if (ordenAjax.responseText=="1") {
				alert("Orden enviada");
			}
			else{
				alert("Error inesperado, intente más tarde");
			}		
		}
	}
}

function cargarLugares() {
	lugaresAjax = new XMLHttpRequest();
	lugaresAjax.open('POST', "https://torreextra.000webhostapp.com/selectLugares.php");
	lugaresAjax.send();
	lugaresAjax.onreadystatechange = function(){
		if (lugaresAjax.readyState == 4 && lugaresAjax.status == 200) {
			lugar = JSON.parse(lugaresAjax.responseText);
			for (var i = 0; i < lugar.length; i++) {
				var info = 
						"<div class='modulos' onclick='seleccionar("+[i]+")'>"+
							"<span><p id='nombre"+[i]+"'"+">"+lugar[i].Nombre+"</p> <br>"+lugar[i].Ubicacion+"<br> </span>"
						"</div>";
				document.querySelector('section').innerHTML += info;
			}
			
			
		}
	}
}


function seleccionar(num) {

	var nombre = document.getElementById("nombre"+num).innerHTML

	localStorage.setItem('Nombre', nombre);
	window.location.assign('formaPago.html');
		
}


function cargarOrdenes(){

	var idServidor = localStorage.getItem('idUsuario');

	ordenesAjax = new XMLHttpRequest();
	ordenesAjax.open('GET', "https://torreextra.000webhostapp.com/selectOrdenes.php?id="+idServidor);
	ordenesAjax.send();
	ordenesAjax.onreadystatechange = function(){
		if (ordenesAjax.readyState == 4 && ordenesAjax.status == 200) {
			orden = JSON.parse(ordenesAjax.responseText);
			for (var i = 0; i < orden.length; i++) {
				var info = 
						"<div class='estadisticas'>"+
							"<button class='boton' onclick='completar("+orden[i].idOrden+")'> Completar Orden </button>"+
							"<span> Impresiones totales: "+"  "+orden[i].Impresiones+"</span><br>"+
							"<span> Total: $"+orden[i].Monto+"</span>"+

						"</div>";
				document.querySelector('section').innerHTML += info;
			}
			
			
		}
	}


}

function completar(num) {

		localStorage.setItem('idOrden', num);
	

	completarAjax = new XMLHttpRequest();
	completarAjax.open('GET', "https://torreextra.000webhostapp.com/completarOrden.php?id="+num);
	completarAjax.send();

			completarAjax.onreadystatechange = function(){
		if (completarAjax.readyState == 4 && completarAjax.status == 200) {

			if (completarAjax.responseText=="1") {
	
						//lo que hace cuando sale bien el registro
						alert("Orden Completada!");
						location.reload();
					}
					else{

						alert("Error inesperado, intente más tarde");
					}
			
			}
			
			
		}
	}

		

