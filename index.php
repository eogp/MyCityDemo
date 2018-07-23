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
        <link rel="stylesheet" href="css/maps.css" type="text/css" /><!-- Maps -->
        <link rel="stylesheet" href="css/loading.css" ><!-- Loading -->
    </head>
    <body >
        <?php
        ?>
        <div class="container-fluid">
            <div class="row">
                <!-- Menu -->
                <div id="menu" class="col-sm-2 col-md-2 col-lg-2">
                    <!-- Logo -->
                    <img class="center-block" src="images/logo.png" alt="My City" >
                    <!-- Fin Logo -->
                    <h5>Periodo:</h5>
                    <!--Post puntos-->
                    <div>
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
                    <br>

                    <button id="getPuntos" class="btn btn-default btn-block">Cargar</button>
                    <br>
                    <!-- Fin Post Puntos -->
                    <hr class="style4">
                    <!-- Filtros -->
                    <h5>Filtros:</h5>
                    <br>
                    <div>
                        <button id="filterPersonas" class="btn btn-default btn-block" disabled="true">Personas</button>
                    </div>
                    <br>
                    <div>
                        <button id="filterPropiedades" class="btn btn-default btn-block" disabled="true">Propiedades</button>
                    </div>
                    <br>
                    <div>
                        <button id="filterLugares" class="btn btn-default btn-block" disabled="true">Lugares</button>
                    </div>
                    <br>
                    <hr class="style4">
                    <br>
                    <div>
                        <button id="reiniciar" class="btn btn-default btn-block" disabled="true">Reiniciar</button>
                    </div>
                    <!-- Fin filtros -->                  

                </div>
                <!-- Fin Menu -->

                <!-- Mapa -->
                <div id="map" class="col-sm-9 col-md-9 col-lg-9">                       
                </div>
                <!-- Fin Mapa --> 

                <!-- Modal Filtro Personas-->
                <div class="modal fade" id="modalFilterPesonas" tabindex="-1" role="dialog">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                <h4 class="modal-title">Selecione los campos a filtrar.</h4>
                            </div>
                            <div class="modal-body">
                                <div class="row">
                                    <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                                        Edad
                                        <div class="input-group-sm">
                                            <input type="number" class="form-control" placeholder="Desde..." id="fPersonasEdadDesde">
                                            <input type="number" class="form-control" placeholder="Hasta..." id="fPersonasEdadHasta">
                                        </div>
                                    </div>
                                    <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                                        Deuda
                                        <div class="input-group-sm">
                                            <input type="number" class="form-control" placeholder="Mín..." id="fPersonasDeudaDesde">
                                            <input type="number" class="form-control" placeholder="Máx..." id="fPersonasDeudaHasta">
                                        </div>
                                    </div>
                                    <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                        Propietario
                                        <div class="input-group-sm">
                                            <input type="number" class="form-control" placeholder="Cant. propiedades" id="fPersonasPropietarioDesde">
                                            <input type="number" class="form-control" placeholder="Cant. propiedades" id="fPersonasPropietarioHasta">
                                        </div>
                                    </div>
                                    <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2" id="fPersonasSexo">
                                        Sexo
                                        <div class="checkbox">
                                            <label><input type="checkbox" value="Masculino">Hombre</label>
                                        </div>
                                        <div class="checkbox">
                                            <label><input type="checkbox" value="Femenino">Mujer</label>
                                        </div>
                                    </div>
                                    <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2" id="fPersonasVotante">
                                        Votante
                                        <div class="checkbox">
                                            <label><input type="checkbox" value="Si">Si</label>
                                        </div>
                                        <div class="checkbox">
                                            <label><input type="checkbox" value="No">No</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <br>
                                    <div class="col-lg-3 col-md-3 col-sm-3 col-xs-3" id="fPersonasEducacion">
                                        Educación
                                        <div class="checkbox">
                                            <label><input type="checkbox" value="Primario">Primaria</label>
                                        </div>
                                        <div class="checkbox">
                                            <label><input type="checkbox" value="Secundaria">Secundaria</label>
                                        </div>
                                        <div class="checkbox">
                                            <label><input type="checkbox" value="Terciario">Terciaria</label>
                                        </div>
                                        <div class="checkbox">
                                            <label><input type="checkbox" value="Universitario">Universitaria</label>
                                        </div>
                                    </div>

                                    <div id="fPersonasProfesion">
                                        <div class="col-lg-3 col-md-3 col-sm-3 col-xs-3">
                                            Profesión
                                            <div class="checkbox">
                                                <label><input type="checkbox" value="Abogado">Abogado</label>
                                            </div>
                                            <div class="checkbox">
                                                <label><input type="checkbox" value="Ama de casa">Ama de casa</label>
                                            </div>
                                            <div class="checkbox">
                                                <label><input type="checkbox" value="Cajero">Cajero</label>
                                            </div>
                                            <div class="checkbox">
                                                <label><input type="checkbox" value="Chofer">Chofer</label>
                                            </div>

                                            <div class="checkbox">
                                                <label><input type="checkbox" value="Comerciante">Comerciante</label>
                                            </div>


                                        </div>
                                        <div class="col-lg-3 col-md-3 col-sm-3 col-xs-3">
                                            <br>
                                            <div class="checkbox">
                                                <label><input type="checkbox" value="Comerciante">Comerciante</label>
                                            </div>
                                            <div class="checkbox">
                                                <label><input type="checkbox" value="Contador">Contador</label>
                                            </div>
                                            <div class="checkbox">
                                                <label><input type="checkbox" value="Desempleado">Desempleado</label>
                                            </div>
                                            <div class="checkbox">
                                                <label><input type="checkbox" value="Electricista">Electricista</label>
                                            </div>
                                            <div class="checkbox">
                                                <label><input type="checkbox" value="Empleado">Empleado</label>
                                            </div>

                                        </div>
                                        <div class="col-lg-3 col-md-3 col-sm-3 col-xs-3">
                                            <br>
                                            <div class="checkbox">
                                                <label><input type="checkbox" value="Ingeniero">Ingeniero</label>
                                            </div>
                                            <div class="checkbox">
                                                <label><input type="checkbox" value="Mecanico">Mecánico</label>
                                            </div>
                                            <div class="checkbox">
                                                <label><input type="checkbox" value="Medico">Médico</label>
                                            </div>
                                            <div class="checkbox">
                                                <label><input type="checkbox" value="Plomero">Plomero</label>
                                            </div>
                                            <div class="checkbox">
                                                <label><input type="checkbox" value="Portero">Portero</label>
                                            </div>

                                        </div>

                                    </div>    
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-default" data-dismiss="modal">Volver</button>
                                <button type="button" class="btn btn-primary" id="applyFilterPersonas">Aplicar</button>
                            </div>
                        </div><!-- /.modal-content -->
                    </div><!-- /.modal-dialog -->
                </div><!-- /.modal -->
                <!-- Fin Modal Filtro Personas -->

                <!-- Modal Filtro Propiedades-->
                <div class="modal fade" id="modalFilterPropiedades" tabindex="-1" role="dialog">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                <h4 class="modal-title">Selecione los campos a filtrar.</h4>
                            </div>
                            <div class="modal-body" >
                                <div class="row">
                                    <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2" id="fPropiedadesTipo">
                                        Tipo
                                        <div class="checkbox">
                                            <label ><input type="checkbox" value="Casa">Casa</label>
                                        </div>
                                        <div class="checkbox">
                                            <label ><input type="checkbox" value="Depto">Depto</label>
                                        </div>
                                        <div class="checkbox">
                                            <label ><input type="checkbox" value="Local">Local</label>
                                        </div>
                                        <div class="checkbox">
                                            <label ><input type="checkbox" value="PH">PH</label>
                                        </div>
                                        <div class="checkbox">
                                            <label ><input type="checkbox" value="Terreno">Terreno</label>
                                        </div> 

                                    </div>
                                    <div class="col-lg-3 col-md-3 col-sm-3 col-xs-3" id="fPropiedadesUso">
                                        Uso
                                        <div class="checkbox">
                                            <label ><input type="checkbox" value="Comercial">Comercial</label>
                                        </div>
                                        <div class="checkbox">
                                            <label ><input type="checkbox" value="Familiar">Familiar</label>
                                        </div>
                                        <div class="checkbox">
                                            <label ><input type="checkbox" value="Indeterminado">Indeterminado</label>
                                        </div>       

                                    </div>
                                    <div class="col-lg-3 col-md-3 col-sm-3 col-xs-3">
                                        Metros cubiertos
                                        <div class="input-group-sm">
                                            <input type="number" class="form-control" placeholder="Desde..." id="fPropiedadesMtsCubiertosDesde">
                                            <input type="number" class="form-control" placeholder="Hasta..." id="fPropiedadesMtsCubiertosHasta">
                                        </div>

                                    </div>
                                    <div class="col-lg-3 col-md-3 col-sm-3 col-xs-3">
                                        Metros totales
                                        <div class="input-group-sm">
                                            <input type="number" class="form-control" placeholder="Desde..." id="fPropiedadesMtsTotalesDesde">
                                            <input type="number" class="form-control" placeholder="Hasta..." id="fPropiedadesMtsTotalesHasta">
                                        </div>

                                    </div>
                                    <div class="row">
                                        <div class="col-lg-3 col-md-3 col-sm-3 col-xs-3">
                                            <br>
                                            Deuda
                                            <div class="input-group-sm">
                                                <input type="number" class="form-control" placeholder="Mínima..." id="fPropiedadesDeudaDesde">
                                                <input type="number" class="form-control" placeholder="Máxima..." id="fPropiedadesDeudaHasta">
                                            </div>

                                        </div>
                                        <div class="col-lg-3 col-md-3 col-sm-3 col-xs-3" >
                                            <br>
                                            Servicios
                                            <div>
                                                <div class="checkbox">
                                                    <label class="checkbox-inline"><input type="checkbox" value="Agua" id="fPropiedadesCloacas">Cloacas</label>
                                                </div>
                                                <div class="checkbox">
                                                    <label class="checkbox-inline"><input type="checkbox" value="Gas" id="fPropiedadesGas">Gas</label>
                                                </div>

                                                <div class="checkbox">
                                                    <label class="checkbox-inline"><input type="checkbox" value="Luz" id="fPropiedadesLuz">Luz</label>
                                                </div>
                                                <div class="checkbox">
                                                    <label class="checkbox-inline"><input type="checkbox" value="Pavimento" id="fPropiedadesPavimento">Pavimento</label>
                                                </div>  
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-default" data-dismiss="modal">Volver</button>
                                <button type="button" class="btn btn-primary" id="applyFilterPropiedades">Aplicar</button>
                            </div>
                        </div><!-- /.modal-content -->
                    </div><!-- /.modal-dialog -->
                </div><!-- /.modal -->
                <!-- Fin Modal Filtro Propiedades -->

                <!-- Modal Filtro Lugares-->
                <div class="modal fade" id="modalFilterLugares" tabindex="-1" role="dialog">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                <h4 class="modal-title">Selecione los campos a filtrar.</h4>
                            </div>
                            <div class="modal-body" id="fLugTipo">
                                <div class="row">
                                    <div class="col-lg-3 col-md-3 col-sm-3 col-xs-3" >
                                        Tipo
                                        <div class="checkbox">
                                            <label class="checkbox-inline"><input type="checkbox" value="Asistencia">Asistencia</label>
                                        </div>
                                        <div class="checkbox">
                                            <label class="checkbox-inline"><input type="checkbox" value="Banco">Banco</label>
                                        </div>
                                        <div class="checkbox">
                                            <label class="checkbox-inline"><input type="checkbox" value="Cultura">Cultura</label>
                                        </div>
                                    </div>
                                    <div class="col-lg-3 col-md-3 col-sm-3 col-xs-3">    
                                        <br>
                                        <div class="checkbox">
                                            <label class="checkbox-inline"><input type="checkbox" value="Gobierno">Gobierno</label>
                                        </div>
                                        <div class="checkbox">
                                            <label class="checkbox-inline"><input type="checkbox" value="Hospital">Hospital</label>
                                        </div>
                                        <div class="checkbox">
                                            <label class="checkbox-inline"><input type="checkbox" value="Parque">Parques</label>
                                        </div>
                                    </div>
                                    <div class="col-lg-3 col-md-3 col-sm-3 col-xs-3">    
                                        <br>

                                        <div class="checkbox">
                                            <label class="checkbox-inline"><input type="checkbox" value="Plaza">Plazas</label>
                                        </div>
                                        <div class="checkbox">
                                            <label class="checkbox-inline"><input type="checkbox" value="Primario">Primarias</label>
                                        </div>
                                        <div class="checkbox">
                                            <label class="checkbox-inline"><input type="checkbox" value="Secundario">Secundarias</label>
                                        </div>
                                    </div>
                                    <div class="col-lg-3 col-md-3 col-sm-3 col-xs-3">    
                                        <br>
                                        <div class="checkbox">
                                            <label class="checkbox-inline"><input type="checkbox" value="Rampas">Rampas</label>
                                        </div>    
                                        <div class="checkbox">
                                            <label class="checkbox-inline"><input type="checkbox" value="Semaforo">Semaforos</label>
                                        </div>
                                        <div class="checkbox">
                                            <label class="checkbox-inline"><input type="checkbox" value="Universidad">Universidades</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-default" data-dismiss="modal">Volver</button>
                                <button type="button" class="btn btn-primary" id="applyFilterLugares">Aplicar</button>
                            </div>
                        </div><!-- /.modal-content -->
                    </div><!-- /.modal-dialog -->
                </div><!-- /.modal -->
                <!-- Fin Modal Filtro Lugares -->

                <!-- Modal Show Lugar-->
                <div class="modal fade" id="modalShowLugar" tabindex="-1" role="dialog">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                <h4 class="modal-title">Información.</h4>
                            </div>
                            <div class="modal-body">
                                <div  id="idlugar"></div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-default" data-dismiss="modal">Volver</button>
                            </div>
                        </div><!-- /.modal-content -->
                    </div><!-- /.modal-dialog -->
                </div><!-- /.modal -->
                <!-- Fin Modal Show Lugar -->

                <!-- Modal Show Propiedad-->
                <div class="modal fade" id="modalShowPropiedad" tabindex="-1" role="dialog">
                    <div class="modal-dialog modal-lg" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                <h4 class="modal-title">Información propiedad.</h4>
                            </div>
                            <div class="modal-body">
                                <div>
                                    <div class="row">
                                        <div class="col-lg-3 col-md-3 col-xs-3 col-sm-3">
                                            <img  src="images/logo.png" alt="My City" >
                                        </div>
                                        <div class="col-lg-3 col-md-3 col-xs-3 col-sm-3">
                                            <h4 id="mpDireccion">Sin datos.</h4>
                                            <h5 id="mpLocalidad">Sin datos.</h5>

                                            <br>
                                            <h5 id="mpDeuda">Sin datos.</h5>
                                        </div>
                                        <div class="col-lg-3 col-md-3 col-xs-3 col-sm-3">
                                            <h5 id="mpTipo">Sin datos.</h5>
                                            <h5 id="mpUso">Sin datos.</h5>
                                            <h5 id="mpMtsCubiertos">Sin datos.</h5>
                                            <h5 id="mpMtsTotales">Sin datos.</h5>
                                        </div>
                                        <div class="col-lg-3 col-md-3 col-xs-3 col-sm-3">
                                            <h5 id="mpCloacas">Sin datos.</h5>
                                            <h5 id="mpLuz">Sin datos.</h5>
                                            <h5 id="mpGas">Sin datos.</h5>
                                            <h5 id="mpPavimento">Sin datos.</h5>
                                        </div>
                                    </div>
                                    <hr class="style4">
                                    <div class="row">
                                        <div class="col-lg-2 col-md-2 col-xs-2 col-sm-2">
                                            <img  src="images/persona.jpg"  >

                                        </div>
                                        <div class="col-lg-2 col-md-2 col-xs-2 col-sm-2" id="verPropietario">

                                            <h4 >Propietario</h4>

                                            <h5 id="mpPropietario">Sin datos.</h5>
                                            <h5 id="mpSexoEdadProp">Sin datos.</h5>
                                        </div>
                                        <div class="col-lg-2 col-md-2 col-xs-2 col-sm-2">
                                            <img  src="images/persona.jpg"  >

                                        </div>
                                        <div class="col-lg-2 col-md-2 col-xs-2 col-sm-2" id="verResidente">

                                            <h4 >Residente</h4>

                                            <h5 id="mpResidente">Sin datos.</h5>
                                            <h5 id="mpSexoEdadRes">Sin datos.</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-default" data-dismiss="modal">Volver</button>
                            </div>
                        </div><!-- /.modal-content -->
                    </div><!-- /.modal-dialog -->
                </div><!-- /.modal -->
                <!-- Fin Modal Propiedad -->

                <!-- Modal Show Persona-->
                <div class="modal fade" id="modalShowPersona" tabindex="-1" role="dialog">
                    <div class="modal-dialog modal-lg" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                <h4 class="modal-title">Información personal.</h4>
                            </div>
                            <div class="modal-body">
                                <div>
                                    <div class="row">
                                        <div class="col-lg-3 col-md-3 col-xs-3 col-sm-3">
                                            <img  src="images/persona.jpg"  >
                                        </div>
                                        <div class="col-lg-3 col-md-3 col-xs-3 col-sm-3">
                                            <h4 id="mperNombresApellidos">Sin datos.</h4>

                                            <h5 id="mperDNI">Sin datos.</h5>
                                            <h5 id="mperSexo">Sin datos.</h5>
                                            <h5 id="mperEdad">Sin datos.</h5>
                                        </div>
                                        <div class="col-lg-3 col-md-3 col-xs-3 col-sm-3">
                                            <h5 id="mperEducacion">Sin datos.</h5>
                                            <h5 id="mperProfesion">Sin datos.</h5>
                                            <h5 id="mperTelefono">Sin datos.</h5>
                                            <h5 id="mperEmail">Sin datos.</h5>
                                            <h5 id="mperDeuda">Sin datos.</h5>
                                        </div>

                                    </div>
                                    <hr class="style4">
                                    <div class="row" id="mperPropiedades">
                                        <div class="col-lg-5 col-md-5 col-xs-5 col-sm-5">
                                            <div class="col-lg-6 col-md-6 col-xs-6 col-sm-6">
                                                <img  src="images/logoMini.png"  >

                                            </div>
                                            <div class="col-lg-6 col-md-6 col-xs-6 col-sm-6" >

                                                <h4 >Reside</h4>

                                                <h5 id="mperPartidaRes">Sin datos.</h5>
                                                <h5 id="mperDireccionRes">Sin datos.</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
                            </div>
                        </div><!-- /.modal-content -->
                    </div><!-- /.modal-dialog -->
                </div><!-- /.modal -->
                <!-- Fin Modal Persona -->
            </div>
        </div>

        <div class="modalLoain"></div>

        <script type="text/javascript" src="js/jquery-2.1.1.js"></script><!-- Jquery -->
        <script type="text/javascript" src="js/bootstrap.min.js"></script><!-- Bootstrap -->
        <script type="text/javascript" src="js/maps.js"></script><!-- Logica Maps  -->

        <script async defer
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA06_WwtQMA1pcVPG01XUD2QvZd9SjM-p4&callback=initMap"></script><!-- Maps -->


    </body>
</html>
