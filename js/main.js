import { categoria, productoCategoria } from "./dataCategorias.js";
import {productos} from "./dataProductos.js";
import { eventos, filtrarPorItemCategoria } from "./other.js";
import { contadorProductos } from "./other.js";

// Lectura de productos
export const readProductos = (arrayProducto) => {arrayProducto.forEach((element) => {
  cardsResultado.innerHTML += 
  `
  <div class="card bg-base-100 shadow-xl max-w-xs" style="max-height: 400px;">
      <figure><img src="${element.imagen}" alt="${element.nombre}" /></figure>
      <div class="card-body flex-none">
        <h2 class="card-title text-base">${element.nombre}</h2>
        <p class="text-red-500 font-bold text-base">S/. ${element.precio}</p>
        <div class="card-actions justify-end agregar-button">
          <button class="md:scale-90 btn text-sm btn-primary">Agregar</button>
        </div>
        <div class="form-control hidden cantidad-productosagregados">
          <label>
            <span class="cursor-pointer border-2 border-black delete-product" style = "border-radius: 50%; padding: 6px"><i class="bi bi-trash3"></i></span>
            <span class="cursor-pointer hidden minus-product"><i class="bi bi-dash-circle text-2xl"></i></span>
            <input type="text" value="1" class="input input-bordered cantidadproductos-input" id="${element.nombre}" style="width: 70px" />
            <span class="cursor-pointer add-product"><i class="bi bi-plus-circle text-2xl"></i></span>
          </label>
        </div>
      </div>
  <div>
  `
})
}

const documentReady = () => {

    const cardsResultado = document.getElementById("cardsResultado");
    const buscadorInput = document.getElementById("buscadorInput");
    const categoriaList = document.getElementById("categoriaList");
    const menuCategoriaMobile = document.getElementById("menuCategoriaMobile");    

    //Carga el frontend del array productos
    readProductos(productos)
    
    //Contador de productos
    contadorProductos();

    //Frontend de Categorías desktop y mobile
    categoria.forEach((element) => {
        const ubicacionCategorias = [categoriaList, menuCategoriaMobile];
        for (const elemento of ubicacionCategorias) {

          elemento.innerHTML += 
          `
          <div class="collapse">
              <input type="checkbox" class="peer inputtitle-categoria"/>
              <div class="flex justify-between collapse-title bg-white text-black peer-checked:bg-red-500 peer-checked:text-white">
                <span class="collapse-title__categoria">${element}</span>
                <i class="bi bi-caret-down iconDown-categoria"></i>
                <i class="bi bi-caret-up iconUp-categoria hidden"></i>
              </div>
              <div class="collapse-content bg-white text-black peer-checked:bg-white peer-checked:text-black">
                <div class= "flex justify-start gap-4 text-xs" style="padding-top:8px;">
                  <p class="underline hover: cursor-pointer seleccionar-todo">Seleccionar todo</p>
                  <p class="underline hover: cursor-pointer limpiar">Limpiar</p>
                </div>
                <div class="form-control categoria-items">
                  
                </div>
              </div>
          </div>
          `;
        }
    })

  
    //Frontend Categorias - Items Desktop y mobile
    const categoriaItems = document.querySelectorAll(".categoria-items");
    const iconDownCategoria = document.querySelectorAll(".iconDown-categoria");
    const iconUpCategoria = document.querySelectorAll(".iconUp-categoria");
    
    let indice = 0;
    while (indice < 2) {
      for (let i = 0; i < categoria.length; i++) {
        const distribucionCategorias = productoCategoria.filter((element) => {
          return element.tipo == categoria[i];
        })
      
        if(indice == 0){
          distribucionCategorias.forEach((element) => {
            categoriaItems[i].innerHTML += 
              `
                <label class="label gap-4 justify-start cursor-pointer">
                    <input type="checkbox" class="checkbox input-itemCategoria 1" />
                    <span class="label-text span__label-itemCategoria 1">${element.nombre}</span> 
                </label>
            
              `;
          })
        }else{
          distribucionCategorias.forEach((element) => {
            const nuevoi = i + categoria.length;
            categoriaItems[nuevoi].innerHTML += 
              `
                <label class="label gap-4 justify-start cursor-pointer">
                    <input type="checkbox" class="checkbox input-itemCategoria" />
                    <span class="label-text span__label-itemCategoria">${element.nombre}</span> 
                </label>
            
              `;
          })
        }
      }
      indice += 1
    }

    filtrarPorItemCategoria();
    
    const cambioFlecha = () => {
      const inputTitleCategoria = document.querySelectorAll(".inputtitle-categoria");
      // const iconDownCategoria = document.querySelectorAll(".iconDown-categoria");
      // const iconUpCategoria = document.querySelectorAll(".iconUp-categoria");
        
      for (let i = 0; i < inputTitleCategoria.length; i++) {
          inputTitleCategoria[i].addEventListener("click", (e) => {
              iconDownCategoria[i].classList.toggle("hidden");
              iconUpCategoria[i].classList.toggle("hidden");
      })
    
    }
    }

    cambioFlecha();    

    //Buscador keyup
    const buscador = () => {
        buscadorInput.addEventListener("keyup", (e) => {
            cardsResultado.innerHTML = "";
            const productosBuscados = productos.filter((element) => {
              return element.nombre.toLowerCase().includes(e.target.value.toLowerCase());
            });

            if (productos == "") {
              readProductos(productos);
              contadorProductos();
            }else{
              readProductos(productosBuscados);
              contadorProductos();
            }

            //Vacía el filtrado cuando vas a usar el buscador
            for (let i = 0; i < 2*productoCategoria.length; i++) {
              inputItemCategoria[i].checked = false;              
            }

        })
        
    }
    
    buscador();
  
}

document.addEventListener('DOMContentLoaded', documentReady);