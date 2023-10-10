const form = document.getElementById("registroForm");

const userName = document.getElementById("username");
const firstName = document.getElementById("name");
const lastName = document.getElementById("lastname");
const email = document.getElementById("email");
const pass = document.getElementById("password");
const notice = document.getElementById("warnings");

form.addEventListener("submit", (i) => {
  i.preventDefault();
  let warnings = "";
  let entrar = false;
  const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const regexLetters = /^[A-Za-z\s\-]+$/;
  const regexValidPass = /^[A-Za-z0-9]+$/;
  const regexUppercase = /[A-Z]/;
  const regexNumber = /[0-9]/;
  notice.innerHTML = "";
  if (userName.value.length < 5) {
    warnings += `El usuario es demasiado corto. <br>`;
    entrar = true;
  }
  if (!regexLetters.test(firstName.value)) {
    warnings += `El nombre no es válido. <br>`;
    entrar = true;
  }
  if (!regexLetters.test(lastName.value)) {
    warnings += `El apellido no es válido. <br>`;
    entrar = true;
  }
  if (!regexEmail.test(email.value)) {
    warnings += `El email no es válido. <br>`;
    entrar = true;
  }
  if (pass.value.length < 6) {
    warnings += `La contraseña es demasiado corta. <br>`;
    entrar = true;
  } else if (!regexValidPass.test(pass.value)) {
    warnings += `No uses simbolos ni signos en tu contraseña. <br>`;
    entrar = true;
  } else if (!regexUppercase.test(pass.value)) {
    warnings += `Usa mayúsculas en tu contraseña para mayor seguridad. <br>`;
    entrar = true;
  } else if (!regexNumber.test(pass.value)) {
    warnings += `Usa números en tu contraseña para mayor seguridad. <br>`;
    entrar = true;
  }

  if (entrar) {
    notice.innerHTML = warnings;
  } else {
    notice.innerHTML = "Tu cuenta ha sido creada";
  }
});