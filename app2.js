const express = require('express');
const mysql = require('mysql2');
const app = express();

app.use(express.static('public'));
app.use(express.json());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Lv++2023+',
    database: 'project_vespa'
});

connection.connect(function(error){
    if(error) {
        return console.error(`error: ${error.message}`)
    }
    console.log('Conectado correctamente a MySQL');
});

// Función para controlar los error de MySQL
function handleSQLError(response, error, result, callback) {
    if (error) {
        response.status(400).send(`error ${error.message}`);
        return;
    }
    callback(result);
}

// ===========>>>>> Z O N A  E N D P O I N T <<<<================ \\

//==========>>>> ENDOPOINT CARRUSEL

app.get(`/carrusel`, function(request, response){
    connection.query("SELECT * FROM carrusel", function(error, result, fields){
        handleSQLError(response, error, result, function(result){
            let carrusel = [];

            for (let i = 0; i < result.length; i++){
                carrusel[i] = result[i];
                console.log(result[i].id);
            }
            response.send(carrusel);
        })
    })
})


//==========>>>> ENDOPOINT REGISTRO USUARIO
                //==========>>>> LOGUEARSE Y OBTENER CLIENTE_ID EN LOCALSTORAGE

app.post('/login', function(request, response) {
    const email = request.body.email;
    const password = request.body.password;

    connection.query('SELECT id FROM clientes WHERE email = ? AND password = ?', [email, password], function(error, result, fields) {
    handleSQLError(response, error, result, function(result){

        if (result.length > 0 && result[0].id) {
            response.json({message: "Login correcto", cliente_id: result[0].id}); 
        }  
        else {
            response.status(400).json({message: "Email o password incorrecto"});
        }
    })
 }) 
})

                    //==========>>>> REGISTRO NUEVOS CLIENTES
app.post('/nuevo_registro', function(request, response){
    const nombre = request.body.nombre;
    const apellidos = request.body.apellidos;
    const email = request.body.email;
    const password = request.body.password;
 
    connection.query(`INSERT INTO clientes (nombre, apellidos, email, password) VALUES (?, ?, ?, ?)`, 
    [nombre, apellidos, email, password], function(error, result, fields){
        if (error){
            console.log("Error al insertar usuario", error);
            response.status(500).send({message: "Error al insertar usuario"});
            return;
        }
        else {
            console.log("Registro completado correctamente");
        }
    })
})

//==========>>>> ENDOPOINT PRODUCTOS

                //==========>>>> OBTENER TODOS LOS PRODUCTOS
app.get('/productos', function(request, response){
    connection.query("SELECT * FROM productos", function(error, result, fields){
        handleSQLError(response, error, result, function(result){
            let productos = [];

            for (let i = 0; i < result.length; i++){
                productos[i] = result[i];
               
            }
            response.send(productos);
        })
    })
})

                //==========>>>> OBTENER DETALLE DE UN PRODUCTOS
app.get('/productos/:id', function(request, response){
    const productoId = request.params.id;

    connection.query(`SELECT * FROM productos where id = "${productoId}"`, function(error, result, fields){
        handleSQLError(response, error, result, function(result){
            if (result.length == 0){
                response.send({});
            }
            else {
                response.send(result[0]);
                console.log(result[0])
            };
           
        });
    });
});

                //==========>>>> OBTENER UN PRODUCTO POR SU NOMBRE
app.get('/nombreproducto/:id', function(request, response){
    const nombreProducto = request.params.id;

    connection.query(`SELECT nombre FROM productos WHERE id = "${nombreProducto}"`, function(error, result, fields){
        handleSQLError(response, error, result, function(result){
            if (result.length == 0) {
                response.send({});
            }
            else {
                response.send(result[0]);
            }
        })
    })
})

                //==========>>>> OBTENER PRECIO DE UN PRODUCTO
app.get('/precioproducto/:id', function(request, response){
    const precioProducto = request.params.id;
    
    connection.query(`SELECT precio FROM productos WHERE id = "${precioProducto}"`, function(error, result, fields){
        handleSQLError(response, error, result, function(result){
            if (result.length == 0) {
                response.send({});
            }
            else {
                response.send(result[0]);
    }
        })
    })

})



