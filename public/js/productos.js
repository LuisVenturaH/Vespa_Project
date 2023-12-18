// const host = 'http://localhost:8000';

// ESTO SIRVE PARA QUE TOME EL ID DE PRODUCTO AUTOMATICAMENTE
const params = new URLSearchParams(window.location.search);
let producto_id = params.get("producto_id");
console.log(producto_id);

    fetch('http://localhost:8000/productos',
    ).then(function(response){
        return response.json()
    }).then(function(json){
        const container = document.getElementById("producto_id")
    })