
var map;
var arrayPropiedades;
var arrayPersonas;
var arrayPropietarios;
var arrayLugares;
var arrayMarkerPropiedades = [];
var arrayMarkerLugares = [];

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
//FIN MAPA----------

//POST DATOS--------------------------------------------------------------------
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
//FIN POST DATOS----------

//PERSONAS----------------------------------------------------------------------
function filtrarPersonas() {
    var arrayIndexDejar = [];
    var arrayIndexQuitar = [];
    //filtro profesion
    $("#fPersonasProfesion").find("input").each(function () {
        if ($(this).is(':checked')) {
            obtenerIndicesPersonasProfesion($(this).val(), arrayIndexQuitar);
        }
    });
    $("#fPersonasEducacion").find("input").each(function () {
        if ($(this).is(':checked')) {
            obtenerIndicesPersonasEducacion($(this).val(), arrayIndexQuitar);
        }
    });
    $("#fPersonasVotante").find("input").each(function () {
        if ($(this).is(':checked')) {
            obtenerIndicesPersonasVotante($(this).val(), arrayIndexQuitar);
        }
    });
    $("#fPersonasSexo").find("input").each(function () {
        if ($(this).is(':checked')) {
            obtenerIndicesPersonasSexo($(this).val(), arrayIndexQuitar);
        }
    });
    obtenerIndicesPersonasPropietario($("#fPersonasPropietarioDesde").val(),
            $("#fPersonasPropietarioHasta").val(),
            arrayIndexQuitar);
    obtenerIndicesPersonasDeuda($("#fPersonasDeudaDesde").val(),
            $("#fPersonasDeudaHasta").val(),
            arrayIndexQuitar);
    obtenerIndicesPersonasEdad($("#fPersonasEdadDesde").val(),
            $("#fPersonasEdadHasta").val(),
            arrayIndexQuitar);
    //**********debug***********
//    arrayIndexDejar.sort(function (a, b) {
//        return a - b;
//    });
//    arrayIndexQuitar.sort(function (a, b) {
//        return a - b;
//    });
    //console.log("dejar: " + arrayIndexDejar);
    //console.log("sacar: " + arrayIndexQuitar);
    //**********fin debug********
    borrarMarkers(arrayMarkerPropiedades);
    //console.log("todos: "+todosLosIndices(arrayPersonas));
    //console.log("diferencia: "+diferenciaArray(todosLosIndices(arrayPersonas), arrayIndexQuitar));
    arrayIndexDejar = diferenciaArray(todosLosIndices(arrayPersonas), arrayIndexQuitar);
    //console.log("partidas: "+obtenerPartidasReside(arrayIndexDejar));
    var arrayPartidasResidencia = obtenerPartidasReside(arrayIndexDejar);
    //console.log("indices partidas: "+obtenerIndicesPropiedadesPor(arrayPartidasResidencia));
    var indicesPropDejar = obtenerIndicesPropiedadesPor(arrayPartidasResidencia);
    restablecerMarkers(indicesPropDejar, arrayMarkerPropiedades);
    $('#modalFilterPesonas').modal('hide');
}

