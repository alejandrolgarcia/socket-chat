var socket = io();

var params = new URLSearchParams(window.location.search);

if (!params.has('nombre') || !params.has('sala')) {
    window.location = 'index.html';
    throw new Error('El nombre y sala son requeridos');
}

var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala'),
};

// on: escuchar sucesos
socket.on('connect', function() {
    // console.log('Conectado al servidor');

    socket.emit('entrarChat', usuario, function(resp) {
        // console.log('Usuarios conectados: ', resp);
        renderizarUsuarios(resp);
    });
});

// Cuando se pierde conexión con el servidor
socket.on('disconnect', function() {
    console.log('Conexion perdida con el servidor');
});

// emit: emitir mensajes
// socket.emit('enviarMensaje', {
//         usuario: 'Alejandro',
//         mensaje: 'Hola mundo',
//     },
//     function(resp) {
//         console.log('respuesta server: ', resp);
//     }
// );

// Escuchar información
socket.on('crearMensaje', function(mensaje) {
    // console.log('Servidor: ', mensaje);
    renderizarMensajes(mensaje, false);
    scrollBottom();
});

// Escuchar cambios de usuario
// Cuando un usuario entra o sale del chat

socket.on('listaPersona', function(personas) {
    // console.log(personas);
    renderizarUsuarios(personas);
});

// Mensajes privados
socket.on('mensajePrivado', function(mensaje) {
    // console.log('Mensaje privado: ', mensaje);
});