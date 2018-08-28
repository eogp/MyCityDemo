
// global vars
var map;
var zona1;
var zona2;
var zona3;
var zona4;
var markerCluster;
var oms;
var arrayPropiedades;
var arrayPersonas;
var arrayPropietarios;
var arrayLugares;
var arrayMarkerPropiedades = [];
var arrayMarkerLugares = [];
var arrayMarkerLugaresMostrar = [];
var arrayMarkersPropiedadesMostrar = [];
var arrayPropiedadesFiltradas = [];
var heatmap;
var flagMapaCalor = false;
//LOADING AJAX------------------------------------------------------------------
$(document).on({
    ajaxStart: function () {
        $("body").addClass("loading");
    },
    ajaxStop: function () {
        $("body").removeClass("loading");
    }
});
//------------------------------------------------------------------------------

//MAPA--------------------------------------------------------------------------
function initMap() {
    //Inicio del mapa
    var inicio = {lat: -35.444434, lng: -60.885507};
    map = new google.maps.Map(document.getElementById('map'), {
        center: inicio,
        zoom: 14,
        styles: [
            {
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#f5f5f5"
                    }
                ]
            },
            {
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#616161"
                    }
                ]
            },
            {
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#f5f5f5"
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "administrative.land_parcel",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#bdbdbd"
                    }
                ]
            },
            {
                "featureType": "poi",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#eeeeee"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#757575"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#e5e5e5"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#9e9e9e"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#ffffff"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#757575"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#dadada"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#616161"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#9e9e9e"
                    }
                ]
            },
            {
                "featureType": "transit",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "transit.line",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#e5e5e5"
                    }
                ]
            },
            {
                "featureType": "transit.station",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#eeeeee"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#c9c9c9"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#9e9e9e"
                    }
                ]
            }
        ],
        disableDefaultUI: true

    });
    //activa Clusterer
    addClusterer();

    //activa Oms
    //addOms();

    //altura automatica del mapa
    heightMap();

    generarZonas();
}
//ajusta la aultura dle mapa
function heightMap() {

    console.log($(window).height());

    // set initial div height / width
    document.getElementById('map').style.height = "" + $(window).height() - 70 + "px";
    document.getElementById('menu').style.height = "" + $(window).height() - 70 + "px";
    // make sure div stays full width/height on resize
    $(window).resize(function () {
        console.log($(window).height());
        document.getElementById('map').style.height = "" + $(window).height() - 70 + "px";
        document.getElementById('menu').style.height = "" + $(window).height() - 70 + "px";
    });
}
//FIN MAPA----------------------------------------------------------------------

//PERSONAS----------------------------------------------------------------------
function filtrarPersonas() {

    if (fRolPersonaActivo()) {
        filtrarPropiedades();
        $("#alerRol").hide();
    } else {
        //CHROME ALERT ONFOCUS OUT EN LOOP

        // alert("Debe seleccionar un rol.");
        $("#alerRol").show();
    }


//    sacarMarkers(arrayMarkerPropiedades);
//    var arrayMarkersPropiedadesMostrar = []
//    arrayPersonas.forEach(function (persona) {
//        if (tieneProfesion(persona)
//                && tieneEducacion(persona)
//                && esVotante(persona)
//                && tieneSexo(persona)
//                && esPropietario(persona)
//                && tieneEdad(persona)
//                && tieneDeuda(persona)
//                )
//        {
//            //agregar marker a mostrar
//            var indicePropiedad = obtenerIndicePropiedadPor(persona.reside_propiedad);
//            arrayMarkersPropiedadesMostrar.push(arrayMarkerPropiedades[indicePropiedad]);
//        }
//    });
//    restablecerMarkersByArray(arrayMarkersPropiedadesMostrar);
//    $('#modalFilterPesonas').modal('hide');
}

function fRolPersonaActivo() {
//    if($("#rdDueno").is(":checked") ){ alert(""+$("#rdDueno").val())};
//    if($("#rdResidente").is(":checked")){ alert(""+$("#rdResidente").val())};
    return $("#rdDueno").is(":checked") || $("#rdResidente").is(":checked");
}
function fProfesionPersonaActivo() {
    var estado = false;
    $("#dvPerOcupacion").find("input").each(function () {
        estado = $(this).is(':checked') || estado;
    });
    ////console.log("Filtro Persona profesion: "+estado);
    return estado;
}
function fEducacionPersonaActivo() {
    var estado = false;
    $("#dvPerEducacion").find("input").each(function () {
        estado = $(this).is(':checked') || estado;
    });
    ////console.log("Filtro Persona profesion: "+estado);
    return estado;
}
function fVotantePersonaActivo() {
    var estado = false;
    $("#dvPErVotante").find("input").each(function () {
        estado = $(this).is(':checked') || estado;
    });
    ////console.log("Filtro Persona profesion: "+estado);
    return estado;
}
function fSexoPersonaActivo() {
    var estado = false;
    $("#dvPerSexo").find("input").each(function () {
        estado = $(this).is(':checked') || estado;
    });
    ////console.log("Filtro Persona profesion: "+estado);
    return estado;
}
function fPropietarioMinPersonaActivo() {
    return $("#fPersonasPropietarioDesde").val() != "";
}
function fPropietarioMaxPersonaActivo() {
    return $("#fPersonasPropietarioHasta").val() != "";
}
function fPropietarioMinMaxPersonaActivo() {
    return fPropietarioMinPersonaActivo() && fPropietarioMaxPersonaActivo();
}
function fEdadMinPersonaActivo() {
    return $("#inPerEdadDesde").val() != "";
}
function fEdadMaxPersonaActivo() {
    return $("#inPerEdadHasta").val() != "";
}
function fEdadMinMaxPersonaActivo() {
    return fEdadMinPersonaActivo() && fEdadMaxPersonaActivo();
}
function fDeudaMinPersonaActivo() {
    return $("#inPerDeudaDesde").val() != "";
}
function fDeudaMaxPersonaActivo() {
    return $("#inPerDeudaHasta").val() != "";
}
function fDeudaMinMaxPersonaActivo() {
    return fDeudaMinPersonaActivo() && fDeudaMaxPersonaActivo();
}
function existeFiltroPer() {
    return fRolPersonaActivo() && (fProfesionPersonaActivo() ||
            fEducacionPersonaActivo() || fVotantePersonaActivo()
            || fSexoPersonaActivo() || fEdadMinPersonaActivo()
            || fEdadMaxPersonaActivo() || fDeudaMinPersonaActivo()
            || fDeudaMaxPersonaActivo())
}

