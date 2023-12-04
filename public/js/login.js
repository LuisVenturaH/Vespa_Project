const host = "http://localhost:8000";

// Fucnion para crear nuevos registros
function registroNuevoUsario (){
    const nombre = document.getElementById("nombre").value;
    const apellidos = document.getElementById("apellidos").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    
    if (nombre === "" || apellidos === "" || email === "" || password === "") {
        alert("Has dejado algun campo en blanco, favor completarlo para proceder el registro");
    }
    else{
        alert("Registro completado correctamente");
        window.location.href = "http://localhost:8000/html/index.html"

        fetch(`${host}/nuevo_registro`, {
            method: "POST",
            headers: {
                "Content-Type": "applicaction/json"
            },
            body: JSON.stringify({
                nombre: nombre,
                apellidos: apellidos,
                email: email,
                password: password
            })
        })
    }
}

// Funcion para login
function login (){
    const usuario = document.getElementById("usuario").value;
    const contrasena = document.getElementById("contrasena").value;
    
    if (usuario === "" || contrasena === "") {
        alert("No has introducido usuario o contraseña correctamente. Vuelve a intentarlo");
    }
    else{
        alert("registro correcto");
        localStorage.setItem("Usuario", usuario)
        window.location.href = "http://localhost:8000/html/index.html"

        fetch(`${host}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "applicaction/json"
            },
            body: JSON.stringify({
                email: usuario,
                password: contrasena
            })
        });
    }
}