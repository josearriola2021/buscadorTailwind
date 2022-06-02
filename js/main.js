import { categoria, productoCategoria } from "./dataCategorias.js";
import { productos } from "./dataProductos.js";
import { eventos } from "./other.js";

const documentReady = () => {

    const cardsResultado = document.getElementById("cardsResultado");
    const buscadorInput = document.getElementById("buscadorInput");
    const categoriaList = document.getElementById("categoriaList");
    const categoriaItems = document.querySelectorAll(".categoria-items");
    const selectCategoria = document.querySelectorAll(".select-categoria");

    //Frontend de productos
    productos.forEach((element) => {
        cardsResultado.innerHTML += 
        `
        <div class="card bg-base-100 shadow-xl max-w-xs">
            <figure><img src="${element.imagen}" alt="${element.nombre}" /></figure>
            <div class="card-body">
              <h2 class="card-title text-base">${element.nombre}</h2>
              <p class="text-red-500 font-bold text-base">S/. ${element.precio}</p>
              <div class="card-actions justify-end">
                <button class="md:scale-90 btn text-sm btn-primary">Agregar</button>
              </div>
            </div>
        <div>
        `
    })

    
    //Frontend de Categorías
    categoria.forEach((element) => {
        categoriaList.innerHTML += 
        `
        <div class="collapse">
            <input type="checkbox" class="peer title-categoria"/>
            <div class="flex justify-between collapse-title bg-white text-black peer-checked:bg-red-500 peer-checked:text-white select-categoria">
              ${element}
              <i class="bi bi-caret-down" id="iconDownCategoria"></i>
              <i class="bi bi-caret-up hidden" id="iconUpCategoria"></i>
            </div>
            <div class="collapse-content bg-white text-black peer-checked:bg-white peer-checked:text-black">
              <div class="form-control categoria-items">
                
              </div>
            </div>
        </div>
        `
    })

    
    const buscador = () => {
        buscadorInput.addEventListener("keyup", (e) => {
            cardsResultado.innerHTML = "";
            const productosBuscados = productos.filter((element) => {
                return element.nombre.toLowerCase().includes(e.target.value.toLowerCase());
            })
            productosBuscados.forEach((element) => {
                cardsResultado.innerHTML +=
                `
                <div class="card bg-base-100 shadow-xl max-w-xs">
                <figure><img src="${element.imagen}" alt="Shoes" /></figure>
                    <div class="card-body">
                      <h2 class="card-title">${element.nombre}</h2>
                      <p class="text-red-500 font-bold text-lg">S/. ${element.precio}</p>
                      <div class="card-actions justify-end">
                        <button class="btn btn-primary">Agregar</button>
                      </div>
                    </div>
                <div>
                `
            })
        })
        
    }
    
    buscador();




}

document.addEventListener('DOMContentLoaded', documentReady);
document.addEventListener('DOMContentLoaded', eventos);
