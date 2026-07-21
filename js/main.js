const contenerdorProductos = document.querySelector(".grilla-juegos");
const botonesCategorias = document.querySelector(".boton-categoria");
let productos = [];

async function traerDatos(){
    try{
        const respuesta = await fetch("./data/juegos.json");
        const datos = await respuesta.json();
        console.log(datos)
        productos =  datos;

    }catch(error){
        console.log("Se produjo un error", error);
        return [];
    }
}

function cargarProductos() {
    productos.forEach(producto =>{
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
    cargarProductos();
}

inicio();