//==========>>>> ENDOPOINT COMPRA
                //==========>>>>OBTENER COMPRA DESDE DB
app.get('/compras/:id', function(request, response) {
const comprasId = request.params.id;

connection.query('SELECT productos.id, productos.nombre, productos.precio, productos.descripcion_corta, productos.especificaciones, compra_productos.compra_id FROM productos JOIN compra_productos ON productos.id = compra_productos.producto_id WHERE compra_productos.compra_id = ?', 
[comprasId], function(error, result, fields) {
 handleSQLError(response, error, result, function(result) {
    let carrito_compra = [];
    for (let i = 0; i < result.length; i++){
        carrito_compra[i] = result[i];
    }
    response.send(carrito_compra);
 });
 });
});
             

                //==========>>>>OBTENER RESUMEN TOTAL COMPRA DESDE DB
app.get('/compratotal', function(request, response){
    connection.query(`SELECT compra_id, SUM(total) AS total_precio FROM compra_productos WHERE compra_id = 1 GROUP BY compra_id`,
        function(error, result, fields){
            handleSQLError(response, error, result, function(result){
                if (result.length > 0) {
                    let totalPrecio = parseInt(result[0].total_precio);                    
                    response.send({ total: totalPrecio });
                   } else {
                    response.send({ total: 0 });
                    console.log("No hay resultados para la compra especificada");
                }
            });
        }
    );
});


//==========>>>> ENDOPOINT TARJETAS DE CREDITO
                                //==========>>>>OBTENER DATOS DE TARJETAS




                                //==========>>>>OBTENER TARJETAS DE CRÉDITO POR ID
app.get(`/tarjetas/:cliente_id`, function(request, response){
const cliente_id = request.params.cliente_id;

    connection.query(`SELECT * FROM metodo_pago WHERE cliente_id = ?`, [cliente_id], function(error, result, fields){
        handleSQLError(response, error, result, function(result){
         let tarjetas = [];
         for (let i = 0; i < result.length; i++){
            tarjetas[i] = result[i];
         }
         response.json(tarjetas);
        })
    })
})

                                //==========>>>>REGISTRAR NUEVA TARJETA
app.post('/nueva_tarjeta', function(request, response){
    const nueva_tarjeta = request.body.nueva_tarjeta;
    const nuevo_titular = request.body.nuevo_titular;
    const tipo_tarjeta = request.body.tipo_tarjeta;
    const caducidad = request.body.caducidad;
    const cvv = request.body.cvv;

    connection.query('INSERT INTO metodo_pago (numero_tarjeta, titular, tipo, caducidad, cvv) VALUES (?, ?, ?, ?, ?)',
    [nueva_tarjeta, nuevo_titular, tipo_tarjeta, caducidad, cvv], function(error, result, fields){
        if(error){
            console.error('Error al introducir nueva tarjeta', error);
            response.status(500).send({message: 'Error al registrar nueva tarjeta'});
            return;
        }
        console.log('Tarjeta registrada correctamente');
    });
});


//==========>>>> ENDOPOINT CLIENTES

                        //==========>>>> OBTENER DATOS CLIENTES RELACIONADO CON COMPRA_ID
app.get('/clientes/:compra_id', function(request, response){
const cliente_id = request.params.cliente_id;
const nombre = request.params.nombre;
const apellidos = request.params.apellidos;
const email = request.params.email;
const calle = request.params.calle;
const numero = request.params.numero;
const provincia = request.params.provincia;
const codigo_postal = request.params.codigo_postal;
const pais = request.params.pais;
const telefono = request.params.telefono;
const compra_id = request.params.compra_id;
const producto_id = request.params.producto_id;
const precio = request.params.recio;
const total = request.params.total;

                        
connection.query(`SELECT clientes.id, clientes.nombre, clientes.apellidos, clientes.email, clientes.calle,
clientes.numero, clientes.provincia, clientes.codigo_postal, clientes.pais,
clientes.telefono, compra_productos.compra_id, compra_productos.producto_id, compra_productos.precio, compra_productos.total, metodo_pago.numero_tarjeta
FROM clientes 
JOIN compras 
ON clientes.id = compras.cliente_id 
JOIN compra_productos 
ON clientes.id = compra_productos.cliente_id 
JOIN metodo_pago
ON clientes.id = metodo_pago.cliente_id`, function(error, result, fields){
handleSQLError(response, error, result, function(result){
    if (result.length == 0){
        response.send({});
    }
    else {
        response.send(result[0]);
    };
});
console.log(`${result[0].producto_id} en linea 291 app.js`)
});
});

                        //==========>>>> AGREGAR DATOS DIRECCION DE ENVIO
