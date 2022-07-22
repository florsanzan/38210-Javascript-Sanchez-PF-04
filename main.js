//SIMULADOR DE COMPRAS

//STOCK DE LIBROS

class Libro {
  constructor(nombre, autor, precio, id, stock) {
    this.nombre = nombre;
    this.autor = autor;
    this.precio = precio;
    this.id = id;
    this.stock = stock;
  }
}

const libros = [];
libros.push(new Libro("Vermeer:La Obra Completa", "Karl Shutz", 5000, 01, 3));
libros.push(
  new Libro(
    "Eso no estaba en mi libros de matemáticas",
    "Vicente Meavilla",
    1500,
    02,
    25
  )
);
libros.push(new Libro("Bajo La misma Estrella", "John Green", 2500, 03, 10));

let temp = document.querySelector("template");
let caja = temp.content.querySelector("div");
let claseCajas = document.querySelector("section#caja");

for (let libro of libros) {
  let clonado = caja.cloneNode(caja, true);

  clonado.children[0].innerText = libro.nombre;
  clonado.children[1].innerText = libro.autor;
  clonado.children[2].innerText = "$" + libro.precio;

  claseCajas.appendChild(clonado);
}

class Carrito {
  constructor(nombre, total = 0 ) {
    this.nombre = nombre;
    this.total = total;
    this.productos = [];
  }

  hayStock(libro, unidades) {
    if (libro.stock != 0 && libro.stock >= unidades) {
      return true;
    }
    if (libro.stock == 0) {
      console.log("No hay mas en stock");
      return false;
    }
    if (libro.stock < unidades) {
      console.log("La cantidad ingresada excede el stock");
      return false;
    }
  }

  agregarItem(libro, unidades) {
    if (
      this.hayStock(libro, unidades) &&
      this.productos.find((el) => el.id == libro.id) == null
    ) {
      libro.stock -= unidades;
      libro.cantidad_comprada = unidades; // AGREGO CANTIDAD COMPRADA
      this.productos.push(libro);
    } else {
      return false;
    }
  }
}

const carrito = new Carrito();

const imgAdd = document.getElementsByClassName("foto");

imgAdd[0].onclick = () => {
  const idBuscado = 1;
  const elementoLibro = libros.find((elemento) => elemento.id == idBuscado);
  carrito.agregarItem(elementoLibro, 1);
};

let total = querySelector("#total");
let botones = querySelectorAll(".comprar");
let envio = 1000;
let valorIVA = 0.21;  

for (let i = 0; i < carrito.productos.length; i++) {
  total += carrito.productos[i].precio;
}

const iva = (x) => x * valorIVA;

let precioFinal = total + iva(total) + envio;

//MUESTRO POR CONSOLA TOTAL Y TOTAL CON MODIFICACIONES CORRESPONDIENTES
console.log("Total " + total);
console.log("Total con envio + IVA = " + precioFinal);
