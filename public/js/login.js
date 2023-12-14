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
    const email = document.getElementById("email_login").value;
    const password = document.getElementById("password_login").value;
    console.log(email, password);
     
    fetch(`${host}/login`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
   
    body: JSON.stringify({email: email, password: password})
    }).then(function(response){
        return response.json()
    }).then(function(json){
        console.log(json);

        alert(json.message);

        if (json.message === "Login correcto") {
            localStorage.setItem("Usuario", email);
            window.location.href = "/index.html"; // Con esto logramos que cuando un usuario se loguee se redireccione a la página de inicio
        }
    }).catch(function(error){
        console.log(error);
    })
}

// function login() {
//     const usuario = document.getElementById("usuario").value;
//     const contrasena = document.getElementById("contrasena").value;

//     if (usuario === "" || contrasena === "") {
//         alert("No has introducido usuario o contraseña correctamente. Vuelve a intentarlo");
//     } else {
//         alert("Registro correcto");
//         localStorage.setItem("Usuario", usuario);

//         // Redirecciona después de guardar en localStorage
//         window.location.href = "http://localhost:8000";

//         // Hacer la solicitud fetch para autenticación
//         fetch(`${host}/login`, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({
//                 email: usuario,
//                 password: contrasena
//             })
//         })
//         .then(response => response.json())
//         .then(data => {
//             console.log(data);
//         })
//         .catch(error => {
//             console.error("Error en la solicitud:", error);
//         });
//     }
// }


// TENGO QUE CRAR FUNCUION LOG OUT CON LOCALSTORAGE.CLEAR
// localStorage.clear()