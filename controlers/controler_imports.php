<!DOCTYPE html>
<html>
    <head>
        <title>My City Demo</title>

        <meta name="viewport" content="initial-scale=1.0, user-scalable=no">
        <meta charset="UTF-8">

        <link rel="stylesheet" href="../css/bootstrap.min.css" type="text/css" /><!-- Bootstrap -->        
        
    </head>
    <body>
        
        <div class="container-fluid">
            <br>
            <br>

            <div class="panel-group col-sm-2 col-md-2 col-lg-2">
                <div class="panel panel-default">
                    <div class="panel-heading">Resultado</div>
                    <div class="panel-body">
                        <?php
                        require '../imports/ImportsExcel.php';
                        $dir_subida = '../excel/';
//                        $dir_subida = '/Applications/XAMPP/xamppfiles/htdocs/demo/excel/';
                        if (isset($_FILES["excel"])) {
                        $fichero_subido = $dir_subida . "excel" . '_' . $_FILES["excel"]['name'];

                        if (move_uploaded_file($_FILES["excel"]['tmp_name'], $fichero_subido)) {
                        $imports = new ImportsExcel();
                        $resultInsert = $imports->import($fichero_subido, $_POST["mes"]);
                        echo "Se procesaron: ".$resultInsert["Total"]." registros.<br><br>"
                        ."Detalle:<br>"
                        ." - ".$resultInsert["Personas"]." personas.<br>"
                        ." - ".$resultInsert["Propiedades"]." propiedades.<br>"
                        ." - ".$resultInsert["Propietarios"]." propietarios.<br>"
                        ." - ".$resultInsert["Lugares"]." lugares.<br>";
                        }
                        else{
                        echo 'Ocurrio un error al procesar el archivo.';

                        }
                        }
                        ?>
                    </div>
                </div>
            </div>
        </div>

        <script type="text/javascript" src="../js/jquery-2.1.1.js"></script><!-- Jquery -->
        <script type="text/javascript" src="../js/bootstrap.min.js"></script><!-- Bootstrap -->
    </body>
</html>
