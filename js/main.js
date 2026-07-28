// elementos de producto
const contenedorCatalogo = document.querySelector("#contenedor-catalogo");
const contenedorProductos = document.querySelector(".grilla-juegos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector(".titulo-principal")
let botonesAgregar = document.querySelectorAll(".boton-agregar")
let productos = [];

//elementos de carrito
const contenedorCarrito = document.querySelector("#contenedor-carrito");
const contenedorCompras = document.querySelector(".grilla-carrito")
const productosCarrito = [];
const contadorCarrito = document.querySelector(".carrito-numero");
const numeroTotal = document.querySelector(".total-numero");
const botonCarrito = document.querySelector(".boton-carrito");
let botonCarritoSuma = document.querySelectorAll(".boton-sumar");
let botonCarritoResta = document.querySelectorAll(".boton-restar");
const botonFinalizar = document.querySelector(".boton-finalizar")

//Productos
async function traerDatos(){
    try{
        const respuesta = await fetch("./data/juegos.json");
        const datos = await respuesta.json();
        productos =  datos;
    }catch(error){
        console.log("Se produjo un error", error);
        productos = [];
    }
}

function cargarProductos(productosCategoria) {
    contenedorProductos.innerHTML = "";
    productosCategoria.forEach(producto =>{
        // Vaciar el contenido

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
    await traerDatos();
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
        // Funcion que hace que los botones de agregar vayan al carrito
        boton.addEventListener("click", agregarCarrito);
    })
}

function agregarCarrito(e){
    const idProducto = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idProducto);
    if(productosCarrito.some(producto => producto.id === idProducto)){
        //si ya exista aumentar cantidad
        const index = productosCarrito.findIndex(producto => producto.id === idProducto);
        productosCarrito[index].cantidad++;
    } else{
        //sino agregar
        productoAgregado.cantidad = 1;
        productosCarrito.push(productoAgregado);
    } 
    actualizarContadorCarrito()
    if(contenedorCatalogo.classList.contains("oculta")){
        cargarCarrito()
    }
}

function eliminarCarrito(e){
    const idProducto = e.currentTarget.id;
    const productoEliminado = productos.find(producto => producto.id === idProducto);
    const index = productosCarrito.findIndex(producto => producto.id === idProducto);
    productosCarrito[index].cantidad--
    if(productoEliminado.cantidad === 0){
        delete productoEliminado.cantidad;
        productosCarrito.splice(index, 1);
    }
    actualizarContadorCarrito()
    if(contenedorCatalogo.classList.contains("oculta")){
        cargarCarrito()
    }
}
//Carrito

function actualizarBotonesCarrito(){
    botonesCarritoSuma = document.querySelectorAll(".boton-sumar");
    botonCarritoResta = document.querySelectorAll(".boton-restar");
    console.log("botoncitos:",botonCarritoResta);


    botonesCarritoSuma.forEach(boton => {
        boton.addEventListener("click", agregarCarrito);
    })

    botonCarritoResta.forEach(boton => {
        boton.addEventListener("click", eliminarCarrito);
    })
}

function actualizarContadorCarrito(){
    let contador = productosCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    console.log("contador reduce:", contador)
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
        // Vaciar el contenido

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
    let total = productosCarrito.reduce((acc, producto) => acc + (producto.precio * (producto.cantidad || 1)), 0);
    numeroTotal.innerText = new Intl.NumberFormat("de-DE", { style: "currency", currency: "USD" }).format(total);
}

botonFinalizar.addEventListener("click",(e)=>{
    productosCarrito.length = 0;
    actualizarTotalCarrito();
    cargarCarrito();
    alert("Compra finalizada wachin");
})

inicio();