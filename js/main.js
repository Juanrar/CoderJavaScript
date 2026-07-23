// elementos de producto
const contenedorCatalogo = document.querySelector("#contenedor-catalogo");
const contenedorProductos = document.querySelector(".grilla-juegos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector(".titulo-principal")
let botonesAgregar = document.querySelectorAll(".boton-agregar")
let productos = [];

//elementos de carrito
const contenedorCarrito = document.querySelector("#contenedor-carrito");
const productosCarrito = [];
const contadorCarrito = document.querySelector(".carrito-numero");
const numeroTotal = document.querySelector(".total-numero");
const botonCarrito = document.querySelector(".boton-carrito");


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
            <img class="producto-imagen">
                <div class="producto-detalles">
                    <h3 class="producto-titulo">${producto.titulo}</h3>
                    <p class="producto-precio">${new Intl.NumberFormat("de-DE", { style: "currency", currency: "USD" }).format(producto.precio)}</p>
                    <button class="boton-agregar" id="${producto.id}">Agregar</button>
                </div>
        `;
        contenedorProductos.append(div);
    })
    actualizarBotones();
}

async function inicio(){
    await traerDatos();
    cargarProductos(productos);
}

botonesCategorias.forEach(boton =>{
    boton.addEventListener("click",(e) =>{
        let categoria = e.target.dataset.categoria;
        tituloPrincipal.innerText = categoria != "Todos" ? categoria : "Todos los juegos";
        let productosCategoria = productos.filter(producto => producto.categorias === categoria || categoria === 'Todos');
        cargarProductos(productosCategoria);
    })
})

function actualizarBotones(){
    botonesAgregar = document.querySelectorAll(".boton-agregar");

    botonesAgregar.forEach(boton => {
        // Funcion que hace que los botones de agregar vayan al carrito
        boton.addEventListener("click", agregarAlCarrito);
    })
}

function agregarAlCarrito(e){
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
    console.log(productosCarrito)
}

function actualizarContadorCarrito(){
    let contador = productosCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    console.log("contador reduce:", contador)
    contadorCarrito.innerText = contador;
}

botonCarrito.addEventListener("click",(e) =>{
    contenedorCarrito.classList.remove("oculta");
    contenedorCatalogo.classList.add("oculta");
})

function cargarCarrito() {
    contenedorProductos.innerHTML = "";
    productosCarrito.forEach(producto =>{
        // Vaciar el contenido

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML= `
            <img class="producto-imagen">
                <div class="producto-detalles">
                    <h3 class="producto-titulo">${producto.titulo}</h3>
                    <p class="producto-precio">${new Intl.NumberFormat("de-DE", { style: "currency", currency: "USD" }).format(producto.precio)}</p>
                </div>
        `;
        contenedorProductos.append(div);
        actualizarTotalCarrito();
    })
}

function actualizarTotalCarrito(){
    let total = productosCarrito.reduce((acc, producto) => acc + producto.precio, 0);
    contadorCarrito.innerText = total;
}

inicio();