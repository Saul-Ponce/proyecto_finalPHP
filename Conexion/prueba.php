<?php
include("Conexion.php");
$instancia = new Conexion();
$conexion = $instancia->get_conexion();

$sql = "Select * from tb_persona";
$statement = $conexion->prepare($sql);
$statement->execute();
$datos = $statement->fetchAll();
print_r($datos);
?>
