document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault();
    validateForm();
  });

  function validateForm() {
    var nombre = document.getElementById('nombre').value;
    var email = document.getElementById('email').value;
    var comentario = document.getElementById('comentario').value;

    if (nombre.trim() === '') {
      alert('Por favor, ingresa tu nombre y apellido.');
      return;
    }

    if (email.trim() === '') {
      alert('Por favor, ingresa tu correo electrónico.');
      return;
    }

    if (comentario.trim() === '') {
      alert('Por favor, ingresa tu consulta.');
      return;
    }

    document.getElementById('contactForm').submit();
  }