const host = 'http://localhost:8000';

// TRAE LISTADO DE TARJETAS DEL DB PARA INSENTARLO EN EL DOM

window.addEventListener("load", function(event){

fetch(`${host}/tarjetas`)
.then(function(response){
    
    return response.json();
})
.then(function(json){
    const tarjetaContainerDiv = document.getElementById("tarjetas_registradas");
    tarjetaContainerDiv.innerHTML = '<div>';
    for (let i = 0; i < json.length; i++) {
        if (json[i] === 0) {
    alert("Debes seleccionar una tarjeta");
 } else {
    tarjetaContainerDiv.innerHTML += `
   
    <button type="button" class="btn selecciona-tarjeta"><a href="#" id="${json[i].id}">${json[i].numero_tarjeta}</a>
   `  
 }
 // Para guardar el numero de la tarjeta en la memoria de la aplicación
 let numero_tarjeta = `${json[i].numero_tarjeta}` ;

    localStorage.setItem("tarjeta", numero_tarjeta);

    }
    tarjetaContainerDiv += '</div>'
})
.catch(function(error){
    console.log(error);
})
})

// Funcion para ocultar los números de la tarjeta y mostrar solo los últimos 4
function ocultarNumero (numero_tarjeta){
    let nuevaTarjeta = "";

    for (let i = 0; i < numero_tarjeta.length; i++) {
        if (i < 12) {
            nuevaTarjeta += "*";
        }
        else {
            nuevaTarjeta += numero_tarjeta[i];
        }
    }
    return nuevaTarjeta;
}

function registroNuevaTarjeta () {
const nueva_tarjeta = document.getElementById("nueva_tarjeta").value;
const nuevo_titular = document.getElementById("nuevo_titular").value;
const tipo_tarjeta = document.getElementById("tipo_tarjeta");
const caducidad = document.getElementById("caducidad").value;
const cvv = document.getElementById("cvv").value;

if (nueva_tarjeta === "" || nuevo_titular === "" || tipo_tarjeta === "" || caducidad === "" || cvv === "") {
    alert("Has dejado uno de los campos en blanco. Favor completar la información");
}
else {
    alert ("tarjeta registrada correctamente");
    window.location.href = "http://localhost:8000/html/finalizar_compra.html";

    fetch(`${host}/nueva_tarjeta`,{
    metod : "POST",
    header: {
        "Content-Type": "application/json"
    },

    body: JSON.stringify({
        nueva_tarjeta: nueva_tarjeta,
        nuevo_titular: nuevo_titular,
        tipo_tarjeta: tipo_tarjeta,
        caducidad: caducidad,
        cvv: cvv})
});
};
};





