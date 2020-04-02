var btn = document.getElementById("btnPausar");
// var videoP = document.getElementById("myVideo");
var btnPrueba = document.getElementById("btnPrueba");
var puntajeP = document.getElementById("puntajeP");
var nombreEnPantalla = document.getElementById("participanteP");
var contador = 0;


// Declara el objeto de "SerialPort" que se va a utilizar
var serial;
var port = 'COM5'; // variable que indica el puerto serial utilizado por el Arduino
// var backgroundColor = 'rgb(0, 0, 0)'; // variable donde se almacena el color de fondo
var data;

function setup() {
 

 // Crea un objeto del tipo SerialPort
 serial = new p5.SerialPort();

 // Determina el método que se llama para listar los puertos seriales conectados
 serial.list();
 serial.on('list', portList);

 // Abre la conexión con el puerto donde está conectado el Arduino
 serial.open(port);

 // Determina el método que se llama cuando hay datos en el puerto
 serial.on('data', getData);
}

// Método que muestra por consola los puertos seriales conectados al PC
function portList(ports) {
 console.log('Listado de puertos seriales:');
 // recorre el listado de puertos seriales y los muestra por consola
 for (var i = 0; i < ports.length; i++) {
     console.log(ports[i]);
 }
}

// Método que llama al recibir datos desde el puerto serial
function getData() {

   data = serial.readStringUntil("\r\n");// lee los datos desde el puerto serial
   trim(data);                    // elimina los espacios en blanco al principio y final de los datos, si los hay
   if (!data) return;             // si los datos leídos están vacíos no hace nada
   console.log(data);             // muestra los datos leídos
   document.getElementById("ultrasonido").innerHTML = data + " cm";
   data = data * 3.5;
   $(".progress-bar").css("width", data + "%");//.text(data + " %");
  //  document.getElementById("barra").innerHTML = data + " cm";
  //  document.getElementById("barra").item(0).setAttribute('aria-valuenow',data);
   
}





function sumarScore(){

  contador = contador + 1;
  puntajeP.innerHTML = "Score: " + contador;
}

//Función para enviar el score y el nombre a editarResultado.php y se guarde en la base de datos en el php.
function enviarScoreyNombre() {
  var nombre = nombreEnPantalla.innerHTML;
  var passURL2 = "app/actualizarScore.php?conta=" + contador + "&nombreJu=" + nombre;
  $.ajax({ //Envía los datos a editarResultado.php, sin actualizar la pagina.
    type: "post",
    url:passURL2,
    data: contador,
    success: function(texto){
        if(texto==contador){
            console.log(texto+" Bien ahí");
        }else{
          console.log('De verdad acostate ya');
        }
    }
})


}

var video = null;


var player = {
	currentTime: 0,
  videoPlaying: 1
	
};

// Botones de opción multiple que se crean dinamicamente.-----------------------------------------------
// BTN1
var btn1_1 = document.createElement("button");
btn1_1.innerHTML = "Respuesta 1";
btn1_1.classList.add("btn");
btn1_1.classList.add("btn-primary");
btn1_1.classList.add("mx-1");
btn1_1.setAttribute("id", "btnSuma1_1");
var btn1_2 = document.createElement("button");
btn1_2.innerHTML = "Incorrecto 1_2";
btn1_2.classList.add("btn");
btn1_2.classList.add("btn-primary");
btn1_2.classList.add("mx-1");
btn1_2.setAttribute("id", "btnSuma1_2");// BTN1
// BTN2
var btn2_1 = document.createElement("button");
btn2_1.innerHTML = "Respuesta 2";
btn2_1.classList.add("btn");
btn2_1.classList.add("btn-primary");
btn2_1.classList.add("mx-1");
btn2_1.setAttribute("id", "btnSuma2_1");
var btn2_2 = document.createElement("button");
btn2_2.innerHTML = "Incorrecto 2_2";
btn2_2.classList.add("btn");
btn2_2.classList.add("btn-primary");
btn2_2.classList.add("mx-1");
btn2_2.setAttribute("id", "btnSuma2_2");// BTN2
// BTN3
var btn3_1 = document.createElement("button");
btn3_1.innerHTML = "Respuesta 3";
btn3_1.classList.add("btn");
btn3_1.classList.add("btn-primary");
btn3_1.classList.add("mx-1");
btn3_1.setAttribute("id", "btnSuma3_1");
var btn3_2 = document.createElement("button");
btn3_2.innerHTML = "Incorrecto 3_2";
btn3_2.classList.add("btn");
btn3_2.classList.add("btn-primary");
btn3_2.classList.add("mx-1");
btn3_2.setAttribute("id", "btnSuma3_2");// BTN3
// BTN4
var btn4_1 = document.createElement("button");
btn4_1.innerHTML = "Respuesta 4";
btn4_1.classList.add("btn");
btn4_1.classList.add("btn-primary");
btn4_1.setAttribute("id", "btnSuma4_1");
var btn4_2 = document.createElement("button");
btn4_2.innerHTML = "Incorrecto 4_2";
btn4_2.classList.add("btn");
btn4_2.classList.add("btn-primary");
btn4_2.classList.add("mx-1");
btn4_2.setAttribute("id", "btnSuma4_2");// BTN4
// Botones de opción multiple que se crean dinamicamente.------------------------------------------------

