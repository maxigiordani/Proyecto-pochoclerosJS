

const form = document.getElementById("form");

const email = document.getElementById("email");


form.addEventListener("submit", e=>{
    e.preventDefault();
    checkInputs();
});

function checkInputs(){
   
    const emailValue = email.value.trim();
 
    if(emailValue === '') {
        setErrorFor(email, 'Debe ingresar un email.');}
        else if(!isEmail(emailValue)){ 
            setErrorFor(email, 'No es un email válido.')
        }
        else {
            setSuccessFor(email);
        }

       
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