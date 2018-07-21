<?php ?>

<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
    <head>
        <title>My City Demo</title>

        <meta name="viewport" content="initial-scale=1.0, user-scalable=no">
        <meta charset="UTF-8">

        <link rel="stylesheet" href="css/bootstrap.min.css" type="text/css" /><!-- Bootstrap -->  
    </head>
    <body>
        <div class="container-fluid">
            <br>
            <br>

            <div class="panel-group col-sm-2 col-md-2 col-lg-2">
                <div class="panel panel-default">
                    <div class="panel-heading">Carga de datos</div>
                    <div class="panel-body">
                        <form id="test" name="testExcel" enctype="multipart/form-data" action="controlers/controler_imports.php" method="POST">
                            Selecciona el período
                            <div >
                                <select class="form-control" id="mes" name="mes">

                                    <option value="Enero">Enero</option>
                                    <option value="Febrero">Febrero</option>
                                    <option value="Marzo">Marzo</option>
                                    <option value="Abril">Abril</option>
                                    <option value="Mayo">Mayo</option>
                                    <option value="Junio">Junio</option>
                                    <option value="Julio">Julio</option>
                                    <option value="Agosto">Agosto</option>
                                    <option value="Septiembre">Septiembre</option>
                                    <option value="Octubre">Octubre</option>
                                    <option value="Noviembre">Noviembre</option>
                                    <option value="Diciembre">Diciembre</option>
                                </select>
                            </div>
                            <div >
                                <br>
                                <!-- MAX_FILE_SIZE debe preceder al campo de entrada del fichero -->
                                <input type="hidden" name="MAX_FILE_SIZE" value="3000000" />
                                <!-- El nombre del elemento de entrada determina el nombre en el array $_FILES -->
                                <input type="file"  name="excel" id="excel-upload" accept=".xls"/>
                                <br>
                            </div>
                            <input type="submit" class="btn btn-default btn-block" name="subirExcel" value="Subir Excel" />
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <script type="text/javascript" src="js/jquery-2.1.1.js"></script><!-- Jquery -->
        <script type="text/javascript" src="js/bootstrap.min.js"></script><!-- Bootstrap -->
    </body>
</html>
