const form = document.getElementById("form");
const usuario = document.getElementById("nombreusuario");
const email = document.getElementById("email");
const password = document.getElementById("password");

form.addEventListener("submit", e=>{
    e.preventDefault();
    checkInputs();
});


function login() {
    var user, pass;

    user = document.getElementById("nombreusuario").value;
    pass = document.getElementById("password").value;

        if (user =="adminsoy" && pass == "RollingCode"){
            window.location= "administrador.html";
        }

}

function checkInputs(){
    const usuarioValue = usuario.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
 
    if(usuarioValue === '') {
        setErrorFor(usuario, "Debe ingresar un usuario.");}
        else {
        setSuccessFor(usuario);
    }

    if(emailValue === '') {
        setErrorFor(email, 'Debe ingresar un email.');}
        else if(!isEmail(emailValue)){ 
            setErrorFor(email, 'No es un email válido.')
        }
        else {
            setSuccessFor(email);
        }

        if(passwordValue === '') {
            setErrorFor(password, "Debe ingresar una contraseña.");
        }
        else { setSuccessFor(password);}

    function setErrorFor(input, message){
        const formControl = input.parentElement;
        const small = formControl.querySelector('small');
        formControl.className = 'formcontrol error';
        small.innerText = message;
}
}
function setSuccessFor(input){
    const formControl = input.parentElement;
    formControl.className = 'formcontrol success';
}

function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}
