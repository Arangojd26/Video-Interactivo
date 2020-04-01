<?php
    include_once 'conexion.php';

    $conta = $_GET["jugadores"];

    $sql_eliminar = 'DELETE FROM jugadores';

    $gsentencia_eliminar = $pdo->prepare($sql_eliminar);
    $gsentencia_eliminar->execute();

    echo 'exito';
    // header('Location: /VIDEO-INTERACTIVO/index.php');


// $resultado = $gsent->fetchAll();
?>