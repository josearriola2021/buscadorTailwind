import { categoria, productoCategoria } from "./dataCategorias.js";
import {productos} from "./dataProductos.js";
import { eventos } from "./other.js";

const documentReady = () => {

    const cardsResultado = document.getElementById("cardsResultado");
    const buscadorInput = document.getElementById("buscadorInput");
    const categoriaList = document.getElementById("categoriaList");
    const menuCategoriaMobile = document.getElementById("menuCategoriaMobile");

    //Frontend de productos
    const readProductos = (arrayProducto) => {arrayProducto.forEach((element) => {
        cardsResultado.innerHTML += 
        `
        <div class="card bg-base-100 shadow-xl max-w-xs" style="max-height: 400px;">
            <figure><img src="${element.imagen}" alt="${element.nombre}" /></figure>
            <div class="card-body flex-none">
              <h2 class="card-title text-base">${element.nombre}</h2>
              <p class="text-red-500 font-bold text-base">S/. ${element.precio}</p>
              <div class="card-actions justify-end">
                <button class="md:scale-90 btn text-sm btn-primary">Agregar</button>
              </div>
            </div>
        <div>
        `
    })
  }
    
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
                    <input type="checkbox" class="checkbox input-itemCategoria 2" />
                    <span class="label-text span__label-itemCategoria 2">${element.nombre}</span> 
                </label>
            
              `;
          })
        }
      }
      indice += 1
    }

    const filtrarPorItemCategoria = () => {
      const spanLabelItemCategoria = document.querySelectorAll(".span__label-itemCategoria");
      const inputItemCategoria = document.querySelectorAll(".input-itemCategoria");

      for (let i = 0; i < 2*productoCategoria.length; i++) {
        inputItemCategoria[i].addEventListener("click", () => {

          const arrayContenidoSpanActive = [];
          spanLabelItemCategoria[i].classList.toggle("active");

          const spanActive = document.querySelectorAll(".active");

          console.log(spanActive);

          for (let i = 0; i < spanActive.length; i++) {
            arrayContenidoSpanActive.push(spanActive[i].innerHTML);
          }

          console.log(arrayContenidoSpanActive);

          const resultadoFiltroCategoria = [];
          
          for (let i = 0; i < spanActive.length; i++) {
            const filtroCategoria = productos.filter((element) => {
              return element.itemcategoria.toLowerCase().includes(arrayContenidoSpanActive[i].toLowerCase());
            })
            console.log(filtroCategoria);

            filtroCategoria.forEach((element) => {
              resultadoFiltroCategoria.push(element);
            })
          }

          console.log(resultadoFiltroCategoria);

          // cardsResultado.innerHTML="";
          // readProductos(resultadoFiltroCategoria);

          if (arrayContenidoSpanActive.length == 0) {
            cardsResultado.innerHTML = "";
            readProductos(productos);            
          }else{
            cardsResultado.innerHTML = "";
            readProductos(resultadoFiltroCategoria); 
          }
          
        })
      }
    }

    filtrarPorItemCategoria();


        //Evento de cambios de flecha
    const cambioFlecha = () => {
      const titleCategoria = document.querySelectorAll(".title-categoria");
      // const iconDownCategoria = document.querySelectorAll(".iconDown-categoria");
      // const iconUpCategoria = document.querySelectorAll(".iconUp-categoria");
        
      for (let i = 0; i < titleCategoria.length; i++) {
          titleCategoria[i].addEventListener("click", (e) => {
              iconDownCategoria[i].classList.toggle("hidden");
              iconUpCategoria[i].classList.toggle("hidden");
              
              // if (i > 0) {
              //   if (iconDownCategoria[i-1].className == "bi bi-caret-down iconDown-categoria hidden") {
              //     categoriaItems[i-1].classList.add("hidden");
              //   }
          //       // if (iconDownCategoria[i].className == "bi bi-caret-down iconDown-categoria") {
          //       //   categoriaItems[i].classList.toggle("hidden");
          //       // }
          //     }
          // });

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
            }else{
              readProductos(productosBuscados);
            }
        })
        
    }
    
    buscador();

    //Carga el frontend del array productos
    readProductos(productos)
}

document.addEventListener('DOMContentLoaded', documentReady);