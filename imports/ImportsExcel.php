<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of ImportsExcel
 *
 * @author enriquegomezpena
 */
require '../vendor/autoload.php';
require "../db/DBSingleton.php";

class ImportsExcel {

    public function import($inputFileName, $mes) {

        //$inputFileName = '../excel/example1.xls';
        $reader = new \PhpOffice\PhpSpreadsheet\Reader\Xls();
        $reader->setReadDataOnly(true);
        $spreadsheet = $reader->load($inputFileName);
        //$worksheet = $spreadsheet->getActiveSheet();
        $worksheetPersonas = $spreadsheet->getSheetByName("Personas");
        $worksheetPropiedades = $spreadsheet->getSheetByName("Propiedades");
        $worksheetPropietarios = $spreadsheet->getSheetByName("Propietarios");
        $worksheetLugares = $spreadsheet->getSheetByName("Lugares");
        // Get the highest row and column numbers referenced in the worksheet
        
//        $highestColumnPropiedades = $worksheetPropiedades->getHighestColumn(); // e.g 'F'
//        $highestColumnIndexPropiedades = \PhpOffice\PhpSpreadsheet\Cell\Coordinate::columnIndexFromString($highestColumnPropiedades); // e.g. 5
//        $highestColumnPropietarios = $worksheetPresonas->getHighestColumn(); // e.g 'F'
//        $highestColumnIndexPropietarios = \PhpOffice\PhpSpreadsheet\Cell\Coordinate::columnIndexFromString($highestColumnPropietarios); // e.g. 5
//        $highestColumnLugares = $worksheetPresonas->getHighestColumn(); // e.g 'F'
//        $highestColumnIndexLugares = \PhpOffice\PhpSpreadsheet\Cell\Coordinate::columnIndexFromString($highestColumnLugares); // e.g. 5

        $this->delete("persona",$mes);
        $cantPersonas=$this->insertPersonas($worksheetPersonas, $mes);
        
        $this->delete("propiedad",$mes);
        $cantPropiedades=$this->insertPropiedades($worksheetPropiedades, $mes);

        $this->delete("propietario",$mes);
        $cantPropietarios=$this->insertPropietarios($worksheetPropietarios, $mes);
        
        $this->delete("lugar",$mes);
        $cantLugares=$this->insertLugares($worksheetLugares, $mes);
        
        return [ "Total" => $cantPersonas+$cantPropiedades+$cantPropietarios+$cantLugares, 
            "Personas" => $cantPersonas,
            "Propiedades" => $cantPropiedades, 
            "Propietarios" => $cantPropietarios, 
            "Lugares" => $cantLugares];
    }
    
    public function delete($tabla, $mes){
        $dbSingleton = DBSingleton::getInstance();
        $db = $dbSingleton->getRedBean();
        
        $result=$db->findAll($tabla, ' mes = ? ', [$mes]);
        $db->trashAll($result);
    }
    
    public function insertPersonas($worksheet, $mes){
        $cantRegistros=0;
        $highestRow = $worksheet->getHighestRow(); // e.g. 10
        $highestColumn = $worksheet->getHighestColumn(); // e.g 'F'
        $highestColumnIndex = \PhpOffice\PhpSpreadsheet\Cell\Coordinate::columnIndexFromString($highestColumn); // e.g. 5
        for ($row = 2; $row <= $highestRow; ++$row) {
            $celdas = [];
            for ($col = 1; $col <= $highestColumnIndex; ++$col) {
                $celdas[] = $worksheet->getCellByColumnAndRow($col, $row)->getValue();
                //print_r($worksheet->getCellByColumnAndRow($col, $row)->getValue());
            }
            //print_r($celdas);
            $this->insertPersona($celdas, $mes);
            $cantRegistros++;
        }
        return $cantRegistros;
    }
    
    public function insertPersona($celdas, $mes) {

        //print_r($celdas);
        $dbSingleton = DBSingleton::getInstance();
        $db = $dbSingleton->getRedBean();

        $persona = $db->dispense("persona");
        $persona->dni = $celdas[0];
        $persona->nombres = $celdas[1];
        $persona->apellidos = $celdas[2];
        $persona->sexo = $celdas[3];
        $persona->edad = $celdas[4];
        $persona->educacion = $celdas[5];
        $persona->profesion = $celdas[6];
        $persona->telefono = $celdas[7];
        $persona->email = $celdas[8];
        $persona->votante = $celdas[9];
        $persona->foto_URL = $celdas[10];
        $persona->reside_propiedad = $celdas[11];
        $persona->mes= $mes;

        return $idPersona = $db->store($persona);
        //$beanPersona = $db->load("persona",$idPersona);
    }

