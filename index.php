<?php
include_once 'app/conexion.php';
//LEER
$sql_leer = 'SELECT * FROM jugadores ORDER BY score DESC';

$gsent = $pdo->prepare($sql_leer);
$gsent->execute();

$resultado = $gsent->fetchAll();

?>

<!doctype html>
<html lang="es">

<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">

    <script defer src="https://use.fontawesome.com/releases/v5.0.6/js/all.js"></script>
    <script src="http://code.jquery.com/jquery-3.4.1.min.js" integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.3/umd/popper.min.js" integrity="sha384-vFJXuSJphROIrBnz7yo7oB41mKfc8JzQZiCq4NCceLEaO4IHwicKwpJf9c9IpFgh" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/js/bootstrap.min.js" integrity="sha384-alpBpkh1PFOepccYVYDB4do5UnbKysX5WZXm3XxPqe5iKTfUKjNkCk9SaVuEZflJ" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="assets/css/estilos.css">
    <script src="app/reproductor.js"></script>

    <title>Hello, world!</title>

</head>

<body>
    <!-- div donde están ubicados los botones -->
    <div class="container-fluid">
        <video muted loop id="myVideo">
            <source src="assets/vid/love.mp4" type="video/mp4">
        </video>
        <div class="row align-items-end justify-content-end text-center text-light">
            <div class="col-md-3 botones-abajo-derecha">
                <hr class="bg-light">

                <button type="button" class="btn btn-outline-light mb-2 mb-sm-0" id="btnPausar" onclick="pausarVideo()">Play</button>
                <a href="index.php"><button type="button" class="btn btn-outline-light mb-2 mb-sm-0">Inicio</button></a>
                <button type="button" class="btn btn-outline-light mb-2 mb-sm-0" data-toggle="modal" data-target="#contacto" id="cargarRecords" onclick="pausarVideo()">Records</button>
            </div>
        </div>
    </div>
    <!--Fin del div donde están ubicados los botones -->


    <!-- Modal  HOME-->
    <div class="modal fade" id="home" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
            <div class="modal-content bg-dark text-light">
                <div class="modal-header">

                    <h1 class="modal-title w-100 display-4 text-center text-light font-weight-bold" id="exampleModalLongTitle">LeSmart</h1>

                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span class="fa-layers fa-fw">
                            <i class="fas fa-circle" style="color:Tomato"></i>
                            <i class="fa-inverse fas fa-times" data-fa-transform="shrink-6"></i>
                        </span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row d-flex justify-content-center">
                        <img src="assets/img/niña.png" alt="" class="img-fluid rounded">
                        <img src="assets/img/niño.png" alt="" class="img-fluid rounded">
                    </div>

                    <div class="alert alert-success d-none" id="mensajeExito">Estudiante creado con éxito</div>
                    <div class="alert alert-danger d-none" id="mensajeError"></div>
                    <!-- Fila de ingresar valores-->
                    <form id="formulario" novalidate method="POST" action="index.php">
                        <div class="row form-group justify-content-center">
                            <div class="col-md-8 mt-3">
                                <input type="text" name="nombreJugador" value="" id="nombreJugador" class="form-control" required>
                            </div>
                        </div>
                        <!-- Fila botón para guardar el nombre-->
                        <div class="row justify-content-center">
                            <button type="submit" class="btn btn-info mt-3" style="font-size:24px">Guardar
                                <i class="fa fa-save"></i></button>
                        </div>

                        <!-- Fila botón para continuar con el video-->
                        <div class="row justify-content-center">
                            <a class="text-light mt-5 pt-4" role="button" id="enviarNombre" name="enviarNombre">
                                <button class="fas fa-play-circle fa-spin display-1" onclick="pausarVideo()" data-dismiss="modal"></button>
                            </a>
                        </div>

                    </form>
                </div>
                <div class="modal-footer">
                    <!-- <button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button> -->
                </div>
            </div>
        </div>
    </div><!-- Modal  HOME-->

    <!-- Modal  Contacto-->
    <div class="modal" id="contacto" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
            <div class="modal-content bg-dark text-light">
                <div class="modal-header">
                    <h5 class="modal-title w-100 display-4 text-center" id="exampleModalLongTitle">Puntaje</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span class="fa-layers fa-fw">
                            <i class="fas fa-circle" style="color:Tomato"></i>
                            <i class="fa-inverse fas fa-times" data-fa-transform="shrink-6"></i>
                        </span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">

                        <div class="col-md-12">
                            <table class="table-responsive">
                                <table class="table table-hover table-borderless">

                                    <thead class="thead-dark">
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Nombre</th>
                                            <th scope="col">Score</th>

                                        </tr>
                                    </thead>
                                    <tbody id="actualizar">

                                    </tbody>
                                </table>
                            </table>

                        </div>

                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" id="limpiarRecords">Limpiar</button>
                    <button type="button" class="btn btn-danger" data-dismiss="modal" onclick="pausarVideo()">Cerrar</button>
                </div>
            </div>
        </div>
        <!-- <div class="modal-footer">
            <button type="button" class="btn btn-danger" id="limpiarRecords">Limpiar</button>
            <button type="button" class="btn btn-danger" data-dismiss="modal" onclick="pausarVideo()">Cerrar</button>
        </div> -->
    </div><!-- Modal  contacto-->

    <script>

    </script>

    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="http://code.jquery.com/jquery-3.4.1.min.js" integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.3/umd/popper.min.js" integrity="sha384-vFJXuSJphROIrBnz7yo7oB41mKfc8JzQZiCq4NCceLEaO4IHwicKwpJf9c9IpFgh" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/js/bootstrap.min.js" integrity="sha384-alpBpkh1PFOepccYVYDB4do5UnbKysX5WZXm3XxPqe5iKTfUKjNkCk9SaVuEZflJ" crossorigin="anonymous"></script>
    <script src="app/reproductor.js"></script>
    <script src="app/formulario.js"></script>
    <script>
        $(function() {
            $("#home").modal();
        });
    </script>

</body>

</html>