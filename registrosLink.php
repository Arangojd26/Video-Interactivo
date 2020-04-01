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

</head>

<body>

    <?php $cont = 1;
    foreach ($resultado as $dato) : ?>
        <tr>
            <th scope="row" id="ranking">
                <?php
                echo $cont;
                $cont++;
                ?>
            </th>
            <td><?php echo $dato['nombreJugador']; ?></td>
            <td><?php echo $dato['score']; ?></td>
        </tr>
    <?php endforeach ?>

</body>

</html>