
// global vars
var map;
var markerCluster;
var oms;
var arrayPropiedades;
var arrayPersonas;
var arrayPropietarios;
var arrayLugares;
var arrayMarkerPropiedades = [];
var arrayMarkerLugares = [];

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
}

//AJUSTA LA ALTURA DEL MAPA
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
    sacarMarkers(arrayMarkerPropiedades);
    var arrayMarkersPropiedadesMostrar = []
    arrayPersonas.forEach(function (persona) {
        if (tieneProfesion(persona)
                && tieneEducacion(persona)
                && esVotante(persona)
                && tieneSexo(persona)
                && esPropietario(persona)
                && tieneEdad(persona)
                && tieneDeuda(persona)
                )
        {
            //agregar marker a mostrar
            var indicePropiedad = obtenerIndicePropiedadPor(persona.reside_propiedad);
            arrayMarkersPropiedadesMostrar.push(arrayMarkerPropiedades[indicePropiedad]);
        }
    });
    restablecerMarkersByArray(arrayMarkersPropiedadesMostrar);
    $('#modalFilterPesonas').modal('hide');
}

function fProfesionPersonaActivo() {
    var estado = false;
    $("#fPersonasProfesion").find("input").each(function () {
        estado = $(this).is(':checked') || estado;
    });
    ////console.log("Filtro Persona profesion: "+estado);
    return estado;
}
function fEducacionPersonaActivo() {
    var estado = false;
    $("#fPersonasEducacion").find("input").each(function () {
        estado = $(this).is(':checked') || estado;
    });
    ////console.log("Filtro Persona profesion: "+estado);
    return estado;
}
function fVotantePersonaActivo() {
    var estado = false;
    $("#fPersonasVotante").find("input").each(function () {
        estado = $(this).is(':checked') || estado;
    });
    ////console.log("Filtro Persona profesion: "+estado);
    return estado;
}
function fSexoPersonaActivo() {
    var estado = false;
    $("#fPersonasSexo").find("input").each(function () {
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
    return $("#fPersonasEdadDesde").val() != "";
}
function fEdadMaxPersonaActivo() {
    return $("#fPersonasEdadHasta").val() != "";
}
function fEdadMinMaxPersonaActivo() {
    return fEdadMinPersonaActivo() && fEdadMaxPersonaActivo();
}
function fDeudaMinPersonaActivo() {
    return $("#fPersonasDeudaDesde").val() != "";
}
function fDeudaMaxPersonaActivo() {
    return $("#fPersonasDeudaHasta").val() != "";
}
function fDeudaMinMaxPersonaActivo() {
    return fDeudaMinPersonaActivo() && fDeudaMaxPersonaActivo();
}
function tieneProfesion(persona) {
    var coincide = false;
    if (fProfesionPersonaActivo()) {
        $("#fPersonasProfesion").find("input").each(function () {
            if ($(this).is(':checked')) {
                coincide = persona.profesion == $(this).val() || coincide;
            }
        });
        return coincide;
    }
    return true;
}
function tieneEducacion(persona) {
    var coincide = false;
    if (fEducacionPersonaActivo()) {
        $("#fPersonasEducacion").find("input").each(function () {
            if ($(this).is(':checked')) {
                coincide = persona.educacion == $(this).val() || coincide;
            }
        });
        return coincide;
    }
    return true;
}
function esVotante(persona) {
    var coincide = false;
    if (fVotantePersonaActivo()) {
        $("#fPersonasVotante").find("input").each(function () {
            if ($(this).is(':checked')) {
                coincide = persona.votante == $(this).val() || coincide;
            }
        });
        return coincide;
    }
    return true;
}
function tieneSexo(persona) {
    var coincide = false;
    if (fSexoPersonaActivo()) {
        $("#fPersonasSexo").find("input").each(function () {
            if ($(this).is(':checked')) {
                coincide = persona.sexo == $(this).val() || coincide;
            }
        });
        return coincide;
    }
    return true;
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
function tieneEdad(persona) {
    var edad = Number(persona.edad);
    if (fEdadMinMaxPersonaActivo()) {
        return edad >= $("#fPersonasEdadDesde").val()
                && edad <= $("#fPersonasEdadHasta").val();
    }
    if (fEdadMinPersonaActivo()) {
        return edad >= $("#fPersonasEdadDesde").val();
    }
    if (fEdadMaxPersonaActivo()) {
        return edad <= $("#fPersonasEdadHasta").val();
    }
    return true;
}
function tieneDeuda(persona) {
    var deuda = deudaTotal(persona.dni);
    if (fDeudaMinMaxPersonaActivo()) {
        return deuda >= $("#fPersonasDeudaDesde").val()
                && deuda <= $("#fPersonasDeudaHasta").val();
    }
    if (fDeudaMinPersonaActivo()) {
        return deuda >= $("#fPersonasDeudaDesde").val();
    }
    if (fDeudaMaxPersonaActivo()) {
        return deuda <= $("#fPersonasDeudaHasta").val();
    }

    return true;
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
function obtenerPersonaPorResidencia(partida) {
    var retorno;
    arrayPersonas.forEach(function (element) {
        if (element.reside_propiedad == partida) {
            retorno = element;
        }
    });
    return retorno;
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
            showPropiedad(element);
        });
        arrayMarkerPropiedades.push(marker);
    });
}

