function addProducto(productoid) {
  let usuarioid = localStorage.getItem("usuarioid");
  let cantidad = 1;
  //if dentro de añadir al carrito para ver si tiene ya compraid o no.
  //AQUI LE DIGO SI EL LOCALSTORAGE DE COMPRAID ESTA VACIO Y ME DEVUELVE NULL METO TODO EL CODIGO DE ABAJO Y SINO (mirar)
   let comprobacion  = localStorage.getItem("compraid");
      if(comprobacion == null) {
    //Fetch metido uno dentro de otro EL QUE DEPENDE DEL OTRO VA DENTRO
    //SI  COMPRAID ESTA VACIA INSERTAME UNA LINEA DE COMPRAS------------------------------------------------------------------------------
      fetch(`http://localhost:8000/nuevacompra/${usuarioid}`, {
          method:"POST",
          headers: {
          "Content-Type":"application/json"
      },
      body: JSON.stringify({usuarioid:usuarioid})
      }).then(function(response) {
          return response.json()
      }).then(function(json) {
          //obtiene el id de la compranueva mediante lo que devuelve de MySQL
          localStorage.setItem("compraid",json.insertId)
          fetch(`http://localhost:8000/compraproducto/${usuarioid}`,  {
              method:"POST",
              headers: {
              "Content-Type":"application/json"
              },
          body: JSON.stringify({usuarioid:usuarioid , compraid:json.insertId , productoid:productoid , cantidad:cantidad})
          }).then(function(response) {
              return response.json()
          }).then(function(json) {
              console.log(json)
          //    localStorage.setItem("compraproductoid",json.insertId)
          toastconfiguration.showToast();
          if (urlcarrito.includes("carrito")) {
              setTimeout(function(){
                  window.location.reload()
              },1000)
          }
          }).catch(function(error) {
              console.log(error)
          });
      }).catch(function(error) {
          console.log(error.message);
      });
      } else {//y si la compra ya esta creada  tiene que actualizar compraproducto si es el mismo producto y sino crear una nueva compraproducto
           let compraid = localStorage.getItem("compraid");
          console.log(compraid);
          console.log(productoid);
          console.log(usuarioid);
          fetch(`http://localhost:8000/comprobar?compraid=${compraid}&productoid=${productoid}`,
          ).then(function(response) {
              return response.json()
          }).then(function(json) {
              if(json.length > 0) {
                  fetch(`http://localhost:8000/cantidad`, {
                      method:"POST",
                      headers: {
                      "Content-Type":"application/json"
                      },
                  body: JSON.stringify({usuarioid:usuarioid , compraid:compraid, productoid:productoid , cantidad:cantidad})
                  }).then(function(response) {
                      return response.json()
                  }).then(function(json) {
                      toastconfiguration.showToast();
                      spancarrito()
                      let urlcarrito = window.location.href;
                      if (urlcarrito.includes("carrito")) {
                          toastconfiguration.showToast();
                          setTimeout(function(){
                              window.location.reload()
                          },500)
                          }
                  }).catch(function(error) {
                      console.log(error.message)
                  })
              } else {
                  console.log(compraid);
                  console.log(productoid);
                  fetch(`http://localhost:8000/compraproducto/${usuarioid}`,  {
                      method:"POST",
                      headers: {
                      "Content-Type":"application/json"
                      },
                  body: JSON.stringify({usuarioid:usuarioid , compraid:compraid, productoid:productoid , cantidad:cantidad})
                  }).then(function(response) {
                      return response.json()
                  }).then(function(json) {
                      toastconfiguration.showToast();
                      spancarrito()
                      let urlcarrito = window.location.href;
                      if (urlcarrito.includes("carrito")) {
                          setTimeout(function(){
                              window.location.reload()
                          },500)
                          }
                  }).catch(function(error) {
                      console.log(error)
                  });
              }
          }).catch(function(error) {
              console.log(error.message)
          })
     };
    //Preguntar en clase el primero no lo hace bien
  };