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
        return console.log(`error: ${error.message}`)
    }
    console.log('Conectado correctamente a MySQL');
});

app.listen(8000, function(){
    console.log('Server is UP and RUNNING!!!!')
});

// Función para controlar los error de MySQL
function handleSQLError(response, error, result, callback){
    if(error){
        response.static(400).send(`error ${error.message}`);
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


//==========>>>> ENDOPOINT PRODUCTOS

                //==========>>>> LLAMAR TODOS LOS PRODUCTOS
app.get('/productos', function(request, response){
    connection.query("SELECT * FROM productos", function(error, result, fields){
        handleSQLError(response, error, result, function(result){
            let productos = [];

            for (let i = 0; i < result.length; i++){
                productos[i] = result[i];
               console.log(result[i].id);
            }
            response.send(productos);
        })
    })
})

                //==========>>>> LLAMAR LOS PRODUCTOS POR ID
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

                //==========>>>> LLAMAR UN PRODUCTO POR SU NOMBRE
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

                //==========>>>>LLAMAR UN PRODUCTO POR SU PRECIO
app.get('/precioproducto/:id', function(request, response){
    const precioProducto = request.params.id;
    
    connection.query(`SELECT precio FROM productos WHERE id = "${precioProducto}"`, function(error, result, fileds){
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
