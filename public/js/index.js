const host = 'http://localhost:8000';

window.addEventListener("load", function(event){
    fetch(`${host}/productos`)
    .then(function(response){
        return response.json();
    }).then(function(json){
        const mainIndex = document.getElementById("mainIndex");
        mainIndex.innerHTML = `
        <div class="jumbotron">   <!--Abre contenedor imagen fondo cabecera-->
        <header>
          <div class="wrap">
              <!-- Encabezado buscador -->
              <div class="input-group">
                  <input type="search" id="buscador" placeholder="!El que busca encuentra!"/>
                  <i class="bi bi-search"></i>
              </div>
              
    
              <!-- Botón carrito -->
                <button type="button"><a href="http://localhost:8000/html/carrito.html" class="btn" id="carrito">
                  <i class="bi bi-cart-fill"></i>Carrito<span>3</span></a></button>    
                      <!-- Encabezado logo -->
                      <a href="http://localhost:8000/index.html">        
                        <img src="/img/logo_vespa.png" class="logo" alt="Logo Oficial Vespa"/></a>
            </div>
        </header>
    
        <div  class="menu-header">
          <nav class="wrap"><!--Inicio contenedor navegador cabecera-->
                <div> <!--Contenedor navegador 1-->
                  <ul>
                    <li><a href="#">Productos</a></li>
                    <li><a href="#">Nosotros</a></li>
                    <li><a href="#">Contacto</a></li>
                  </ul>
                </div>
        
                <div> <!--Contenedor navegador 2-->
                  <ul>
                    <li><a href="#">Mis pedidos</a></li>
                    <li><a href="#">Logout</a></li>
                  </ul>
          </nav>
        </div>
    </div>  <!--Cierra contenedor imagen fondo cabecera-->
        <main>
          <section> <!--Contenedor jumbotron principal-->
            <div  class="wrap">
              <h1 id="h1-index">Novedades 2024</h1>
              <h3 class="h4">¡Descubre lo que Vespa tiene para tí!</h3>
              <button type="button" class="btn-block"><a href="#">Ver</a></button>
            </div>   
          </section>

        <section class="wrap"> <!--TARJETAS PRODUCTOS-->
    
                    <!-- ****** CONTENEDOR PRODUCTO UNO ******-->
        <div class="card-all"> 

              <div class="card"> <!--Contenedor DESCRIPCION producto 1-->
                  <div> <!--Contenedor imagen producto 1-->
                  <img src="/img/${json[0].nombre}.jpg" class="image" alt="Vespa Primavera" />
                  </div>
                
                    <div class="card-contenido"> <!--Descripción del productos 1-->
                      
                          <div class="precio">
                            <h2 class="h3">${json[0].nombre}</h2>
                            <div class="h3">${json[0].precio}<i class="bi bi-currency-euro m-color"></i></div>
                          </div>
                        
                        <div class="valoraciones"> <!--Contenedor valoración producto 1-->
                          <div class="valoraciones-positivas">
                            <i class="bi bi-star"></i>
                            <i class="bi bi-star"></i>
                            <i class="bi bi-star"></i>
                            <i class="bi bi-star"></i>
                          </div>

                          <div class="valoraciones-negativas">
                            <i class="bi bi-star"></i>
                          </div>
                        </div> <!--Cierre contenedor valoración producto 1-->

                        <p>${json[0].descripcion_corta}</p>
                      
                        <div class="card-botones"> <!--Contenedor botones del producto 1-->
                            <button type="button" class="btn" id="${json[0].id}"><a href="#">Añadir al carrito</a></button>
                            <button type="button" class="btn-secundario"><a href="#">Ver</a></button>
                        </div>
                  </div>
            </div> <!--Cierre contenedor DESCRIPCIÓN producto 1-->

            <div class="card"> <!--Contenedor DESCRIPCION producto 2-->
              <div> <!--Contenedor imagen producto 2-->
              <img src="/img/${json[1].nombre}.jpg" class="image" alt="Vespa Electrica" />
              </div>
            
                <div class="card-contenido"> <!--Descripción del productos 2-->
                  
                      <div class="precio">
                        <h2 class="h3">${json[1].nombre}</h2>
                        <div class="h3">${json[1].precio}<i class="bi bi-currency-euro m-color"></i></div>
                      </div>
                    
                    <div class="valoraciones"> <!--Contenedor valoración producto 2-->
                      <div class="valoraciones-positivas">
                        <i class="bi bi-star"></i>
                        <i class="bi bi-star"></i>
                        <i class="bi bi-star"></i>
                        <i class="bi bi-star"></i>
                        <i class="bi bi-star"></i>
                      </div>

                      <div class="valoraciones-negativas">
                        <!-- <i class="bi bi-star"></i> -->
                      </div>
                    </div> <!--Cierre contenedor valoración producto 2-->

                    <p>${json[1].descripcion_corta}</p>
                  
                    <div class="card-botones"> <!--Contenedor botones del producto 2-->
                        <button type="button" class="btn" id="${json[1].id}"><a href="#">Añadir al carrito</a></button>
                        <button type="button" class="btn-secundario"><a href="#">Ver</a></button>
                    </div>
              </div>
        </div> <!--Cierre contenedor DESCRIPCIÓN producto 2-->

        <div class="card"> <!--Contenedor DESCRIPCION producto 3-->
          <div> <!--Contenedor imagen producto 1-->
          <img src="/img/${json[2].nombre}.jpg" class="image" alt="Vespa Turbo GTU" />
          </div>
        
            <div class="card-contenido"> <!--Descripción del productos 3-->
              
                  <div class="precio">
                    <h2 class="h3">${json[2].nombre}</h2>
                    <div class="h3">${json[2].precio}<i class="bi bi-currency-euro m-color"></i></div>
                  </div>
                
                <div class="valoraciones"> <!--Contenedor valoración producto 3-->
                  <div class="valoraciones-positivas">
                    <i class="bi bi-star"></i>
                    <i class="bi bi-star"></i>
                    <i class="bi bi-star"></i>
                  </div>

                  <div class="valoraciones-negativas">
                    <i class="bi bi-star"></i>
                    <i class="bi bi-star"></i>
                  </div>
                </div> <!--Cierre contenedor valoración producto 3-->

                <p>${json[2].descripcion_corta}</p>
              
                <div class="card-botones"> <!--Contenedor botones del producto 3-->
                    <button type="button" class="btn" id="${json[2].id}"><a href="#">Añadir al carrito</a></button>
                    <button type="button" class="btn-secundario"><a href="#">Ver</a></button>
                </div>
          </div>
    </div> <!--Cierre contenedor DESCRIPCIÓN producto 3-->
        
        </div> <!--Cierre contenedor TODOS LOS PRODUCTOS-->
            
    </section> <!--Cierre section productos-->

     <!--Contenedor jumbotron accesorios-->
      <div  class="wrap">
        <h2 id="h1-index" class="h5">Adquieres los mejores accesorios para tu Vespa</h2>        
      </div>   
    
  
    <section class="wrap"> <!--TARJETAS PRODUCTOS ACCESORIOS-->
  
                  <!-- ****** CONTENEDOR ACCESORIO UNO ******-->
      <div class="card-all"> 

            <div class="card"> <!--Contenedor DESCRIPCION producto 1-->
                <div> <!--Contenedor imagen accesorio 1-->
                <img src="/img/${json[3].nombre}.jpg" class="image" alt="Casco Vespa" />
                </div>
              
                  <div class="card-contenido"> <!--Descripción del accesorio 1-->
                    
                        <div class="precio">
                          <h2 class="h3">${json[3].nombre}</h2>
                          <div class="h3">${json[3].precio}<i class="bi bi-currency-euro m-color"></i></div>
                        </div>
                      
                      <div class="valoraciones"> <!--Contenedor valoración producto 1-->
                        <div class="valoraciones-positivas">
                          <i class="bi bi-star"></i>
                          <i class="bi bi-star"></i>
                          <i class="bi bi-star"></i>
                          <i class="bi bi-star"></i>
                        </div>

                        <div class="valoraciones-negativas">
                          <i class="bi bi-star"></i>
                        </div>
                      </div> <!--Cierre contenedor valoración producto 1-->

                      <p>${json[3].descripcion_corta}</p>
                    
                      <div class="card-botones"> <!--Contenedor botones del producto 1-->
                          <button type="button" class="btn" id="${json[3].id}"><a href="#">Añadir al carrito</a></button>
                          <button type="button" class="btn-secundario"><a href="#">Ver</a></button>
                      </div>
                </div>
          </div> <!--Cierre contenedor DESCRIPCIÓN producto 1-->

          <div class="card"> <!--Contenedor DESCRIPCION producto 2-->
            <div> <!--Contenedor imagen producto 2-->
            <img src="/img/${json[4].nombre}.jpg" class="image" alt="Chaqueta Vespa" />
            </div>
          
              <div class="card-contenido"> <!--Descripción del productos 2-->
                
                    <div class="precio">
                      <h2 class="h3">${json[4].nombre}</h2>
                      <div class="h3">${json[4].precio}<i class="bi bi-currency-euro m-color"></i></div>
                    </div>
                  
                  <div class="valoraciones"> <!--Contenedor valoración producto 2-->
                    <div class="valoraciones-positivas">
                      <i class="bi bi-star"></i>
                      <i class="bi bi-star"></i>
                      <i class="bi bi-star"></i>
                      <i class="bi bi-star"></i>
                      <i class="bi bi-star"></i>
                    </div>

                    <div class="valoraciones-negativas">
                      <!-- <i class="bi bi-star"></i> -->
                    </div>
                  </div> <!--Cierre contenedor valoración producto 2-->

                  <p>${json[4].descripcion_corta}.</p>
                
                  <div class="card-botones"> <!--Contenedor botones del producto 2-->
                      <button type="button" class="btn" id="${json[4].id}"><a href="#">Añadir al carrito</a></button>
                      <button type="button" class="btn-secundario"><a href="#">Ver</a></button>
                  </div>
            </div>
      </div> <!--Cierre contenedor DESCRIPCIÓN producto 2-->

      <div class="card"> <!--Contenedor DESCRIPCION producto 3-->
        <div> <!--Contenedor imagen producto 1-->
        <img src="/img/${json[5].nombre}.jpg" class="image" alt="Guantes Vespa" />
        </div>
      
          <div class="card-contenido"> <!--Descripción del productos 3-->
            
                <div class="precio">
                  <h2 class="h3">${json[5].nombre}</h2>
                  <div class="h3">${json[5].precio}<i class="bi bi-currency-euro m-color"></i></div>
                </div>
              
              <div class="valoraciones"> <!--Contenedor valoración producto 3-->
                <div class="valoraciones-positivas">
                  <i class="bi bi-star"></i>
                  <i class="bi bi-star"></i>
                  <i class="bi bi-star"></i>
                </div>

                <div class="valoraciones-negativas">
                  <i class="bi bi-star"></i>
                  <i class="bi bi-star"></i>
                </div>
              </div> <!--Cierre contenedor valoración producto 3-->

              <p>${json[5].descripcion_corta}</p>
            
              <div class="card-botones"> <!--Contenedor botones del producto 3-->
                  <button type="button" class="btn" id="${json[5].id}"><a href="#">Añadir al carrito</a></button>
                  <button type="button" class="btn-secundario"><a href="#">Ver</a></button>
              </div>
        </div>
  </div> <!--Cierre contenedor DESCRIPCIÓN producto 3-->
      
      </div> <!--Cierre contenedor TODOS LOS PRODUCTOS-->
          
  </section> <!--Cierre section productos-->

  <section class="contenedor-testimonio"> <!--Contenedor testimonios clientes-->
      <div class="testimonio-global, testimonio-imagen"> <!--Descripción testimonios clientes-->
          <div class="testimonio">
            <h3>Testimonios de clientes</h3>
            <button type="button" class="btn"><a href="#">Ver todos</a></button>
          </div>

          <div class="cita-testimonio"> <!--Testimonios clientes-->
            <cite>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut molestiae
                ipsam odit sapiente autem nulla porro reprehenderit. Unde optio
                accusantium, nisi, vitae quos commodi aut porro similique, reiciendis
                libero quo!
            </cite>

            <div class="valoraciones"> <!--Contenedor valoración clientes-->
              <div class="valoraciones-positivas">
                <i class="bi bi-star"></i>
                <i class="bi bi-star"></i>
                <i class="bi bi-star"></i>
                <i class="bi bi-star"></i>
                <i class="bi bi-star"></i>
              </div>

              <div class="valoraciones-negativas">
                <!-- <i class="bi bi-star"></i>
                <i class="bi bi-star"></i> -->
              </div>
            </div> <!--Cierre contenedor valoración clientes-->

        
      </div> <!--Cierre testimonios clientes-->
    </div>

    </section> <!--Cierre contenedor testimonios clientes-->

<section class="wrap">
    <div class="contenedor-iconos"> <!--Contenedor Garantias y servicios ICONOS-->
        
        <div class="iconos"> <!--Pago seguro-->
          <i class="bi bi-cone-striped icono"></i>
          <div class="texto-icono">
            <h5>Pago seguro</h5>
            <p>100% garantizado</p>
          </div>
        </div>
      

        <div  class="iconos"> <!--Envío gratis-->
            <span><i class="bi bi bi-truck icono"></i></span>
            <div class="texto-icono">
                <h5>Envío gratis</h5>
                <p>En pedidos +100€</p>
            </div>
        </div>
    
      
        <div  class="iconos"> <!--2 años garantía-->
            <span><i class="bi bi-check-square-fill icono"></i></span>
            <div class="texto-icono">
                <h5>2 años de garantía</h5>
                <p>En todos los productos</p>
            </div>
        </div>
      
        <div class="iconos"> <!--Ofertas únicas-->
            <span><i class="bi bi-gift-fill icono"></i></span>
            <div class="texto-icono">
                <h5>Ofertas únicas</h5>
                <p>Precios de mayoristas</p>
            </div>
        </div>
    
    </div>  <!--Cierre contenedor Garantias y servicios-->
  </section>
  <footer class="jumbotron-footer">
    <div class="wrap-footer">  <!--Apertura contenedor general footer-->
    <div class="contenedor-footer-1"> <!--Inicio contenedor uno pie de página-->
        <div>
            <img src="/img/logo_vespa_blanco.png" class="image" alt="Logo Vespa Blanco" />
        </div>

        <div>
            <nav class="menu-footer-1"><!--Inicio contenedor navegador pie de página-->
                <div> <!--Contenedor navegador 1-->
                <ul>
                    <li><a href="#">Centro de ayuda</a></li>
                    <li><a href="#">Servicio al consumidor</a></li>
                    <li><a href="#">Contacto</a></li>
                </ul>
                </div>
        
                <div> <!--Contenedor navegador 2-->
                <ul>
                    <li><a href="#">Política de privacidad</a></li>
                    <li><a href="#">Condiciones de compra</a></li>
                    <li><a href="#">Aviso y política de cookies</a></li>
                    <li><a href="#">Opiniones de cliente</a></li>
                </ul>
                </div>
            </nav> <!--Cierre contededor navegador pie de página-->
        </div>
    </div> <!--Cierre contenedor uno pie de página-->

    <div class="contenedor-footer-2"> <!--Inicio contenedor dos pie de página-->
        
        <div> <!--ontenedor formulario newslatter pie de página-->
            <div>
                <h4>Únete a nuestras newletter y no te pierdas las novedades</h4>
            </div>

            <form>
                <input type="text" class="suscripcion" placeholder="Introduce tu email">
                <input type="submit" class="btn su" value="Suscribirme">
            </form>

            <div class="politica">
            <input type="checkbox" id="politicas" name="politicas" required>
            <label>Acepto las <a href="#">políticas de privacidad</a></label>
          </div>

        </div> 

        <div> <!--Contenedor redes sociales-->
            <div>
                <p class="h2 bold">Síguemos en redes sociales</p>
            </div>
            <div class="iconos-footer">
                <a href="#"><i class="bi bi-facebook"></i></a>
                <a href="#"><i class="bi bi-youtube"></i></a>
                <a href="#"><i class="bi bi-twitch"></i></a>
                <a href="#"><i class="bi bi-instagram"></i></a>
            </div>

        </div>
    </div> <!--Cierre contenedor uno pie de página-->
</div> <!--Cierre contenedor general footer-->
</footer>
<script src="/js/index.js"></script>
  
        `
    })
})