function personasPorRol(propiedad) {
    var personas = [];
    if (fRolPersonaActivo()) {
        if ($("#rdDueno").is(":checked")) {
            personas = obtenerProppietarios(propiedad.partida);

        }
        if ($("#rdResidente").is(":checked")) {
            personas = obtenerPersonasPorResidencia(propiedad.partida);

        }
    }

    return personas;
}
function tienenProfesionPer(propiedad) {
    if (fRolPersonaActivo()) {
        if (fProfesionPersonaActivo()) {
            return existeProfesion(propiedad);
        }
    }
    return true;

}
function existeProfesion(propiedad) {
    var coincide = false;
    var personas = personasPorRol(propiedad);

    personas.forEach(function (persona) {
        $("#dvPerOcupacion").find("input").each(function () {
            if ($(this).is(':checked')) {
                coincide = persona.profesion == $(this).val() || coincide;
            }
        });
    });
    return coincide;

}
function tienenEducacionPer(propiedad) {
    if (fRolPersonaActivo()) {
        if (fEducacionPersonaActivo()) {
            return existeEducacion(propiedad);
        }
    }
    return true;

}
function existeEducacion(propiedad) {
    var coincide = false;
    var personas = personasPorRol(propiedad);

    personas.forEach(function (persona) {
        $("#dvPerEducacion").find("input").each(function () {
            if ($(this).is(':checked')) {
                coincide = persona.educacion == $(this).val() || coincide;
            }
        });
    });
    return coincide;

}
function sonVotantesPer(propiedad) {
    if (fRolPersonaActivo()) {
        if (fVotantePersonaActivo()) {
            return existeVotante(propiedad);
        }
    }
    return true;
}
function existeVotante(propiedad) {
    var coincide = false;
    var personas = personasPorRol(propiedad);

    personas.forEach(function (persona) {
        $("#dvPErVotante").find("input").each(function () {
            if ($(this).is(':checked')) {
                coincide = persona.votante == $(this).val() || coincide;
            }
        });
    });
    return coincide;

}
function tienenSexoPer(propiedad) {
    if (fRolPersonaActivo()) {
        if (fSexoPersonaActivo()) {
            return existeSexoPer(propiedad);
        }
    }
    return true;
}
function existeSexoPer(propiedad) {
    var coincide = false;
    var personas = personasPorRol(propiedad);

    personas.forEach(function (persona) {
        $("#dvPerSexo").find("input").each(function () {
            if ($(this).is(':checked')) {
                coincide = persona.sexo == $(this).val() || coincide;
            }
        });
    });
    return coincide;
}
function esPropietario(persona) {
    var cantPropiedades = cantPorpiedades(persona.dni);
    if (fPropietarioMinMaxPersonaActivo()) {
        return cantPropiedades >= $("#fPersonasPropietarioDesde").val()
                && cantPropiedades <= $("#fPersonasPropietarioHasta").val();
    }
    if (fPropietarioMinPersonaActivo()) {
        return cantPropiedades >= $("#fPersonasPropietarioDesde").val();
    }
    if (fPropietarioMaxPersonaActivo()) {
        cantPropiedades <= $("#fPersonasPropietarioHasta").val();
    }
    return true;
}
function tienenEdadPer(propiedad) {
    if (fRolPersonaActivo()) {
        if (fEdadMinMaxPersonaActivo()) {
            return edadMinMaxPer(propiedad);
        }
        if (fEdadMinPersonaActivo()) {
            return edadMinPer(propiedad);

        }
        if (fEdadMaxPersonaActivo()) {
            return edadMaxPer(propiedad);

        }
    }
    return true;

}
function edadMinPer(propiedad) {
    var retorno = false;
    var personas = personasPorRol(propiedad);

    personas.forEach(function (persona) {
        var edad = Number(persona.edad);
        retorno = retorno || (edad >= $("#inPerEdadDesde").val());
    });

    return retorno;
}
function edadMaxPer(propiedad) {
    var retorno = false;
    var personas = personasPorRol(propiedad);

    personas.forEach(function (persona) {
        var edad = Number(persona.edad);
        retorno = retorno || (edad <= $("#inPerEdadHasta").val());
    });

    return retorno;
}
function edadMinMaxPer(propiedad) {
    var retorno = false;
    var personas = personasPorRol(propiedad);

    personas.forEach(function (persona) {
        var edad = Number(persona.edad);
        retorno = retorno || (edad >= $("#inPerEdadDesde").val()
                && edad <= $("#inPerEdadHasta").val());
    });

    return retorno;
}
function tienenDeudaPer(propiedad) {
    if (fRolPersonaActivo()) {
        if (fDeudaMinMaxPersonaActivo()) {
            return deudaMinMaxPer(propiedad);
        }
        if (fDeudaMinPersonaActivo()) {
            return deudaMinPer(propiedad);

        }
        if (fDeudaMaxPersonaActivo()) {
            return deudaMaxPer(propiedad);

        }
    }
    return true;
}
function deudaMinPer(propiedad) {
    var retorno = false;
    var personas = personasPorRol(propiedad);

    personas.forEach(function (persona) {
        var deuda = deudaTotal(persona.dni);
        retorno = retorno || (deuda >= $("#inPerDeudaDesde").val());
    });

    return retorno;
}
function deudaMaxPer(propiedad) {
    var retorno = false;
    var personas = personasPorRol(propiedad);

    personas.forEach(function (persona) {
        var deuda = deudaTotal(persona.dni);
        retorno = retorno || (deuda <= $("#inPerDeudaHasta").val());

    });

    return retorno;
}
function deudaMinMaxPer(propiedad) {
    var retorno = false;
    var personas = personasPorRol(propiedad);

    personas.forEach(function (persona) {
        var deuda = deudaTotal(persona.dni);
        retorno = retorno || (deuda >= $("#inPerDeudaDesde").val()
                && deuda <= $("#inPerDeudaHasta").val());
    });

    return retorno;
}
function obtenerPersonaPor(dni) {
    var retorno;
    arrayPersonas.forEach(function (persona) {
        if (persona.dni == dni) {
            retorno = persona;
        }
    });
    return retorno;
}
function cantPorpiedades(dni) {
    var contador = 0;
    arrayPropietarios.forEach(function (element) {
        if (element.dni == dni) {
            //alert(tipo+" index "+contador);
            contador++;
        }

    });
    return contador;
}
function deudaTotal(dni) {

    var deudaResult = 0;
    var arrayPartidas = partidasPorPropietario(dni);
    ////console.log("dni: " + dni);
    arrayPartidas.forEach(function (element) {
        deudaResult = deudaResult + deudaPor(element);
        //console.log(" partida: " + element + " deuda: " + deudaPor(element));
    });
    ////console.log("deuda total: " + deudaResult);
    return deudaResult;
}
function deudaPor(partida) {
    var result = 0;
    arrayPropiedades.forEach(function (element) {
        if (element.partida == partida) {
            ////console.log("partida: "+element.partida+" deuda: "+element.deuda);
            result = element.deuda;
        }
    });
    return Number(result);
}
function partidasPorPropietario(dni) {
    var arrayResult = [];
    arrayPropietarios.forEach(function (element) {
        if (element.dni == dni) {
            arrayResult.push(element.partida);
        }
    });
    return arrayResult;
}
function obtenerPartidasReside(arrayIndex) {
    var arrayResult = [];
    arrayIndex.forEach(function (element) {
        arrayResult.push(arrayPersonas[element].reside_propiedad);
    });
    return arrayResult;
}
function obtenerPersonasPorResidencia(partida) {
    var personas = [];
    arrayPersonas.forEach(function (persona) {
        if (persona.reside_propiedad == partida) {
            personas.push(persona);
            console.log("residente: " + persona.dni);

        }

    });
    return personas;
}
function obtenerProppietarios(partida) {
    var personas = [];
    arrayPropietarios.forEach(function (registro) {
        if (registro.partida == partida) {
            personas.push(obtenerPersonaPor(registro.dni));
            console.log("propietario: " + registro.dni);
        }
    });

    return personas;
}
//FIN PERSONAS------------------------------------------------------------------

