
var map;
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
        zoom: 16,
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
}
//FIN MAPA----------------------------------------------------------------------

//LISTENERS---------------------------------------------------------------------
$(document).ready(function () {
    //LISTENERS
    document.getElementById('getPuntos').addEventListener('click', function () {
        traerDatos();
    });
    document.getElementById('filterPersonas').addEventListener('click', function () {
        $('#modalFilterPesonas').modal('show');
    });
    document.getElementById('filterPropiedades').addEventListener('click', function () {
        $('#modalFilterPropiedades').modal('show');
    });
    document.getElementById('filterLugares').addEventListener('click', function () {
        $('#modalFilterLugares').modal('show');
    });
    document.getElementById('applyFilterPersonas').addEventListener('click', function () {
        filtrarPersonas();
    });
    document.getElementById('applyFilterPropiedades').addEventListener('click', function () {
        filtrarPropiedades();
    });
    document.getElementById('applyFilterLugares').addEventListener('click', function () {
        filtrarLugares();
    });
    document.getElementById('reiniciar').addEventListener('click', function () {
        reiniciar();
    });

});
//FIN LISTENERS-----------------------------------------------------------------

//PERSONAS----------------------------------------------------------------------
function filtrarPersonas() {
    sacarMarkers(arrayMarkerPropiedades);
    var indice = 0;
    
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
            console.log("dni: "+persona.dni);
            //mostar marker
            var indicePropiedad = obtenerIndicePropiedadPor(persona.reside_propiedad);
            arrayMarkerPropiedades[indicePropiedad].setMap(map);
        }
        indice++;
    });
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
function fVotantePersonaActivo(){
    var estado = false;
    $("#fPersonasVotante").find("input").each(function () {
        estado = $(this).is(':checked') || estado;
    });
    ////console.log("Filtro Persona profesion: "+estado);
    return estado;
}
function fSexoPersonaActivo(){
    var estado = false;
    $("#fPersonasSexo").find("input").each(function () {
        estado = $(this).is(':checked') || estado;
    });
    ////console.log("Filtro Persona profesion: "+estado);
    return estado;
}
function fPropietarioMinPersonaActivo(){
    return $("#fPersonasPropietarioDesde").val() != "";
}
function fPropietarioMaxPersonaActivo(){
    return $("#fPersonasPropietarioHasta").val() != "";
}
function fPropietarioMinMaxPersonaActivo(){
    return fPropietarioMinPersonaActivo() && fPropietarioMaxPersonaActivo();
}
function fEdadMinPersonaActivo(){
    return $("#fPersonasEdadDesde").val() != "";
}
function fEdadMaxPersonaActivo(){
    return $("#fPersonasEdadHasta").val() != "";
}
function fEdadMinMaxPersonaActivo(){
    return fEdadMinPersonaActivo() && fEdadMaxPersonaActivo();
}
function fDeudaMinPersonaActivo(){
    return $("#fPersonasDeudaDesde").val() != "";
}
function fDeudaMaxPersonaActivo(){
    return $("#fPersonasDeudaHasta").val() != "";
}
function fDeudaMinMaxPersonaActivo(){
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
function esPropietario(persona){
    var cantPropiedades=cantPorpiedades(persona.dni);
    if(fPropietarioMinMaxPersonaActivo()){
        return cantPropiedades >= $("#fPersonasPropietarioDesde").val() 
                && cantPropiedades <= $("#fPersonasPropietarioHasta").val() ;
    }
    if(fPropietarioMinPersonaActivo()){
        return cantPropiedades >= $("#fPersonasPropietarioDesde").val() ;
    }
    if(fPropietarioMaxPersonaActivo()){
        cantPropiedades <= $("#fPersonasPropietarioHasta").val(); 
    }
    return true;
}
function tieneEdad(persona){
    var edad=Number(persona.edad);
    if(fEdadMinMaxPersonaActivo()){
        return edad >= $("#fPersonasEdadDesde").val() 
                && edad <= $("#fPersonasEdadHasta").val() ;
    }
    if(fEdadMinPersonaActivo()){
        return edad >= $("#fPersonasEdadDesde").val();
    }
    if(fEdadMaxPersonaActivo()){
        return edad <= $("#fPersonasEdadHasta").val() ;
    } 
    return true;
}
function tieneDeuda(persona){
    var deuda=deudaTotal(persona.dni);
    if(fDeudaMinMaxPersonaActivo()){
        return deuda >= $("#fPersonasDeudaDesde").val() 
                && deuda <= $("#fPersonasDeudaHasta").val() ;
    }
    if(fDeudaMinPersonaActivo()){
        return deuda >= $("#fPersonasDeudaDesde").val();
    }
    if(fDeudaMaxPersonaActivo()){
        return deuda <= $("#fPersonasDeudaHasta").val() ;
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
        var image = 'images/Casa.png';
        var marker = new google.maps.Marker({
            position: myLatLng,
            animation: google.maps.Animation.DROP,
            icon: image
        });
        var infowindow = new google.maps.InfoWindow({
            content: element.tipo
        });
        ////console.log(element);
        marker.addListener('click', function (e) {
            showPropiedad(element);
        });
        marker.addListener('mouseover', function (e) {
            ////console.log("mouseover: " + this.getTitle());
            infowindow.open(marker.get('map'), marker);
        });
        marker.addListener('mouseout', function (e) {
            ////console.log("mouseout: " + this.getTitle());
            infowindow.close();
        });
        arrayMarkerPropiedades.push(marker);
    });
}

