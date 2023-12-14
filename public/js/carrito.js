const host = "http://localhost:8000";

// Función para agregar producto al carrito



// Funcion para pintar listado de productos del carrito en carritos.html (PROBADO Y FUNCIONA CORRECTAMENTE)

window.addEventListener("load", function(event) {
    fetch(`${host}/compras/1`)
        .then(function(response) {
            return response.json();
        })
        .then(function(json) {
            const productosCarrito = document.getElementById("productosCarrito");
            if (json.length === 0) {
                alert("No hay ningún artículo en el carrito de compras. Seleccione sus productos");
            } else {
                for (let i = 0; i < json.length; i++) {
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
                    `;
                }
            }
        })
        .catch(function(error) {
            console.log(error);
        });
});


// Funcion para pintar listado de productos agregados al carrito en finalizarcompra.html.  (PROBADO Y FUNCIONA CORRECTAMENTE)

window.addEventListener("load", function(event){
    fetch(`${host}/compras/1`)
        .then(function(response){
            return response.json();
        })
        .then(function(json){
            const carritoFinalizarCompra = document.getElementById("carritoFinalizarCompra");

            // Verificar si el carrito está vacío
            if (json.length === 0) {
                carritoFinalizarCompra.innerHTML = '<p>No hay ningún artículo en el carrito de compras. Seleccione sus productos.</p>';
            } else {
                // Mostrar los productos en el carrito
                json.forEach(item => {
                    carritoFinalizarCompra.innerHTML += `
                        <div class="cart-contenedor-descripcion"> <!--Abre contenedor-->
                            <div> <!--Imagen producto-->
                                <img src="/img/${item.nombre}.jpg" alt="Vespa Electrica" />
                            </div>
                                <p><span class="bold">${item.nombre}</span></p>
                                <div class="h4 cart-contenedor-descripcion">${item.precio}<i class="bi bi-currency-euro m-color"></i></div>
                            
                                <div class="cart-contenedor-interno">  
                                    <i class="bi bi-dash-square m-color"></i>
                                    <p>1</p>
                                    <i class="bi bi-plus-square m-color"></i>
                                    <i class="bi bi-trash3-fill"></i>    
                                </div>
                           
                        </div> <!--Cierra contenedor-->
                    `;
                });
            }
        })
        .catch(function(error){
            console.error("Error al cargar el carrito de compras:", error);
        });
});



// Función para traer el total de la compra (PROBADO Y FUNCIONA CORRECTAMENTE)

window.addEventListener("load", function(event) {
    fetch(`${host}/compratotal`)
        .then(function(response) {
            return response.json();
        })
        .then(function(json) {
            const compraTotalDiv = document.getElementById("compraTotal");
            const totalCompra = json.total || 0;

            compraTotalDiv.innerHTML = `
                <div class="h4 bold">
                    ${totalCompra} <i class="bi bi-currency-euro m-color"></i>
                </div>`;
        })
        .catch(function(error) {
            console.log(error);
        });
});

// Funcion para llevar la  información del usuario a la pasarela de pago    
window.addEventListener("load", function (event) {
    // Obtener información del carrito
    fetch(`${host}/compras/1`)
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            const carritoFinalizarCompra = document.getElementById("carritoFinalizarCompra");

            // Verificar si el carrito está vacío
            if (json.length === 0) {
                carritoFinalizarCompra.innerHTML = '<p>No hay ningún artículo en el carrito de compras. Seleccione sus productos.</p>';
            } else {
                // Mostrar los productos en el carrito
                json.forEach(item => {
                    carritoFinalizarCompra.innerHTML += `
                        <!-- Tu código existente para mostrar productos -->
                    `;
                });

                // Obtener información del usuario
                fetch(`${host}/clientes`)
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (usuario) {
                        // Ahora `usuario` contiene la información del usuario
                        console.log("Información del Usuario:", usuario);

                        // Aquí puedes hacer algo con la información del usuario,
                        // por ejemplo, mostrarla en algún lugar en tu página.
                    })
                    .catch(function (error) {
                        console.error("Error al obtener la información del usuario:", error);
                    });
            }
        })
        .catch(function (error) {
            console.error("Error al cargar el carrito de compras:", error);
        });
});

function agregarDatosCliente(){
    const nombre = document.getElementById("nombre").value;
    const apellidos = document.getElementById("apellidos").value;
    const email = document.getElementById("email").value;
    const calle = document.getElementById("calle").value;
    const numero = document.getElementById("numero").value;
    const provincia = document.getElementById("provincia").value;
    const codigo_postal = document.getElementById("codigo_postal").value;
    const pais = document.getElementById("pais").value;

    if(nombre === "" || apellidos === "" || email === "" || calle === "" || provincia === "" || codigo_postal === "" || pais === ""){
        alert("Has dejado algún dato incompleto. Favor completar el formulario")
    }
    else{
        console.log("Información registrada correctamente!!");
        window.location.href = "http://localhost:8000/html/finalizar_compra.html";

        fetch(`${host}/datos_cliente`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nombre: nombre,
                apellidos: apellidos,
                email: email,
                calle: calle,
                numero: numero,
                provincia: provincia,
                codigo_postal: codigo_postal,
                pais: pais
            })
        })
        .then(response=> response.json())
        .then(data=>{
            console.log(data);
        })
        .catch(error=>{
            console.error("Error al registrar datos de usuario", error);
        });
    }
}