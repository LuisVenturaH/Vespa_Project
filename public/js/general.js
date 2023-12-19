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

// function para crear nueva compra
function nuevaCompra(){
    const cliente_id = localStorage.getItem('cliente_id')
    const pagado = 0
    // compra_id = json[0].compra_id
    // const producto_id = json[0].producto_id
    // const cantidad_producto = json[0].cantidad_producto
    // const precio = json[0].precio
    

    fetch(`${host}/nueva_compra`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({cliente_id, pagado})
    }).then(function(response){
        return response.json() // PUEDES HACER IF  PAGADO != 0, QUE AGREGUE LA COMPRA
    }).then(function(json){
        console.log(json)

        localStorage.setItem('compra_id', json.id)
        
        const compra_id = localStorage.getItem("compra_id")
            fetch(`${host}/agregar_carrito/${cliente_id}`,{
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({compra_id, producto_id, cantidad_producto, precio, cliente_id})
            }).then(function(response){
                return response.json()
            }).then(function(json){
                console.log(json)
            }).catch(function(error){
                console.error(error)
            })
    }) 
} 