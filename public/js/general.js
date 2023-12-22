const host = 'http://localhost:8000';
// Función para desconectarse
function logout() {
    fetch(`${host}/logout`, {
        method: "POST",
        headers: {
            "Content-Type": "application-json"
        },
        
    }) .then(response => response.json())
    .then(data=>{
        localStorage.clear();
        console.log(data.message);
        window.Location.href = 'http://localhost:8000';
    
    }).catch(error=>{
        console.error('Error al desconectarse');
})
}

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
function nuevaCompra() {
    const cliente_id = localStorage.getItem('cliente_id');
    const compra_id_guardada = localStorage.getItem('compra_id');
    const producto_id = document.getElementById('producto_id1');
    const cantidad_producto = 1;
    const precio = document.getElementById('precio_producto1');
    const pagado = 0;
    
    // Si no hay compra_id en el Storage, se crea una nueva compra
    if (!compra_id_guardada) {
        fetch(`${host}/nueva_compra/${cliente_id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ cliente_id, pagado }),
        })
        .then(response => response.json())
        .then(json => {
            const nuevaCompraId = json.insertId;
            console.log('ID de la nueva compra:', nuevaCompraId);
            localStorage.setItem('compra_id', nuevaCompraId);

            // La nueva compra también se agrega a compra_productos
            agregarAlCarrito(nuevaCompraId, producto_id, cantidad_producto, precio, cliente_id);
        })
        .catch(error => {
            console.error('Error al crear nueva compra:', error);
        });
    } else {
        // Si hay una compra_id en Storage, se agrega al carrito en tabla compra_productos
        const compra_id = localStorage.getItem('compra_id');
        agregarAlCarrito(compra_id, producto_id, cantidad_producto, precio, cliente_id);
    }
}

function agregarAlCarrito(compra_id, producto_id, cantidad_producto, precio, cliente_id) {
    nuevaCompra_id = localStorage.getItem('compra_id')
    fetch(`${host}/agregar_carrito/${cliente_id}/${nuevaCompra_id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            compra_id,
            producto_id,
            cantidad_producto,
            precio,
            cliente_id,
        }),
    })
    .then(response => response.json())
    .then(json => {
        console.log('Respuesta al agregar al carrito:', json);
    })
    .catch(error => {
        console.error('Error al agregar al carrito:', error);
    });
}