function initPlayer () { 
  
  video = document.querySelector("video");
	video.ontimeupdate = function() {
		
		// Control del flujo del video ----------------------------------------------------------------------
		
    player.currentTime = video.currentTime; //Obtengo tiempo actual de etiqueta video
    if(player.currentTime >= 5 && player.videoPlaying === 1){
		
      $("#ingresoNombreE").removeClass("d-none");
      video.pause();
      // player.videoPlaying === 1;
      player.videoPlaying = 2;
    }

    if(player.currentTime >= 6 && player.videoPlaying === 2){
		
      $("#cargaNombreP").addClass("d-none");
      $("#participanteP").removeClass("d-none");
      player.videoPlaying = 3;

    }

    if(player.currentTime >= 10 && player.videoPlaying === 3){ //Inicia

      
      $("#regla-de-medicion").removeClass("d-none");
		
      document.getElementById('padreBotones').insertBefore(btn1_1,btnPrueba);
      document.getElementById('padreBotones').insertBefore(btn1_2,btnPrueba);
      video.pause();

      btn1_1.onclick = function(){

        $("#regla-de-medicion").addClass("d-none");
        sumarScore();
        video.play();
        player.videoPlaying = 4;
        btn1_1.remove(btn1_1);
        btn1_2.remove(btn1_2);
        

      };
      btn1_2.onclick = function(){

        $("#regla-de-medicion").addClass("d-none");
        video.play();
        player.videoPlaying = 4;
        btn1_2.remove(btn1_2);
        btn1_1.remove(btn1_1);

      };

    } //If Cierra

    if(player.currentTime >= 15 && player.videoPlaying === 4){ //Inicia
      
      $("#regla-de-medicion").removeClass("d-none");
      document.getElementById('padreBotones').insertBefore(btn2_1,btnPrueba);
      document.getElementById('padreBotones').insertBefore(btn2_2,btnPrueba);
      video.pause();

      btn2_1.onclick = function(){

        $("#regla-de-medicion").addClass("d-none");
        sumarScore();
        video.play();
        player.videoPlaying = 5;
        btn2_1.remove(btn2_1);
        btn2_2.remove(btn2_2);

      };
      btn2_2.onclick = function(){

        $("#regla-de-medicion").addClass("d-none");
        video.play();
        player.videoPlaying = 5;
        btn2_1.remove(btn2_1);
        btn2_2.remove(btn2_2);

      };


    } //If Cierra

    if(player.currentTime >= 20 && player.videoPlaying === 5){ //Inicia
      
      $("#regla-de-medicion").removeClass("d-none");
      document.getElementById('padreBotones').insertBefore(btn3_1,btnPrueba);
      document.getElementById('padreBotones').insertBefore(btn3_2,btnPrueba);
      video.pause();

      btn3_1.onclick = function(){
        
        $("#regla-de-medicion").addClass("d-none");
        sumarScore();
        video.play();
        player.videoPlaying = 6;
        btn3_1.remove(btn3_1);
        btn3_2.remove(btn3_2);

      };
      btn3_2.onclick = function(){

        $("#regla-de-medicion").addClass("d-none");
        video.play();
        player.videoPlaying = 6;
        btn3_2.remove(btn3_2);
        btn3_1.remove(btn3_1);

      };

    } //If Cierra

    if(player.currentTime >= 25 && player.videoPlaying === 6){ //Inicia
      
      $("#regla-de-medicion").removeClass("d-none");
      document.getElementById('padreBotones').insertBefore(btn4_1,btnPrueba);
      document.getElementById('padreBotones').insertBefore(btn4_2,btnPrueba);
      video.pause();

      btn4_1.onclick = function(){
        
        $("#regla-de-medicion").addClass("d-none");
        sumarScore();
        video.play();
        player.videoPlaying = 7;
        btn4_1.remove(btn4_1);
        btn4_2.remove(btn4_2);

      };
      btn4_2.onclick = function(){

        $("#regla-de-medicion").addClass("d-none");
        video.play();
        player.videoPlaying = 7;
        btn4_1.remove(btn4_1);
        btn4_2.remove(btn4_2);

      };

    } //If Cierra

    if(player.currentTime >= 30 && player.videoPlaying === 7){ //Inicia
		
      enviarScoreyNombre();
      player.videoPlaying = 8;

    } //If Cierra
  };
}


function pausarVideo() {
  if (video.paused) {
    video.play();
    btn.innerHTML = "Pause";
  } else {
    video.pause();
    btn.innerHTML = "Play";
  }
}

$('#cargaNombreP').click(function() {
  var esperar = 0;
  $.ajax({
      url: "mostrarNombre.php",
      beforeSend: function() {
          $('#participanteP').text('Cargando...');
      },
      success: function(data) {
          setTimeout(function() {
              $('#participanteP').html(data);
          }, esperar);
      }
  });
});


