const contenerdorProductos = document.querySelector(".grilla-juegos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector(".titulo-principal")
let productos = [];

async function traerDatos(){
    try{
        const respuesta = await fetch("./data/juegos.json");
        const datos = await respuesta.json();
        productos =  datos;
    }catch(error){
        console.log("Se produjo un error", error);
        return [];
    }
}

function cargarProductos(productosCategoria) {
    contenerdorProductos.innerHTML = "";
    productosCategoria.forEach(producto =>{
        // Vaciar el contenido

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML= `
            <img class="producto-imagen">
                <div class="producto-detalles">
                    <h3 class="producto-titulo">${producto.titulo}</h3>
                    <p class="producto-precio">${producto.precio}</p>
                    <button class="boton-agregar" id="${producto.id}">Agregar</button>
                </div>
        `;
        contenerdorProductos.append(div);
    })
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

inicio();