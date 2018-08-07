<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
    <head>
        <meta name="viewport" content="initial-scale=1.0, user-scalable=no">
        <meta charset="UTF-8">

        <title>My City Demo</title>

        <link rel="stylesheet" href="css/bootstrap.min.css" type="text/css" /><!-- Bootstrap -->      
        <link rel="stylesheet" href="css/index.css" type="text/css"/><!-- Style -->
    </head>
    <body>
        <?php
        // put your code here
        ?>
        <div class="container-fluid">
            <img src="images/logo_principal.png" class="center-block logo" >
            <p class="text-center parrafo1">Por favor ingresa tus datos para acceder al sistema.</p>
            <form action="main.php" method="POST">
                <input type="text" placeholder="Usuario" name="usuario" class="center-block "/>
                <input type="password" placeholder="Contraseña" class="center-block " />
                <p class="text-center parrafo2">¿Olvidaste tu constraseña? Click acá</p>
                <input type="submit" value="ENTRAR" class="center-block" />
            </form>
            <p class="text-center fother" >Términos de uso. Por sonsultas técnicas contactar a soporte@mycity.com.ar</p>
            
        </div>

        <script type="text/javascript" src="js/bootstrap.min.js"></script><!-- Bootstrap -->
    </body>
</html>
