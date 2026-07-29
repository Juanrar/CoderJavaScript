const contenedorCatalogo = document.querySelector("#contenedor-catalogo");
const contenedorProductos = document.querySelector(".grilla-juegos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector(".titulo-principal")
let botonesAgregar = document.querySelectorAll(".boton-agregar")
let productos = [];

const contenedorCarrito = document.querySelector("#contenedor-carrito");
const contenedorCompras = document.querySelector(".grilla-carrito")
const productosCarrito = [];
const contadorCarrito = document.querySelector(".carrito-numero");
const numeroTotal = document.querySelector(".total-numero");
const botonCarrito = document.querySelector(".boton-carrito");
let botonesCarritoSuma = document.querySelectorAll(".boton-sumar");
let botonesCarritoResta = document.querySelectorAll(".boton-restar");
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
    contenedorProductos.innerHTML = "";
    productosCategoria.forEach(producto =>{

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML= `
            <img class="producto-imagen" src="${producto.imagen_url}" alt="${producto.titulo}">
                <div class="producto-detalles">
                    <h3 class="producto-titulo">${producto.titulo}</h3>
                    <p class="producto-precio">${new Intl.NumberFormat("de-DE", { style: "currency", currency: "USD" }).format(producto.precio)}</p>
                    <button class="boton-agregar" id="${producto.id}">Agregar</button>
                </div>
        `;
        contenedorProductos.append(div);
    })
    actualizarBotonesProducto();
}

async function inicio(){
    await traerJuegos();
    cargarProductos(productos);
}

botonesCategorias.forEach(boton =>{
    boton.addEventListener("click",(e) =>{
        if (contenedorCatalogo.classList.contains("oculta")){
            contenedorCarrito.classList.add("oculta");
            contenedorCatalogo.classList.remove("oculta");
        }

        let categoria = e.target.dataset.categoria;
        tituloPrincipal.innerText = categoria != "Todos" ? categoria : "Todos los juegos";
        let productosCategoria = productos.filter(producto => producto.categorias === categoria || categoria === 'Todos');
        cargarProductos(productosCategoria);
    })
})

function actualizarBotonesProducto(){
    botonesAgregar = document.querySelectorAll(".boton-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    })
}

function agregarAlCarrito(e){
    const idProducto = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idProducto);
    const index = productosCarrito.findIndex(producto => producto.id === idProducto);
    const cantidadActual = index !== -1 ? productosCarrito[index].cantidad : 0;

    if (cantidadActual >= productoAgregado.stock){
        Swal.fire({ icon: "warning", title: "Stock insuficiente" });
        return;
    }

    if(index !== -1){
        productosCarrito[index].cantidad++;
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
    if(contenedorCatalogo.classList.contains("oculta")){
        cargarCarrito()
    }
}

function restarDelCarrito(e){
    const idProducto = e.currentTarget.id;
    const index = productosCarrito.findIndex(producto => producto.id === idProducto);
    productosCarrito[index].cantidad--;
    if(productosCarrito[index].cantidad === 0){
        productosCarrito.splice(index, 1);
    }
    actualizarContadorCarrito()
    if(contenedorCatalogo.classList.contains("oculta")){
        cargarCarrito()
    }
}

function actualizarBotonesCarrito(){
    botonesCarritoSuma = document.querySelectorAll(".boton-sumar");
    botonesCarritoResta = document.querySelectorAll(".boton-restar");

    botonesCarritoSuma.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    })

    botonesCarritoResta.forEach(boton => {
        boton.addEventListener("click", restarDelCarrito);
    })
}

function actualizarContadorCarrito(){
    let contador = productosCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    contadorCarrito.innerText = contador;
}

botonCarrito.addEventListener("click",(e) =>{
    contenedorCarrito.classList.remove("oculta");
    contenedorCatalogo.classList.add("oculta");
    cargarCarrito();
})

function cargarCarrito() {
    contenedorProductos.innerHTML = "";
    contenedorCompras.innerHTML="";
    productosCarrito.forEach(producto =>{

        const div = document.createElement("div");
        div.classList.add("carrito");
        div.innerHTML= `
            <img class="carrito-imagen" src="${producto.imagen_url}" alt="${producto.titulo}">
                <div class="carrito-detalles">
                    <h3 class="carrito-titulo">${producto.titulo}</h3>
                    <p class="carrito-precio">${new Intl.NumberFormat("de-DE", { style: "currency", currency: "USD" }).format(producto.precio)}</p>
                    <div class="carrito-control-cantidad">
                        <button class="boton-restar" id="${producto.id}">−</button>
                        <span class="carrito-cantidad">${producto.cantidad}</span>
                        <button class="boton-sumar" id="${producto.id}">+</button>
                    </div>
                </div>
        `;
        contenedorCompras.append(div);
    });
    actualizarTotalCarrito();
    actualizarBotonesCarrito();
}

function actualizarTotalCarrito(){
    let total = productosCarrito.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0);
    numeroTotal.innerText = new Intl.NumberFormat("de-DE", { style: "currency", currency: "USD" }).format(total);
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
    productosCarrito.forEach(producto => {
        let productoDescontado = productos.find(productoStock => productoStock.id === producto.id);
        productoDescontado.stock -= producto.cantidad;
    })
    productosCarrito.length = 0;
    actualizarTotalCarrito();
    cargarCarrito();
    actualizarContadorCarrito();
}

inicio();