//filtrar por datos modal
//deshabiliatr filtros segun resultado filtro
function filtrarPropiedades() {
    sacarMarkers(arrayMarkerPropiedades);
    var indice = 0;
    var arrayMarkersPropiedadesMostrar = [];
    arrayPropiedades.forEach(function (propiedad) {
        if (tieneDeudaProp(propiedad)
                || esTipoProp(propiedad)
                || tieneDestinoProp(propiedad)
                || tieneMtsTotProp(propiedad)
                || tieneServicios(propiedad)
                )
        {
            //agregar marker a mostrar
            arrayMarkersPropiedadesMostrar.push(arrayMarkerPropiedades[indice]);

        }
        indice++;
    });
    addIconMarkers(arrayMarkersPropiedadesMostrar);
    restablecerMarkersByArray(arrayMarkersPropiedadesMostrar);
    $('#modalFilterPropiedades').modal('hide');
}

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

function esTipoProp(propiedad) {
    var coincide = false;
    $("#dvPropTipo").find("input").each(function () {
        if ($(this).is(':checked')) {
            coincide = propiedad.tipo == $(this).val() || coincide;
        }
    });
    return coincide;
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
    return false;
}

function tieneCloacaProp(propiedad) {
    return $("#slCloacas").val() == propiedad.cloacas;
}
function tieneGasProp(propiedad) {
    return $("#slGas").val() == propiedad.gas;
}
function tieneLuzProp(propiedad) {
    return $("#slLuz").val() == propiedad.luz;
}
function tienePavimentoProp(propiedad) {
    return $("#slPavimento").val() == propiedad.paviemnto;
}
function tieneAguaProp(propiedad) {
    return $("#slAgua").val() == propiedad.agua;
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
    return false;
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
    return false;
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
    return false;
}

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
            //alert($(this).val());
            obtenerIndicesLugares($(this).val(), arrayIndexDejar);
        }
    });
    //console.log("dejar: "+arrayIndexDejar);
    //console.log("sacar: "+arrayIndexQuitar);
    sacarMarkers(arrayMarkerLugares);
    restablecerMarkersByIndex(arrayIndexDejar, arrayMarkerLugares);
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
function showFilterPropiedad() {
    $('#modalFilterPropiedades').modal('show');
}
function showFilterPersonas() {
    $('#modalFilterPesonas').modal('show');
}
function showFilterLugares() {
    $('#modalFilterLugares').modal('show');
}
function agregarPropidadModal(propiedad) {
    var divPropiedades = $('#mperPropiedades');

    var div = document.createElement("div");
    var divImg = document.createElement("div");
    var img = document.createElement("img");
    var divTexto = document.createElement("div");
    var h4 = document.createElement("h4");
    var h5Partida = document.createElement("h5");
    var h5Direccion = document.createElement("h5");
    img.src = "images/logoMini.png";
    h4.textContent = "Propietario";
    h5Partida.textContent = "Partida " + propiedad.partida;
    h5Direccion.textContent = propiedad.calle + ' ' + propiedad.altura + ', ' + propiedad.partido;
    div.className = "col-lg-5 col-md-5 col-xs-5 col-sm-5";
    divImg.className = "col-lg-6 col-md-6 col-xs-6 col-sm-6";
    divTexto.className = "col-lg-6 col-md-6 col-xs-6 col-sm-6";
    divImg.append(img);
    divPropiedades.append(divImg);
    divTexto.append(h4);
    divTexto.append(h5Partida);
    divTexto.append(h5Direccion);

    div.append(divImg);
    div.append(divTexto);
    divPropiedades.append(div);
}
function showPropiedad(element) {
    $('#mpDireccion').text(element.calle + ' ' + element.altura);
    $('#mpLocalidad').text(element.partido);
    $('#mpDeuda').text('Deuda: ' + element.deuda);
    $('#mpTipo').text('Tipo: ' + element.tipo);
    $('#mpUso').text('Uso: ' + element.uso);
    $('#mpMtsCubiertos').text('Mts cubiertos: ' + element.mts_cubiertos);
    $('#mpMtsTotales').text('Mts totales: ' + element.mts_totales);
    $('#mpCloacas').text('Cloacas: ' + element.cloacas);
    $('#mpLuz').text('Luz: ' + element.luz);
    $('#mpGas').text('Gas: ' + element.gas);
    $('#mpPavimento').text('Pavimento: ' + element.paviemnto);

    var indicePropietario = obtenerIndicePropiedadPor(element.partida);
    ////console.log("indice propietario: " + indicePropietario);
    var dniPropietario = arrayPropietarios[indicePropietario].dni;
    ////console.log("dni propietario: " + dniPropietario);
    var propietario = obtenerPersonaPor(dniPropietario);
    ////console.log("dni propietario: " + propietario.dni);

    $('#mpPropietario').text(propietario.nombres + ' ' + propietario.apellidos);
    $('#mpSexoEdadProp').text('Sexo: ' + propietario.sexo + ', ' + propietario.edad + ' años');

    var indicePropietario = obtenerIndicePropiedadPor(element.partida);
    ////console.log("indice propietario: " + indicePropietario);
    var dniPropietario = arrayPropietarios[indicePropietario].dni;
    ////console.log("dni propietario: " + dniPropietario);
    var propietario = obtenerPersonaPor(dniPropietario);
    ////console.log("dni propietario: " + propietario.dni);

    var personaResidente = obtenerPersonaPorResidencia(element.partida);
    ////console.log("dni residente: " + personaResidente.dni);
    if (personaResidente != null) {
        $('#verResidente').show();
        $('#mpResidenteIMG').show();
        $('#mpResidente').text(personaResidente.nombres + ' ' + personaResidente.apellidos);
        $('#mpSexoEdadRes').text('Sexo: ' + personaResidente.sexo + ', ' + personaResidente.edad + ' años');
    } else {
        $('#verResidente').hide();
        $('#mpResidenteIMG').hide();
    }
    document.getElementById('verPropietario').addEventListener('click', function () {
        $('#modalShowPropiedad').modal('hide');
        showPersona(propietario);
    });
    document.getElementById('verResidente').addEventListener('click', function () {
        $('#modalShowPropiedad').modal('hide');
        showPersona(personaResidente);
    });

    $('#modalShowPropiedad').modal('show');
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
    $('#mperNombresApellidos').text(persona.nombres + ' ' + persona.apellidos);
    $('#mperDNI').text("DNI: " + persona.dni);
    $('#mperSexo').text("Sexo: " + persona.sexo);
    $('#mperEdad').text("Edad: " + persona.edad);
    $('#mperEducacion').text("Educación: " + persona.educacion);
    $('#mperProfesion').text("Profesión: " + persona.profesion);
    $('#mperTelefono').text("Teléfono: " + persona.telefono);
    $('#mperEmail').text("Email: " + persona.email);
    $('#mperDeuda').text("Deuda: " + deudaTotal(persona.dni));

    $('#mperPartidaRes').text("Partida: " + persona.reside_propiedad);
    var propiedadReside = obetnerPropiedadPor(persona.reside_propiedad);
    $('#mperDireccionRes').text(propiedadReside.calle + ' ' + propiedadReside.altura + ', ' + propiedadReside.partido);


    var arrayPartidas = partidasPorPropietario(persona.dni);
    arrayPartidas.forEach(function (partida) {
        agregarPropidadModal(obetnerPropiedadPor(partida));
    });



    $('#modalShowPersona').modal('show');
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
    arrayShowMarkers = [];
    arrayIndex.forEach(function (element) {
        arrayShowMarkers.push(arrayMarker[element]);
        //agrega los markers al oms y al mapa
//        oms.addMarker(arrayMarker[element]);
//        addListenerOmsIconMarker(arrayMarker[element]);
    });
    //agrega los markers al cluster y al mapa
    cargarMarkers(arrayShowMarkers)

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
    } else {
        document.getElementById('filterPersonas').disabled = true;
        document.getElementById('filterPropiedades').disabled = true;
        document.getElementById('filterLugares').disabled = true;
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