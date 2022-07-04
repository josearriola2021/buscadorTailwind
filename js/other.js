import { productoCategoria, categoria } from "./dataCategorias.js";
import { productos } from "./dataProductos.js";

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

export const eventos = () => {

    const despliegueMobile = () => {
      
        const menuOrdenarMobile = document.getElementById("menuOrdenarMobile");
        const menuCategoriaMobileContainer = document.getElementById("menuCategoriaMobileContainer");
        const bodyWeb = document.getElementById("bodyWeb");
        const sectionOpacity = document.getElementById("sectionOpacity");

        const abrirMenuOrdenar = () => {
            const buttonOrdenarMobile = document.getElementById("buttonOrdenarMobile");
            buttonOrdenarMobile.addEventListener("click", () => {
                menuOrdenarMobile.classList.remove("-left-full");
                menuOrdenarMobile.classList.add("animate-despliegueAbrir");
                menuOrdenarMobile.classList.remove("animate-despliegueCerrar");
                bodyWeb.classList.add("overflow-hidden");
                sectionOpacity.classList.add("z-10");
                sectionOpacity.classList.add("opacity-40");
            })
        }

        abrirMenuOrdenar();

        //   

        const cerrarMenuOrdenar = () => {
            const menuOrdenarMobileIconClose = document.getElementById("menuOrdenarMobileIconClose");
            console.log(menuOrdenarMobile);
            menuOrdenarMobileIconClose.addEventListener("click", () => {
                console.log(menuOrdenarMobileIconClose);
                menuOrdenarMobile.classList.add("-left-full");
                menuOrdenarMobile.classList.remove("animate-despliegueAbrir");
                menuOrdenarMobile.classList.add("animate-despliegueCerrar");
                bodyWeb.classList.remove("overflow-hidden");
                sectionOpacity.classList.remove("z-10");
                sectionOpacity.classList.remove("opacity-40");
            })
        }

        cerrarMenuOrdenar();

        // Separacion

        const abrirMenuCategoria = () => {
            const buttonCategoriaMobile = document.getElementById("buttonCategoriaMobile");
            buttonCategoriaMobile.addEventListener("click", () => {
                menuCategoriaMobileContainer.classList.remove("-left-full");
                menuCategoriaMobileContainer.classList.add("animate-despliegueAbrir");
                menuCategoriaMobileContainer.classList.remove("animate-despliegueCerrar");
                bodyWeb.classList.add("overflow-hidden");
                sectionOpacity.classList.add("z-10");
                sectionOpacity.classList.add("opacity-40");
            })
        }

        abrirMenuCategoria();

        //

        const cerrarMenuCategoria = () => {
            const menuCategoriaMobileIconClose = document.getElementById("menuCategoriaMobileIconClose");

            menuCategoriaMobileIconClose.addEventListener("click", () => {
                menuCategoriaMobileContainer.classList.add("-left-full");
                menuCategoriaMobileContainer.classList.remove("animate-despliegueAbrir");
                menuCategoriaMobileContainer.classList.add("animate-despliegueCerrar");
                bodyWeb.classList.remove("overflow-hidden");
                sectionOpacity.classList.remove("z-10");
                sectionOpacity.classList.remove("opacity-40");
            })
        }

        cerrarMenuCategoria();

    }

    despliegueMobile();
    
    //Separacion
}

eventos();

