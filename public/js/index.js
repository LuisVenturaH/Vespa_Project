window.addEventListener("load", function(event){
    fetch(`${host}/productos`)
    .then(function(response){
        return response.json();
    }).then(function(json){
        // NOMBRE CLIENTE DE LOCALSTORAGE
        const nombre_guardado = localStorage.getItem('nombre');
        if(nombre_guardado){
            const nombre_cliente = document.getElementById("nombre_local_storage")
            nombre_cliente.innerHTML = `<div id="nombre_local">Hola ${nombre_guardado} </div>`
        }
     
        // PRODUCTO 1
        const producto_id1 = document.getElementById('producto_id1');
        producto_id1.innerHTML = `<span ${json[0].id}></span>`;

        const imagenProducto1 = document.getElementById("imagen_producto1");
        imagenProducto1.innerHTML = `<img src="/img/${json[0].nombre}.jpg" class="image" alt="Vespa Primavera"/>`

        const nombreProducto1 = document.getElementById("nombre_producto1");
        nombreProducto1.innerHTML = `<h2 class="h3">${json[0].nombre}</h2>`;

        const precioProducto1 = document.getElementById("precio_producto1");
        precioProducto1.innerHTML = `<div class="h3">${json[0].precio}<i class="bi bi-currency-euro m-color"></i></div>`;

        const descripcionProducto1 = document.getElementById("descripcion_producto1");
        descripcionProducto1.innerHTML = `<p>${json[0].descripcion_corta}</p>`

        // PRODUCTO 2
        const producto_id2 = document.getElementById('producto_id2');
        producto_id2.innerHTML = `<span ${json[1].id}></span>`;

        const imagenProducto2 = document.getElementById("imagen_producto2");
        imagenProducto2.innerHTML = `<img src="/img/${json[1].nombre}.jpg" class="image" alt="Vespa Primavera"/>`
   
        const nombreProducto2 = document.getElementById("nombre_producto2");
        nombreProducto2.innerHTML = `<h2 class="h3">${json[1].nombre}</h2>`;
   
        const precioProducto2 = document.getElementById("precio_producto2");
        precioProducto2.innerHTML = `<div class="h3">${json[1].precio}<i class="bi bi-currency-euro m-color"></i></div>`;
   
        const descripcionProducto2 = document.getElementById("descripcion_producto2");
        descripcionProducto2.innerHTML = `<p>${json[1].descripcion_corta}</p>`

        // PRODUCTO 3
        const producto_id3 = document.getElementById('producto_id3');
        producto_id3.innerHTML = `<span ${json[2].id}></span>`;

        const imagenProducto3 = document.getElementById("imagen_producto3");
        imagenProducto3.innerHTML = `<img src="/img/${json[2].nombre}.jpg" class="image" alt="Vespa Primavera"/>`
   
        const nombreProducto3 = document.getElementById("nombre_producto3");
        nombreProducto3.innerHTML = `<h2 class="h3">${json[2].nombre}</h2>`;
   
        const precioProducto3 = document.getElementById("precio_producto3");
        precioProducto3.innerHTML = `<div class="h3">${json[2].precio}<i class="bi bi-currency-euro m-color"></i></div>`;
   
        const descripcionProducto3 = document.getElementById("descripcion_producto3");
        descripcionProducto3.innerHTML = `<p>${json[2].descripcion_corta}</p>`

                // ACCESORIO 1
                const accesorio_id1 = document.getElementById('accesorio_id1');
                accesorio_id1.innerHTML = `<span ${json[3].id}></span>`;
        
                const imagenAccesorio1 = document.getElementById("imagen_accesorio1");
                imagenAccesorio1.innerHTML = `<img src="/img/${json[3].nombre}.jpg" class="image" alt="Vespa Primavera"/>`
        
                const nombreAccesorio1 = document.getElementById("nombre_accesorio1");
                nombreAccesorio1.innerHTML = `<h2 class="h3">${json[3].nombre}</h2>`;
        
                const precioAccesorio1 = document.getElementById("precio_accesorio1");
                precioAccesorio1.innerHTML = `<div class="h3">${json[3].precio}<i class="bi bi-currency-euro m-color"></i></div>`;
        
                const descripcionAccesorio1 = document.getElementById("descripcion_accesorio1");
                descripcionAccesorio1.innerHTML = `<p>${json[3].descripcion_corta}</p>`
        
                // ACCESORIO 2
                const accesorio_id2 = document.getElementById('accesorio_id2');
                accesorio_id2.innerHTML = `<span ${json[4].id}></span>`;

                const imagenAccesorio2 = document.getElementById("imagen_accesorio2");
                imagenAccesorio2.innerHTML = `<img src="/img/${json[4].nombre}.jpg" class="image" alt="Vespa Primavera"/>`
           
                const nombreAccesorio2 = document.getElementById("nombre_accesorio2");
                nombreAccesorio2.innerHTML = `<h2 class="h3">${json[4].nombre}</h2>`;
           
                const precioAccesorio2 = document.getElementById("precio_accesorio2");
                precioAccesorio2.innerHTML = `<div class="h3">${json[4].precio}<i class="bi bi-currency-euro m-color"></i></div>`;
           
                const descripcionAccesorio2 = document.getElementById("descripcion_accesorio2");
                descripcionAccesorio2.innerHTML = `<p>${json[4].descripcion_corta}</p>`
        
                // ACCESORIO 3
                const accesorio_id3 = document.getElementById('accesorio_id3');
                accesorio_id3.innerHTML = `<span ${json[5].id}></span>`;
                const imagenAccesorio3 = document.getElementById("imagen_accesorio3");
                imagenAccesorio3.innerHTML = `<img src="/img/${json[5].nombre}.jpg" class="image" alt="Vespa Primavera"/>`
           
                const nombreAccesorio3 = document.getElementById("nombre_accesorio3");
                nombreAccesorio3.innerHTML = `<h2 class="h3">${json[5].nombre}</h2>`;
           
                const precioAccesorio3 = document.getElementById("precio_accesorio3");
                precioAccesorio3.innerHTML = `<div class="h3">${json[5].precio}<i class="bi bi-currency-euro m-color"></i></div>`;
           
                const descripcionAccesorio3 = document.getElementById("descripcion_accesorio3");
                descripcionAccesorio3.innerHTML = `<p>${json[5].descripcion_corta}</p>`
     
    })
})


// const idProducto1 = document.getElementById("id_producto1");
// idProducto1.innerHTML = `${json[0].id}`;