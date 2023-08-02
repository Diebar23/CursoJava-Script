//Fake Databases de Usuarios y Productos (En el mundo real esto está en una DB que es accedida a través del backend)
const usuarios = [{
    nombre: 'Diego',
    mail: 'diegobarbas@mail.com',
    pass: 'DB1234'
},
{
    nombre: 'Camila',
    mail: 'camiladr@mail.com',
    pass: 'CDR1975'
},
{
    nombre: 'pedro',
    mail: 'pedrobere@mail.com',
    pass: 'LaAcade2001'
}]

const productos = [{
    nombre: "Hamburguesa Clasica",
    marca: "Paty",
    precio: 850,
    img: './img/Hamburguesa Paty.jpg'
}, {
    nombre: "Hamburguesa Clasica",
    marca: "Swift",
    precio: 800,
    img: './img/Hamburguesa Swift.jpg'
}, {
    nombre: "Medallon de Pollo",
    marca: "Swift",
    precio: 750,
    img: './img/Medallon de pollo Swift.jpg'
}, {
    nombre: "Milanesa de Soja",
    marca: "Swift",
    precio: 700,
    img: './img/Milanesa de soja Swift.jpg'
}]


//Todos los elementos del DOM que voy a necesitar
const mailLogin = document.getElementById('emailLogin'),
    passLogin = document.getElementById('passwordLogin'),
    recordar = document.getElementById('recordarme'),
    btnLogin = document.getElementById('login'),
    modalEl = document.getElementById('modalLogin'),
    modal = new bootstrap.Modal(modalEl),
    contTarjetas = document.getElementById('tarjetas'),
    toggles = document.querySelectorAll('.toggles');

//La función de validar se aprovecha del tipo de return que hace el método find (el objeto si lo encuentra, o undefined si no encuentra ninguno que cumpla con la condición)
function validarUsuario(usersDB, user, pass) {
    let encontrado = usersDB.find((userDB) => userDB.mail == user);

    //console.log('Usuario encontrado por validate '+ typeof isFound);
    if (typeof encontrado === 'undefined') {
        return false;
    } else {
        //si estoy en este punto, quiere decir que el mail existe, sólo queda comparar la contraseña
        if (encontrado.pass != pass) {
            return false;
        } else {
            return encontrado;
        }
    }
}

//Guardamos los datos que recuperamos de la database en el storage
function guardarDatos(usuarioDB, storage) {
    const usuario = {
        'name': usuarioDB.nombre,
        'user': usuarioDB.mail,
        'pass': usuarioDB.pass
    }

    storage.setItem('usuario', JSON.stringify(usuario));
}

//Cambio el DOM para mostrar el nombre del usuario logueado, usando los datos del storage
function saludar(usuario) {
    nombreUsuario.innerHTML = `Bienvenido/a, <span>${usuario.name}</span>`
}

//Limpiar los storages
function borrarDatos() {
    localStorage.clear();
    sessionStorage.clear();
}

//Recupero los datos que se guardaron y los retorno
function recuperarUsuario(storage) {
    let usuarioEnStorage = JSON.parse(storage.getItem('usuario'));
    return usuarioEnStorage;
}


//Esta función revisa si hay un usuario guardado en el storage, y en ese caso evita todo el proceso de login 
function estaLogueado(usuario) {

    if (usuario) {
        saludar(usuario);
        mostrarInfoProducto(productos);
        presentarInfo(toggles, 'd-none');
    }
}

//Esta función nos permite intercambiar la visualización de los elementos del DOM, agregando o sacando la clase d-none. Si el elemento la tiene, se la saco, y si no la tiene, se la agrego. La gata Flora de las funciones sería.
function presentarInfo(array, clase) {
    array.forEach(element => {
        element.classList.toggle(clase);
    });
}

//Creo HTML dinámico para mostrar la información de los productos a partir del array fake DB
function mostrarInfoProducto(array) {
    contTarjetas.innerHTML = '';
    array.forEach(element => {
        let html = `<div class="card cardProducto" id="tarjeta${element.nombre}">
                <h3 class="card-header" id="nombreProducto">Producto: ${element.nombre}</h3>
                <img src="${element.img}" alt="${element.nombre}" class="card-img-bottom" id="fotoProducto">
                <div class="card-body">
                    <p class="card-text" id="marcaProducto">Marca: ${element.marca}</p>
                    <p class="card-text" id="precioProducto">Precio $: ${element.precio}</p>
                </div>
            </div>`;
        contTarjetas.innerHTML += html;
    });
}

//Eventos - Acciones de los botones
btnLogin.addEventListener('click', (e) => {
    e.preventDefault();

    //Validamos que ambos campos estén completos
    
    //Revisamos si el return de la función validate es un objeto o un boolean. Si es un objeto, fue una validación exitosa y usamos los datos. Si no, informamos por alert.
        let data = validarUsuario(usuarios, mailLogin.value, passLogin.value);

        if (!data) {
            alert(`Usuario y/o contraseña erróneos`);
        } else {

            //Revisamos si elige guardar la info aunque se cierre el navegador o no
            if (recordar.checked) {
                guardarDatos(data, localStorage);
                saludar(recuperarUsuario(localStorage));
            } else {
                guardarDatos(data, sessionStorage);
                saludar(recuperarUsuario(sessionStorage));
            }
            //Recién ahora cierro el cuadro de login
            modal.hide();
            //Muestro la info para usuarios logueados
            mostrarInfoProducto(productos);
            presentarInfo(toggles, 'd-none');
        }

});


btnLogout.addEventListener('click', () => {
    borrarDatos();
    presentarInfo(toggles, 'd-none');
});

window.onload = () => estaLogueado(recuperarUsuario(localStorage)); 

