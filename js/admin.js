
let peliculas = JSON.parse(localStorage.getItem('peliculas')) || [
    {
      codigo: 1,
      nombre: 'Pulp Fiction',
      categoria: 'Comedia',
      descripcion:
        'es una película estadounidense de 1994 escrita y dirigida por Quentin Tarantino.',
      publicado: true,
      destacada: true,
    },
    {
      codigo: 2,
      nombre: 'Bohemian Rhapsody',
      categoria: 'Drama',
      descripcion:
        'es una película biográfica británica-estadounidense de 2018 sobre el cantante británico Freddie Mercury.',
      publicado: true,
      destacada: false,
    },
    {
      codigo: 3,
      nombre: 'The Batman',
      categoria: 'Accion',
      descripcion:
        'narra los acontecimientos del vigilante Batman durante su segundo año luchando contra el crimen y la corrupción en Gotham City.',
      publicado: true,
      destacada: false,
    },
    {
      codigo: 4,
      nombre: 'Parasite',
      categoria: 'Drama',
      descripcion:
        'es una película surcoreana de drama, suspenso y humor negro del año 2019.',
      publicado: true,
      destacada: false,
    },
    {
      codigo: 5,
      nombre: 'Kung fu Panda',
      categoria: 'Animación',
      descripcion:
        'es una película de animación de aventura estadounidense-china de 2009, producida por el estudio Dreamworks Animation.',
      publicado: true,
      destacada: false,
    },
  ];
  
  
  function llenarTabla() {
    const tbody = document.querySelector('#tablaPeliculas tbody');
    tbody.innerHTML = ''; // Limpiar el contenido actual de la tabla
  
    for (const pelicula of peliculas) {
      const fila = tbody.insertRow();
  
      const celdas = [
        pelicula.codigo,
        pelicula.nombre,
        pelicula.categoria,
        pelicula.descripcion,
        pelicula.publicado ? 'Sí' : 'No',
        `<button class="btn btn-danger accion-borrar">Borrar</button>
         <button class="btn btn-warning accion-editar">Editar</button>
         <button class="btn btn-primary accion-destacar">⭐</button>`,
      ];
  
      for (let i = 0; i < celdas.length; i++) {
        const celda = fila.insertCell(i);
        celda.innerHTML = celdas[i];
      }
  
      if (pelicula.destacada) {
        fila.classList.add('destacada');
      }
    }
  }
  
  llenarTabla();
  
  const btnAgregar = document.getElementById('btnAgregar');
  const modalAgregarEditar = document.getElementById('modalAgregarEditar');
  const modalBody = document.querySelector('#modalAgregarEditar .modal-body');
  const tablaPeliculas = document.getElementById('tablaPeliculas');
  
 
  function actualizarLocalStorage() {
    localStorage.setItem('peliculas', JSON.stringify(peliculas));
  }
  
  btnAgregar.addEventListener('click', () => {
    modalBody.innerHTML = '';
  
    modalBody.innerHTML = `
      <label for="nombreNueva">Nombre:</label>
      <input type="text" id="nombreNueva" class="form-control mb-3">
      <label for="categoriaNueva">Categoría:</label>
      <input type="text" id="categoriaNueva" class="form-control">
      <label for="nuevadescripcion">Descripcion:</label>
      <input type="text" id="nuevadescripcion" class="form-control">
    `;
  
    const btnGuardar = document.createElement('button');
    btnGuardar.textContent = 'Guardar';
    btnGuardar.classList.add('btn', 'btn-primary');
    btnGuardar.addEventListener('click', () => {
      const nuevoNombre = document.getElementById('nombreNueva').value;
      const nuevaCategoria = document.getElementById('categoriaNueva').value;
      const nuevaDescripcion = document.getElementById('nuevadescripcion').value;
  
      if (
        nuevoNombre.trim() === '' ||
        nuevaCategoria.trim() === '' ||
        nuevaDescripcion === ''
      ) {
        alert('Por favor, completa todos los campos.');
        return;
      }
  
      const nuevaPelicula = {
        codigo: peliculas.length + 1,
        nombre: nuevoNombre,
        categoria: nuevaCategoria,
        descripcion: nuevaDescripcion,
        publicado: false,
        destacada: false,
      };
  
      peliculas.push(nuevaPelicula);
      llenarTabla();
      actualizarLocalStorage(); 
      modalAgregarEditar.style.display = 'none';
    });
  
    const cerrarBtn = document.querySelector('#modalAgregarEditar .close');
    cerrarBtn.addEventListener('click', () => {
      modalAgregarEditar.style.display = 'none';
    });
  
    window.addEventListener('click', (event) => {
      if (event.target === modalAgregarEditar) {
        modalAgregarEditar.style.display = 'none';
      }
    });
  
    const btnCancelar = document.createElement('button');
    btnCancelar.textContent = 'Cancelar';
    btnCancelar.classList.add('btn', 'btn-secondary');
    btnCancelar.addEventListener('click', () => {
      modalAgregarEditar.style.display = 'none';
    });
  
    modalBody.appendChild(btnGuardar);
    modalBody.appendChild(btnCancelar);
  
    modalAgregarEditar.style.display = 'block';
  });
  
  tablaPeliculas.addEventListener('click', (event) => {
    const botonDestacar = event.target;
    if (botonDestacar.classList.contains('accion-destacar')) {
      const fila = botonDestacar.closest('tr');
      const codigoPelicula = parseInt(fila.cells[0].innerText, 10);
  
      for (const pelicula of peliculas) {
        pelicula.destacada = false;
      }
  
      const peliculaDestacada = peliculas.find(
        (pelicula) => pelicula.codigo === codigoPelicula
      );
      if (peliculaDestacada) {
        peliculaDestacada.destacada = true;
      }
  
      llenarTabla();
      actualizarLocalStorage(); 
    }
  });
  
  tablaPeliculas.addEventListener('click', (event) => {
    const botonBorrar = event.target;
    if (botonBorrar.classList.contains('accion-borrar')) {
      const fila = botonBorrar.closest('tr');
      const codigoPelicula = parseInt(fila.cells[0].innerText, 10);
  
      const indicePelicula = peliculas.findIndex(
        (pelicula) => pelicula.codigo === codigoPelicula
      );
      if (indicePelicula !== -1) {
        peliculas.splice(indicePelicula, 1);
        llenarTabla();
        actualizarLocalStorage(); 
      }
    }
  });
  
  tablaPeliculas.addEventListener("click", (event) => {
    const botonEditar = event.target;
    if (botonEditar.classList.contains("accion-editar")) {
      const fila = botonEditar.closest("tr");
      const codigoPelicula = parseInt(fila.cells[0].innerText, 10);
  
      const peliculaAEditar = peliculas.find(
        (pelicula) => pelicula.codigo === codigoPelicula
      );
  
      if (peliculaAEditar) {
        modalBody.innerHTML = `
          <label for="nombre">Nombre:</label>
          <input type="text" id="nombre" value="${peliculaAEditar.nombre}" class="form-control mb-3">
          <label for="categoria">Categoría:</label>
          <input type="text" id="categoria" value="${peliculaAEditar.categoria}" class="form-control">
          <label for="descripcion">Descripción:</label>
          <input type="text" id="descripcion" value="${peliculaAEditar.descripcion}" class="form-control">
        `;
  
        const btnGuardar = document.createElement("button");
        btnGuardar.textContent = "Guardar";
        btnGuardar.classList.add("btn", "btn-primary");
        btnGuardar.addEventListener("click", () => {
          const nuevoNombre = document.getElementById("nombre").value;
          const nuevaCategoria = document.getElementById("categoria").value;
          const nuevaDescripcion = document.getElementById("descripcion").value;
  
          peliculaAEditar.nombre = nuevoNombre;
          peliculaAEditar.categoria = nuevaCategoria;
          peliculaAEditar.descripcion = nuevaDescripcion;
  
          llenarTabla();
  
          modalAgregarEditar.style.display = "none";
        });
  
        modalBody.appendChild(btnGuardar);
  
        modalAgregarEditar.style.display = "block";
      } else {
        alert("No se encontró la película a editar.");
      }
    }
    
  });
  