    public function insertPropiedades($worksheet, $mes){
        $cantRegistros=0;
        $highestRow = $worksheet->getHighestRow(); // e.g. 10
        $highestColumn = $worksheet->getHighestColumn(); // e.g 'F'
        $highestColumnIndex = \PhpOffice\PhpSpreadsheet\Cell\Coordinate::columnIndexFromString($highestColumn); // e.g. 5
        for ($row = 2; $row <= $highestRow; ++$row) {
            $celdas = [];
            for ($col = 1; $col <= $highestColumnIndex; ++$col) {
                $celdas[] = $worksheet->getCellByColumnAndRow($col, $row)->getValue();
                //print_r($worksheet->getCellByColumnAndRow($col, $row)->getValue());
            }
            //print_r($celdas);
            $this->insertPropiedad($celdas, $mes);
            $cantRegistros++;
        }
        return $cantRegistros;
    }
    
    public function insertPropiedad($celdas, $mes) {

        //print_r($celdas);
        $dbSingleton = DBSingleton::getInstance();
        $db = $dbSingleton->getRedBean();

        $propiedad = $db->dispense("propiedad");
        $propiedad->partida = $celdas[0];
        $propiedad->mts_totales = $celdas[1];
        $propiedad->mts_cubiertos = $celdas[2];
        $propiedad->tipo = $celdas[3];
        $propiedad->uso = $celdas[4];
        $propiedad->cloacas = $celdas[5];
        $propiedad->paviemnto = $celdas[6];
        $propiedad->luz = $celdas[7];
        $propiedad->gas = $celdas[8];
        $propiedad->deuda = $celdas[9];
        $propiedad->depto = $celdas[10];
        $propiedad->torre = $celdas[11];
        $propiedad->altura = $celdas[12];
        $propiedad->calle = $celdas[13];
        $propiedad->localidad = $celdas[14];
        $propiedad->partido = $celdas[15];
        $propiedad->provincia = $celdas[16];
        $propiedad->pais = $celdas[17];
        $propiedad->cp = $celdas[18];
        $propiedad->altitud = $celdas[19];
        $propiedad->longitud= $celdas[20];
        $propiedad->mes= $mes;
        
        return $idPropiedad = $db->store($propiedad);
        
    }
    
    public function insertPropietarios($worksheet, $mes){
        $cantRegistros=0;
        $highestRow = $worksheet->getHighestRow(); // e.g. 10
        $highestColumn = $worksheet->getHighestColumn(); // e.g 'F'
        $highestColumnIndex = \PhpOffice\PhpSpreadsheet\Cell\Coordinate::columnIndexFromString($highestColumn); // e.g. 5
        for ($row = 2; $row <= $highestRow; ++$row) {
            $celdas = [];
            for ($col = 1; $col <= $highestColumnIndex; ++$col) {
                $celdas[] = $worksheet->getCellByColumnAndRow($col, $row)->getValue();
                //print_r($worksheet->getCellByColumnAndRow($col, $row)->getValue());
            }
            //print_r($celdas);
            $this->insertPropietario($celdas, $mes);
            $cantRegistros++;
        }
        return $cantRegistros;
    }
    
    public function insertPropietario($celdas, $mes){

        //print_r($celdas);
        $dbSingleton = DBSingleton::getInstance();
        $db = $dbSingleton->getRedBean();

        $propietario = $db->dispense("propietario");
        $propietario->dni = $celdas[0];
        $propietario->partida = $celdas[1];
        $propietario->mes= $mes;
        
        return $idPropietario = $db->store($propietario);
        
    } 
    
    public function insertLugares($worksheet, $mes){
        $cantRegistros=0;
        $highestRow = $worksheet->getHighestRow(); // e.g. 10
        $highestColumn = $worksheet->getHighestColumn(); // e.g 'F'
        $highestColumnIndex = \PhpOffice\PhpSpreadsheet\Cell\Coordinate::columnIndexFromString($highestColumn); // e.g. 5
        for ($row = 2; $row <= $highestRow; ++$row) {
            $celdas = [];
            for ($col = 1; $col <= $highestColumnIndex; ++$col) {
                $celdas[] = $worksheet->getCellByColumnAndRow($col, $row)->getValue();
                //print_r($worksheet->getCellByColumnAndRow($col, $row)->getValue());
            }
            //print_r($celdas);
            $this->insertLugar($celdas, $mes);
            $cantRegistros++;
        }
        return $cantRegistros;
    }
    
    public function insertLugar($celdas, $mes){

        //print_r($celdas);
        $dbSingleton = DBSingleton::getInstance();
        $db = $dbSingleton->getRedBean();
   
        $lugar = $db->dispense("lugar");
        $lugar->tipo = $celdas[0];
        $lugar->descripcion = $celdas[1];
        $lugar->depto = $celdas[2];
        $lugar->torre = $celdas[3];
        $lugar->altura = $celdas[4];
        $lugar->calle = $celdas[5];
        $lugar->localidad = $celdas[6];
        $lugar->partido = $celdas[7];
        $lugar->provincia = $celdas[8];
        $lugar->pais = $celdas[9];
        $lugar->cp = $celdas[10];
        $lugar->altitud = $celdas[11];
        $lugar->longitud= $celdas[12];
        $lugar->mes= $mes;
        
        return $idLugar = $db->store($lugar);
        
    } 
}