function filtrarPropiedades() {
    sacarMarkers(arrayMarkerPropiedades);
    var indice = 0;
    arrayPropiedades.forEach(function (propiedad) {
        if (esTipoProp(propiedad)
                && tieneUsoProp(propiedad)
                && tieneServicios(propiedad)
                && tieneMtsCubProp(propiedad)
                && tieneMtsTotProp(propiedad)
                && tieneDeudaProp(propiedad)
                )
        {
            //mostar marker
            arrayMarkerPropiedades[indice].setMap(map);
        }
        indice++;
    });
    $('#modalFilterPropiedades').modal('hide');
}

function fTipoPropActivo() {
    var estado = false;
    $("#fPropiedadesTipo").find("input").each(function () {
        estado = $(this).is(':checked') || estado;
    });
    ////console.log("Filtro Propiedad Tipo: "+estado);
    return estado;
}
function fUsoPropActivo() {
    var estado = false;
    $("#fPropiedadesUso").find("input").each(function () {
        estado = $(this).is(':checked') || estado;
    });
    return estado;
}
function fDeudaMinPropActivo() {
    return $("#fPropiedadesDeudaDesde").val() != "";
}
function fDeudaMaxPropActivo() {
    return $("#fPropiedadesDeudaHasta").val() != "";
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
    return $("#fPropiedadesMtsTotalesDesde").val() != "";
}
function fMtsTotalesMaxPropActivo() {
    return $("#fPropiedadesMtsTotalesHasta").val() != "";
}
function fMtsTotalesMinMaxPropActivo() {
    return fMtsTotalesMinPropActivo() && fMtsTotalesMaxPropActivo();
}

