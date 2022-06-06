import { categoria, productoCategoria } from "./dataCategorias.js";
import { productos } from "./dataProductos.js";
import { eventos } from "./other.js";


const documentReady = () => {

    const cardsResultado = document.getElementById("cardsResultado");
    const buscadorInput = document.getElementById("buscadorInput");
    const categoriaList = document.getElementById("categoriaList");
    const menuCategoriaMobile = document.getElementById("menuCategoriaMobile");

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
    
    //Frontend de Categorías desktop y mobile
    categoria.forEach((element) => {
        const ubicacionCategorias = [categoriaList, menuCategoriaMobile];
        for (const elemento of ubicacionCategorias) {

          elemento.innerHTML += 
          `
          <div class="collapse">
              <input type="checkbox" class="peer title-categoria"/>
              <div class="flex justify-between collapse-title bg-white text-black peer-checked:bg-red-500 peer-checked:text-white">
                ${element}
                <i class="bi bi-caret-down iconDown-categoria"></i>
                <i class="bi bi-caret-up iconUp-categoria hidden"></i>
              </div>
              <div class="collapse-content bg-white text-black peer-checked:bg-white peer-checked:text-black">
                <div class="form-control categoria-items">
                  
                </div>
              </div>
          </div>
          `;
        }
        

    })
  
    //Frontend Categorias - Items Desktop y mobile
    const categoriaItems = document.querySelectorAll(".categoria-items");
    
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
                    <input type="checkbox" class="checkbox" />
                    <span class="label-text">${element.nombre}</span> 
                </label>
            
              `;
          })
        }else{
          distribucionCategorias.forEach((element) => {
            const nuevoi = i + categoria.length;
            categoriaItems[nuevoi].innerHTML += 
              `
                <label class="label gap-4 justify-start cursor-pointer">
                    <input type="checkbox" class="checkbox" />
                    <span class="label-text">${element.nombre}</span> 
                </label>
            
              `;
          })
        }
      }
      indice += 1
    }

        //Evento de cambios de flecha
    const cambioFlecha = () => {
      const titleCategoria = document.querySelectorAll(".title-categoria");
      const iconDownCategoria = document.querySelectorAll(".iconDown-categoria");
      const iconUpCategoria = document.querySelectorAll(".iconUp-categoria");
        
      for (let i = 0; i < titleCategoria.length; i++) {
          titleCategoria[i].addEventListener("click", (e) => {
              iconDownCategoria[i].classList.toggle("hidden");
              iconUpCategoria[i].classList.toggle("hidden");
          });
      }
    
    }

    cambioFlecha();    

    
    //Buscador keyup
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

    //Ordenador keyup





}

document.addEventListener('DOMContentLoaded', documentReady);