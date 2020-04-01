$("#formulario").submit(function(event){
    event.preventDefault(); //Almacena los datos sin refrescar el sitio web.
    enviar();
});

function enviar(){
    //console.log("ejecutado");
    var datos = $("#formulario").serialize(); //Toma los datos name y los guarda en un arreglo.
    $.ajax({ //Envía los datos a formulario php, sin actualizar la pagina.
        type: "post",
        url:"app/formulario.php",
        data: datos,
        success: function(texto){
            if(texto=="exito"){
                correcto();
                
            }else{
                phpError(texto);  
            }
        }
    })
    console.log(datos);
}

function limpiar(){
    var jugadores = "jugadores";
    var passURL = "app/eliminar.php?jugadores=" + jugadores;
    $.ajax({ //Envía los datos a eliminar php, sin actualizar la pagina.
        type: "post",
        url:passURL,
        data: jugadores,
        success: function(texto){
            if(texto=="exito"){
                console.log("Eliminó los datos");
            }else{
                console.log("Dormite");
            }
        }
    })
}

$('#cargarRecords').click(function() {
    var esperar = 1000;
    $.ajax({
        url: "registrosLink.php",
        beforeSend: function() {
            $('#actualizar').text(' Cargando...');
        },
        success: function(data) {
            setTimeout(function() {
                $('#actualizar').html(data);
            }, esperar);
        }
    });
});

$('#limpiarRecords').click(function() {
    
    var esperar = 0;
    $.ajax({
        url: "registrosLink.php",
        beforeSend: function() {
            limpiar();
            $('#actualizar').text('Cargando...');
        },
        success: function(data) {
            setTimeout(function() {
                $('#actualizar').html(data);
            }, esperar);
        }
    });
});


  

function correcto(){
    $("#mensajeExito").removeClass("d-none");
    $("#mensajeError").addClass("d-none");
    $("#ingresoNombreE").addClass("d-none");
    $("#cargaNombreP").removeClass("d-none");
}
function phpError(texto){
    $("#mensajeError").removeClass("d-none");
    $("#mensajeError").html(texto);
}