//PROPIEDADES-------------------------------------------------------------------
function generarArrayMarkerPropiedades() {
    arrayPropiedades.forEach(function (element) {
        var myLatLng = {lat: Number(element.altitud), lng: Number(element.longitud)};
        //  var image = 'images/Casa.png';
        var marker = new google.maps.Marker({
            position: myLatLng,
            animation: google.maps.Animation.DROP,
            //   icon: 'images/point.png',
            title: element.tipo
        });
        // var infowindow = new google.maps.InfoWindow({
        //     content: element.tipo
        // });
        ////console.log(element);
        // marker.addListener('click', function (e) {
        //     showPropiedad(element);
        // });
        // marker.addListener('mouseover', function (e) {
        //     ////console.log("mouseover: " + this.getTitle());
        //     infowindow.open(marker.get('map'), marker);
        // });
        // marker.addListener('mouseout', function (e) {
        //     ////console.log("mouseout: " + this.getTitle());
        //     infowindow.close();
        // });
        google.maps.event.addListener(marker, 'click', function (e) {
            var indice = 0;
            var propMismaUbicacion = [];
            arrayMarkerPropiedades.forEach(function (markerProp) {
                if (marker.getPosition().lat() == markerProp.getPosition().lat()
                        && marker.getPosition().lng() == markerProp.getPosition().lng()) {
                    propMismaUbicacion.push(arrayPropiedades[indice]);
                }
                indice++;
            });
            if (propMismaUbicacion.length > 1) {
                listarPropiedades(propMismaUbicacion);
            } else {
                showPropiedad(element);
            }
        });
        arrayMarkerPropiedades.push(marker);
    });
}
//filtrar por datos modal
function filtrarPropiedades() {
    cambiarEstadoControles();

    var indice = 0;
    var contador = 0;
    arrayMarkersPropiedadesMostrar = [];
    arrayPropiedadesFiltradas = [];
    arrayPropiedades.forEach(function (propiedad) {

        if ((existeFiltroProp() || existeFiltroPer())
                && tieneDeudaProp(propiedad)
                && esTipoProp(propiedad)
                && tieneDestinoProp(propiedad)
                && tieneMtsTotProp(propiedad)
                && tieneServicios(propiedad)
                && tienenDeudaPer(propiedad)
                && tienenSexoPer(propiedad)
                && tienenEdadPer(propiedad)
                && tienenEducacionPer(propiedad)
                && tienenProfesionPer(propiedad)
                && sonVotantesPer(propiedad)
                )
        {
            //console.log("partida nº: " + propiedad.partida);
            contador++;
            //agregar marker a mostrar
            arrayMarkersPropiedadesMostrar.push(arrayMarkerPropiedades[indice]);
            arrayPropiedadesFiltradas.push(propiedad);
        }
        indice++;
    });

    verifControles();

    console.log("propiedades: " + contador);
    //deshabiliatr filtros segun resultado filtro

}

//verificacion de estado de filtros
function fTipoPropActivo() {
    var estado = false;
    $("#dvPropTipo").find("input").each(function () {

        estado = $(this).is(':checked') || estado;
    });
    //console.log("Filtro Propiedad Tipo: "+estado);
    return estado;
}
function fDestinoPropActivo() {
    var estado = false;
    $("#dvPropDestino").find("input").each(function () {
        estado = $(this).is(':checked') || estado;
    });
    return estado;
}
function fDeudaMinPropActivo() {
    return $("#inProDeudaDesde").val() != "";
}
function fDeudaMaxPropActivo() {
    return $("#inProDeudaHasta").val() != "";
}
function fDeudaMinMaxPropActivo() {
    return fDeudaMinPropActivo() && fDeudaMaxPropActivo();
}
function fMtsCubMinPropActivo() {
    return $("#fPropiedadesMtsCubiertosDesde").val() != "";
}
function fMtsCubMaxPropActivo() {
    return $("#fPropiedadesMtsCubiertosHasta").val() != "";
}
function fMtsCubMinMaxActivo() {
    return fMtsCubMinPropActivo() && fMtsCubMaxPropActivo();
}
function fMtsTotalesMinPropActivo() {
    return $("#inProMtsDesde").val() != "";
}
function fMtsTotalesMaxPropActivo() {
    return $("#inProMtsHasta").val() != "";
}
function fMtsTotalesMinMaxPropActivo() {
    return fMtsTotalesMinPropActivo() && fMtsTotalesMaxPropActivo();
}
function fServiciosActivo() {
    var estado = false;
    $("#dvServiciosProp").find('select').each(function () {
        estado = $(this).val() != "" || estado;

    });
    return estado;
}
function existeFiltroProp() {
    return fTipoPropActivo() || fDestinoPropActivo() ||
            fDeudaMinPropActivo() || fDeudaMaxPropActivo() ||
            fMtsTotalesMinPropActivo() || fMtsTotalesMaxPropActivo() ||
            fServiciosActivo();
}
//filtros 
function esTipoProp(propiedad) {
    var coincide = false;
    if (fTipoPropActivo()) {
        $("#dvPropTipo").find("input").each(function () {
            if ($(this).is(':checked')) {
                coincide = propiedad.tipo == $(this).val() || coincide;
            }
        });
        return coincide;
    }
    return true;
}
function tieneDestinoProp(propiedad) {
    var coincide = false;
    if (fDestinoPropActivo()) {
        $("#dvPropDestino").find("input").each(function () {
            if ($(this).is(':checked')) {
                coincide = propiedad.destino == $(this).val() || coincide;
            }
        });
        return coincide;
    }
    return true;
}
function tieneCloacaProp(propiedad) {
    if ($("#slCloacas").val() != "") {
        return $("#slCloacas").val() == propiedad.cloacas;
    }
    return true;
}
function tieneGasProp(propiedad) {
    if ($("#slGas").val() != "") {
        return $("#slGas").val() == propiedad.gas;
    }
    return true;
}
function tieneLuzProp(propiedad) {
    if ($("#slLuz").val() != "") {
        return $("#slLuz").val() == propiedad.luz;
    }
    return true;
}
function tienePavimentoProp(propiedad) {
    if ($("#slPavimento").val() != "") {
        return $("#slPavimento").val() == propiedad.paviemnto;
    }
    return true;
}
function tieneAguaProp(propiedad) {
    if ($("#slAgua").val() != "") {
        return $("#slAgua").val() == propiedad.agua;
    }
    return true;
}
function tieneServicios(propiedad) {
    return tienePavimentoProp(propiedad)
            && tieneLuzProp(propiedad)
            && tieneGasProp(propiedad)
            && tieneAguaProp(propiedad)
            && tieneCloacaProp(propiedad);
}
function tieneMtsCubProp(propiedad) {
    var mts = Number(propiedad.mts_cubiertos);
    if (fMtsCubMinMaxActivo()) {
        return mts >= $("#fPropiedadesMtsCubiertosDesde").val() &&
                mts <= $("#fPropiedadesMtsCubiertosHasta").val();
    }
    if (fMtsCubMinPropActivo()) {
        return mts >= $("#fPropiedadesMtsCubiertosDesde").val();
    }
    if (fMtsCubMaxPropActivo()) {
        return mts <= $("#fPropiedadesMtsCubiertosHasta").val();
    }
    return true;
}
function tieneMtsTotProp(propiedad) {
    var mts = Number(propiedad.mts_totales);
    if (fMtsTotalesMinMaxPropActivo()) {
        return mts >= $("#inProMtsDesde").val() &&
                mts <= $("#inProMtsHasta").val();
    }
    if (fMtsTotalesMinPropActivo()) {
        return mts >= $("#inProMtsDesde").val();
    }
    if (fMtsTotalesMaxPropActivo()) {
        return mts <= $("#inProMtsHasta").val();
    }
    return true;
}
function tieneDeudaProp(propiedad) {
    var deuda = Number(propiedad.deuda);
    if (fDeudaMinMaxPropActivo()) {
//console.log("filtro deudaMinMax activo");
        return deuda >= $("#inProDeudaDesde").val() && deuda <= $("#inProDeudaHasta").val();
    }
    if (fDeudaMinPropActivo()) {
//console.log("filtro deudaMin activo");
        return deuda >= $("#inProDeudaDesde").val();
    }
    if (fDeudaMaxPropActivo()) {
//console.log("filtro deudaMax activo");
        return deuda <= $("#inProDeudaHasta").val();
    }
    return true;
}

