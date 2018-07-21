<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
require "../db/DBSingleton.php";

$dbSingleton = DBSingleton::getInstance();
$db = $dbSingleton->getRedBean();

$resultPersonas = $db->findAll("persona", ' mes = ? ', [$_POST["mes"]]);
$arraysPersonas = $db->exportAll($resultPersonas);

$resultPropiedades = $db->findAll("propiedad", ' mes = ? ', [$_POST["mes"]]);
$arraysPropiedades = $db->exportAll($resultPropiedades);

$resultPropietarios = $db->findAll("propietario", ' mes = ? ', [$_POST["mes"]]);
$arraysPropietarios = $db->exportAll($resultPropietarios);

$resultLugares = $db->findAll("lugar", ' mes = ? ', [$_POST["mes"]]);
$arraysLugares = $db->exportAll($resultLugares);

if (empty($arraysPersonas) &&
        empty($arraysPropiedades) &&
        empty($arraysPropietarios) &&
        empty($arraysLugares)) {

    echo "";
    
} else {
    
    echo json_encode(array("personas" => $arraysPersonas,
        "propiedades" => $arraysPropiedades,
        "propietarios" => $arraysPropietarios,
        "lugares" => $arraysLugares));
}


//print_r($response);