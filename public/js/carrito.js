const host = "http://localhost:8000";

// Funcion para pintar listado de productos del carrito en carritos.html

window.addEventListener("load", function(event){
    fetch(`${host}/compras/1`)

    .then(function(response){
        return response.json();
    })
    .then(function(json){
        const productosCarrito = document.getElementById("productosCarrito");
        // productosCarrito.innerHTML = '<div>';
        for (let i = 0; i < json.length; i++){
            if(json[i] === 0){
                alert("No hay ningún artículo en el carrito de compras. Seleccione sus producto")
            }
            else {
                productosCarrito.innerHTML += `
               
                    <div class="cart-contenedor-descripcion"> <!--Abre contenedor-->
                        <div> <!--Imagen producto-->
                            <img src="/img/${json[i].nombre}.jpg" alt="Vespa Electrica" />
                        </div>
                        <div class="cart-contenedor-descripcion">
                            <p><span class="bold">${json[i].nombre}</span> ${json[i].especificaciones}</p>
                            <div class="h4 cart-contenedor-descripcion">${json[i].precio}<i class="bi bi-currency-euro m-color"></i></div>
                        </div>
                        <div class="cart-contenedor-interno">  
                            <i class="bi bi-dash-square m-color"></i>
                            <p>1</p>
                            <i class="bi bi-plus-square m-color"></i>
                            <i class="bi bi-trash3-fill"></i>    
                        </div>
                    </div> <!--Cierra contenedor-->
               
                `
            }
        }
        // productosCarrito += '</div>'
    })
    .catch(function(error){
        console.log(error);
    })
})



// Funcion para pintar listado de productos agregados al carrito en finalizarcompra.html

window.addEventListener("load", function(event){
    fetch(`${host}/compras/1`)

    .then(function(response){
        return response.json();
    })
    .then(function(json){
        const carritoFinalizarCompra = document.getElementById("carritoFinalizarCompra");
        for (let i = 0; i < json.length; i++){
            if(json[i] === 0){
                alert("No hay ningún artículo en el carrito de compras. Seleccione sus producto")
            }
            else {
                carritoFinalizarCompra.innerHTML += `
               
                    <div class="cart-contenedor-descripcion"> <!--Abre contenedor-->
                        <div> <!--Imagen producto-->
                            <img src="/img/${json[i].nombre}.jpg" alt="Vespa Electrica" />
                        </div>
                        <div class="cart-contenedor-descripcion">
                            <p><span class="bold">${json[i].nombre}</span></p>
                            <div class="h4 cart-contenedor-descripcion">${json[i].precio}<i class="bi bi-currency-euro m-color"></i></div>
                        </div>
                        <div class="cart-contenedor-interno">  
                            <i class="bi bi-dash-square m-color"></i>
                            <p>1</p>
                            <i class="bi bi-plus-square m-color"></i>
                            <i class="bi bi-trash3-fill"></i>    
                        </div>
                    </div> <!--Cierra contenedor-->
               
                `
            }
        }
    })
    .catch(function(error){
        console.log(error);
    })
})



// Función para traer el total de la compra

window.addEventListener("load", function(event){
    fetch(`${host}/compratotal`)
    .then(function(response){
        return response.json();
    })
    .then(function(json){
        const compraTotalDiv = document.getElementById("compraTotal");
        compraTotalDiv.innerHTML = `<div class="h4 cart-contenedor-descripcion">${json.total} <i class="bi bi-currency-euro m-color"></i></div>`;
    })
    .catch(function(error){
        console.log(error);
    });
});


