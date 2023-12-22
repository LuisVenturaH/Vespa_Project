// const host = "http://localhost:8000";
// Funcion para login y obtener cliente_id en localStorage (PROBADO Y FUNCIONA CORRECTAMENTE)

function login() {  
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value; 
    fetch(`${host}/login`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
   
    body: JSON.stringify({email, password})
    }).then(function(response){
        return response.json()
    }).then(function(json){
        console.log(json);

        alert(json.message);

        if (json.message === "Login correcto") {
            const cliente_id = json.cliente_id;
            console.log(cliente_id)
            const nombre = json.nombre;

            localStorage.setItem('cliente_id', cliente_id);
            localStorage.setItem('nombre', nombre);
            console.log('El cliente_id del localStorage es: ', cliente_id)
            window.location.href = "/index.html"; // Con esto logramos que cuando un usuario se loguee se redireccione a la página de inicio
        }
    })
    .catch(function(error){
        console.log(error);
    })
}


// Funcion para crear nuevos registros (PROBADO Y FUNCIONA CORRECTAMENTE)
function registroNuevoUsuario() {
    const nombre = document.getElementById("nombre").value;
    const apellidos = document.getElementById("apellidos").value;
    const email = document.getElementById("nuevo_email").value;
    const password = document.getElementById("nuevo_password").value;

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
            body: JSON.stringify({nombre, apellidos, email, password})
    }).then(function(response){
        return response.json()
    }).then(function(json){
        console.log(json);

        alert(json.message);

        if (json.message === "Login correcto") {
            localStorage.setItem('cliente_id', json.cliente_id);
            console.log('El cliente_id del localStorage es: ', json.cliente_id)
            window.location.href = "http://localhost:8000/html/login.html"; 
        }
    })
    .catch(function(error){
        console.log(error);
    })
}
}

