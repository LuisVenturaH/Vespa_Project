const host = 'http://localhost:8000';

// Función para agregar el número de la cantidad de productos al carrito
window.addEventListener("storage", function(event){
    const cliente_id = localStorage.getItem("cliente_id");
    fetch(`${host}/cantidad_productos/${cliente_id}`)
        .then(function(response){
            return response.json();
        })
        .then(function(json){
            const cantidad_productos_carrito = document.getElementById('cantidad_producto_carrito');
            cantidad_productos_carrito.innerHTML = `<span>${json.total_productos}</span>`;
            console.log(json.total_productos)
        })
})


// Función para pintar el total de artículos dentro del carrito

window.addEventListener("load", function(event){
    const cliente_id = localStorage.getItem('cliente_id')
    fetch(`${host}/total_articulos/${cliente_id}`)
    
    .then(function(response) {
        return response.json();
    })
    .then(function(json){
        const articulos_carrito = document.getElementById("articulos_carrito");
        const articulos = json.total || 0;
        articulos_carrito.innerHTML =`
        <button type="button"  class="btn" ><a href="http://localhost:8000/html/carrito.html" id="carrito">
        <i class="bi bi-cart-fill"></i>Carrito<span>${articulos}</span></a></button> 
        `
    })
    .catch(function(error){
        console.log(error);
    })
})