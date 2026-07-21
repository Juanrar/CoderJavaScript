const contenerdorProductos = document.querySelector(".grilla-juegos")

async function traerDatos(){
    try{
        const respuesta = await fetch("./data/juegos.json");
        const datos = await respuesta.json();
        return datos;
    }catch(error){
        console.log("Se produjo un error", error);
        return [];
    }
}

async function cargarProductos() {
    const productos = await traerDatos();
    productos.forEach(producto =>{
        const div = document.createElement("div");
        div.classList.add("productoi");
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

cargarProductos();