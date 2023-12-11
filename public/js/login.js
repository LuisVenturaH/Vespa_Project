const host = "http://localhost:8000";

// Funcion para crear nuevos registros (PROBADO Y FUNCIONA CORRECTAMENTE)
function registroNuevoUsuario() {
    const nombre = document.getElementById("nombre").value;
    const apellidos = document.getElementById("apellidos").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (nombre === "" || apellidos === "" || email === "" || password === "") {
        alert("Has dejado algún campo en blanco, favor completarlo para proceder con el registro");
    } else {
        alert("Registro completado correctamente");
        window.location.href = "http://localhost:8000/html/login.html";

        fetch(`${host}/nuevo_registro`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nombre: nombre,
                apellidos: apellidos,
                email: email,
                password: password
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error("Error en la solicitud:", error);
        });
    }
}

// Funcion para login (PROBADO Y FUNCIONA CORRECTAMENTE)
function login() {
    const usuario = document.getElementById("usuario").value;
    const contrasena = document.getElementById("contrasena").value;

    if (usuario === "" || contrasena === "") {
        alert("No has introducido usuario o contraseña correctamente. Vuelve a intentarlo");
    } else {
        alert("Registro correcto");
        localStorage.setItem("Usuario", usuario);

        // Redirecciona después de guardar en localStorage
        window.location.href = "http://localhost:8000/html/index.html";

        // Hacer la solicitud fetch para autenticación
        fetch(`${host}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: usuario,
                password: contrasena
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error("Error en la solicitud:", error);
        });
    }
}
