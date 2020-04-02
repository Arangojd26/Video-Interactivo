<?php

include_once 'app/conexion.php';
//LEER
$sql_leerP = 'SELECT nombreJugador FROM jugadores WHERE id > 0 ORDER BY id DESC LIMIT 1';
$gsentP = $pdo->prepare($sql_leerP);
$gsentP->execute();
$resultadoP = $gsentP->fetchAll();

?>

<html lang="es">

<head>

</head>

<body>

    <?php
    foreach ($resultadoP as $dato) : ?>
        
        <?php echo $dato['nombreJugador']; ?>
        
    <?php endforeach ?>
    
</body>

</html>