//extras
function obtenerIndicesPropiedadesPor(partidas) {
    var contador = 0;
    var arrayResult = [];
    partidas.forEach(function (element) {
        arrayResult.push(obtenerIndicePropiedadPor(element));
    });
    return arrayResult;
}
function obtenerIndicePropiedadPor(partida) {
    var contador = 0;
    var indice;
    arrayPropiedades.forEach(function (propiedad) {
        if (propiedad.partida == partida) {
            //alert(tipo+" index "+contador);
            indice = contador;
        }
        contador++;
    });
    return indice;
}
function obetnerPropiedadPor(partida) {
    var retorno;
    arrayPropiedades.forEach(function (propiedad) {
        if (propiedad.partida == partida) {
            //alert(tipo+" index "+contador);
            retorno = propiedad;
        }

    });
    return retorno;
}
//FIN PROPIEDADES---------------------------------------------------------------

//LUGARES-----------------------------------------------------------------------
function generarArrayMarkerLugares() {
    arrayLugares.forEach(function (element) {
        var myLatLng = {lat: Number(element.altitud), lng: Number(element.longitud)};
        var marker = new google.maps.Marker({
            position: myLatLng,
            animation: google.maps.Animation.DROP,
            icon: 'images/' + element.tipo + '-circulo.png',
            title: element.tipo
        });
        // var infowindow = new google.maps.InfoWindow({
        //     content: element.tipo
        // });
        ////console.log(element);
        // marker.addListener('click', function (e) {
        //     showLugar(element);
        // });
        // marker.addListener('mouseover', function (e) {
        //     ////console.log("mouseover: " + this.getTitle());
        //     infowindow.open(marker.get('map'), marker);
        // });
        // marker.addListener('mouseout', function (e) {
        //     ////console.log("mouseout: " + this.getTitle());
        //     infowindow.close();
        // });
        google.maps.event.addListener(marker, 'click', function (e) {
            showLugar(element);
        });
        arrayMarkerLugares.push(marker);
    });
}
function filtrarLugares() {
    var arrayIndexDejar = [];
    $('#dvLugTipo').find("input").each(function () {
        if ($(this).is(':checked')) {
            obtenerIndicesLugares($(this).val(), arrayIndexDejar);
        }
    });
    restablecerMarkersByIndex(arrayIndexDejar, arrayMarkerLugares);

    borrarMapaCalor();
    sacarMarkers(arrayMarkerLugares);
    if (flagMapaCalor) {
        showMapaCalor();
    } else {
        //agrega los markers al cluster y al mapa
        cargarMarkers(arrayMarkerLugaresMostrar);
    }
    showLugaresMenu();

    $('#modalFilterLugares').modal('hide');
}
function obtenerIndicesLugares(tipo, arrayIndex) {
    var contador = 0;
    arrayLugares.forEach(function (element) {
        if (element.tipo == tipo) {
            //alert(tipo+" index "+contador);
            arrayIndex.push(contador);
        }
        contador++;
    });
}
//FIN LUGARES-------------------------------------------------------------------