function esTipoProp(propiedad) {
    var coincide = false;
    if (fTipoPropActivo()) {
        $("#fPropiedadesTipo").find("input").each(function () {
            if ($(this).is(':checked')) {
                coincide = propiedad.tipo == $(this).val() || coincide;
            }
        });
        return coincide;
    }
    return true;
}
function tieneUsoProp(propiedad) {
    var coincide = false;
    if (fUsoPropActivo()) {
        $("#fPropiedadesUso").find("input").each(function () {
            if ($(this).is(':checked')) {
                coincide = propiedad.uso == $(this).val() || coincide;
            }
        });
        return coincide;
    }
    return true;
}
function tieneCloacaProp(propiedad) {
    if ($("#fPropiedadesCloacas").is(':checked')) {
        return  propiedad.cloacas == "Si";
    }
    return true;
}
function tieneGasProp(propiedad) {
    if ($("#fPropiedadesGas").is(':checked')) {
        return propiedad.gas == "Si";
    }
    return true;
}
function tieneLuzProp(propiedad) {
    if ($("#fPropiedadesLuz").is(':checked')) {
        return propiedad.luz == "Si";
    }
    return true;
}
function tienePavimentoProp(propiedad) {
    if ($("#fPropiedadesPavimento").is(':checked')) {
        return propiedad.paviemnto == "Si";
    }
    return true;
}
function tieneServicios(propiedad) {
    return tieneCloacaProp(propiedad)
            && tieneGasProp(propiedad)
            && tieneLuzProp(propiedad)
            && tienePavimentoProp(propiedad);
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
        return mts >= $("#fPropiedadesMtsTotalesDesde").val() &&
                mts <= $("#fPropiedadesMtsTotalesHasta").val();
    }
    if (fMtsTotalesMinPropActivo()) {
        return mts >= $("#fPropiedadesMtsTotalesDesde").val();
    }
    if (fMtsTotalesMaxPropActivo()) {
        return mts <= $("#fPropiedadesMtsTotalesHasta").val();
    }
    return true;
}
function tieneDeudaProp(propiedad) {
    var deuda = Number(propiedad.deuda);
    if (fDeudaMinMaxPropActivo()) {
        //console.log("filtro deudaMinMax activo");
        return deuda >= $("#fPropiedadesDeudaDesde").val() && deuda <= $("#fPropiedadesDeudaHasta").val();
    }
    if (fDeudaMinPropActivo()) {
        //console.log("filtro deudaMin activo");
        return deuda >= $("#fPropiedadesDeudaDesde").val();
    }
    if (fDeudaMaxPropActivo()) {
        //console.log("filtro deudaMax activo");
        return deuda <= $("#fPropiedadesDeudaHasta").val();
    }
    return true;
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
        var image = 'images/' + element.tipo + '.png';
        var marker = new google.maps.Marker({
            position: myLatLng,
            animation: google.maps.Animation.DROP,
            icon: image
        });
        var infowindow = new google.maps.InfoWindow({
            content: element.tipo
        });
        ////console.log(element);
        marker.addListener('click', function (e) {
            showLugar(element);
        });
        marker.addListener('mouseover', function (e) {
            ////console.log("mouseover: " + this.getTitle());
            infowindow.open(marker.get('map'), marker);
        });
        marker.addListener('mouseout', function (e) {
            ////console.log("mouseout: " + this.getTitle());
            infowindow.close();
        });
        arrayMarkerLugares.push(marker);
    });
}

function filtrarLugares() {
    var arrayIndexDejar = [];
    var arrayIndexQuitar = [];
    $('#fLugTipo').find("input").each(function () {
        if ($(this).is(':checked')) {
            //alert($(this).val());
            obtenerIndicesLugares($(this).val(), arrayIndexDejar);
        } else {
            obtenerIndicesLugares($(this).val(), arrayIndexQuitar);
        }
    });
//    //console.log("dejar: "+arrayIndexDejar);
//    //console.log("sacar: "+arrayIndexQuitar);
    sacarMarkers(arrayMarkerLugares);
    restablecerMarkers(arrayIndexDejar, arrayMarkerLugares);
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

    $('#mpResidente').text(personaResidente.nombres + ' ' + personaResidente.apellidos);
    $('#mpSexoEdadRes').text('Sexo: ' + personaResidente.sexo + ', ' + personaResidente.edad + ' años');

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
    $('#idlugar').html('<img  class="center-block" src="images/' + element.tipo + '.png"  ><br>' + '<p class="text-center">Tipo: ' + element.tipo + '</p> <p class="text-center">Descripción: ' + element.descripcion + '</p>');
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
function restablecerMarkers(arrayIndex, arrayMarker) {
    arrayIndex.forEach(function (element) {
        arrayMarker[element].setMap(map);
    });
}
function sacarMarkers(arrayMarker) {
    arrayMarker.forEach(function (element) {
        element.setMap(null);
    });
}
function cargarMarkers(arrayMarker) {
    arrayMarker.forEach(function (element) {
        element.setMap(map);
    });
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
//FIN MARKERS----------

//GENERALES---------------------------------------------------------------------
function traerDatos() {

    $.ajax({
        data: $("#mes"),
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

                //cargarMarkers(arrayMarkerPropiedades);
//                cargarMarkers(arrayMarkerLugares);

                habilitarControles(true);
            }
            document.getElementById('getPuntos').blur();
        },
        error: function () {
            alert("Ocurrio un error al conectar con el servidor. Verifique su coexion a internet.");
        }
    });
}
function habilitarControles(boolean) {
    if (boolean) {
        document.getElementById('filterPersonas').disabled = false;
        document.getElementById('filterPropiedades').disabled = false;
        document.getElementById('filterLugares').disabled = false;
        document.getElementById('reiniciar').disabled = false;
    } else {
        document.getElementById('filterPersonas').disabled = true;
        document.getElementById('filterPropiedades').disabled = true;
        document.getElementById('filterLugares').disabled = true;
        document.getElementById('reiniciar').disabled = true;
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