app.put('/datos_cliente',function(request, response){
    const nombre = request.body.nombre;
    const apellidos = request.body.apellidos;
    const email = request.body.email;
    const calle = request.body.calle;
    const numero = request.body.numero;
    const provincia = request.body.provincia;
    const codigo_postal = request.body.codigo_postal;
    const pais = request.body.pais;

    connection.query(`INSERT INTO clientes (nombre, apellidos, email, calle, numero, provincia, codigo_postal, pais) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [nombre, apellidos, email, calle, numero, provincia, codigo_postal, pais], function(error, result, fields){
        if(error){
            console.error("Error al insertar los datos", error);
            response.status(500).send({message: "Error al ingresar dirección"});
            return;
        }
        console.log("Datos agregados correctamente");
    });
});


                    //==========>>>> AGREGAR CANTIDAD PRODUCTO
app.get(`/cantidad_producto/:compra_id`, function(request, response){
    const compra_id = request.params.compra_id;
    const cantidad_producto = request.params.cantidad_producto;

connection.query(`SELECT * FROM compra_productos WHERE compra_id = "${compra_id}"`, function(error, result, fields){
handleSQLError(response, error, result, function(error){

// for (let i = 0; i < result.length; i++){
//     cantidad_producto[i] = result[i];
    
//   }
//   response.send(cantidad_producto)
//   console.log(cantidad_producto)

if (result.length == 0 ){
    response.send({});
}
else{
    response.send(result[0]);   
}
})
})
})

//==========>>>> AGREGAR UN PRODUCTO AL CARRITO. METODO POST. RUTA CARRITO/AGREGAR. FUNCION agregarAlCarrito
app.post(`/agregar_carrito/`, function(request, response){
    const cliente_id = request.body.id;
   
    connection.query(`INSERT into compras WHERE id = "${id_producto}"`, function(error, result, fields){
    handleSQLError(response, error, result, function(error){
        if(result.length === 0){
            response.send({});
        }
        else{
            response.send(result[0]);
            console.log(result[0].id)
        }
    })
    })
})



//==========>>>> VER CONTENIDO DEL CARRITO. METODO GET. RUTA CARRITO/. FUNCION verCarrito

//==========>>>> ELIMINAR PRODUCTO DEL CARRITO. METODO DELETE. RUTA CARRITO/:ID_PRODUCTO. FUNCION eliminarDelCarrito

//==========>>>> REALIZAR COMPRA. METODO POST. RUTA COMPRA/REALIZAR. FUNCION realizarCompra



/*  SEGUN ANOTACIONES DE ANA, HAY QUE CREAR:
ENDPOINT finalizar comrpa. Get/finalizarcompras/:id que devuelve la forma de pago de un usurio

INTERFAZ DE USUARIO
Crear un archivo finalizarcompra.js y definir las funciones al cargar al pagina. 


*/

// PARA GUARDAR TARJETA EN UN LOCALSTORAGE Y USAR EN PÁGINA SIGUIENTE;

// En página pasarela de pago
// function seleccionarTarjeta (numerotarjeta) {
// localStorage.setItem("numeroTarjeta", numerotarjeta);
// };

// En página realizar compra.html
// function mostrarTarjeta() {
//     const numeroTarjeta = localStorage.getItem(localStorage, "numeroTarjeta");
// };

// CIERRA EXPLICACION DE FUNCIONES PARA GUARDAR LOCAL STORAGE TARJETA

app.listen(8000, function(){
    console.log('Server is UP and RUNNING!!!!')
});
