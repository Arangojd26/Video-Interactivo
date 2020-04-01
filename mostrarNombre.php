<?php
include_once 'app/conexion.php';
//LEER
$sql_leerP = 'SELECT nombreJugador FROM jugadores WHERE id > 0 ORDER BY id DESC LIMIT 1';
$gsentP = $pdo->prepare($sql_leerP);
$gsentP->execute();
$resultadoP = $gsentP->fetchAll();

?>


<!doctype html>
<html lang="es">

<head>

    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

</head>

<body>

    <?php
    foreach ($resultadoP as $dato) : ?>
        
        <?php echo 'Hola '.$dato['nombreJugador']; ?>
        
    <?php endforeach ?>
    


</body>

</html>