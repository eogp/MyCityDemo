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

        <!-- CSS -->
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
                    <div class="row content-header-puntos">
                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                            <p  class="text-header">Hay <b id="puntosFiltrados"> 0 PUNTOS </b> que coinciden con la búsqeda.</p> 
                        </div>
                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 ">
                            <button id="btnExport" class="btn-header">EXPORTAR RESULTADO</button>
                        </div>
                        
                    </div>
                </div>
                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-5 header-buscar">
                    <div class="row content-header-buscar">
                        <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 ">
                            <img src="images/lupa_header.png" width="16" height="16"  />
                        </div>
                        <div class="col-xs-10 col-sm-10 col-md-10 col-lg-10">
                            <input type="text" placeholder="Buscar sobre el resultado..." id="inputBuscar"  class="input-txt-buscar"/>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Fin Header -->
            <!-- Cuerpo -->
            <div class="row">
                <!-- Menu -->
                <div class="col-xs-2 col-sm-2 col-md-2  col-lg-2 menuIz" id="menu">
                    <p class="menuTitulos">Seleccione un período:</p>
                    <hr >
                    <!--Post puntos-->
                    <div>
                        <img src="images/fecha.png" width="32" height="32" class="iconMenuIz"/>
                        <select class="selectMes" id="meses" name="mes" onchange="traerDatos()">
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
                        <button id="filterPropiedades" class="btnFiltros" disabled="true" onclick="showFilterPropiedad()">Propiedades</button>
                    </div>
                    <div id="filPropMenu" class="dvFilMenu" ></div>
                    <hr >
                    <div>
                        <img src="images/personas.png" width="32" height="32" class="iconMenuIz"/>
                        <button id="filterPersonas" class="btnFiltros" disabled="true" onclick="showFilterPersonas()">Personas</button>
                    </div>
                    <div id="filPerMenu" class="dvFilMenu" ></div>
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

                        <button id="filterLugares" class="btnFiltros" disabled="true" onclick="showFilterLugares()">Lugares</button>
                    </div>
                    <div id="lugMenu" class="dvFilMenu" ></div>

                    <hr >
                    <div>
                        <img src="images/mapadecalor.png" width="32" height="32" class="iconMenuIz"/>
                        <button id="filterMapCalor" class="btnFiltros2" disabled="true" onclick="activarMapaCalor()">Mapa de calor</button>
                    </div>
                    <hr >
                    <div>
                        <img src="images/zonas.png" width="32" height="32" class="iconMenuIz"/>
                        <button id="filterZonas" class="btnFiltros2" disabled="true" onclick="showZonas()">Zonas</button>
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
                    <div class="modal-body" id="dvBodyModalProp">
                        <div class="row row-modal"> 
                            <div class="col-md-2">
                                <h5>Deuda:</h5>
                            </div>
                            <div class="col-md-10" id="dvDeudaProp">
                                <input type="number" class="input-text-modal" placeholder="DESDE" id="inProDeudaDesde" onfocusout="filtrarPropiedades()">
                                <input type="number" class="input-text-modal" placeholder="HASTA" id="inProDeudaHasta" onfocusout="filtrarPropiedades()">
                            </div>
                        </div>
                        <hr class="hr-modal">
                        <div class="row row-modal">
                            <div class="col-md-2">
                                <h5>Tipo:</h5>
                            </div>
                            <div class="col-md-10" id="dvPropTipo">
                                <input type="checkbox" value="CASA" id="chCasa" onclick="filtrarPropiedades()">
                                <label for="chCasa">CASA</label>
                                <input type="checkbox" value="PH" id="chPH" onclick="filtrarPropiedades()">
                                <label for="chPH">PH</label>
                                <input type="checkbox" value="EDIFICIO" id="chEdificio" onclick="filtrarPropiedades()">
                                <label for="chEdificio">EDIFICIO</label>
                                <input type="checkbox" value="CAMPO" id="chCampo" onclick="filtrarPropiedades()">
                                <label for="chCampo">CAMPO</label>
                                <input type="checkbox" value="BALDIO" id="chBaldio" onclick="filtrarPropiedades()">
                                <label for="chBaldio">BALDIO</label>
                            </div>
                        </div>
                        <hr class="hr-modal">
                        <div class="row row-modal"> 
                            <div class="col-md-2" >
                                <h5>Destino:</h5>
                            </div>
                            <div class="col-md-10" id="dvPropDestino">
                                <input type="checkbox" value="COMERCIAL" id="chComercial" onclick="filtrarPropiedades()">
                                <label for="chComercial">COMERCIAL</label>
                                <input type="checkbox" value="VIVIENDA" id="chVivienda" onclick="filtrarPropiedades()">
                                <label for="chVivienda">VIVIENDA</label>                               
                            </div>
                        </div>
                        <hr class="hr-modal">
                        <div class="row row-modal"> 
                            <div class="col-md-2">
                                <h5>Metros:</h5>
                            </div>
                            <div class="col-md-10" id="dvMtsProp">
                                <input type="number" class="input-text-modal" placeholder="DESDE" id="inProMtsDesde"  onfocusout="filtrarPropiedades()">
                                <input type="number" class="input-text-modal" placeholder="HASTA" id="inProMtsHasta"  onfocusout="filtrarPropiedades()">
                            </div>
                        </div>
                        <hr class="hr-modal">

                        <div class="row row-modal"> 
                            <div class="col-md-2">
                                <h5>Servicios:</h5>
                            </div>        
                            <div class="col-md-10" id="dvServiciosProp">
                                <select class="select-modal" id="slPavimento" onchange="filtrarPropiedades()">
                                    <option value="" selected>PAVIMENTO </option>
                                    <option value="SI">CON PAVIMENTO</option>
                                    <option value="NO">SIN PAVIMENTO</option>
                                </select>
                                <select class="select-modal" id="slLuz" onchange="filtrarPropiedades()">
                                    <option value="" selected>LUZ </option>
                                    <option value="SI">CON LUZ</option>
                                    <option value="NO">SIN LUZ</option>
                                </select>
                                <select class="select-modal" id="slGas" onchange="filtrarPropiedades()">
                                    <option value="" selected>GAS </option>
                                    <option value="SI">CON GAS</option>
                                    <option value="NO">SIN GAS</option>
                                </select>
                                <select class="select-modal" id="slAgua" onchange="filtrarPropiedades()">
                                    <option value="" selected>AGUA </option>
                                    <option value="SI">CON AGUA</option>
                                    <option value="NO">SIN AGUA</option>
                                </select>
                                <select class="select-modal" id="slCloacas" onchange="filtrarPropiedades()">
                                    <option value="" selected>CLOACAS </option>
                                    <option value="SI">CON CLOACAS</option>
                                    <option value="NO">SIN CLOACAS</option>
                                </select>

                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn-modal" onclick="clearFilterProp()">BORRAR FILTROS</button>
                        <button type="button" class="btn-modal-default" id="applyFilterPropiedades" onclick="showPropiedades()">GUARDAR FILTROS</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->
        <!-- Fin Modal Filtro Propiedades -->

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
                    <div class="modal-body" id="dvBodyModalPer">
                        <div class="row row-modal" >
                            <div class="col-md-2">
                                <h5>Rol:</h5>
                            </div>
                            <div class="col-md-10" id="dvPerRol">
                                <input name="radRol" type="radio" id="rdDueno" value="DUENO" onclick="filtrarPersonas()">
                                <label for="rdDueno">DUEÑO</label>
                                <input name="radRol" type="radio" id="rdResidente" value="RESIDENTE" onclick="filtrarPersonas()">
                                <label for="rdResidente">RESIDENTE</label>
                                <label class="danger" hidden id="alerRol" style="color: red; background-color: white;">Debe seleccionar un rol.</label>
                            </div>
                        </div>
                        <hr class="hr-modal">
                        <div class="row row-modal"> 
                            <div class="col-md-2">
                                <h5>Deuda:</h5>
                            </div>
                            <div class="col-md-10" id="dvDeudaPer">
                                <input class="input-text-modal" type="number" placeholder="DESDE" id="inPerDeudaDesde" onfocusout="filtrarPersonas()">
                                <input class="input-text-modal" type="number"  placeholder="HASTA" id="inPerDeudaHasta" onfocusout="filtrarPersonas()">
                            </div>
                        </div>
                        <hr class="hr-modal">
                        <div class="row row-modal" >
                            <div class="col-md-2">
                                <h5>Sexo:</h5>
                            </div>
                            <div class="col-md-10" id="dvPerSexo">
                                <input type="checkbox" id="chHombre" value="HOMBRE" onclick="filtrarPersonas()">
                                <label for="chHombre">HOMBRE</label>
                                <input type="checkbox" id="chFemenino" value="MUJER" onclick="filtrarPersonas()">
                                <label for="chFemenino">MUJER</label >

                            </div>
                        </div>
                        <hr class="hr-modal">
                        <div class="row row-modal">
                            <div class="col-md-2">
                                <h5>Edad:</h5>
                            </div>
                            <div class="col-md-10" id="dvEdad">
                                <input class="input-text-modal" type="number" placeholder="DESDE" id="inPerEdadDesde" onfocusout="filtrarPersonas()">
                                <input class="input-text-modal" type="number" placeholder="HASTA" id="inPerEdadHasta" onfocusout="filtrarPersonas()">
                            </div>
                        </div>
                        <hr class="hr-modal">
                        <div class="row row-modal" >
                            <div class="col-md-2">
                                <h5>Educación:</h5>
                            </div>
                            <div class="col-md-10" id="dvPerEducacion">
                                <input type="checkbox" id="chPrimario" value="PRIMARIO" onclick="filtrarPersonas()">
                                <label for="chPrimario">PRIMARIO</label>
                                <input type="checkbox" id="chSecundario" value="SECUNDARIO" onclick="filtrarPersonas()">
                                <label for="chSecundario">SECUNDARIO</label>
                                <input type="checkbox" id="chTerceario" value="TERCIARIO" onclick="filtrarPersonas()">
                                <label for="chTerceario">TERCIARIO</label>
                                <input type="checkbox" id="chUniversitario" value="UNIVERSITARIO" onclick="filtrarPersonas()">
                                <label for="chUniversitario">UNIVERSITARIO</label>
                            </div>
                        </div>
                        <hr class="hr-modal">
                        <div class="row row-modal" >
                            <div class="col-md-2" >
                                <h5>Ocupación:</h5>
                            </div>
                            <div class="col-md-10" id="dvPerOcupacion">
                                <input type="checkbox" id="chEmpleado" value="EMPLEADO" onclick="filtrarPersonas()">
                                <label for="chEmpleado">EMPLEADO</label>
                                <input type="checkbox" id="chAutonomo" value="AUTONOMO" onclick="filtrarPersonas()">
                                <label for="chAutonomo">AUTÓNOMO</label>
                                <input type="checkbox" id="chMonotributista" value="MONOTRIBUTISTA" onclick="filtrarPersonas()"> 
                                <label for="chMonotributista">MONOTRIBUTISTA</label>
                                <input type="checkbox" id="chJubilado" value="JUBILADO" onclick="filtrarPersonas()">
                                <label for="chJubilado">JUBILADO</label>
                                <input type="checkbox" id="chDesempleaado" value="DESEMPLEADO" onclick="filtrarPersonas()">
                                <label for="chDesempleaado">DESEMPLEADO</label>
                            </div>
                        </div> 
                        <hr class="hr-modal">
                        <div class="row row-modal" >
                            <div class="col-md-2">
                                <h5>Votante:</h5>
                            </div>
                            <div class="col-md-10" id="dvPErVotante">
                                <input type="checkbox" id="chVotoSi"  value="SI" onclick="checkVotoSI();filtrarPersonas()">
                                <label for="chVotoSi">SI</label>
                                <input type="checkbox" id="chVotoNo"  value="NO" onclick="checkVotoNO();filtrarPersonas()">
                                <label for="chVotoNo">NO</label>
                            </div>
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn-modal" id="clearFilterPersonas" onclick="clearFilterPer()">BORRAR FILTROS</button>
                        <button type="button" class="btn-modal-default" id="applyFilterPersonas" onclick="showPropiedades()">GUARDAR FILTROS</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->
        <!-- Fin Modal Filtro Personas -->

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
                    <div class="modal-body" id="dvBodModalLug">
                        <div class="row row-modal" id="dvLugTipo"> 
                            <br/>
                            <input type="checkbox" value="ESCUELA" id="chEscuela">
                            <label for="chEscuela"><img src="images/ESCUELA-circulo.png" width="16" height="16" style="margin-right: 5px"/>ESCUELA</label>

                            <input type="checkbox" value="OFICINA_MUNICIPAL" id="chOficinaMunicipal">
                            <label for="chOficinaMunicipal"><img src="images/OFICINA_MUNICIPAL-circulo.png" width="16" height="16" style="margin-right: 5px"/>OFICINA MUNICIPAL</label>

                            <input type="checkbox" value="HOSPITAL" id="chHospital">
                            <label for="chHospital"><img src="images/HOSPITAL-circulo.png" width="16" height="16" style="margin-right: 5px"/>HOSPITAL</label>

                            <input type="checkbox" value="POLICIA" id="chPolicia">                                
                            <label for="chPolicia"><img src="images/POLICIA-circulo.png" width="16" height="16" style="margin-right: 5px"/>POLICIA</label>
                            <br/>
                            <input type="checkbox" value="ONG" id="chONG">
                            <label for="chONG"><img src="images/ONG-circulo.png" width="16" height="16" style="margin-right: 5px"/>ONG</label>

                            <input type="checkbox" value="SEMAFOROS" id="chSemaforos">
                            <label for="chSemaforos"><img src="images/SEMAFOROS-circulo.png" width="16" height="16" style="margin-right: 5px"/>SEMAFOROS</label>

                            <input type="checkbox" value="CAMARAS" id="chCamaras">
                            <label for="chCamaras"><img src="images/CAMARAS-circulo.png" width="16" height="16" style="margin-right: 5px"/>CAMARAS</label>

                            <input type="checkbox" value="RAMPAS" id="chRampas">
                            <label for="chRampas"><img src="images/RAMPAS-circulo.png" width="16" height="16" style="margin-right: 5px"/>RAMPAS</label>

                            <input type="checkbox" value="LOMA_DE_BURRO" id="chLomaDeBurro">
                            <label for="chLomaDeBurro"><img src="images/LOMA_DE_BURRO-circulo.png" width="16" height="16" style="margin-right: 5px"/>LOMA DE BURRO</label>
                            <br/>
                            <input type="checkbox" value="ESPACIO_VERDE" id="chEspacioVerde">
                            <label for="chEspacioVerde"><img src="images/ESPACIO_VERDE-circulo.png" width="16" height="16" style="margin-right: 5px"/>ESPACIO VERDE</label>

                            <input type="checkbox" value="DEPOSITO_DE_BASURA" id="chDepositoDeBasura">
                            <label for="chDepositoDeBasura"><img src="images/DEPOSITO_DE_BASURA-circulo.png" width="16" height="16" style="margin-right: 5px"/>DEPOSITO DE BASURA</label>

                            <input type="checkbox" value="PUNTO_VERDE" id="chPuntoVerde">
                            <label for="chPuntoVerde"><img src="images/PUNTO_VERDE-circulo.png" width="16" height="16" style="margin-right: 5px"/>PUNTO VERDE</label>
                        </div>
                        <br/>
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn-modal"  onclick="clearFilterLug()">BORRAR FILTROS</button>
                        <button type="button" class="btn-modal-default" onclick="filtrarLugares()">GUARDAR FILTROS</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->
        <!-- Fin Modal Filtro Lugares -->

        <!-- Modal Show Lugar-->
        <div class="modal fade" id="modalShowLugar" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-dialog-xs" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <div class="row modal-title">
                            Información.
                        </div>
                    </div>
                    <div class="modal-body">
                        <div class="row row-modal" >
                            <div  id="dvShowLugar"></div>
                        </div>
                    </div>

                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->
        <!-- Fin Modal Show Lugar -->

        <!-- Modal Show Propiedad-->
        <div class="modal fade" id="modalShowPropiedad" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-dialog-md" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="modalTitleProp">Información propiedad.</h4>
                    </div>
                    <div class="modal-body">
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-lg-3 col-md-3 col-xs-3 col-sm-3">
                                    <img  src="images/casa.jpg" alt="My City" class="img-modal" >
                                </div>
                                <div class="col-lg-3 col-md-3 col-xs-3 col-sm-3" style="margin-top: 10px">
                                    <h4 id="mpDireccion">Sin datos.</h4>
                                    <h5 id="mpLocalidad">Sin datos.</h5>

                                    <br>
                                    <h4 id="mpDeuda">Sin datos.</h4>
                                </div>
                                <div class="col-lg-3 col-md-3 col-xs-3 col-sm-3" style="margin-top: 10px">
                                    <h5 id="mpTipo">Sin datos.</h5>
                                    <h5 id="mpUso">Sin datos.</h5>
                                    <h5 id="mpMtsCubiertos">Sin datos.</h5>
                                    <h5 id="mpMtsTotales">Sin datos.</h5>
                                </div>
                                <div class="col-lg-2 col-md-2 col-xs-2 col-sm-2" style="margin-top: 10px">
                                    <h5 id="mpCloacas">Sin datos.</h5>
                                    <h5 id="mpLuz">Sin datos.</h5>
                                    <h5 id="mpGas">Sin datos.</h5>
                                    <h5 id="mpPavimento">Sin datos.</h5>
                                </div>
                            </div>
                            <hr class="hr-modal">
                            <div class="row">
                                <div class="col-lg-2 col-md-2 col-xs-2 col-sm-2">
                                    <img  id="perfilProp" src="images/hombre.png" class="img-modal" >

                                </div>
                                <div class="col-lg-3 col-md-3 col-xs-3 col-sm-3" id="verPropietario" style="margin: 20px; margin-left: 30px"/>

                                <h4 >Propietario</h4>

                                <h5 id="mpPropietario">Sin datos.</h5>
                                <h5 id="mpSexoEdadProp">Sin datos.</h5>
                            </div>
                            <div class="col-lg-2 col-md-2 col-xs-2 col-sm-2" id="mpResidenteIMG">
                                <img  id="perfilResidente" src="images/hombre.png" class="img-modal"  >

                            </div>
                            <div class="col-lg-3 col-md-3 col-xs-3 col-sm-3" id="verResidente" style="margin: 20px; margin-left: 30px">

                                <h4 >Residente</h4>

                                <h5 id="mpResidente">Sin datos.</h5>
                                <h5 id="mpSexoEdadRes">Sin datos.</h5>
                            </div>
                        </div>
                    </div>
                </div>

            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
    <!-- Fin Modal Show Propiedad -->

    <!-- Modal Show Propiedades-->
    <div class="modal fade" id="modalShowPropiedades" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-dialog-xxs" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title">Seleccione una propiedad.</h4>
                </div>
                <div class="modal-body" >
                    <div class="container-fluid" id="dvBodyPropiedades" style=" text-align: center">

                    </div>
                </div>

            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
    <!-- Fin Modal Show Propiedades -->

    <!-- Modal Show Persona-->
    <div class="modal fade" id="modalShowPersona" tabindex="-1" role="dialog" style="overflow-y:auto">
        <div class="modal-dialog modal-dialog-md" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title">Información personal.</h4>
                </div>
                <div class="modal-body">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-lg-3 col-md-3 col-xs-3 col-sm-3">
                                <img id="imgPersona" src="images/persona.jpg" class="img-modal" >
                            </div>
                            <div class="col-lg-3 col-md-3 col-xs-3 col-sm-3">
                                <h4 id="mperNombresApellidos">Sin datos.</h4>

                                <h5 id="mperDNI">Sin datos.</h5>
                                <h5 id="mperSexo">Sin datos.</h5>
                                <h5 id="mperEdad">Sin datos.</h5>
                                <h4 id="mperDeuda">Sin datos.</h4>

                            </div>
                            <div class="col-lg-4 col-md-4 col-xs-4 col-sm-4">
                                <h5 id="mperEducacion">Sin datos.</h5>
                                <h5 id="mperProfesion">Sin datos.</h5>
                                <h5 id="mperTelefono">Sin datos.</h5>
                                <h5 id="mperEmail">Sin datos.</h5>
                            </div>

                        </div>
                        <hr class="hr-modal">
                        <div id="mperPropiedades">



                        </div>
                    </div>
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

    <!-- JS -->
    <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA11xfJHXveMLAnGquzhSuVSUDD3SHB208&callback=initMap&libraries=visualization" type="text/javascript"></script><!-- Maps -->
    <script type="text/javascript" src="js/jquery-2.1.1.js"></script><!-- Jquery -->
    <script type="text/javascript" src="js/bootstrap.min.js"></script><!-- Bootstrap -->
    <script type="text/javascript" src="js/maps.js"></script><!-- Logica Maps  -->
    <script type="text/javascript" src="js/markerclusterer/markerclusterer.js"></script><!-- MarkerClusterer -->
    <!-- OMS DESHABILITDO <script src="https://cdnjs.cloudflare.com/ajax/libs/OverlappingMarkerSpiderfier/1.0.3/oms.js"></script><!-- OverlappingMarkerSpiderfier --> 
</body>
</html>
