/*
	Autor: Víctor Gutiérrez Tovar
	Fecha: 11/1/2021
	Titulo: JuegosDeCartas.js
	Html: index.html, contenida en la carpeta 6° Practica (título: VGTgames)
*/
//VARIABLES GLOBALES DE fondo()
var intervalo;

//VARIABLES GLOBALES DE defaultcartas()
var delay=0;//sirve para parar el intervalo

function fondo(){
	//Jugador
	var player;
	player=localStorage.getItem('Jugador');
	document.getElementById("player").innerHTML = player;

	//Enseñar cartas disponibles.
	defaultcartas();
	intervalo=setInterval(defaultcartas,3000);
}

//te muestra las cartas disponibles para que el jugador vea como son las cartas
function defaultcartas(){
	var c;//contador hasta el 12. Porque hay 12 cartas.
	var f=1;//contador hasta el 6. Porque hay 6 tipos de cartas.
	for(c=1; c<=12; c++){
		document.getElementById("carta_"+c+"").src="../Imagenes/cartas_"+f+".png";
		if(c==6){
			f=1;
		}
		else{
			f++;
		}
	}

	if(delay==1){
		clearInterval(intervalo);
		hidecartas();//volver a esconder
		document.getElementById("botonJugar").className = "botonvisible";//ver boton de jugar
		document.getElementById("ganar").className = "inicio";//ver boton de jugar
		document.getElementById("crono").innerHTML = "00:00:00";

	}
	delay=1;
}
//esconde cartas
function hidecartas(){
	var c;//contador hasta el 12. Porque hay 12 cartas.
	for(c=1; c<=12; c++){
		document.getElementById("carta_"+c+"").src="../Imagenes/cartas_bg.png";
	}
}

//VARIABLES GLOBALES DE carta() ,jugar() y randomcartas().
var ncarta;//identifica que carta he pulsado
var jugando=0;//sabe si di el boton pulsar
var click=0;//se iguala a ncarta ya que al se borra al ir a otras funciones
var lastclick=0;//se iguala a click cuando termina de terminarse todas las funciones
var par;//suma los pares obtenido y cuando son 6 se gana
var save;//contador del array saveposiciones.

//ARRAY
var posicioncartas = new Array(12);//donde almaceno numeros aleatorios del 1-6 y al ser 12 hay 2 unos, doses ...
var saveposiciones = new Array(12);//guardo las posiciones de los pares encontrados.

//cronometro
var crono;
//medir tiempo
var ms;
var seg;
var min;

var tms;//total de milisegundos

//onclick de el boton jugar. Establece valores aleatorios al array posicioncartas y canvia el value de jugar por reintentar.
function jugar(){
	clearInterval(crono);
	hidecartas();
	resetarraycartas();
	randomcartas();
	document.getElementById("ganar").innerHTML = "Encuentra los 6 pares";//cambio el texto
	document.getElementById("ganar").className = "inicio";//le asigno un class
	//reinicio variables
	jugando=1;
	par=0;
	save=0;
	click=0;
	lastclick=0;
	document.getElementById("botonJugar").value = "Reintentar";
	ms=0;
	seg=0;
	min=0;
	tms=0;
	crono=setInterval(cronometro,5);
}

function cronometro(){
	//tiempo a texto.
	var Pms;
	var Pseg;
	var Pmin;
	//la mínima precisión de js con los intervalos son 5ms, ya que con 1 ms tarda 3 segundas en dar ms=1000.
	ms=parseInt(ms);
	ms+=5;
	//estética ms
	if(ms<10){
		Pms="00"+ms;
	}
	else if(ms<100){
		Pms="0"+ms;
	}
	else{		
		Pms=ms;
	}
	//total de milisegundos.
	tms=parseInt(tms);
	tms+=5;

	//pasar de ms a seg y de seg a min.
	if(ms>=1000){
		ms=0;
		seg=parseInt(seg);
		seg++;
	}
	if(seg>=60){
		seg=0;
		min=parseInt(min);
		min++;
	}

	//estética seg y min
	if(seg<10){
		Pseg="0"+seg;
	}
	else{
		Pseg=seg;
	}

	if(min<10){
		Pmin="0"+min;
	}
	else{
		Pmin=min;
	}

	//resultado
	document.getElementById("crono").innerHTML = Pmin+":"+Pseg+":"+Pms;
}

