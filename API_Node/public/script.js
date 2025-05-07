document.getElementById('formRegistro').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const usuario = document.getElementById('usuarioRegistro').value;
    const contrasena = document.getElementById('contrasenaRegistro').value;
  
    const respuesta = await fetch('/registro', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usuario, contrasena })
    });
  
    const resultado = await respuesta.json();
    document.getElementById('mensaje').innerText = resultado.mensaje;
  });
  
  document.getElementById('formLogin').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const usuario = document.getElementById('usuarioLogin').value;
    const contrasena = document.getElementById('contrasenaLogin').value;
  
    const respuesta = await fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usuario, contrasena })
    });
  
    const resultado = await respuesta.json();
    document.getElementById('mensaje').innerText = resultado.mensaje;
  });
  