//VISTAS------------------------------------------------------------------------
//visualiza los marker
function clearFilterLug() {
    $("#lugMenu").empty();
    $("#dvBodModalLug").find('input').each(function () {
        if ($(this).is(':checked')) {
            $(this).prop('checked', false);
        }
    });

    filtrarLugares();
}
function clearFilterPer() {
    $("#filPerMenu").empty();
    $("#dvBodyModalPer").find('input[type="radio"]').each(function () {
        if ($(this).is(':checked')) {
            $(this).prop('checked', false);
        }
    });
    $("#dvBodyModalPer").find('input[type="checkbox"]').each(function () {
        if ($(this).is(':checked')) {
            $(this).prop('checked', false);
        }
    });
    $("#dvBodyModalPer").find('input[type="number"]').each(function () {

        $(this).val("");

    });
    $("#dvBodyModalPer").find('select').each(function () {

        $(this).val("");

    });
    filtrarPropiedades();
}
function clearFilterProp() {
    $("#filPropMenu").empty();
    $("#dvBodyModalProp").find('input[type="checkbox"]').each(function () {
        if ($(this).is(':checked')) {
            $(this).prop('checked', false);
        }
    });
    $("#dvBodyModalProp").find('input[type="number"]').each(function () {

        $(this).val("");

    });
    $("#dvBodyModalProp").find('select').each(function () {

        $(this).val("");

    });
    filtrarPropiedades();
}
function showLugaresMenu() {
    $("#lugMenu").empty();

    var imgLug = [];
    $("#dvLugTipo").find('input[type="checkbox"]').each(function () {
        if ($(this).is(':checked')) {
            var filtro = $(this);
            var img = document.createElement('Img');
            $(img).attr('src', 'images/' + $(this).val() + '-circulo.png');
            $(img).css({"padding": "0px", "margin": "3px", "margin-top": "0px",
                "width": "16px", "height": "16px", cursor: "pointer"});
            img.addEventListener("click", function () {
                $(filtro).prop('checked', false);
                $(this).remove();
                filtrarLugares();
            });
            imgLug.push(img);
        }
    });
    imgLug.forEach(function (imgL) {
        $("#lugMenu").append(imgL);
    });

}
function showPropiedades() {
    sacarMarkers(arrayMarkerPropiedades);
    borrarMapaCalor();
    if (flagMapaCalor) {
        showMapaCalor();
    } else {
        addIconMarkers(arrayMarkersPropiedadesMostrar);
        restablecerMarkersByArray(arrayMarkersPropiedadesMostrar);
    }
    showFilterMenu();

    $('#modalFilterPropiedades').modal('hide');
    $('#modalFilterPesonas').modal('hide');
}
function showFilterMenu() {
    $("#filPropMenu").empty();
    $("#filPerMenu").empty();

    var labelsProp = [];
    var labelsPer = [];

    //PROP
    $("#dvBodyModalProp").find('input[type="checkbox"]').each(function () {
        if ($(this).is(':checked')) {
            labelsProp.push(agergarFiltro($(this), "checkbox"));
        }
    });
    $("#dvDeudaProp").find('input[type="number"]').each(function () {
        if ($(this).val() != "") {
            labelsProp.push(agergarFiltro($(this), "dvDeudaProp"));
        }
    });
    $("#dvMtsProp").find('input[type="number"]').each(function () {
        if ($(this).val() != "") {
            labelsProp.push(agergarFiltro($(this), "dvMtsProp"));
        }
    });

    if ($("#slCloacas").val() != "") {
        labelsProp.push(agergarFiltro($("#slCloacas"), "slCloacas"));
    }
    if ($("#slAgua").val() != "") {
        labelsProp.push(agergarFiltro($("#slAgua"), "slAgua"));
    }
    if ($("#slGas").val() != "") {
        labelsProp.push(agergarFiltro($("#slGas"), "slGas"));
    }
    if ($("#slLuz").val() != "") {
        labelsProp.push(agergarFiltro($("#slLuz"), "slLuz"));
    }
    if ($("#slPavimento").val() != "") {
        labelsProp.push(agergarFiltro($("#slPavimento"), "slPavimento"));
    }


    labelsProp.forEach(function (label) {
        $("#filPropMenu").append(label);
    });

    //PER
    if (fRolPersonaActivo()) {
        $("#dvPerRol").find('input[type="radio"]').each(function () {
            if ($(this).is(':checked')) {
                labelsPer.push(agergarFiltro($(this), "rol"));
            }
        });
        $("#dvPerSexo").find('input[type="checkbox"]').each(function () {
            if ($(this).is(':checked')) {
                labelsPer.push(agergarFiltro($(this), "checkbox"));
            }
        });
        $("#dvPerEducacion").find('input[type="checkbox"]').each(function () {
            if ($(this).is(':checked')) {
                labelsPer.push(agergarFiltro($(this), "checkbox"));
            }
        });
        $("#dvPerOcupacion").find('input[type="checkbox"]').each(function () {
            if ($(this).is(':checked')) {
                labelsPer.push(agergarFiltro($(this), "checkbox"));
            }
        });
        $("#dvPErVotante").find('input[type="checkbox"]').each(function () {
            if ($(this).is(':checked')) {
                labelsPer.push(agergarFiltro($(this), "votante"));
            }
        });
        $("#dvEdad").find('input[type="number"]').each(function () {
            if ($(this).val() != "") {
                labelsPer.push(agergarFiltro($(this), "dvEdad"));
            }
        });
        $("#dvDeudaPer").find('input[type="number"]').each(function () {
            if ($(this).val() != "") {
                labelsPer.push(agergarFiltro($(this), "dvDeudaPer"));
            }
        });

        labelsPer.forEach(function (label) {
            $("#filPerMenu").append(label);
        });
    }
}
function agergarFiltro(filtro, tipo) {
    var label = document.createElement('Label');
    $(label).css({"margin": "3px"});
    switch (tipo) {
        case "checkbox":
            $(label).html("<small><i>" + $(filtro).val() + "</i></small> <strong>X</strong>");
            $(label).css({"background-color": "#ffcc66"});
            label.addEventListener("click", function () {
                sacarFiltro(this, filtro, tipo);
            });
            break;
        case "dvDeudaProp":
            $(label).html("<small><i> DEUDA: " + $(filtro).attr("placeholder") + " $" + filtro.val() + " </i></small> <strong>X</strong>");
            $(label).css({"background-color": "#ffcc66"});
            label.addEventListener("click", function () {
                sacarFiltro(this, filtro, "number");
            });
            break;
        case "dvMtsProp":
            $(label).html("<small><i> " + $(filtro).attr("placeholder") + " " + filtro.val() + " MTS.</i></small> <strong>X</strong>");
            $(label).css({"background-color": "#ffcc66"});
            label.addEventListener("click", function () {
                sacarFiltro(this, filtro, "number");
            });
            break;
        case "slCloacas":
            if (filtro.val() == "SI")
            {
                $(label).css({"background-color": "#66cc99"});
            }
            if (filtro.val() == "NO")
            {
                $(label).css({"background-color": "#ff6666"});
            }
            $(label).html("<small><i> CLOACAS </i></small> <strong>X</strong>");
            label.addEventListener("click", function () {
                sacarFiltro(this, filtro, "sl");
            });
            break;
        case "slAgua":
            if (filtro.val() == "SI")
            {
                $(label).css({"background-color": "#66cc99"});
            }
            if (filtro.val() == "NO")
            {
                $(label).css({"background-color": "#ff6666"});
            }
            $(label).html("<small><i> AGUA </i></small> <strong>X</strong>");
            label.addEventListener("click", function () {
                sacarFiltro(this, filtro, "sl");
            });
            break;
        case "slGas":
            if (filtro.val() == "SI")
            {
                $(label).css({"background-color": "#66cc99"});
            }
            if (filtro.val() == "NO")
            {
                $(label).css({"background-color": "#ff6666"});
            }
            $(label).html("<small><i> GAS </i></small> <strong>X</strong>");
            label.addEventListener("click", function () {
                sacarFiltro(this, filtro, "sl");
            });
            break;
        case "slLuz":
            if (filtro.val() == "SI")
            {
                $(label).css({"background-color": "#66cc99"});
            }
            if (filtro.val() == "NO")
            {
                $(label).css({"background-color": "#ff6666"});
            }
            $(label).html("<small><i> LUZ </i></small> <strong>X</strong>");
            label.addEventListener("click", function () {
                sacarFiltro(this, filtro, "sl");
            });
            break;
        case "slPavimento":
            if (filtro.val() == "SI")
            {
                $(label).css({"background-color": "#66cc99"});
            }
            if (filtro.val() == "NO")
            {
                $(label).css({"background-color": "#ff6666"});
            }
            $(label).html("<small><i> PAVIMENTO </i></small> <strong>X</strong>");
            label.addEventListener("click", function () {
                sacarFiltro(this, filtro, "sl");
            });
            break;
        case "votante":
            if (filtro.val() == "SI")
            {
                $(label).css({"background-color": "#66cc99"});
            }
            if (filtro.val() == "NO")
            {
                $(label).css({"background-color": "#ff6666"});
            }
            $(label).html("<small><i> VOTANTE </i></small> <strong>X</strong>");
            label.addEventListener("click", function () {
                sacarFiltro(this, filtro, "checkbox");
            });
            break;
        case "dvEdad":
            $(label).html("<small><i> " + $(filtro).attr("placeholder") + " " + filtro.val() + " AÑOS.</i></small> <strong>X</strong>");
            $(label).css({"background-color": "#ffcc66"});
            label.addEventListener("click", function () {
                sacarFiltro(this, filtro, "number");
            });
            break;
        case "dvDeudaPer":
            $(label).html("<small><i> DEUDA: " + $(filtro).attr("placeholder") + " $" + filtro.val() + " AÑOS.</i></small> <strong>X</strong>");
            $(label).css({"background-color": "#ffcc66"});
            label.addEventListener("click", function () {
                sacarFiltro(this, filtro, "number");
            });
            break;
        case "rol":
            $(label).html("<small><i>" + filtro.val() + "</i></small> <strong>X</strong>");
            $(label).css({"background-color": "#ff6666"});
            label.addEventListener("click", function () {
                clearFilterPer();
                showPropiedades();
            });
            break;

    }
    return label;

}
function sacarFiltro(element, filtro, tipo) {
    switch (tipo) {
        case "checkbox":
            $(filtro).prop('checked', false);
            $(element).remove();
            break;

        case "number":
            $(filtro).val("");
            $(element).remove();
            break;

        case "sl":
            $(filtro).val("");
            $(element).remove();
            break;
    }

    filtrarPropiedades();
    showPropiedades();


}
function generarZonas() {
    var zona1Coords = [
        {lat: -35.443109, lng: -60.893373},
        {lat: -35.451799, lng: -60.886630},
        {lat: -35.446291, lng: -60.875880},
        {lat: -35.437533, lng: -60.882610},
        {lat: -35.443109, lng: -60.893373}
    ];

    zona1 = new google.maps.Polygon({
        paths: zona1Coords,
        strokeColor: '#FF0000',
        strokeOpacity: 0,
        strokeWeight: 0,
        fillColor: '#FF0000',
        fillOpacity: 0.05
    });

    var zona2Coords = [
        {lat: -35.458473, lng: -60.923014},
        {lat: -35.437113, lng: -60.939450},
        {lat: -35.418571, lng: -60.904034},
        {lat: -35.440093, lng: -60.887495},
        {lat: -35.458473, lng: -60.923014}
    ];

    // Construct the polygon.
    zona2 = new google.maps.Polygon({
        paths: zona2Coords,
        strokeColor: 'green',
        strokeOpacity: 0,
        strokeWeight: 0,
        fillColor: 'green',
        fillOpacity: 0.05
    });

    var zona3Coords = [
        {lat: -35.458473, lng: -60.923014},
        {lat: -35.492387, lng: -60.896569},
        {lat: -35.459747, lng: -60.835511},
        {lat: -35.434374, lng: -60.852848},
        {lat: -35.451799, lng: -60.886630},
        {lat: -35.443109, lng: -60.893373},
        {lat: -35.458473, lng: -60.923014}
    ];

    // Construct the polygon.
    zona3 = new google.maps.Polygon({
        paths: zona3Coords,
        strokeColor: 'blue',
        strokeOpacity: 0,
        strokeWeight: 0,
        fillColor: 'blue',
        fillOpacity: 0.05
    });

    var zona4Coords = [
        {lat: -35.410565, lng: -60.877167},
        {lat: -35.418728, lng: -60.904000},
        {lat: -35.440063, lng: -60.887521},
        {lat: -35.437496, lng: -60.882559},
        {lat: -35.446258, lng: -60.875859},
        {lat: -35.434454, lng: -60.852901},
        {lat: -35.410565, lng: -60.877167}
    ];

    // Construct the polygon.
    zona4 = new google.maps.Polygon({
        paths: zona4Coords,
        strokeColor: 'yellow',
        strokeOpacity: 0,
        strokeWeight: 0,
        fillColor: 'yellow',
        fillOpacity: 0.05
    });
}
//modales
function showFilterPropiedad() {
    $('#modalFilterPropiedades').modal('show');
}
function showFilterPersonas() {
    $('#modalFilterPesonas').modal('show');
}
function showFilterLugares() {
    $('#modalFilterLugares').modal('show');
}
function agregarPropidadModal(propiedad, relacion) {
    var divPropiedades = $('#mperPropiedades');
    var div = document.createElement("div");
    var divImg = document.createElement("div");
    var img = document.createElement("img");
    var divTexto = document.createElement("div");
    var h4 = document.createElement("h4");
    var h5Partida = document.createElement("h5");
    var h5Direccion = document.createElement("h5");
    img.src = "images/casa.jpg";
    img.className = "img-modal";
    h4.textContent = relacion;
    h5Partida.textContent = "Partida " + propiedad.partida;
    h5Direccion.textContent = propiedad.calle + ' ' + propiedad.altura + ', ' + propiedad.partido;
    div.className = "row";
    divImg.className = "col-lg-3 col-md-3 col-xs-3 col-sm-3";
    divTexto.className = "col-lg-6 col-md-6 col-xs-6 col-sm-6";
    divImg.append(img);
    //divPropiedades.append(divImg);
    divTexto.append(h4);
    divTexto.append(h5Partida);
    divTexto.append(h5Direccion);
    div.append(divImg);
    div.append(divTexto);
    divPropiedades.append(div);

}
function showPropiedad(element) {
    $('#modalTitleProp').text('Información  partida: ' + element.partida);
    $('#mpDireccion').text(element.calle + ' ' + element.altura);
    $('#mpLocalidad').text(element.partido);
    if (Number(element.deuda) > 0) {
        $('#mpDeuda').css("color", "#ff6666");
    } else {
        $('#mpDeuda').css("color", "#66cc99");
    }
    $('#mpDeuda').text('Deuda: ' + element.deuda);
    $('#mpTipo').text('Tipo: ' + element.tipo);
    $('#mpUso').text('Destino: ' + element.destino);
    $('#mpMtsCubiertos').text('Mts cubiertos: ' + element.mts_cubiertos);
    $('#mpMtsTotales').text('Mts totales: ' + element.mts_totales);
    $('#mpCloacas').text('Cloacas: ' + element.cloacas);
    $('#mpLuz').text('Luz: ' + element.luz);
    $('#mpGas').text('Gas: ' + element.gas);
    $('#mpPavimento').text('Pavimento: ' + element.paviemnto);
    //----------------------------------------------------------------------

    var indicePropietario = obtenerIndicePropiedadPor(element.partida);
    ////console.log("indice propietario: " + indicePropietario);
    var dniPropietario = arrayPropietarios[indicePropietario].dni;
    ////console.log("dni propietario: " + dniPropietario);
    var propietario = obtenerPersonaPor(dniPropietario);
    ////console.log("dni propietario: " + propietario.dni);
    if (propietario.sexo == "MUJER") {
        $('#perfilProp').attr("src", "images/mujer.png");
    } else {
        $('#perfilProp').attr("src", "images/hombre.png");
    }
    $('#mpPropietario').text(propietario.nombres + ' ' + propietario.apellidos);
    $('#mpSexoEdadProp').text(propietario.sexo + ', ' + propietario.edad + ' años');
//    var indicePropietario = obtenerIndicePropiedadPor(element.partida);
//    ////console.log("indice propietario: " + indicePropietario);
//    var dniPropietario = arrayPropietarios[indicePropietario].dni;
//    ////console.log("dni propietario: " + dniPropietario);
//    var propietario = obtenerPersonaPor(dniPropietario);
//    ////console.log("dni propietario: " + propietario.dni);

    var personasResidente = obtenerPersonasPorResidencia(element.partida);
    ////console.log("dni residente: " + personaResidente.dni);
    if (personasResidente.length > 0) {
        personasResidente.forEach(function (personaResidente) {
            if (personaResidente.sexo == "MUJER") {
                $('#perfilResidente').attr("src", "images/mujer.png");
            } else {
                $('#perfilResidente').attr("src", "images/hombre.png");
            }
            $('#verResidente').show();
            $('#mpResidenteIMG').show();
            $('#mpResidente').text(personaResidente.nombres + ' ' + personaResidente.apellidos);
            $('#mpSexoEdadRes').text(personaResidente.sexo + ', ' + personaResidente.edad + ' años');
            document.getElementById('verResidente').addEventListener('click', function () {
                $('#modalShowPropiedad').modal('hide');
                showPersona(personaResidente);
            });
            document.getElementById('perfilResidente').addEventListener('click', function () {
                $('#modalShowPropiedad').modal('hide');
                showPersona(personaResidente);
            });
        });

    } else {
        $('#verResidente').hide();
        $('#mpResidenteIMG').hide();
    }
    document.getElementById('verPropietario').addEventListener('click', function () {
        $('#modalShowPropiedad').modal('hide');
        showPersona(propietario);
    });
    document.getElementById('perfilProp').addEventListener('click', function () {
        $('#modalShowPropiedad').modal('hide');
        showPersona(propietario);
    });

    $('#modalShowPropiedad').modal('show');
}
function listarPropiedades(elements) {
    $("#dvBodyPropiedades").empty();
    elements.forEach(function (element) {
        var div = document.createElement("div");
        div.setAttribute("class", "row");
        div.setAttribute("class", "item-modal-propiedades");
        div.innerHTML = "<img src='images/prop.png'/> - Partida nº " + element.partida + "";
        div.addEventListener('click', function () {
            $('#modalShowPropiedades').modal('hide');
            showPropiedad(element);
        });
        $("#dvBodyPropiedades").append(div);

    });
    $("#modalShowPropiedades").modal('show');
}

