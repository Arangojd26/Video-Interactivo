var btn = document.getElementById("btnPausar");
var video = document.getElementById("myVideo");



function pausarVideo() {
    if (video.paused) {
      video.play();
      btn.innerHTML = "Pause";
    } else {
      video.pause();
      btn.innerHTML = "Play";
    }
}