//cuando clickeo en la carta
function carta(ncarta){
	var n;
	if(jugando==1){//miro si le di al boton jugar
		var c;
		var error;
		error=0;

		for(c=0;c<12;c++){
			if(ncarta==saveposiciones[c]){
				error=1;
			}
		}

		if(error==1){
			document.getElementById("ganar").innerHTML = "Ya encontraste el par de esta carta";//cambio el texto
			document.getElementById("ganar").className = "inicio";//le asigno un class
		}

		else if(lastclick==ncarta){
			document.getElementById("ganar").innerHTML = "No levantes 2 veces la misma carta";//cambio el texto
			document.getElementById("ganar").className = "inicio";//le asigno un class
		}

		else{
			document.getElementById("ganar").innerHTML = "Encuentra los "+parseInt(6-par)+" pares";//cambio el texto
			document.getElementById("ganar").className = "inicio";//le asigno un class
			jugando=2;//para evitar bugs, no dejo que el jugador de a otra carta cuando se esta revelando una.
			n=parseInt(ncarta)-1;
			//enseña la imagen de la posicion clickeada. Identifico el id de la carta que cliqueo y le enseño su carta.
			document.getElementById("carta_"+ncarta+"").src="../Imagenes/cartas_"+posicioncartas[n]+".png";
			click=ncarta;//guardo la posición de la carta que clickee.
			//pasado un segundo las escondo de nuevo
			setTimeout(hideUNAcarta,1000);
		}
		
	}
	else if(jugando==2){
		alert("Espera que la carta se de la vuelta");
	}
	else{
		alert("Para empezar a jugar pulse al boton Jugar");
	}
}
//escondo unicamente la carta seleccionada para evitarme problemas
function hideUNAcarta(){
	document.getElementById("carta_"+click+"").src="../Imagenes/cartas_bg.png";
	jugando=1;
	ganar();//mira si he ganado.
}

//Récord:
var Record_player=localStorage.getItem('Record_player');
var Record_time=localStorage.getItem('Record_time');
var Record_time=parseInt(Record_time);

function ganar(){//creo una variable (lastclick) que guarda la anterior posicion y la compara con la actual(click).
	par= parseInt(par);
	click = parseInt(click);
	lastclick = parseInt(lastclick);
	if(posicioncartas[click-1]==posicioncartas[lastclick-1]){
		document.getElementById("carta_"+click+"").src="../Imagenes/cartas_"+posicioncartas[click-1]+".png";
		document.getElementById("carta_"+lastclick+"").src="../Imagenes/cartas_"+posicioncartas[lastclick-1]+".png";
		par++;
		saveposiciones[save]=click;
		save++;
		saveposiciones[save]=lastclick;
		save++;
		if(par==6){
			//jugador
			var player;
			player=localStorage.getItem('Jugador');
			
			if(isNaN(Record_time)){
				Record_player="Nadie";
				Record_time=parseInt(10080000);//pongo los ms de una semana.
			}
			//Paro el crono:
			clearInterval(crono);

			if(tms<Record_time){
				document.getElementById("ganar").innerHTML = "TIENES EL RÉCORD "+player;
				document.getElementById("ganar").className = "ganar";
				localStorage.setItem('Record_time',tms);
				localStorage.setItem('Record_player',player);
			}
			else{
				document.getElementById("ganar").innerHTML = "HAS GANADO "+player;
				document.getElementById("ganar").className = "ganar";
			}
		}
		else{
			document.getElementById("ganar").innerHTML = "Encuentra los "+parseInt(6-par)+" pares";//cambio el texto
			document.getElementById("ganar").className = "inicio";//le asigno un class
		}
	}
	else{
		lastclick=click;
	}
}

//doy al array de 12 valores de 0 y paso la variable como entera.
function resetarraycartas(){
	var c=0;
	c=parseInt(c);
	for(c=0;c<12;c++){
		posicioncartas[c]=0;
		saveposiciones[c]=0;

		posicioncartas[c]=parseInt(posicioncartas[c]);
		saveposiciones[c]=parseInt(saveposiciones[c]);
	}
}

//da valores aleatorios del 1-6 a las 12 cartas totales, repitiendose 2 veces cada valor es decir hay 2 unos, treses, cuatros ...
function randomcartas(){
	var c;
	var i;
	var nrandom;
	var rep;
	var error;
	c=0;
	c=parseInt(c);
	i=0;
	i=parseInt(i);
	while(c<12){
		//de manera que nunca sea 0
		nrandom=Math.round(Math.random()*5);
		nrandom=parseInt(nrandom);
		nrandom++;
		rep=0;
		rep=parseInt(rep);
		error=1;
		for(i=0;i<12;i++){
			if(nrandom==posicioncartas[i]){
				rep++;
				rep=parseInt(rep);
			}
			else if(rep>=2){
				error=1;
			}
			else if(rep<2){
				error=0;
			}
		}
		if(error==0){
			posicioncartas[c]=nrandom;
			c++;
			c=parseInt(c);
		}
	}
}