function activarMapaCalor() {
    flagMapaCalor = !flagMapaCalor;
    showPropiedades();
    filtrarLugares();
}
function showMapaCalor() {
    var heatmapData = [];
    arrayMarkerLugaresMostrar.forEach(function (elemnt) {
        var lat = elemnt.getPosition().lat();
        var lng = elemnt.getPosition().lng();
        heatmapData.push(new google.maps.LatLng(lat, lng));
    });
    arrayMarkersPropiedadesMostrar.forEach(function (elemnt) {
        var lat = elemnt.getPosition().lat();
        var lng = elemnt.getPosition().lng();
        heatmapData.push(new google.maps.LatLng(lat, lng));
    });
    heatmap = new google.maps.visualization.HeatmapLayer({
        data: heatmapData
    });

    heatmap.setMap(map);
}
function borrarMapaCalor() {
    if (heatmap != null) {
        heatmap.setData([]);
        heatmap.setMap(null);
        heatmap=null;
    }
}
function showZonas() {
    if (zona1.getMap() == null) {
        zona1.setMap(map);
        zona2.setMap(map);
        zona3.setMap(map);
        zona4.setMap(map);
    } else {
        zona1.setMap(null);
        zona2.setMap(null);
        zona3.setMap(null);
        zona4.setMap(null);
    }

    console.log("zonas activas ");

}
function showLugar(element) {
    $('#dvShowLugar').html('<br>'
            + '<img  class="center-block" src="images/' + element.tipo + '-circulo.png">'
            + '<br>'
            + '<p class="text-center">' + element.descripcion + '</p>');
    $('#modalShowLugar').modal('show');
}
function showPersona(persona) {
    var divPropiedades = $('#mperPropiedades');
    divPropiedades.empty();
    if (persona.sexo == "MUJER") {
        $('#imgPersona').attr("src", "images/mujer.png");
    } else {
        $('#imgPersona').attr("src", "images/hombre.png");
    }
    $('#mperNombresApellidos').text(persona.nombres + ' ' + persona.apellidos);
    $('#mperDNI').text("DNI: " + persona.dni);
    $('#mperSexo').text("Sexo: " + persona.sexo);
    $('#mperEdad').text("Edad: " + persona.edad);
    $('#mperEducacion').text("Educación: " + persona.educacion);
    $('#mperProfesion').text("Profesión: " + persona.profesion);
    $('#mperTelefono').text("Teléfono: " + persona.telefono);
    $('#mperEmail').text("Email: " + persona.email);

    var deudatotal = deudaTotal(persona.dni);
    if (Number(deudatotal) > 0) {
        $('#mperDeuda').css("color", "#ff6666");
    } else {
        $('#mperDeuda').css("color", "#66cc99");
    }
    $('#mperDeuda').text("Deuda: " + deudatotal);

    var propiedadReside = obetnerPropiedadPor(persona.reside_propiedad);
    agregarPropidadModal(propiedadReside, "Reside");

    var divPropiedades = $('#mperPropiedades');
    var linea = document.createElement("hr");
    linea.className = "hr-modal";

    var arrayPartidas = partidasPorPropietario(persona.dni);
    arrayPartidas.forEach(function (partida) {
        divPropiedades.append(linea);
        agregarPropidadModal(obetnerPropiedadPor(partida), "Propietario");
    });
    $('#modalShowPersona').modal('show');
}
//cambia controles segun estado
function verifControles() {
    verifInputPropDesde($("#inProDeudaDesde"), "Number(propiedad.deuda)");
    verifInputPropHasta($("#inProDeudaHasta"), "Number(propiedad.deuda)");
    verifInputPropDesde($("#inProMtsDesde"), "Number(propiedad.mts_totales)");
    verifInputPropHasta($("#inProMtsHasta"), "Number(propiedad.mts_totales)");
    verifInputPerDesde($("#inPerDeudaDesde"), "deudaTotal(persona.dni)");
    verifInputPerHasta($("#inPerDeudaHasta"), "deudaTotal(persona.dni)");
    verifInputPerDesde($("#inPerEdadDesde"), "persona.edad");
    verifInputPerHasta($("#inPerEdadHasta"), "persona.edad");
}
function verifInputPropDesde(input, atributo) {
    var existe = false;
    if (input.val() != "") {
        arrayPropiedadesFiltradas.forEach(function (propiedad) {
            existe = existe || (eval(atributo) >= input.val());
        });
        if (!existe) {
            input.css({"background-color": "coral"});
        }
    }

}
function verifInputPropHasta(input, atributo) {
    var existe = false;
    if (input.val() != "") {
        arrayPropiedadesFiltradas.forEach(function (propiedad) {
            existe = existe || (eval(atributo) <= input.val());
        });
        if (!existe) {
            input.css({"background-color": "coral"});
        }
    }

}
function verifInputPerDesde(input, atributo) {
    var existe = false;
    if (input.val() != "") {
        arrayPropiedadesFiltradas.forEach(function (propiedad) {
            var personas = personasPorRol(propiedad);
            personas.forEach(function (persona) {
                existe = existe || (eval(atributo) >= input.val());

            });
        });
        if (!existe) {
            input.css({"background-color": "coral"});
        }
    }
}
function verifInputPerHasta(input, atributo) {
    var existe = false;
    if (input.val() != "") {
        arrayPropiedadesFiltradas.forEach(function (propiedad) {
            var personas = personasPorRol(propiedad);
            personas.forEach(function (persona) {
                existe = existe || (eval(atributo) <= input.val());

            });
        });
        if (!existe) {
            input.css({"background-color": "coral"});
        }
    }
}
function cambiarEstadoControles() {
    colorSelect();
    colorInputNumber();
}
function checkVotoNO() {
    $("#chVotoSi").prop('checked', false);
}
function checkVotoSI() {
    $("#chVotoNo").prop('checked', false);
}
function colorSelect() {

    $("#dvBodyModalProp").find("select").each(function () {
        switch ($(this).val()) {
            case "":
                $(this).css({"background-color": "#cccccc"});
                break;
            case "SI":
                $(this).css({"background-color": "#66cc99"});
                break;
            case "NO":
                $(this).css({"background-color": "#ff6666"});
                break;
        }
    });
}
function colorInputNumber() {

    $("#dvBodyModalProp").find('input[type="number"]').each(function () {
        if ($(this).val() == "" || $(this).val() == 0) {

            $(this).css({"background-color": "#cccccc"});
        } else {
            $(this).css({"background-color": "#ffcc66"});
        }
    });
    $("#dvBodyModalPer").find('input[type="number"]').each(function () {
        if ($(this).val() == "" || $(this).val() == 0) {

            $(this).css({"background-color": "#cccccc"});
        } else {
            $(this).css({"background-color": "#ffcc66"});
        }
    });
}
// FIN VISTAS-------------------------------------------------------------------

