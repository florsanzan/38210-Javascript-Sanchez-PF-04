class Usuario {
  constructor(nombre, email, pass) {
    this.nombre = nombre;
    this.email = email;
    this.pass = pass;
  }
}

const usuarios = [];
let inputEnviar = document.getElementById("submit");

inputEnviar.onclick = () => {
  let inputNombre = document.getElementById("nombre").value;
  let inputEmail = document.getElementById("email").value;
  let inputPass = document.getElementById("pass").value;

  usuarios.push(new Usuario(inputNombre, inputEmail, inputPass));

  console.log(usuarios);
};

let miFormulario = document.getElementById("form");
miFormulario.addEventListener("submit", validarFormulario);

function validarFormulario(f) {
  f.preventDefault();
  console.log("Formulario Entregado");
}

document.getElementById("submit").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    validarFormulario(e);
  }
});
