//SIMULADOR DE COMPRAS
let total = document.querySelector(".total");
let botones = document.getElementsByClassName("comprar");
//STOCK DE LIBROS

function Libro(nombre, autor, precio, id, stock, cant = 0) {
  this.nombre = nombre;
  this.autor = autor;
  this.precio = precio;
  this.id = id;
  this.stock = stock;
  this.cant = cant;

  this.hayStock = function () {
    if (this.stock > 0) {
      this.stock--;
      return true;
    }
    if (libros.stock == 0) {
      console.log("No hay mas en stock");
      return false;
    }
    if (libros.stock < cant) {
      console.log("La cantidad ingresada excede el stock");
      return false;
    }
  };
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
let caja = temp.content.querySelector("div"); // ESTE UTILIZO PARA AGREGARITEM
let claseCajas = document.querySelector("section#caja");

for (let libro of libros) {
  let clonado = caja.cloneNode(caja, true);

  clonado.children[0].innerText = libro.nombre;
  clonado.children[1].innerText = libro.autor;
  clonado.children[2].innerText = "$" + libro.precio;

  claseCajas.appendChild(clonado);
}

for (let i = 0; i < libros.length; i++) {
  botones[i].addEventListener("click", () => {
    comprar(libros[i]);
  });
}

function Carrito(nombre = "Usuario", total = 0) {
  this.nombre = nombre;
  this.total = total;
  this.productos = [];

  /*   hayStock(libro, unidades) {
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
  } */

  /*   agregarItem(libro, unidades) {
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
  } */

  this.agregarItem = function (libros) {
    if (libros.hayStock(libros)) {
      if (this.productos[libros.id] == undefined) {
        this.productos[libros.id] = libros;
      }
      this.productos[libros.id].cant++;
    } else {
      return console.log("No hay stock");
    }
    actualizar();
  };

  this.precioTotal = function () {
    let totalP = 0;
    for (producto of this.productos) {
      if (producto != undefined) {
        totalP += producto.precio * producto.cant;
      }
    }
    this.total = totalP;
    return totalP;
  };
}

let carrito;

if (sessionStorage.carrito == undefined) {
  carrito = new Carrito();
} else {
  carritoSS = JSON.parse(sessionStorage.carrito);
  carrito = new Carrito(carritoSS.nombre, carritoSS.total, carritoSS.productos);
  actualizar();
}

/* for (let i = 0; i < carrito.productos.length; i++) {
  total += carrito.productos[i].precio;
}

const iva = (x) => x * valorIVA;

let precioFinal = total + iva(total) + envio;
 */

function comprar(producto) {
  console.log(carrito);
  carrito.agregarItem(producto);
}

function actualizar() {
  total.textContent = `Total: ${carrito.precioTotal()}$`;
  sessionStorage.carrito = JSON.stringify(carrito);
}

/* let envio = 1000;
let valorIVA = 0.21;
 */