//MARKERS-----------------------------------------------------------------------
function compLatLogMarker(arrayMarker, marker) {
    var cont = 0;
    arrayMarker.forEach(function (markerProp) {
        if (marker.getPosition().lat() == markerProp.getPosition().lat() &&
                marker.getPosition().lng() == markerProp.getPosition().lng())
        {
            cont++;
        }

    });
    return cont;
}
function addIconMarkers(arrayMarkersProp) {
    arrayMarkersProp.forEach(function (markerProp) {
        var cantidad = compLatLogMarker(arrayMarkersProp, markerProp)
        if (cantidad > 1) {
            markerProp.setIcon('images/punto-multi.png');
            markerProp.setLabel({
                text: cantidad.toString(),
                color: 'white'
            });
        } else {
            markerProp.setIcon("images/punto-uni.png");
        }
    });
}
function restablecerMarkersByArray(arrayMarker) {
//    arrayMarker.forEach(function (marker) {
//        //agrega los markers al oms y al mapa
//        oms.addMarker(marker);
//        addListenerOmsIconMarker(marker);
//    });
//agrega los markers al cluster y al mapa

    markerCluster.addMarkers(arrayMarker, false);

}
function restablecerMarkersByIndex(arrayIndex, arrayMarker) {
    arrayMarkerLugaresMostrar = [];
    arrayIndex.forEach(function (element) {
        arrayMarkerLugaresMostrar.push(arrayMarker[element]);
        //agrega los markers al oms y al mapa
//        oms.addMarker(arrayMarker[element]);
//        addListenerOmsIconMarker(arrayMarker[element]);
    });


}
function sacarMarkers(arrayMarker) {
    //elimina los markers del cluster y del mapa
    markerCluster.removeMarkers(arrayMarker, false);

    //elimina los markers del oms y del mapa
//    arrayMarker.forEach(function (element) {
//        oms.removeMarker(element);
//    });
}
function cargarMarkers(arrayMarker) {

    markerCluster.addMarkers(arrayMarker, false);

//    arrayMarker.forEach(function (element) {
//        element.setMap(map);
//    });
}
function eliminarMarkers(arrayMarker) {
    arrayMarker = [];
}
function reiniciar() {
    sacarMarkers(arrayMarkerLugares);
    sacarMarkers(arrayMarkerPropiedades);
    eliminarMarkers(arrayMarkerLugares);
    eliminarMarkers(arrayMarkerPropiedades);
    habilitarControles(false);
}
function addClusterer() {
//agrega clusterer y markers al map
    if (markerCluster == null) {
        markerCluster = new MarkerClusterer(map, [], {maxZoom: 19, imagePath: 'js/markerclusterer/m'});
    }
}
//OMS DESHABILITADO
function addOms() {
    oms = new OverlappingMarkerSpiderfier(map, {
        markersWontMove: true, // we promise not to move any markers, allowing optimizations
        markersWontHide: true, // we promise not to change visibility of any markers, allowing optimizations
        basicFormatEvents: false, // allow the library to skip calculating advanced formatting information
        nearbyDistance: 1
    });
}
//OMS DESHABILITADO
function addListenerOmsIconMarker(marker) {
//icono por estado
    oms.addListener('format', function (marker, status) {
        var iconURL = status == OverlappingMarkerSpiderfier.markerStatus.SPIDERFIED ? 'images/point.png' :
                status == OverlappingMarkerSpiderfier.markerStatus.SPIDERFIABLE ? 'images/group.png' :
                status == OverlappingMarkerSpiderfier.markerStatus.UNSPIDERFIABLE ? 'images/point.png' :
                null;
        var iconSize = new google.maps.Size(16, 16);
        marker.setIcon({
            url: iconURL,
            size: iconSize
        });
    });
}
//FIN MARKERS----------

