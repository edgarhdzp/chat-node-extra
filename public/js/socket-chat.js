var socket = io();

var params = new URLSearchParams(window.location.search);

if(!params.has('nombre')){
    window.location = 'index.html'
    throw new Error('el nombre es necesario')
}

var usuario = {
    nombre: params.get('nombre')
}

socket.on('connect', function() {
    console.log('Conectado al servidor');

    socket.emit('entrarChat', usuario, function(resp) {
        console.log('usuarios conectados', resp);
    })
});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


// Enviar información
// socket.emit('crearMensaje', {
//     usuario: 'More',
//     mensaje: 'Hola Mundo'
// }, function(resp) {
//     console.log('respuesta server: ', resp);
// });

// Escuchar información
socket.on('crearMensaje', function(mensaje) {

    console.log('Servidor:', mensaje);

});

//*cuando un user entra o sale del chat
socket.on('listaPersona', function(personas){
    console.log(personas);
});