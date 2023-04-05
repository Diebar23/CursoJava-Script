class Pelicula {

    constructor(titulo, director, anio, genero, valoracion, id) {
        this.titulo = titulo;
        this.director = director;
        this.anio = parseInt(anio);
        this.genero = genero;
        this.valoracion = parseInt(valoracion);
        this.id = id;
    }

    asignarId(array) {
        this.id = array.length;
    }

    valorar(valoracion) {
        this.valoracion = valoracion;
    }


}

const peliculas = [
    new Pelicula ('El Origen', 'Christopher Nolan', 2010, 'Ciencia Ficcion', 6, 1),
    new Pelicula ('Avatar', 'James Cameron', 2009, 'Ciencia Ficcion', 10, 2),
    new Pelicula ('Batman el Caballero de la noche', 'Christopher Nolan', 2208, 'Accion', 9, 3),
    new Pelicula ('Bastardos sin Gloria', 'Quentin Tarantino', 2009, 'Comedia', 8, 4),
    new Pelicula ('Gran Torino', 'Clint Eastwood', 2008, 'Drama', 7, 5),
    new Pelicula ('La la land', 'Damien Chazelle', 2016, 'Musical', 8, 6),
    new Pelicula ('El secreto de sus ojos', 'Juan Jose Campanella', 1937, 'Thriller', 10, 7)
]

console.log(peliculas);


// Pedir que se ingresen Peliculas nuevas y sumarlas al array //
let continuar = true;

while (continuar) {
    let ingreso = prompt('Ingresa los datos de la pelicula: titulo, director, año, género, puntaje de 1 a 10, separados por una barra diagonal (/). Ingresa X para finalizar');

    if (ingreso.toUpperCase() == 'X') {
        continuar = false;
        break;
    }

    let datos = ingreso.split('/');
    const pelicula = new Pelicula(datos[0], datos[1], datos[2], datos[3], datos[4]);

    peliculas.push(pelicula);

    pelicula.asignarId(peliculas);

    console.log(peliculas)
} 


// Ordenar el array de acuerdo a lo que se elija //

let criterio = prompt('Elegí el criterio deseado:\n1 - Título (A a Z) \n2 - Título (Z a A)\n3 - Mejor a peor puntuado \n4 - Fecha de publicación (Más viejo a más nuevo)');

function ordenar(criterio, array) {
    let arrayOrdenado = array.slice(0);


    switch (criterio) {
        case '1':
            let nombreAscendente = arrayOrdenado.sort((a,b)=>a.titulo.localeCompare(b.titulo));
            return nombreAscendente;
        case '2':
            let nombreDescendente = arrayOrdenado.sort((a, b) => b.titulo.localeCompare(a.titulo));
            return nombreDescendente;
        case '3':
            return arrayOrdenado.sort((a, b) => b.valoracion - a.valoracion);
        case '4':
            return arrayOrdenado.sort((a, b) => a.anio - b.anio);
        default:
            alert('No es un criterio válido');
            break;
    }
}


function crearStringResultado(array){
    let info = '';

    array.forEach(elemento=>{
        info += 'Título: ' + elemento.titulo + '\nDirector: ' + elemento.director + '\nAño de publicación: ' + elemento.anio + '\nValoración: ' + elemento.valoracion + ' puntos.\n\n'
    })

    return info;
}


alert(crearStringResultado(ordenar(criterio,peliculas)));



// Filtrar Peliculas de acuerdo al director //
let directorElegido = prompt('Escribí el nombre del director para que te mostremos sus peliculas');

const filtrado = peliculas.filter((pelicula)=>pelicula.director.toLowerCase().includes(directorElegido.toLowerCase()))


// Mostrar Peliculas filtradas de acuerdo al director //

if (filtrado.length==0){
    alert('Lo sentimos. No encontramos coincidencias en nuestro catálogo');
}else{
    const imprimible = filtrado.map((pelicula)=>pelicula.titulo);
    alert('Las peliculas de nuestro catálogo, de directores que coinciden parcial o totalmente con esta búsqueda, son:\n- ' + imprimible.join('\n- '));
}