//GENERALES---------------------------------------------------------------------
function traerDatos() {
    $.ajax({
        data: $("#meses"),
        url: 'controlers/controler_return_puntos.php',
        type: 'POST',
        success: function (response) {
            if (response == "") {
                alert("No se cargaron datos para este periodo");
                sacarMarkers(arrayMarkerPropiedades);
                sacarMarkers(arrayMarkerLugares);
                borrarMapaCalor();
                eliminarMarkers(arrayMarkerPropiedades);
                eliminarMarkers(arrayMarkerLugares);
                arrayPropiedades = [];
                arrayPersonas = [];
                arrayPropietarios = [];
                arrayLugares = [];
                habilitarControles(false);
            } else {
                array = JSON.parse(response);
                sacarMarkers(arrayMarkerPropiedades);
                sacarMarkers(arrayMarkerLugares);
                borrarMapaCalor();
                eliminarMarkers(arrayMarkerPropiedades);
                eliminarMarkers(arrayMarkerLugares);
                arrayPropiedades = [];
                arrayPersonas = [];
                arrayPropietarios = [];
                arrayLugares = [];
                arrayPropiedades = array.propiedades;
                arrayPersonas = array.personas;
                arrayPropietarios = array.propietarios;
                arrayLugares = array.lugares;
                generarArrayMarkerPropiedades();
                generarArrayMarkerLugares();
                habilitarControles(true);
            }
        },
        error: function () {
            alert("Ocurrió un error al conectar con el servidor. Verifique su conexión a internet.");
        }
    });
}
function habilitarControles(boolean) {
    if (boolean) {
        document.getElementById('filterPersonas').disabled = false;
        document.getElementById('filterPropiedades').disabled = false;
        document.getElementById('filterLugares').disabled = false;
        document.getElementById('filterZonas').disabled = false;
        document.getElementById('filterMapCalor').disabled = false;

    } else {
        document.getElementById('filterPersonas').disabled = true;
        document.getElementById('filterPropiedades').disabled = true;
        document.getElementById('filterLugares').disabled = true;
        document.getElementById('filterZonas').disabled = true;
        document.getElementById('filterMapCalor').disabled = true;

    }
}
function todosLosIndices(array) {
    var contador = 0;
    var arrayResult = [];
    array.forEach(function () {
        arrayResult.push(contador);
        contador++;
    });
    return arrayResult;
}
function diferenciaArray(arrayIndex1, arrayIndex2) {
    var arrayResult = [];
    arrayIndex1.forEach(function (element) {
        if (!arrayIndex2.includes(element)) {
            arrayResult.push(element);
        }
    });
    return arrayResult;
}
//FIN GENERALES-----------------------------------------------------------------