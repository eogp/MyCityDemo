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
        <link rel="stylesheet" href="css/main.css" type="text/css" /><!-- Style -->
        <link rel="stylesheet" href="css/maps.css" type="text/css" /><!-- Maps -->
        <link rel="stylesheet" href="css/loading.css" ><!-- Loading -->
    </head>
    <body >
        <!-- ////////// Contenedor principal ////////// -->
        <div class="container-fluid">
            <!-- Header -->
            <div class="row">
                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-2 header ">
                    <img src="images/perfil.png" class="imagenPerfil"/>
                    <select class="selectSesion">
                        <option value="Hola" disabled selected>Hola <?php
                            if (isset($_POST["usuario"])) {
                                echo $_POST["usuario"];
                            }
                            ?>  </option>
                        <option value="cerrarSesion">Cerrar sesión</option>
                    </select>
                </div>
                <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 header-puntos">

                </div>
                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-5 header-buscar">
                    <img src="images/lupa_header.png" width="16" height="16" class="icon-header-buscar"/>

                </div>
            </div>
            <!-- Fin Header -->
            <!-- Cuerpo -->
            <div class="row">
                <!-- Menu -->
                <div id="menu" class="col-xs-2 col-sm-2 col-md-2  col-lg-2 menuIz">
                    <p class="menuTitulos">Seleccione un período:</p>
                    <hr >
                    <!--Post puntos-->
                    <div>
                        <img src="images/fecha.png" width="32" height="32" class="iconMenuIz"/>
                        <select class="selectMes" id="meses" name="mes">
                            <option value="" disabled selected>Mes</option>
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
                    <!-- Fin Post Puntos -->

                    <hr >                  
                    <p class="menuTitulos">Aplicar filtros de búsqueda:</p>                    
                    <hr >
                    <!-- Filtros -->   
                    <div>
                        <img src="images/prop.png" width="32" height="32" class="iconMenuIz"/>
                        <button id="filterPropiedades" class="btnFiltros" disabled="true">Propiedades</button>
                    </div>
                    <hr >
                    <div>
                        <img src="images/personas.png" width="32" height="32" class="iconMenuIz"/>
                        <button id="filterPersonas" class="btnFiltros" disabled="true">Personas</button>
                    </div>
                    <hr >
                    <div>
                        <img src="images/event.png" width="32" height="32" class="iconMenuIz"/>
                        <button id="filterEventos" class="btnFiltros" disabled="true">Eventos</button>
                    </div>
                    <hr >
                    <p class="menuTitulos">Opciones extra:</p>
                    <hr >
                    <div>
                        <img src="images/lugares.png" width="32" height="32" class="iconMenuIz"/>

                        <button id="filterLugares" class="btnFiltros" disabled="true">Lugares</button>
                    </div>
                    <hr >
                    <div>
                        <img src="images/mapadecalor.png" width="32" height="32" class="iconMenuIz"/>
                        <button id="filterMapCalor" class="btnFiltros2" disabled="true">Mapa de calor</button>
                    </div>
                    <hr >
                    <div>
                        <img src="images/zonas.png" width="32" height="32" class="iconMenuIz"/>
                        <button id="filterZonas" class="btnFiltros2" disabled="true">Zonas</button>
                    </div>


                    <!-- Fin filtros -->                  

                </div>
                <!-- Fin Menu -->

                <!-- Mapa -->
                <div id="map" class="col-xs-10 col-sm-10 col-md-10 col-lg-10">                       
                </div>
                <!-- Fin Mapa --> 
            </div>
            <!-- Fin Cuerpo -->
        </div>
        <!-- ////////// Fin Contenedor principal ////////// -->

        <!-- ////////// Modals ////////////// -->

        <!-- Modal Filtro Personas-->
        <div class="modal fade" id="modalFilterPesonas" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-dialog-md" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <div class="row modal-title">
                            <img src="images/personas.png" width="32" height="32" class="modal-title-img"/>
                            Filtrar personas por:
                        </div>
                    </div>
                    <div class="modal-body">
                        <div class="row row-modal" id="fPerRol">
                            <div class="col-md-2">
                                <h5>Rol:</h5>
                            </div>
                            <div class="col-md-10">
                                <input type="checkbox" value="Si" id="chDueno">
                                <label for="chDueno">DUEÑO</label>
                                <input type="checkbox" value="No" id="chResidente">
                                <label for="chResidente">RESIDENTE</label>
                            </div>
                        </div>
                        <hr class="hr-modal">
                        <div class="row row-modal"> 
                            <div class="col-md-2">
                                <h5>Deuda:</h5>
                            </div>
                            <div class="col-md-10">
                                <input class="input-text-modal" type="number" placeholder="DESDE" id="fPersonasDeudaDesde">
                                <input class="input-text-modal" type="number"  placeholder="HASTA" id="fPersonasDeudaHasta">
                            </div>
                        </div>
                        <hr class="hr-modal">
                        <div class="row row-modal" id="fPersonasSexo">
                            <div class="col-md-2">
                                <h5>Sexo:</h5>
                            </div>
                            <div class="col-md-10">
                                <input type="checkbox" value="Masculino" id="chHombre">
                                <label for="chHombre">HOMBRE</label>
                                <input type="checkbox" value="Femenino" id="chFemenino">
                                <label for="chFemenino">MUJER</label>
                            </div>
                        </div>
                        <hr class="hr-modal">
                        <div class="row row-modal">
                            <div class="col-md-2">
                                <h5>Edad:</h5>
                            </div>
                            <div class="col-md-10">
                                <input class="input-text-modal" type="number" placeholder="DESDE" id="fPersonasEdadDesde">
                                <input class="input-text-modal" type="number" placeholder="HASTA" id="fPersonasEdadHasta">
                            </div>
                        </div>
                        <hr class="hr-modal">
                        <div class="row row-modal" id="fPersonasEducacion">
                            <div class="col-md-2">
                                <h5>Educación:</h5>
                            </div>
                            <div class="col-md-10">
                                <input type="checkbox" value="Primario" id="chPrimario">
                                <label for="chPrimario">PRIMARIO</label>
                                <input type="checkbox" value="Secundaria" id="chSecundario">
                                <label for="chSecundario">SECUNDARIO</label>
                                <input type="checkbox" value="Terciario" id="chTerceario">
                                <label for="chTerceario">TERCIARIO</label>
                                <input type="checkbox" value="Universitario" id="chUniversitario">
                                <label for="chUniversitario">UNIVERSITARIO</label>
                            </div>
                        </div>
                        <hr class="hr-modal">
                        <div class="row row-modal" id="fPersonasOcupacion">
                            <div class="col-md-2">
                                <h5>Ocupación:</h5>
                            </div>
                            <div class="col-md-10">
                                <input type="checkbox" value="Empleado" id="chEmpleado">
                                <label for="chEmpleado">EMPLEADO</label>
                                <input type="checkbox" value="Autonomo" id="chAutonomo">
                                <label for="chAutonomo">AUTÓNOMO</label>
                                <input type="checkbox" value="Monotributista" id="chMonotributista"> 
                                <label for="chMonotributista">MONOTRIBUTISTA</label>
                                <input type="checkbox" value="Jubilado" id="chJubilado">
                                <label for="chJubilado">JUBILADO</label>
                                <input type="checkbox" value="Desempleado" id="chDesempleaado">
                                <label for="chDesempleaado">DESEMPLEADO</label>
                            </div>
                        </div> 
                        <hr class="hr-modal">
                        <div class="row row-modal" id="fPersonasVotante">
                            <div class="col-md-2">
                                <h5>Votante:</h5>
                            </div>
                            <div class="col-md-10">
                                <input type="checkbox" value="Si" id="chVotoSi">
                                <label for="chVotoSi">SI</label>
                                <input type="checkbox" value="No" id="chVotoNo">
                                <label for="chVotoNo">NO</label>
                            </div>
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn-modal" >BORRAR FILTROS</button>
                        <button type="button" class="btn-modal-default" id="applyFilterPersonas">GUARDAR FILTROS</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->
        <!-- Fin Modal Filtro Personas -->

        <!-- Modal Filtro Propiedades-->
        <div class="modal fade" id="modalFilterPropiedades" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-dialog-sm" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <div class="row modal-title">
                            <img src="images/prop.png" width="32" height="32" class="modal-title-img"/>
                            Filtrar propiedades por:
                        </div>    
                    </div>
                    <div class="modal-body" >
                        <div class="row row-modal"> 
                            <div class="col-md-2">
                                <h5>Deuda:</h5>
                            </div>
                            <div class="col-md-10">
                                <input type="number" class="input-text-modal" placeholder="DESDE" id="fPropiedadesDeudaDesde">
                                <input type="number" class="input-text-modal" placeholder="HASTA" id="fPropiedadesDeudaHasta">
                            </div>
                        </div>
                        <hr class="hr-modal">
                        <div class="row row-modal">
                            <div class="col-md-2">
                                <h5>Tipo:</h5>
                            </div>
                            <div class="col-md-10">
                                <input type="checkbox" value="CASA" id="chCasa">
                                <label for="chCasa">CASA</label>
                                <input type="checkbox" value="PH" id="chPH">
                                <label for="chPH">PH</label>
                                <input type="checkbox" value="EDIFICIO" id="chEdificio">
                                <label for="chEdificio">EDIFICIO</label>
                                <input type="checkbox" value="CAMPO" id="chCampo">
                                <label for="chCampo">CAMPO</label>
                                <input type="checkbox" value="BALDIO" id="chBaldio">
                                <label for="chBaldio">BALDIO</label>
                            </div>
                        </div>
                        <hr class="hr-modal">
                        <div class="row row-modal"> 
                            <div class="col-md-2" id="fPropiedadesUso">
                                <h5>Destino:</h5>
                            </div>
                            <div class="col-md-10">
                                <input type="checkbox" value="COMERCIAL" id="chComercial">
                                <label for="chComercial">COMERCIAL</label>
                                <input type="checkbox" value="VIVIENDA" id="chVivienda">
                                <label for="chVivienda">VIVIENDA</label>                               
                            </div>
                        </div>
                        <hr class="hr-modal">
                        <div class="row row-modal"> 
                            <div class="col-md-2">
                                <h5>Metros:</h5>
                            </div>
                            <div class="col-md-10">
                                <input type="number" class="input-text-modal" placeholder="DESDE" id="fPropiedadesMtsDesde">
                                <input type="number" class="input-text-modal" placeholder="HASTA" id="fPropiedadesMtsHasta">
                            </div>
                        </div>
                        <hr class="hr-modal">

                        <div class="row row-modal"> 
                            <div class="col-md-2">
                                <h5>Servicios:</h5>
                            </div>        
                            <div class="col-md-10">
                                <select class="select-modal" id="slPavimento">
                                    <option value="" selected>PAVIMENTO </option>
                                    <option value="SI">SI</option>
                                    <option value="NO">NO</option>
                                </select>
                                <select class="select-modal" id="slLuz">
                                    <option value="" selected>LUZ </option>
                                    <option value="SI">SI</option>
                                    <option value="NO">NO</option>
                                </select>
                                <select class="select-modal" id="slGas">
                                    <option value="" selected>GAS </option>
                                    <option value="SI">SI</option>
                                    <option value="NO">NO</option>
                                </select>
                                <select class="select-modal" id="slAgua">
                                    <option value="" selected>AGUA </option>
                                    <option value="SI">SI</option>
                                    <option value="NO">NO</option>
                                </select>
                                <select class="select-modal" id="slCloacas">
                                    <option value="" selected>CLOACAS </option>
                                    <option value="SI">SI</option>
                                    <option value="NO">NO</option>
                                </select>

                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn-modal" >BORRAR FILTROS</button>
                        <button type="button" class="btn-modal-default" id="applyFilterPropiedades">GUARDAR FILTROS</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->
        <!-- Fin Modal Filtro Propiedades -->

        <!-- Modal Filtro Lugares-->
        <div class="modal fade" id="modalFilterLugares" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-dialog-sm" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <div class="row modal-title">
                            <img src="images/lugares.png" width="32" height="32" class="modal-title-img"/>
                            Mostrar lugares de ineterés:
                        </div> 
                    </div>
                    <div class="modal-body" id="fLugTipo">
                        <div class="row row-modal"> 
                            <br/>
                            <input type="checkbox" value="ESCUELA" id="chEscuela">
                            <label for="chEscuela"><img src="images/escuela-circulo.png" width="16" height="16" style="margin-right: 5px"/>ESCUELA</label>

                            <input type="checkbox" value="OFICINA MUNICIPAL" id="chOficinaMunicipal">
                            <label for="chOficinaMunicipal"><img src="images/municipal-circulo.png" width="16" height="16" style="margin-right: 5px"/>OFICINA MUNICIPAL</label>

                            <input type="checkbox" value="HOSPITAL" id="chHospital">
                            <label for="chHospital"><img src="images/hospital-circulo.png" width="16" height="16" style="margin-right: 5px"/>HOSPITAL</label>

                            <input type="checkbox" value="POLICIA" id="chPolicia">                                
                            <label for="chPolicia"><img src="images/policia-circulo.png" width="16" height="16" style="margin-right: 5px"/>POLICIA</label>
                            <br/>
                            <input type="checkbox" value="ONG" id="chONG">
                            <label for="chONG"><img src="images/ong-circulo.png" width="16" height="16" style="margin-right: 5px"/>ONG</label>

                            <input type="checkbox" value="SEMAFOROS" id="chSemaforos">
                            <label for="chSemaforos"><img src="images/semaforo-circulo.png" width="16" height="16" style="margin-right: 5px"/>SEMAFOROS</label>

                            <input type="checkbox" value="CAMARA" id="chCamara">
                            <label for="chCamara"><img src="images/camara-circulo.png" width="16" height="16" style="margin-right: 5px"/>CAMARA</label>

                            <input type="checkbox" value="RAMPAS" id="chRampas">
                            <label for="chRampas"><img src="images/rampa-circulo.png" width="16" height="16" style="margin-right: 5px"/>RAMPAS</label>

                            <input type="checkbox" value="LOMA_DE_BURRO" id="chLomaDeBurro">
                            <label for="chLomaDeBurro"><img src="images/loma-circulo.png" width="16" height="16" style="margin-right: 5px"/>LOMA DE BURRO</label>
                            <br/>
                            <input type="checkbox" value="ESPACIO_VERDE" id="chEspacioVerde">
                            <label for="chEspacioVerde"><img src="images/arbol-circulo.png" width="16" height="16" style="margin-right: 5px"/>ESPACIO VERDE</label>

                            <input type="checkbox" value="DEPOSITO_DE_BASURA" id="chDepositoDeBasura">
                            <label for="chDepositoDeBasura"><img src="images/basura-circulo.png" width="16" height="16" style="margin-right: 5px"/>DEPOSITO DE BASURA</label>

                            <input type="checkbox" value="PUNTO_VERDE" id="chPuntoVerde">
                            <label for="chPuntoVerde"><img src="images/verde-circulo.png" width="16" height="16" style="margin-right: 5px"/>PUNTO VERDE</label>
                        </div>
                        <br/>
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn-modal" >BORRAR FILTROS</button>
                        <button type="button" class="btn-modal-default" id="applyFilterLugares">GUARDAR FILTROS</button>
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
                        <div class="container-fluid">
                            <div  id="idlugar"></div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Volver</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->
        <!-- Fin Modal Show Lugar -->

        <!-- Modal Show Propiedades-->
        <div class="modal fade" id="modalShowLugar" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">Información.</h4>
                    </div>
                    <div class="modal-body">
                        <div class="container-fluid">
                            <div  id="idlugar"></div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Volver</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->
        <!-- Fin Modal Show Propiedades -->

        <!-- Modal Show Propiedad-->
        <div class="modal fade" id="modalShowPropiedad" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">Información propiedad.</h4>
                    </div>
                    <div class="modal-body">
                        <div class="container-fluid">
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
                            <hr >
                            <div class="row">
                                <div class="col-lg-2 col-md-2 col-xs-2 col-sm-2">
                                    <img  src="images/persona.jpg"  >

                                </div>
                                <div class="col-lg-2 col-md-2 col-xs-2 col-sm-2" id="verPropietario">

                                    <h4 >Propietario</h4>

                                    <h5 id="mpPropietario">Sin datos.</h5>
                                    <h5 id="mpSexoEdadProp">Sin datos.</h5>
                                </div>
                                <div class="col-lg-2 col-md-2 col-xs-2 col-sm-2" id="mpResidenteIMG">
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
        <!-- Fin Modal Show Propiedad -->

        <!-- Modal Show Persona-->
        <div class="modal fade" id="modalShowPersona" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">Información personal.</h4>
                    </div>
                    <div class="modal-body">
                        <div class="container-fluid">
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
                            <hr >
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
        <!-- Fin Modal Show Persona -->

        <!-- Modal Loading-->
        <div class="modalLoain">

        </div>
        <!-- Fin Modal Loading-->

        <!-- /////////// Fin Modals //////////// -->

        <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA11xfJHXveMLAnGquzhSuVSUDD3SHB208&callback=initMap" type="text/javascript"></script><!-- Maps -->
        <script type="text/javascript" src="js/jquery-2.1.1.js"></script><!-- Jquery -->
        <script type="text/javascript" src="js/bootstrap.min.js"></script><!-- Bootstrap -->
        <script type="text/javascript" src="js/maps.js"></script><!-- Logica Maps  -->
        <script type="text/javascript" src="js/markerclusterer/markerclusterer.js"></script><!-- MarkerClusterer -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/OverlappingMarkerSpiderfier/1.0.3/oms.js"></script><!-- OverlappingMarkerSpiderfier -->
    </body>
</html>