function obtenerIndicesPersonasSexo(sexo, arrayIndex) {
    var contador = 0;
    arrayPersonas.forEach(function (element) {
        if (element.sexo == sexo) {
            //alert(tipo+" index "+contador);
            if (!arrayIndex.includes(contador)) {
                arrayIndex.push(contador);
            }
        }
        contador++;
    });
}
function obtenerIndicesPersonasVotante(votante, arrayIndex) {
    var contador = 0;
    arrayPersonas.forEach(function (element) {
        if (element.votante == votante) {
            //alert(tipo+" index "+contador);
            if (!arrayIndex.includes(contador)) {
                arrayIndex.push(contador);
            }
        }
        contador++;
    });
}
function obtenerIndicesPersonasEducacion(educacion, arrayIndex) {
    var contador = 0;
    arrayPersonas.forEach(function (element) {
        if (element.educacion == educacion) {
            //alert(tipo+" index "+contador);
            if (!arrayIndex.includes(contador)) {
                arrayIndex.push(contador);
            }
        }
        contador++;
    });
}
function obtenerIndicesPersonasProfesion(profesion, arrayIndex) {
    var contador = 0;
    arrayPersonas.forEach(function (element) {
        if (element.profesion == profesion) {
            //alert(tipo+" index "+contador);
            if (!arrayIndex.includes(contador)) {
                arrayIndex.push(contador);
            }
        }
        contador++;
    });
}
function obtenerIndicesPersonasPropietario(desde, hasta, arrayIndex) {
    if (desde !== "" || hasta !== "") {
        var contador = 0;
        arrayPersonas.forEach(function (element) {
            var cantProp = cantPorpiedades(element.dni);
            if (cantProp >= desde && cantProp <= hasta) {
                //alert(tipo+" index "+contador);
                if (!arrayIndex.includes(contador)) {
                    arrayIndex.push(contador);
                }
            }
            contador++;
        });
    }
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
function obtenerIndicesPersonasDeuda(desde, hasta, arrayIndex) {
    if (desde !== "" || hasta !== "") {
        var contador = 0;
        arrayPersonas.forEach(function (element) {
            if (deudaTotal(element.dni) >= desde && deudaTotal(element.dni) <= hasta) {
                //alert(tipo+" index "+contador);
                if (!arrayIndex.includes(contador)) {
                    arrayIndex.push(contador);
                }
            }
            contador++;
        });
    }
}
function deudaTotal(dni) {

    var deudaResult = 0;
    var arrayPartidas = partidasPorPropietario(dni);
    console.log("dni: " + dni);
    arrayPartidas.forEach(function (element) {
        deudaResult = deudaResult + deudaPor(element);
        console.log(" partida: " + element + " deuda: " + deudaPor(element));
    });
    console.log("deuda total: " + deudaResult);
    return deudaResult;
}
function deudaPor(partida) {
    var result = 0;
    arrayPropiedades.forEach(function (element) {
        if (element.partida == partida) {
            //console.log("partida: "+element.partida+" deuda: "+element.deuda);
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
function obtenerIndicesPersonasEdad(desde, hasta, arrayIndex) {
    if (desde !== "" || hasta !== "") {
        var contador = 0;
        arrayPersonas.forEach(function (element) {
            if (element.edad >= desde && element.edad <= hasta) {
                //alert(tipo+" index "+contador);
                if (!arrayIndex.includes(contador)) {
                    arrayIndex.push(contador);
                }
            }
            contador++;
        });
    }
}
function obtenerPartidasReside(arrayIndex) {
    var arrayResult = [];
    arrayIndex.forEach(function (element) {
        arrayResult.push(arrayPersonas[element].reside_propiedad);

    });
    return arrayResult;
}
function obtenerPersonaPor(dni) {
    var retorno;
    arrayPersonas.forEach(function (element) {
        if (element.dni == dni) {
            retorno = element;
        }
    });
    return retorno;
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

function showPersona(persona) {
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
    var propiedadReside=obetnerPropiedadPor(persona.reside_propiedad);
    $('#mperDireccionRes').text(propiedadReside.calle+' '+propiedadReside.altura+', '+propiedadReside.partido);
    
    
    var arrayProp=partidasPorPropietario(persona.dni)
    arrayProp.forEach(function (element) {
        agregarPropidadModal(obetnerPropiedadPor(element))
    });
   
    

    $('#modalShowPersona').modal('show');
    
    
}
//FIN PERSONAS---------

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
        //console.log(element);
        marker.addListener('click', function (e) {
            showPropiedad(element);
        });
        marker.addListener('mouseover', function (e) {
            console.log("mouseover: " + this.getTitle());
            infowindow.open(marker.get('map'), marker);
        });
        marker.addListener('mouseout', function (e) {
            console.log("mouseout: " + this.getTitle());
            infowindow.close();
        });
        arrayMarkerPropiedades.push(marker);
    });
}

function filtrarPropiedades() {
    var arrayIndexDejar = [];
    var arrayIndexQuitar = [];
    //filtro por tipo
    $("#fPropiedadesTipo").find("input").each(function () {
        if ($(this).is(':checked')) {
            obtenerIndicesPropiedadesTipo($(this).val(), arrayIndexQuitar);
        }
    });

    //filtro por uso
    $("#fPropiedadesUso").find("input").each(function () {
        if ($(this).is(':checked')) {
            obtenerIndicesPropiedadesUso($(this).val(), arrayIndexQuitar);
        }
    });

    //filtro por servicios
    if ($("#fPropiedadesCloacas").is(':checked')) {
        obtenerIndicesPropiedadesCloacas(arrayIndexQuitar);
    }
    if ($("#fPropiedadesGas").is(':checked')) {
        obtenerIndicesPropiedadesGas(arrayIndexQuitar);
    }
    if ($("#fPropiedadesLuz").is(':checked')) {
        obtenerIndicesPropiedadesLuz(arrayIndexQuitar);
    }
    if ($("#fPropiedadesPavimento").is(':checked')) {
        obtenerIndicesPropiedadesPavimento(arrayIndexQuitar);
    }

    //filtro por mts cubiertos
    obetenrIndicesPropiedadesMtsCubiertos($("#fPropiedadesMtsCubiertosDesde").val(),
            $("#fPropiedadesMtsCubiertosHasta").val(),
            arrayIndexQuitar);

    //filtro por mts totales
    obetenrIndicesPropiedadesMtsTotales($("#fPropiedadesMtsTotalesDesde").val(),
            $("#fPropiedadesMtsTotalesHasta").val(),
            arrayIndexQuitar);

    //filtro por mts deuda
    obetenrIndicesPropiedadesDeuda($("#fPropiedadesDeudaDesde").val(),
            $("#fPropiedadesDeudaHasta").val(),
            arrayIndexQuitar);

    arrayIndexDejar = diferenciaArray(todosLosIndices(arrayPropiedades), arrayIndexQuitar);

//    //**********debug***********
//    arrayIndexDejar.sort(function (a, b) {
//        return a - b;
//    });
//    arrayIndexQuitar.sort(function (a, b) {
//        return a - b;
//    });
//    console.log("dejar: " + arrayIndexDejar);
//    console.log("sacar: " + arrayIndexQuitar);
//    //**********fin debug********

    borrarMarkers(arrayMarkerPropiedades);
    restablecerMarkers(arrayIndexDejar, arrayMarkerPropiedades);
    $('#modalFilterPropiedades').modal('hide');

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
    var retorno = 0;
    arrayPropiedades.forEach(function (element) {
        if (element.partida == partida) {
            //alert(tipo+" index "+contador);
            retorno = contador;
        }
        contador++;
    });
    return retorno;
}

function obtenerIndicesPropiedadesTipo(tipo, arrayIndex) {
    var contador = 0;
    arrayPropiedades.forEach(function (element) {
        if (element.tipo == tipo) {
            //alert(tipo+" index "+contador);
            if (!arrayIndex.includes(contador)) {
                arrayIndex.push(contador);
            }
        }
        contador++;
    });
}
function obtenerIndicesPropiedadesUso(uso, arrayIndex) {
    var contador = 0;
    arrayPropiedades.forEach(function (element) {
        if (element.uso == uso) {
            //alert(tipo+" index "+contador);
            if (!arrayIndex.includes(contador)) {
                arrayIndex.push(contador);
            }
        }
        contador++;
    });
}
function obtenerIndicesPropiedadesCloacas(arrayIndex) {
    var contador = 0;
    arrayPropiedades.forEach(function (element) {
        if (element.cloacas == "Si") {
            //alert(tipo+" index "+contador);
            if (!arrayIndex.includes(contador)) {
                arrayIndex.push(contador);
            }
        }
        contador++;
    });
}
function obtenerIndicesPropiedadesGas(arrayIndex) {
    var contador = 0;
    arrayPropiedades.forEach(function (element) {
        if (element.gas == "Si") {
            //alert(tipo+" index "+contador);
            if (!arrayIndex.includes(contador)) {
                arrayIndex.push(contador);
            }
        }
        contador++;
    });
}
function obtenerIndicesPropiedadesLuz(arrayIndex) {
    var contador = 0;
    arrayPropiedades.forEach(function (element) {
        if (element.luz == "Si") {
            //alert(tipo+" index "+contador);
            if (!arrayIndex.includes(contador)) {
                arrayIndex.push(contador);
            }
        }
        contador++;
    });
}
function obtenerIndicesPropiedadesPavimento(arrayIndex) {
    var contador = 0;
    arrayPropiedades.forEach(function (element) {
        if (element.pavimnto == "Si") {
            //alert(tipo+" index "+contador);
            if (!arrayIndex.includes(contador)) {
                arrayIndex.push(contador);
            }
        }
        contador++;
    });
}
function obetenrIndicesPropiedadesMtsCubiertos(desde, hasta, arrayIndex) {
    var contador = 0;
    arrayPropiedades.forEach(function (element) {
        if (element.mts_cubiertos >= desde && element.mts_cubiertos <= hasta) {
            //alert(tipo+" index "+contador);
            if (!arrayIndex.includes(contador)) {
                arrayIndex.push(contador);
            }
        }
        contador++;
    });
}
function obetenrIndicesPropiedadesMtsTotales(desde, hasta, arrayIndex) {
    var contador = 0;
    arrayPropiedades.forEach(function (element) {
        if (element.mts_totales >= desde && element.mts_totales <= hasta) {
            //alert(tipo+" index "+contador);
            if (!arrayIndex.includes(contador)) {
                arrayIndex.push(contador);
            }
        }
        contador++;
    });
}
function obetenrIndicesPropiedadesDeuda(desde, hasta, arrayIndex) {
    var contador = 0;
    arrayPropiedades.forEach(function (element) {
        if (element.deuda >= desde && element.deuda <= hasta) {
            //alert(tipo+" index "+contador);
            if (!arrayIndex.includes(contador)) {
                arrayIndex.push(contador);
            }
        }
        contador++;
    });
}
function obetnerPropiedadPor(partida){
    var retorno;
    arrayPropiedades.forEach(function (element) {
        if (element.partida == partida) {
            //alert(tipo+" index "+contador);
            retorno = element;
        }
       
    });
    return retorno;
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
    console.log("indice propietario: " + indicePropietario);
    var dniPropietario = arrayPropietarios[indicePropietario].dni;
    console.log("dni propietario: " + dniPropietario);
    var propietario = obtenerPersonaPor(dniPropietario);
    console.log("dni propietario: " + propietario.dni);

    $('#mpPropietario').text(propietario.nombres + ' ' + propietario.apellidos);
    $('#mpSexoEdadProp').text('Sexo: ' + propietario.sexo + ', ' + propietario.edad + ' años');

    var indicePropietario = obtenerIndicePropiedadPor(element.partida);
    console.log("indice propietario: " + indicePropietario);
    var dniPropietario = arrayPropietarios[indicePropietario].dni;
    console.log("dni propietario: " + dniPropietario);
    var propietario = obtenerPersonaPor(dniPropietario);
    console.log("dni propietario: " + propietario.dni);

    var personaResidente = obtenerPersonaPorResidencia(element.partida);
    console.log("dni residente: " + personaResidente.dni);

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
;
function agregarPropidadModal(propiedad){
    var divPropiedades=$('#mperPropiedades');
    var div=document.createElement("div");
    var divImg=document.createElement("div");
    var img=document.createElement("img");
    var divTexto=document.createElement("div");
    var h4=document.createElement("h4");
    var h5Partida=document.createElement("h5");
    var h5Direccion=document.createElement("h5");
    img.src="images/logoMini.png";
    h4.textContent="Propietario";
    h5Partida.textContent="Partida "+propiedad.partida;
    h5Direccion.textContent=propiedad.calle+' '+propiedad.altura+', '+propiedad.partido;
    div.className="col-lg-5 col-md-5 col-xs-5 col-sm-5";
    divImg.className="col-lg-6 col-md-6 col-xs-6 col-sm-6";
    divTexto.className="col-lg-6 col-md-6 col-xs-6 col-sm-6";
    divImg.append(img);
    divPropiedades.append(divImg);
    divTexto.append(h4);
    divTexto.append(h5Partida);
    divTexto.append(h5Direccion);
    
    div.append(divImg);
    div.append(divTexto);
    divPropiedades.append(div);
}
//FIN PROPIEDADES----------

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
        //console.log(element);
        marker.addListener('click', function (e) {
            showLugar(element);
        });
        marker.addListener('mouseover', function (e) {
            //console.log("mouseover: " + this.getTitle());
            infowindow.open(marker.get('map'), marker);
        });
        marker.addListener('mouseout', function (e) {
            //console.log("mouseout: " + this.getTitle());
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
            obtenerIndicesLugares($(this).val(), arrayIndexQuitar);
        } else {
            obtenerIndicesLugares($(this).val(), arrayIndexDejar);
        }
    });
//    console.log("dejar: "+arrayIndexDejar);
//    console.log("sacar: "+arrayIndexQuitar);
    borrarMarkers(arrayMarkerLugares);
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

function showLugar(element) {
    $('#idlugar').html('<img  class="center-block" src="images/' + element.tipo + '.png"  ><br>' + '<p class="text-center">Tipo: ' + element.tipo + '</p> <p class="text-center">Descripción: ' + element.descripcion + '</p>');
    $('#modalShowLugar').modal('show');
}
;
//FIN LUGARES----------

//MARKERS-----------------------------------------------------------------------
function restablecerMarkers(arrayIndex, arrayMarker) {
    arrayIndex.forEach(function (element) {
        arrayMarker[element].setMap(map);
    });
}
function borrarMarkers(arrayMarker) {
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
    borrarMarkers(arrayMarkerLugares);
    borrarMarkers(arrayMarkerPropiedades);
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
                arrayPropiedades = [];
                arrayPersonas = [];
                arrayPropietarios = [];
                arrayLugares = [];
                borrarMarkers(arrayMarkerPropiedades);
                borrarMarkers(arrayMarkerLugares);
                eliminarMarkers(arrayMarkerPropiedades);
                eliminarMarkers(arrayMarkerLugares);
                document.getElementById('filterPersonas').disabled = true;
                document.getElementById('filterPropiedades').disabled = true;
                document.getElementById('filterLugares').disabled = true;

            } else {
                array = JSON.parse(response);

                arrayPropiedades = array.propiedades;
                arrayPersonas = array.personas;
                arrayPropietarios = array.propietarios;
                arrayLugares = array.lugares;

                generarArrayMarkerPropiedades();
                cargarMarkers(arrayMarkerPropiedades);
                generarArrayMarkerLugares();
                cargarMarkers(arrayMarkerLugares);

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
//FIN GENERALES----------