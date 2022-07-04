import { categoria, productoCategoria } from "./dataCategorias.js";
import {productos} from "./dataProductos.js";
import { eventos, filtrarPorItemCategoria } from "./other.js";

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

    // //Logica para filtrar por categorias
    // const inputItemCategoria = document.querySelectorAll(".input-itemCategoria");
    // const spanLabelItemCategoria = document.querySelectorAll(".span__label-itemCategoria");

    // const filtrarPorItemCategoria = () => {

    //   //Logica por filtro independiente
    //   for (let i = 0; i < 2*productoCategoria.length; i++) {

    //     inputItemCategoria[i].addEventListener("click", () => {

    //       //Cada vez que selecciono un item se cierra la seccion categorías
    //       setTimeout(() => {
    //         if (i < productoCategoria.length) {
    //           const menuCategoriaMobileContainer = document.getElementById("menuCategoriaMobileContainer");
    //           menuCategoriaMobileContainer.classList.add("-left-full");
    //           menuCategoriaMobileContainer.classList.remove("animate-despliegueAbrir");
    //           menuCategoriaMobileContainer.classList.add("animate-despliegueCerrar");
    //           bodyWeb.classList.remove("overflow-hidden");
    //           sectionOpacity.classList.remove("z-10");
    //           sectionOpacity.classList.remove("opacity-40");
    //         }
    //       },400);
    //       //

    //       let arrayContenidoSpanActive = []; //Guarda el innerHTML de las clases active
    //       spanLabelItemCategoria[i].classList.toggle("active");

    //       const spanActive = document.querySelectorAll(".active");


    //       for (let i = 0; i < spanActive.length; i++) {
    //         arrayContenidoSpanActive.push(spanActive[i].innerHTML);
    //       }


    //       const resultadoFiltroCategoria = []; //Acumula los objetos que coincidan con el filtrado
          
    //       for (let i = 0; i < spanActive.length; i++) {
    //         const filtroCategoria = productos.filter((element) => {
    //           return element.itemcategoria.toLowerCase().includes(arrayContenidoSpanActive[i].toLowerCase());
    //         })

    //         filtroCategoria.forEach((element) => {
    //           resultadoFiltroCategoria.push(element);
    //         })
    //       }

    //       if (arrayContenidoSpanActive.length == 0) {
    //         cardsResultado.innerHTML = "";
    //         readProductos(productos);            
    //       }else{
    //         cardsResultado.innerHTML = "";
    //         readProductos(resultadoFiltroCategoria); 
    //       }
          
    //     })
    //   }

    //   const seleccionarTodo = document.querySelectorAll(".seleccionar-todo");
    //   const limpiar = document.querySelectorAll(".limpiar");
    //   const collapseTitleCategoria = document.querySelectorAll(".collapse-title__categoria");

    //   const funcionLimpiar = (accion, estado) => {
                
    //     for (let i = 0; i < seleccionarTodo.length; i++) {
    //       accion[i].addEventListener("click", () => {
    //         const itemsSeleccionados = productoCategoria.filter((element) => {
    //           return element.tipo.toLowerCase().includes(collapseTitleCategoria[i].innerHTML.toLowerCase());
    //         }) 

    //         if (accion[0].className.includes("seleccionar-todo")) {
    //           //Limpia los checked                    
    //           for (let i = 0; i < 2*productoCategoria.length; i++) {
    //             inputItemCategoria[i].checked = false;
    //           }
            
    //           //Limpia los active
    //           for (let i = 0; i < 2*productoCategoria.length; i++) {
    //             spanLabelItemCategoria[i].classList.remove("active");

    //           }              
    //         }

    //         if (accion[0].className.includes("limpiar")) {
    //           for (let i = 0; i < 2*productoCategoria.length; i++) {
    //             inputItemCategoria[i].checked = false;
    //           }
    //         }

    //         //Limpia los active, para volver a seleccioanr
    //         if (accion[0].className.includes("limpiar")) {
    //           for (let i = 0; i < 2*productoCategoria.length; i++) {
    //             spanLabelItemCategoria[i].classList.remove("active");               
    //           }              
    //         }

              
    //         if (i >= categoria.length) {
    //           for (const element of itemsSeleccionados) {
    //             for (let i = productoCategoria.length; i < 2*productoCategoria.length; i++) {
    //               if (element.nombre.toLowerCase() == spanLabelItemCategoria[i].innerHTML.toLowerCase()) {
    //                 inputItemCategoria[i].checked = estado;
    //                 if(accion[0].className.includes("seleccionar-todo")){
    //                   spanLabelItemCategoria[i].classList.add("active");
    //                 }else{
    //                   spanLabelItemCategoria[i].classList.remove("active");
    //                 }
    //               }
    //             }
    //           }
    //         }else{
    //           for (const element of itemsSeleccionados) {
    //             for (let i = 0; i < productoCategoria.length; i++) {
    //               if (element.nombre.toLowerCase() == spanLabelItemCategoria[i].innerHTML.toLowerCase()) {
    //                 inputItemCategoria[i].checked = estado;
    //                 if(accion[0].className.includes("seleccionar-todo")){
    //                   spanLabelItemCategoria[i].classList.add("active");
    //                 }else{
    //                   spanLabelItemCategoria[i].classList.remove("active");
    //                 }
    //               }
    //             }
    //           }
    //         }
  
    //         cardsResultado.innerHTML = "";
    //         readProductos(productos);
    //       })   
    //     }
    //   }

    //   const funcionSeleccionarTodo = (accion, estado) => {

    //     // for (let i = 0; i < 2*collapseTitleCategoria.length; i++) {
    //     //   console.log(accion);
    //     //   accion[i].addEventListener("click", () => {
    //     //     //Limpia los checked                    
    //     //     for (let i = 0; i < 2*productoCategoria.length; i++) {
    //     //       inputItemCategoria[i].checked = false;
    //     //     }
          
    //     //     //Limpia los active
    //     //     for (let i = 0; i < 2*productoCategoria.length; i++) {
    //     //       spanLabelItemCategoria[i].classList.remove("active");
    //     //     }

    //     //   })
    //     //   console.log("Hola mundos");
    //     // }

    //     funcionLimpiar(accion, estado);
        
    //     for (let i = 0; i < seleccionarTodo.length; i++) {
    //       accion[i].addEventListener("click", () => {
    //         const resultadoSeleccionarTodo = productos.filter((element) => {
    //           return element.categoria.toLowerCase().includes(collapseTitleCategoria[i].innerHTML.toLowerCase());
    //         }) 
    //         cardsResultado.innerHTML="";
    //         readProductos(resultadoSeleccionarTodo);
    //       })
    //     }
    //   }


    filtrarPorItemCategoria();
    
    //   //Logica para filtro de seleccionar todo
    //   // for (let i = 0; i < seleccionarTodo.length; i++) {
    //   //   seleccionarTodo[i].addEventListener("click", () => {
    //   //     const resultadoSeleccionarTodo = productos.filter((element) => {
    //   //       return element.categoria.toLowerCase().includes(collapseTitleCategoria[i].innerHTML.toLowerCase());
    //   //     })

    //   //     //Limpia los checked                    
    //   //     for (let i = 0; i < 2*productoCategoria.length; i++) {
    //   //       inputItemCategoria[i].checked = false;
    //   //     }

    //   //     //Limpia los active
    //   //     for (let i = 0; i < 2*productoCategoria.length; i++) {
    //   //       spanLabelItemCategoria[i].classList.remove("active");
    //   //     }



    //   //     //Cada vez que selecciono un item se cierra la seccion categorías
    //   //       setTimeout(() => {
    //   //         if (i < categoria.length) {
    //   //           const menuCategoriaMobileContainer = document.getElementById("menuCategoriaMobileContainer");
    //   //           menuCategoriaMobileContainer.classList.add("-left-full");
    //   //           menuCategoriaMobileContainer.classList.remove("animate-despliegueAbrir");
    //   //           menuCategoriaMobileContainer.classList.add("animate-despliegueCerrar");
    //   //           bodyWeb.classList.remove("overflow-hidden");
    //   //           sectionOpacity.classList.remove("z-10");
    //   //           sectionOpacity.classList.remove("opacity-40");
    //   //         }
    //   //       },400);

    //   //     //

    //   //     //Checked de los inputs

    //   //     const itemsSeleccionarTodo = productoCategoria.filter((element) => {
    //   //       return element.tipo.toLowerCase().includes(collapseTitleCategoria[i].innerHTML.toLowerCase());
    //   //     })

    //   //     if (i >= categoria.length) {
    //   //       for (const element of itemsSeleccionarTodo) {
    //   //         for (let i = productoCategoria.length; i < 2*productoCategoria.length; i++) {
    //   //           if (element.nombre.toLowerCase() == spanLabelItemCategoria[i].innerHTML.toLowerCase()) {
    //   //             inputItemCategoria[i].checked = true;
    //   //             spanLabelItemCategoria[i].classList.add("active");
    //   //           }
    //   //         }
    //   //       }
    //   //     }else{
    //   //       for (const element of itemsSeleccionarTodo) {
    //   //         for (let i = 0; i < productoCategoria.length; i++) {
    //   //           if (element.nombre.toLowerCase() == spanLabelItemCategoria[i].innerHTML.toLowerCase()) {
    //   //             inputItemCategoria[i].checked = true;
    //   //             spanLabelItemCategoria[i].classList.toggle("active");
    //   //           }
    //   //         }
    //   //       }
    //   //     }
          
    //   //     cardsResultado.innerHTML="";
    //   //     readProductos(resultadoSeleccionarTodo);
    //   //   })
    //   // }


    //   //Logica para desactivar checked y volver a su estado original cuando limpias
    //   // for (let i = 0; i < seleccionarTodo.length; i++) {
    //   //   limpiar[i].addEventListener("click", () => {
    //   //     const itemsLimpiar = productoCategoria.filter((element) => {
    //   //       return element.tipo.toLowerCase().includes(collapseTitleCategoria[i].innerHTML.toLowerCase());
    //   //     }) 

    //   //     if (i >= categoria.length) {
    //   //       for (const element of itemsLimpiar) {
    //   //         for (let i = productoCategoria.length; i < 2*productoCategoria.length; i++) {
    //   //           if (element.nombre.toLowerCase() == spanLabelItemCategoria[i].innerHTML.toLowerCase()) {
    //   //             inputItemCategoria[i].checked = false;
    //   //             spanLabelItemCategoria[i].classList.remove("active");
    //   //           }
    //   //         }
    //   //       }
    //   //     }else{
    //   //       for (const element of itemsLimpiar) {
    //   //         for (let i = 0; i < productoCategoria.length; i++) {
    //   //           if (element.nombre.toLowerCase() == spanLabelItemCategoria[i].innerHTML.toLowerCase()) {
    //   //             inputItemCategoria[i].checked = false;
    //   //             spanLabelItemCategoria[i].classList.remove("active");
    //   //           }
    //   //         }
    //   //       }
    //   //     }

    //   //     cardsResultado.innerHTML = "";
    //   //     readProductos(productos);
    //   //   })   

        
    //   // }
    // }

    // filtrarPorItemCategoria();


        //Evento de cambios de flecha
    
        const cambioFlecha = () => {
      const inputTitleCategoria = document.querySelectorAll(".inputtitle-categoria");
      // const iconDownCategoria = document.querySelectorAll(".iconDown-categoria");
      // const iconUpCategoria = document.querySelectorAll(".iconUp-categoria");
        
      for (let i = 0; i < inputTitleCategoria.length; i++) {
          inputTitleCategoria[i].addEventListener("click", (e) => {
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

            //Vacía el filtrado cuando vas a usar el buscador
            for (let i = 0; i < 2*productoCategoria.length; i++) {
              inputItemCategoria[i].checked = false;              
            }

        })
        
    }
    
    buscador();

    //Carga el frontend del array productos
    readProductos(productos)
}

document.addEventListener('DOMContentLoaded', documentReady);