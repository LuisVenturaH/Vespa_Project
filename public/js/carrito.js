function ocultarNumero (tarjeta){
    let nuevaTarjeta = "";

    for (let i = 0; i < tarjeta.length; i++) {
        if (i < 12) {
            nuevaTarjeta += "*";
        }
        else {
            nuevaTarjeta += tarjeta[i];
        }
    }
    return nuevaTarjeta;
}