// const host = 'http://localhost:8000';

// TRAE LISTADO DE TARJETAS DEL DB PARA INSENTARLO EN EL DOM

window.addEventListener("load", function(event){
    const cliente_id = localStorage.getItem('cliente_id');
    fetch(`${host}/tarjetas/${cliente_id}`)
    .then(function(response){
        return response.json()
    })
    .then(function(json){
        // Trae nombre cliente del localStorage
        const nombre_guardado = localStorage.getItem("nombre");
        if(nombre_guardado){
            const nombre_cliente = document.getElementById('nombre_local_storage');
            nombre_cliente.innerHTML =  `<div id="nombre_local">Cliente: ${nombre_guardado} </div>`
        }

        const tarjetas_cliente = document.getElementById('tarjetas_registradas');
        if(json.length === 0){
            alert('No tienes tarjetas registradas');
        }
        else{
            for (let i = 0; i < json.length; i++){
                tarjetas_cliente.innerHTML += `
                <button type="button" class="btn selecciona-tarjeta"><a href="#">${json[i].numero_tarjeta}</a>
                `;
            }
        }
    })
    .catch(function(error){
        console.error(error)
    })
})

// Funcion para ocultar los números de la tarjeta y mostrar solo los últimos 4
function ocultarNumero (tarjeta){
    let numero_tarjeta = "";

    for (let i = 0; i < tarjeta.length; i++) {
        if (i < 12) {
            numero_tarjeta += "*";
        }
        else {
            numero_tarjeta += tarjeta[i];
        }
    }
    return tarjeta;
}

function registroNuevaTarjeta() {
    const nueva_tarjeta = document.getElementById("nueva_tarjeta").value;
    const nuevo_titular = document.getElementById("nuevo_titular").value;
    const tipo_tarjeta = document.getElementById("tipo_tarjeta").value; 
    const caducidad = document.getElementById("caducidad").value;
    const cvv = document.getElementById("cvv").value;

    if (nueva_tarjeta === "" || nuevo_titular === "" || tipo_tarjeta === "" || caducidad === "" || cvv === "") {
        alert("Has dejado uno de los campos en blanco. Favor completar la información");
    } else {
        alert("Tarjeta registrada correctamente");
        window.location.href = "http://localhost:8000/html/finalizar_compra.html";

        fetch(`${host}/nueva_tarjeta`, {
            method: "POST", 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nueva_tarjeta: nueva_tarjeta,
                nuevo_titular: nuevo_titular,
                tipo_tarjeta: tipo_tarjeta,
                caducidad: caducidad,
                cvv: cvv
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
        })
        .catch(error => {
            console.error("Error al registrar la tarjeta:", error); // sale este error al registrar tarjeta pero tarjeta de se registra en DB y pasa a Finalizar Compra
            alert("Error al registrar la tarjeta. Por favor, inténtelo de nuevo."); // sale este error al registrar tarjeta
        });
    }
}




//==========>>>> ENDOPOINT CLIENTES
                //==========>>>> AGREGAR DIRECCION DE ENVIO

function registroNuevaDirección () {
    const nombre = document.getElementById("nombre").value;
    const apellidos = document.getElementById("apellidos").value;
    const email = document.getElementById("email").value;
    const calle = dpocument.getElementById("calle");
    const numero = document.getElementById("numero").value;
    const provincia = document.getElementById("provincia").value;
    const codigo_postal = document.getElementById("codigo_postal").value;
    const pais = document.getElementById("pais").value;
                
    if (nombre === "" || apellidos === "" || email === "" || calle === "" || provincia === "" || codigo_postal === "" || pais === ""){
        alert ("Has dejado alguno de los campos en blanco. Rellene todos los campos")
    }
    else {
        alert ("Dirección completada correctamente");
                
        fetch(`${host}/direccion`, {
            method : "PUT",
            headers: {
                "content-type": "application/json"
            },
                
            body: JSON.stringify({
                nombre: nombre,
                apellidos: apellidos,
                email: email,
                calle: calle,
                numero: numero,
                provincia: provincia,
                codigo_postal: codigo_postal,
                pais: pais})
          })
       }
}

