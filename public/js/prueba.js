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