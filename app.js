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
                //==========>>>> OBTENER USUARIO


app.get(`/usuarios`, function(request, response){
    connection.query("SELECT * FROM clientes", function(error, result, fields){
    handleSQLError(response, error, result, function(result){
    let usuarios = [];
                
    for (let i = 0; i < result.length; i++){
    usuarios[i] = result[i];     
}
    response.send(usuarios);
    })
 })
})

app.post('/login', function(request, response){
    const email = request.body.email;
    const password = request.body.password;
    connection.query(`SELECT * FROM clientes WHERE email = "${email}" and password = "${password}"`, function(error, result, fields){
        handleSQLError(response, error, result, function(result){
            if(result.length == 0) {
                response.send({message: "Email o password incorrectos"});
            }
            else {
                response.send({message: "Login correcto"});
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
    connection.query(`INSERT INTO clientes (nombre, apellidos, email, password) VALUES (?, ?, ?, ?)`, [nombre, apellidos, email, password], function(error, result, fields){
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
app.get('/tarjetas', function(request, response){
    connection.query(`SELECT * FROM metodo_pago`, function(error, result, fields){
        handleSQLError(response, error, result, function(result){
         let tarjetas = [];
         for (let i = 0; i < result.length; i++){
            tarjetas[i] = result[i];
         }
         response.send(tarjetas);
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
const cliente_id = request.params.clientes.cliente_id;
const nombre = request.params.cliente.nombre;
const apellidos = request.params.clientes.apellidos;
const email = request.params.clientes.email;
const calle = request.params.clientes.calle;
const numero = request.params.clientes.numero;
const provincia = request.params.clientes.provincia;
const codigo_postal = request.params.clientes.codigo_postal;
const pais = request.params.clientes.pais;
const telefono = request.params.compras.telefono;
const compra_id = request.params.compra_producto.compra_id;
const producto_id = request.params.compra_producto.producto_id;
const precio = request.params.compra_producto.precio;
const total = request.params.compra_producto.total;

                        
connection.query(`SELECT clientes.id, clientes.nombre, clientes.apellidos, clientes.email, clientes.calle,
clientes.numero, clientes.provincia, clientes.codigo_postal, clientes.pais,
compras.telefono, compra_productos.compra_id, compra_productos.producto_id, compra_productos.precio, compra_productos.total
FROM clientes 
JOIN compras 
ON clientes.id = compras.usuario_id 
JOIN compra_productos 
ON clientes.id = compra_productos.usuario_id 
JOIN metodo_pago
ON clientes.id = metodo_pago.usuario_id`, function(error, result, fields){
handleSQLError(response, error, result, function(result){
    if (result.length == 0){
        response.send({});
    }
    else {
        response.send(result[0]);
    };
});
});
});

                        //==========>>>> AGREGAR DIRECCION DE ENVIO
app.put('/direccion',function(request, response){
    const nombre = request.body.nombre;
    const apellidos = request.body.apellidos;
    const email = request.body.emal;
    const calle = request.body.calle;
    const numero = request.body.numero;
    const provincia = request.body.provincia;
    const codigo_postal = request.body.codigo_postal;
    const pais = request.body.pais;

    connection.query(`INSERT INTO clientes (nombre, apellidos, email, calle, numero, provincia, codigo_postal, pais) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [nombre, apellidos, email, calle, numero, provincia, codigo_postal, pais], function(error, result, fields){
        if(error){
            console.error("Error al insertar la dirección, error");
            response.status(500).send({message: "Error al ingresar dirección"});
            return;
        }
        console.log("Dirección agregada correctamente");
    });
});


//==========>>>> AGREGAR UN PRODUCTO AL CARRITO. METODO POST. RUTA CARRITO/AGREGAR. FUNCION agregarAlCarrito

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
