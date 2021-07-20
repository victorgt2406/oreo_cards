/*
	Autor: Víctor Gutiérrez Tovar
	Fecha: 11/1/2021
	Titulo: index.js
	Html: index.html, contenida en la carpeta 6° Practica (título: VGTgames)
*/
	function jugar(){
		var jugador;
		jugador = document.getElementById("player").value;
		if(jugador.length > '2'){
			localStorage.setItem('Jugador',jugador);
			window.location.href="html/JuegoDeCartas.html";
		}
		else{
			if(jugador.length > '0'){
				alert("Introduzca un nombre con más de 2 letras");
			}
			else{
				alert("Introduzca un nombre");
			}
		}
	}
	
//variable globales para las siguientes funciones:
	var ccc=1;//Contador del Carrusel de las Cartas
	var ms=3000;//ms
	var intervalo;
	
	function fondoJdCartas(){
		//fondo del body
		intervalo = setInterval(cartasMove,ms);
		//Récord:
		var Record_player=localStorage.getItem('Record_player');
		var Record_time=localStorage.getItem('Record_time');
		var Record_time=parseInt(Record_time);

		if(isNaN(Record_time)){
			document.getElementById("record").innerHTML = "RÉCORD: --:--:--- by NoOne"
		}
		else{
			var seg;
			var min;
			var milis;
			seg=parseInt(Record_time/1000);
			milis=parseInt(Record_time%1000);
			min=parseInt((Record_time/1000)/60);
			document.getElementById("record").innerHTML = "RÉCORD: "+min+":"+seg+":"+milis+" by "+Record_player;
		}
	}
	
	function cartasMove(){
		//Funcion del carrusel de las cartas
		
		//Variables:
		var imagen;
		
		imagen = document.getElementById("imgcarta").src="Imagenes/cartas_"+ccc+".png";
		ccc++;
		if(ccc>7){
			ccc=1;
			imagen = document.getElementById("imgcarta").src="Imagenes/cartas_bg.png";
			clearInterval(intervalo);
			ms=parseFloat(ms)/2;
			if(ms < 0.5){
				ms=3000;
			}
			fondoJdCartas();
		}
	}
	