export const filtrarPorItemCategoria = () => {

    //Logica para filtrar por categorias
    const inputItemCategoria = document.querySelectorAll(".input-itemCategoria");
    const spanLabelItemCategoria = document.querySelectorAll(".span__label-itemCategoria");
    var activeFinal = document.querySelectorAll(".active");

    //Logica por filtro independiente
    for (let i = 0; i < 2*productoCategoria.length; i++) {

      inputItemCategoria[i].addEventListener("click", () => {

        //Cada vez que selecciono un item se cierra la seccion categorías
        setTimeout(() => {
          if (i < productoCategoria.length) {
            const menuCategoriaMobileContainer = document.getElementById("menuCategoriaMobileContainer");
            menuCategoriaMobileContainer.classList.add("-left-full");
            menuCategoriaMobileContainer.classList.remove("animate-despliegueAbrir");
            menuCategoriaMobileContainer.classList.add("animate-despliegueCerrar");
            bodyWeb.classList.remove("overflow-hidden");
            sectionOpacity.classList.remove("z-10");
            sectionOpacity.classList.remove("opacity-40");
          }
        },400);
        //

        let arrayContenidoSpanActive = []; //Guarda el innerHTML de las clases active
        spanLabelItemCategoria[i].classList.toggle("active");

        const spanActive = document.querySelectorAll(".active");


        for (let i = 0; i < spanActive.length; i++) {
          arrayContenidoSpanActive.push(spanActive[i].innerHTML);
        }


        const resultadoFiltroCategoria = []; //Acumula los objetos que coincidan con el filtrado
        
        for (let i = 0; i < spanActive.length; i++) {
          const filtroCategoria = productos.filter((element) => {
            return element.itemcategoria.toLowerCase().includes(arrayContenidoSpanActive[i].toLowerCase());
          })

          filtroCategoria.forEach((element) => {
            resultadoFiltroCategoria.push(element);
          })
        }

        if (arrayContenidoSpanActive.length == 0) {
          cardsResultado.innerHTML = "";
          readProductos(productos);            
        }else{
          cardsResultado.innerHTML = "";
          readProductos(resultadoFiltroCategoria); 
        }

        activeFinal = document.querySelectorAll(".active");     
        console.log(activeFinal);
      })
    }

    const seleccionarTodo = document.querySelectorAll(".seleccionar-todo");
    const limpiar = document.querySelectorAll(".limpiar");
    const collapseTitleCategoria = document.querySelectorAll(".collapse-title__categoria");


    const funcionLimpiar = (accion, estado) => {
              
      for (let i = 0; i < seleccionarTodo.length; i++) {
        accion[i].addEventListener("click", () => {

          const itemsSeleccionados = productoCategoria.filter((element) => {
            return element.tipo.toLowerCase().includes(collapseTitleCategoria[i].innerHTML.toLowerCase());
          }) 

          if (accion[0].className.includes("seleccionar-todo")) {
            //Limpia los checked                    
            for (let i = 0; i < 2*productoCategoria.length; i++) {
              inputItemCategoria[i].checked = false;
            }
          
            //Limpia los active
            for (let i = 0; i < 2*productoCategoria.length; i++) {
              spanLabelItemCategoria[i].classList.remove("active");

            }              
          }

          if (accion[0].className.includes("limpiar")) {
            for (let i = 0; i < 2*productoCategoria.length; i++) {
              inputItemCategoria[i].checked = false;
            }
          }

          //Limpia los active, para volver a seleccioanr
          if (accion[0].className.includes("limpiar")) {
            for (let i = 0; i < 2*productoCategoria.length; i++) {
              spanLabelItemCategoria[i].classList.remove("active");               
            }              
          }

            
          if (i >= categoria.length) {
            for (const element of itemsSeleccionados) {
              for (let i = productoCategoria.length; i < 2*productoCategoria.length; i++) {
                if (element.nombre.toLowerCase() == spanLabelItemCategoria[i].innerHTML.toLowerCase()) {
                  inputItemCategoria[i].checked = estado;
                  if(accion[0].className.includes("seleccionar-todo")){
                    spanLabelItemCategoria[i].classList.add("active");
                  }else{
                    spanLabelItemCategoria[i].classList.remove("active");
                  }
                }
              }
            }
          }else{
            for (const element of itemsSeleccionados) {
              for (let i = 0; i < productoCategoria.length; i++) {
                if (element.nombre.toLowerCase() == spanLabelItemCategoria[i].innerHTML.toLowerCase()) {
                  inputItemCategoria[i].checked = estado;
                  if(accion[0].className.includes("seleccionar-todo")){
                    spanLabelItemCategoria[i].classList.add("active");
                  }else{
                    spanLabelItemCategoria[i].classList.remove("active");
                  }
                }
              }
            }
          }

          activeFinal = document.querySelectorAll(".active");
          console.log(activeFinal);

          cardsResultado.innerHTML = "";
          readProductos(productos);
        })   
      }

    }

    const funcionSeleccionarTodo = (accion, estado) => {

      funcionLimpiar(accion, estado);
      
      for (let i = 0; i < seleccionarTodo.length; i++) {
        accion[i].addEventListener("click", () => {
          const resultadoSeleccionarTodo = productos.filter((element) => {
            return element.categoria.toLowerCase().includes(collapseTitleCategoria[i].innerHTML.toLowerCase());
          }) 
          cardsResultado.innerHTML="";
          readProductos(resultadoSeleccionarTodo);
        })
      }

    }

    funcionSeleccionarTodo(seleccionarTodo, true);
    funcionLimpiar(limpiar, false);
    // ordenarPor()

    const ordenarPor = document.getElementById("ordenarPor");

    ordenarPor.onchange = function() {

        console.log("Hola mundo 1");

        let a = 0;
        
        for (let i = 0; i < 2*productoCategoria.length; i++) {
            if (inputItemCategoria[i].checked) {
                a = a + 1;                
            }
        }

        console.log(a);

        const resultadoOrdenarPrecioAlto = [];

        if (a > 0) {
            switch (ordenarPor.selectedIndex) {
                case 1:
                    for (let i = 0; i < activeFinal.length; i++) {
                        const ordenarPrecioAlto = productos.filter((element) => {
                            return element.itemcategoria.toLowerCase().includes(activeFinal[i].innerHTML.toLowerCase())
                        });

                    ordenarPrecioAlto.forEach((element) => {
                        resultadoOrdenarPrecioAlto.push(element);
                      })

                    console.log(ordenarPrecioAlto);
                    
                    resultadoOrdenarPrecioAlto.sort((a, b) => {
                        return a.precio - b.precio;
                    })

                    cardsResultado.innerHTML ="";

                    readProductos(resultadoOrdenarPrecioAlto);
                    }                                        
                    break;
                case 2:
                    for (let i = 0; i < activeFinal.length; i++) {
                        const ordenarPrecioAlto = productos.filter((element) => {
                            return element.itemcategoria.toLowerCase().includes(activeFinal[i].innerHTML.toLowerCase())
                        });

                    ordenarPrecioAlto.forEach((element) => {
                        resultadoOrdenarPrecioAlto.push(element);
                      })

                    console.log(ordenarPrecioAlto);
                    
                    resultadoOrdenarPrecioAlto.sort((a, b) => {
                        return b.precio - a.precio;
                    })

                    cardsResultado.innerHTML ="";

                    readProductos(resultadoOrdenarPrecioAlto);
                    }                                        
                    break;
                case 3:
                    for (let i = 0; i < activeFinal.length; i++) {
                        const ordenarPrecioAlto = productos.filter((element) => {
                            return element.itemcategoria.toLowerCase().includes(activeFinal[i].innerHTML.toLowerCase())
                        });

                    ordenarPrecioAlto.forEach((element) => {
                        resultadoOrdenarPrecioAlto.push(element);
                      })

                    console.log(ordenarPrecioAlto);
                    
                    resultadoOrdenarPrecioAlto.sort((a, b) => {
                        return a.nombre.localeCompare(b.nombre);
                    });

                    cardsResultado.innerHTML ="";

                    readProductos(resultadoOrdenarPrecioAlto);
                    }                                        
                    break;
                case 4:
                    for (let i = 0; i < activeFinal.length; i++) {
                        const ordenarPrecioAlto = productos.filter((element) => {
                            return element.itemcategoria.toLowerCase().includes(activeFinal[i].innerHTML.toLowerCase())
                        });

                    ordenarPrecioAlto.forEach((element) => {
                        resultadoOrdenarPrecioAlto.push(element);
                      })

                    console.log(ordenarPrecioAlto);
                    
                    resultadoOrdenarPrecioAlto.sort((a, b) => {
                        return b.nombre.localeCompare(a.nombre);
                    });

                    cardsResultado.innerHTML ="";

                    readProductos(resultadoOrdenarPrecioAlto);
                    }                                        
                    break;
            }
        }else{
            switch (ordenarPor.selectedIndex) {
                case 1:
                    productos.sort((a, b) => {
                        return a.precio - b.precio;
                    })
                    cardsResultado.innerHTML =""
                    readProductos(productos);
                    break;
                case 2:
                    productos.sort((a, b) => {
                        return b.precio - a.precio;
                    })
                    cardsResultado.innerHTML =""
                    readProductos(productos);
                    break;
                case 3:
                    productos.sort((a, b) => {
                        return a.nombre.localeCompare(b.nombre);
                    });
                    console.log(productos);
                    cardsResultado.innerHTML =""
                    readProductos(productos);
                    break;
                case 4:
                    productos.sort((a,b) => {
                        return b.nombre.localeCompare(a.nombre)
                    });
                    cardsResultado.innerHTML =""
                    readProductos(productos);
                    break;
            }

            
            }                                        
    }
}



