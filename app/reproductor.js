var btn = document.getElementById("btnPausar");
// var videoP = document.getElementById("myVideo");
var btnPrueba = document.getElementById("btnPrueba");
var puntajeP = document.getElementById("puntajeP");
var contador = 0;

function sumarScore(){

  contador = contador + 1;
  puntajeP.innerHTML = "Score: " + contador;
};

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
btn1_1.setAttribute("id", "btnSuma1");
var btn1_2 = document.createElement("button");
btn1_2.innerHTML = "Incorrecto 1_2";
btn1_2.classList.add("btn");
btn1_2.classList.add("btn-primary");
btn1_2.setAttribute("id", "btnSuma1_2");// BTN1
// BTN2
var btn2_1 = document.createElement("button");
btn2_1.innerHTML = "Respuesta 2";
btn2_1.classList.add("btn");
btn2_1.classList.add("btn-primary");
btn2_1.setAttribute("id", "btnSuma2");// BTN3
// BTN3
var btn3_1 = document.createElement("button");
btn3_1.innerHTML = "Respuesta 3";
btn3_1.classList.add("btn");
btn3_1.classList.add("btn-primary");
btn3_1.setAttribute("id", "btnSuma3");// BTN3
// BTN4
var btn4_1 = document.createElement("button");
btn4_1.innerHTML = "Respuesta 4";
btn4_1.classList.add("btn");
btn4_1.classList.add("btn-primary");
btn4_1.setAttribute("id", "btnSuma4");// BTN4
// Botones de opción multiple que se crean dinamicamente.------------------------------------------------

function initPlayer () { 
  
  video = document.querySelector("video");
	video.ontimeupdate = function() {
		
		
		// Control del flujo del video --------------------------------------------------
		
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
		
      document.getElementById('padreBotones').insertBefore(btn1_1,btnPrueba);
      document.getElementById('padreBotones').insertBefore(btn1_2,btnPrueba);
      video.pause();

      btn1_1.onclick = function(){
        
        sumarScore();
        video.play();
        player.videoPlaying = 4;
        btn1_1.remove(btn1_1);
        btn1_2.remove(btn1_2);

      };
      btn1_2.onclick = function(){
        
        video.play();
        player.videoPlaying = 4;
        btn1_2.remove(btn1_2);
        btn1_1.remove(btn1_1);

      };

    } //If Cierra

    if(player.currentTime >= 15 && player.videoPlaying === 4){ //Inicia
		
      document.getElementById('padreBotones').insertBefore(btn2_1,btnPrueba);
      video.pause();

      btn2_1.onclick = function(){
        
        sumarScore();
        video.play();
        player.videoPlaying = 5;
        btn2_1.remove(btn2_1);

      };

    } //If Cierra

    if(player.currentTime >= 20 && player.videoPlaying === 5){ //Inicia
		
      document.getElementById('padreBotones').insertBefore(btn3_1,btnPrueba);
      video.pause();

      btn3_1.onclick = function(){
        
        sumarScore();
        video.play();
        player.videoPlaying = 6;
        btn3_1.remove(btn3_1);

      };

    } //If Cierra

    if(player.currentTime >= 25 && player.videoPlaying === 6){ //Inicia
		
      document.getElementById('padreBotones').insertBefore(btn4_1,btnPrueba);
      video.pause();

      btn4_1.onclick = function(){
        
        sumarScore();
        video.play();
        player.videoPlaying = 7;
        btn4_1.remove(btn4_1);

      };

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


