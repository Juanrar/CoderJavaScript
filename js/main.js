const seccionCatalogo = document.querySelector("#contenedor-catalogo");
const grillaJuegos = document.querySelector(".grilla-juegos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector(".titulo-principal")

let productos = [];

const seccionCarrito = document.querySelector("#contenedor-carrito");
const grillaCarrito = document.querySelector(".grilla-carrito")
const productosCarrito = [];
const contadorCarrito = document.querySelector(".carrito-numero");
const totalCarrito = document.querySelector(".total-numero");
const botonCarrito = document.querySelector(".boton-carrito");
const botonFinalizar = document.querySelector(".boton-finalizar")

async function traerJuegos(){
    try{
        const respuesta = await fetch("./data/juegos.json");
        const datos = await respuesta.json();
        productos =  datos;
    }catch(error){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "no pudimos cargar los juegos, probá recargar la página",
        });
    }
}

function cargarProductos(productosCategoria) {
    grillaJuegos.innerHTML = "";
    productosCategoria.forEach(producto =>{
        const agotado = producto.stock === 0;
        const tarjetaJuego = document.createElement("div");
        tarjetaJuego.classList.add("producto");
        tarjetaJuego.innerHTML= `
            <img class="producto-imagen" src="${producto.imagen_url}" alt="${producto.titulo}">
                <div class="producto-detalles">
                    <h3 class="producto-titulo">${producto.titulo}</h3>
                    ${ agotado ? "" : `<p class="producto-stock">Quedan ${producto.stock}</p>`}
                    <p class="producto-precio">${formatearPrecio(producto.precio)}</p>
                    <button class="boton-agregar" ${ agotado ? "disabled" : ""} id="${producto.id}">${ agotado ? "Sin stock" : "Agregar"}</button>
                </div>
        `;
        grillaJuegos.append(tarjetaJuego);
    })
    actualizarBotonesProducto();
}

function formatearPrecio(precio){
    return new Intl.NumberFormat("de-DE", { style: "currency", currency: "USD" }).format(precio)
}

async function inicio(){
    await traerJuegos();
    cargarProductos(productos);
    restaurarCarrito();
}

botonesCategorias.forEach(boton =>{
    boton.addEventListener("click",(e) => mostrarCatalogo(e.target.dataset.categoria))
})

function actualizarBotonesProducto(){
    const botonesAgregar = document.querySelectorAll(".boton-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    })
}

function agregarAlCarrito(e){
    //el carrito y el catálogo tienen que ser estados independientes, porque cantidad es información del carrito y porque el carrito se serializa a localStorage.
    const idProducto = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idProducto);
    const indice = productosCarrito.findIndex(producto => producto.id === idProducto);
    const cantidadActual = indice !== -1 ? productosCarrito[indice].cantidad : 0;

    if (cantidadActual >= productoAgregado.stock){
        Swal.fire({ icon: "warning", title: "Stock insuficiente" });
        return;
    }

    if(indice !== -1){
        productosCarrito[indice].cantidad++;
    } else{
        productosCarrito.push({
            id: productoAgregado.id,
            titulo: productoAgregado.titulo,
            imagen_url: productoAgregado.imagen_url,
            precio: productoAgregado.precio,
            cantidad: 1
        });
    } 
    actualizarContadorCarrito()
    if(seccionCatalogo.classList.contains("oculta")){
        cargarCarrito()
    }
    guardarCarrito();
}

function restarDelCarrito(e){
    const idProducto = e.currentTarget.id;
    const indice = productosCarrito.findIndex(producto => producto.id === idProducto);
    productosCarrito[indice].cantidad--;
    if(productosCarrito[indice].cantidad === 0){
        productosCarrito.splice(indice, 1);
    }
    actualizarContadorCarrito()
    if(seccionCatalogo.classList.contains("oculta")){
        cargarCarrito()
    }
    guardarCarrito()
}

function actualizarBotonesCarrito(){
    const botonesCarritoSuma = document.querySelectorAll(".boton-sumar");
    const botonesCarritoResta = document.querySelectorAll(".boton-restar");

    botonesCarritoSuma.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    })

    botonesCarritoResta.forEach(boton => {
        boton.addEventListener("click", restarDelCarrito);
    })
}

function actualizarContadorCarrito(){
    let cantidadTotal = productosCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    contadorCarrito.innerText = cantidadTotal;
}

botonCarrito.addEventListener("click",(e) =>{
    seccionCarrito.classList.remove("oculta");
    seccionCatalogo.classList.add("oculta");
    cargarCarrito();
})

function cargarCarrito() {
    grillaCarrito.innerHTML="";
    productosCarrito.forEach(producto =>{

        const itemCarrito = document.createElement("div");
        itemCarrito.classList.add("carrito");
        itemCarrito.innerHTML= `
            <img class="carrito-imagen" src="${producto.imagen_url}" alt="${producto.titulo}">
                <div class="carrito-detalles">
                    <h3 class="carrito-titulo">${producto.titulo}</h3>
                    <p class="carrito-precio">${formatearPrecio(producto.precio)}</p>
                    <div class="carrito-control-cantidad">
                        <button class="boton-restar" id="${producto.id}">−</button>
                        <span class="carrito-cantidad">${producto.cantidad}</span>
                        <button class="boton-sumar" id="${producto.id}">+</button>
                    </div>
                </div>
        `;
        grillaCarrito.append(itemCarrito);
    });
    actualizarTotalCarrito();
    actualizarBotonesCarrito();
}

function actualizarTotalCarrito(){
    let total = productosCarrito.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0);
    totalCarrito.innerText = formatearPrecio(total);
}

function guardarCarrito(){
    localStorage.setItem("carrito",JSON.stringify(productosCarrito))
}

function restaurarCarrito(){
    const guardado =  localStorage.getItem("carrito");
    if(guardado === null){
        return
    }
    const carritoGuardado = JSON.parse(guardado);
    productosCarrito.push(...carritoGuardado);
    actualizarContadorCarrito();
}

botonFinalizar.addEventListener("click",(e)=>{
    let cantidadProductos = productosCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    if(cantidadProductos === 0 ){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No tienes ningun producto",
        });
    }else{
        Swal.fire({
            title: "Estas seguro?",
            icon: "info",
            text: `Se van a borrar todos tus productos`,
            showCloseButton: true,
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText: `Si`,
            cancelButtonText: `No`,
        }).then((result) => {
            if (result.isConfirmed){
                finalizarCompra()
                Swal.fire("Gracias por tu compra!", "", "success");
            }
        });
        }
})

function finalizarCompra(){ 
    //descontar el stock cuando se termina la compra porque se pierde el stock del carrito al recargar la pagina
    productosCarrito.forEach(producto => {
        let juegoEnCatalogo = productos.find(juego => juego.id === producto.id);
        juegoEnCatalogo.stock -= producto.cantidad;
    })
    productosCarrito.length = 0;
    guardarCarrito();
    actualizarContadorCarrito();
    cargarCarrito()
    mostrarCatalogo()
}

function mostrarCatalogo(categoria = "Todos"){
    if (seccionCatalogo.classList.contains("oculta")){
        seccionCarrito.classList.add("oculta");
        seccionCatalogo.classList.remove("oculta");
    }

    tituloPrincipal.innerText = categoria != "Todos" ? categoria : "Todos los juegos";
    let productosCategoria = productos.filter(producto => producto.categorias === categoria || categoria === 'Todos');
    cargarProductos(productosCategoria);
}

inicio();