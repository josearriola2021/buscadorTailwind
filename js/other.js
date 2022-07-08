import { productoCategoria, categoria } from "./dataCategorias.js";
import { productos } from "./dataProductos.js";
import { readProductos } from "./main.js";

const bodyWeb = document.getElementById("bodyWeb");

export const eventos = () => {

    const despliegueMobile = () => {
      
        const menuOrdenarMobile = document.getElementById("menuOrdenarMobile");
        const menuCategoriaMobileContainer = document.getElementById("menuCategoriaMobileContainer");
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
    const ordenarPor = document.getElementById("ordenarPor");
    const ordenarPorMobile = document.querySelectorAll(".ordenarPorMobile");

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
          contadorProductos();
        }else{
          cardsResultado.innerHTML = "";
          readProductos(resultadoFiltroCategoria); 
          contadorProductos();
        }

        ordenarPor.selectedIndex = 0;

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

          ordenarPor.selectedIndex = 0;

          activeFinal = document.querySelectorAll(".active");
          console.log(activeFinal);

          cardsResultado.innerHTML = "";
          readProductos(productos);
          contadorProductos();
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

          ordenarPor.selectedIndex = 0;
          cardsResultado.innerHTML="";
          readProductos(resultadoSeleccionarTodo);
          contadorProductos();
        })
      }

    }

    funcionSeleccionarTodo(seleccionarTodo, true);
    funcionLimpiar(limpiar, false);
    // ordenarPor()

    ordenarPor.onchange = function() {

        let a = 0;
        
        for (let i = 0; i < 2*productoCategoria.length; i++) {
            if (inputItemCategoria[i].checked) {
                a = a + 1;                
            }
        }

        const resultadoOrdenar = [];

        if (a > 0) {
            switch (ordenarPor.selectedIndex) {
                case 1:
                    for (let i = 0; i < activeFinal.length; i++) {
                        const productosSeleccionadosOrdenar = productos.filter((element) => {
                            return element.itemcategoria.toLowerCase().includes(activeFinal[i].innerHTML.toLowerCase())
                        });

                    productosSeleccionadosOrdenar.forEach((element) => {
                        resultadoOrdenar.push(element);
                      })
                    
                    resultadoOrdenar.sort((a, b) => {
                        return b.precio - a.precio;
                    })

                    cardsResultado.innerHTML ="";

                    readProductos(resultadoOrdenar);
                    contadorProductos();
                    }                                        
                    break;
                case 2:
                    for (let i = 0; i < activeFinal.length; i++) {
                        const productosSeleccionadosOrdenar = productos.filter((element) => {
                            return element.itemcategoria.toLowerCase().includes(activeFinal[i].innerHTML.toLowerCase())
                        });

                    productosSeleccionadosOrdenar.forEach((element) => {
                        resultadoOrdenar.push(element);
                      })
                    
                    resultadoOrdenar.sort((a, b) => {
                        return a.precio - b.precio;
                    })

                    cardsResultado.innerHTML ="";

                    readProductos(resultadoOrdenar);
                    contadorProductos();
                    }                                        
                    break;
                case 3:
                    for (let i = 0; i < activeFinal.length; i++) {
                        const productosSeleccionadosOrdenar = productos.filter((element) => {
                            return element.itemcategoria.toLowerCase().includes(activeFinal[i].innerHTML.toLowerCase())
                        });

                    productosSeleccionadosOrdenar.forEach((element) => {
                        resultadoOrdenar.push(element);
                      })
                    
                    resultadoOrdenar.sort((a, b) => {
                        return a.nombre.localeCompare(b.nombre);
                    });

                    cardsResultado.innerHTML ="";

                    readProductos(resultadoOrdenar);
                    contadorProductos();
                    }                                        
                    break;
                case 4:
                    for (let i = 0; i < activeFinal.length; i++) {
                        const productosSeleccionadosOrdenar = productos.filter((element) => {
                            return element.itemcategoria.toLowerCase().includes(activeFinal[i].innerHTML.toLowerCase())
                        });

                    productosSeleccionadosOrdenar.forEach((element) => {
                        resultadoOrdenar.push(element);
                      })
                    
                    resultadoOrdenar.sort((a, b) => {
                        return b.nombre.localeCompare(a.nombre);
                    });

                    cardsResultado.innerHTML ="";

                    readProductos(resultadoOrdenar);
                    contadorProductos();
                    }                                        
                    break;
            }
        }else{
            switch (ordenarPor.selectedIndex) {
                case 1:
                    productos.sort((a, b) => {
                        return b.precio - a.precio;
                    })
                    cardsResultado.innerHTML =""
                    readProductos(productos);
                    contadorProductos();
                    break;
                case 2:
                    productos.sort((a, b) => {
                        return a.precio - b.precio;
                    })
                    cardsResultado.innerHTML =""
                    readProductos(productos);
                    contadorProductos();
                    break;
                case 3:
                    productos.sort((a, b) => {
                        return a.nombre.localeCompare(b.nombre);
                    });
                    console.log(productos);
                    cardsResultado.innerHTML =""
                    readProductos(productos);
                    contadorProductos();
                    break;
                case 4:
                    productos.sort((a,b) => {
                        return b.nombre.localeCompare(a.nombre)
                    });
                    cardsResultado.innerHTML =""
                    readProductos(productos);
                    contadorProductos();
                    break;
            }

            
            }                                        
    }

    ordenarPorMobile[0].onclick = function(){
      let a = 0;
        
        for (let i = 0; i < 2*productoCategoria.length; i++) {
            if (inputItemCategoria[i].checked) {
                a = a + 1;                
            }
        }

        console.log(a);

        const resultadoOrdenar = [];

        if (a > 0) {
          for (let i = 0; i < activeFinal.length; i++) {
            const productosSeleccionadosOrdenar = productos.filter((element) => {
                return element.itemcategoria.toLowerCase().includes(activeFinal[i].innerHTML.toLowerCase())
            });

        productosSeleccionadosOrdenar.forEach((element) => {
            resultadoOrdenar.push(element);
          })
        
        resultadoOrdenar.sort((a, b) => {
            return a.precio - b.precio;

        });

        cardsResultado.innerHTML ="";

        readProductos(resultadoOrdenar);
        contadorProductos();
        }         
        }else{
          productos.sort((a, b) => {
            return a.precio - b.precio;
        })
        cardsResultado.innerHTML =""
        readProductos(productos);
        contadorProductos();
        }
    }

    ordenarPorMobile[1].onclick = function(){
      let a = 0;
        
        for (let i = 0; i < 2*productoCategoria.length; i++) {
            if (inputItemCategoria[i].checked) {
                a = a + 1;                
            }
        }

        console.log(a);

        const resultadoOrdenar = [];

        if (a > 0) {
          for (let i = 0; i < activeFinal.length; i++) {
            const productosSeleccionadosOrdenar = productos.filter((element) => {
                return element.itemcategoria.toLowerCase().includes(activeFinal[i].innerHTML.toLowerCase())
            });

        productosSeleccionadosOrdenar.forEach((element) => {
            resultadoOrdenar.push(element);
          })
        
        resultadoOrdenar.sort((a, b) => {
            return b.precio - a.precio;

        });

        cardsResultado.innerHTML ="";

        readProductos(resultadoOrdenar);
        contadorProductos();
        }         
        }else{
          productos.sort((a, b) => {
            return b.precio - a.precio;
        })
        cardsResultado.innerHTML =""
        readProductos(productos);
        contadorProductos();
        }
    

    }

    ordenarPorMobile[2].onclick = function(){
      let a = 0;
        
        for (let i = 0; i < 2*productoCategoria.length; i++) {
            if (inputItemCategoria[i].checked) {
                a = a + 1;                
            }
        }

        const resultadoOrdenar = [];

        if (a > 0) {
          for (let i = 0; i < activeFinal.length; i++) {
            const productosSeleccionadosOrdenar = productos.filter((element) => {
                return element.itemcategoria.toLowerCase().includes(activeFinal[i].innerHTML.toLowerCase())
            });

        productosSeleccionadosOrdenar.forEach((element) => {
            resultadoOrdenar.push(element);
          })
        
        resultadoOrdenar.sort((a, b) => {
          return a.nombre.localeCompare(b.nombre);
          ;

        });

        cardsResultado.innerHTML ="";

        readProductos(resultadoOrdenar);
        contadorProductos();
        }         
        }else{
          productos.sort((a, b) => {
            return a.nombre.localeCompare(b.nombre);
            ;
        })
        cardsResultado.innerHTML =""
        readProductos(productos);
        contadorProductos();
        }
    

    }

    ordenarPorMobile[3].onclick = function(){
      let a = 0;
        
        for (let i = 0; i < 2*productoCategoria.length; i++) {
            if (inputItemCategoria[i].checked) {
                a = a + 1;                
            }
        }

        console.log(a);

        const resultadoOrdenar = [];

        if (a > 0) {
          for (let i = 0; i < activeFinal.length; i++) {
            const productosSeleccionadosOrdenar = productos.filter((element) => {
                return element.itemcategoria.toLowerCase().includes(activeFinal[i].innerHTML.toLowerCase())
            });

        productosSeleccionadosOrdenar.forEach((element) => {
            resultadoOrdenar.push(element);
          })
        
        resultadoOrdenar.sort((a, b) => {
          return b.nombre.localeCompare(a.nombre);
          ;

        });

        cardsResultado.innerHTML ="";

        readProductos(resultadoOrdenar);
        contadorProductos();
        }         
        }else{
          productos.sort((a, b) => {
            return b.nombre.localeCompare(a.nombre);
            ;
        })
        cardsResultado.innerHTML =""
        readProductos(productos);
        contadorProductos();
        }
    

    }
}

export const contadorProductos = () => {

  const indicadorItem = document.getElementById("indicadorItem");
  const cantidadProductosSpan = document.getElementById("cantidadProductosSpan");
  const totalPrecioSpan = document.getElementById("totalPrecioSpan");

  const funcionContarProductos = (element, index) => {

      if (element.className.includes("hidden")) {
        cantidadproductosInput[index].classList.add("comprado");
      }else{
        cantidadproductosInput[index].classList.remove("comprado");
      }
  
      const elementosClaseComprado = document.querySelectorAll(".comprado");

      const arrayContadorProductosComprados = [];

      elementosClaseComprado.forEach((element) => {
        arrayContadorProductosComprados.push(parseInt(element.value));
      })

      if (arrayContadorProductosComprados.length > 0) {
        const totalProductosComprados = arrayContadorProductosComprados.reduce((a,b) => a+b);
        localStorage.setItem("carrito", totalProductosComprados);
        indicadorItem.innerHTML = localStorage.getItem("carrito");
        cantidadProductosSpan.innerHTML = `${totalProductosComprados} productos`; 
      }else{
        indicadorItem.innerHTML = 0;
        cantidadProductosSpan.innerHTML = "0 productos";
      }
      
      //Costo productos

      const arrayCostoTotal = [];
      // const almacenamientoProductosComprados = [];

      elementosClaseComprado.forEach((element) => {
        const productosCompradoId = productos.filter((elemento) => {
          return elemento.nombre.toLowerCase().includes(element.getAttribute("id").toLowerCase());
        })
        const costoTotal = productosCompradoId[0].precio * parseInt(element.value);
        arrayCostoTotal.push(costoTotal);

        // almacenamientoProductosComprados.push(productosCompradoId[0]);
      })

      const resultadoCostoTotal = arrayCostoTotal.reduce((a,b) => a+b);
      totalPrecioSpan.innerHTML = `Total: S/ ${resultadoCostoTotal}`;
      
      // sessionStorage.setItem("productosComprados", JSON.stringify(almacenamientoProductosComprados));
  }

  // ----add-products  y minus-products----

  const cantidadproductosInput = document.querySelectorAll(".cantidadproductos-input");
  const addProduct = document.querySelectorAll(".add-product");
  const deleteProduct = document.querySelectorAll(".delete-product");
  const minusProduct = document.querySelectorAll(".minus-product");
  const agregarButton = document.querySelectorAll(".agregar-button");

  cantidadproductosInput.forEach((element,index) => {
    addProduct[index].addEventListener("click", () => {
      element.value = parseInt(element.value) + 1;
      deleteProduct[index].classList.toggle("hidden", parseInt(element.value) > 1);
      minusProduct[index].classList.remove("hidden");
      funcionContarProductos(agregarButton[index],index);
    })

    minusProduct[index].addEventListener("click", () => {
      element.value = parseInt(element.value) - 1;
      minusProduct[index].classList.toggle("hidden", parseInt(element.value) < 2);
      if (parseInt(element.value) < 2) {
        deleteProduct[index].classList.remove("hidden");
      }
      funcionContarProductos(agregarButton[index],index);
    })

    deleteProduct[index].addEventListener("click", () => {
      agregarButton[index].classList.remove("hidden");
      cantidadProductosAgregados[index].classList.add("hidden");
      funcionContarProductos(agregarButton[index],index);
    })

  })


  // Cambio de button y contar clase comprado para determinar la cantidad de productos comprados
  const cantidadProductosAgregados = document.querySelectorAll(".cantidad-productosagregados");
  const formLogin = document.getElementById("formLogin");

  agregarButton.forEach((element,index) => {
    element.addEventListener("click", () => {

      const loginModal = document.getElementById("loginModal");
      const inputEmail = document.getElementById("inputEmail");
      const inputPassword = document.getElementById("inputPassword");
      const closeLogin = document.getElementById("closeLogin");

      const errorEmail = document.getElementById("errorEmail");
      const errorPassword = document.getElementById("errorPassword");
      const spinnerLogin = document.getElementById("spinnerLogin");

      if (!bodyWeb.classList.contains("inicio-sesion")) {
        Swal.fire({
          title: 'Se recomienda iniciar sesión para realizar tus compras',
          text: "Deseas iniciar sesión?",
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Ok'
        }).then((result) => {
          if (result.isConfirmed) {
            bodyWeb.classList.add("inicio-sesion");
            loginModal.click();
            //Validación formLogin
            formLogin.onsubmit = function (e){
              e.preventDefault();
              if (inputEmail.value.trim() == "" || inputPassword.value.trim() == "") {
                errorEmail.classList.remove("hidden");
                errorPassword.classList.remove("hidden");
              }else{
              spinnerLogin.classList.remove("hidden");
              setTimeout(() => {
                spinnerLogin.classList.add("hidden");
              },2000);
              closeLogin.click();
              //Que salga el check de inicio de sesion
              setTimeout(() => {
                Swal.fire({
                  icon: 'success',
                  title: 'Sesión iniciada',
                  showConfirmButton: false,
                  timer: 1500,
                })
                },2000);
              }
            }
          }else{
            bodyWeb.classList.add("inicio-sesion");
            Swal.fire("Sesión no iniciada");
          }
        })
      }else{
        element.classList.add("hidden");
        cantidadProductosAgregados[index].classList.remove("hidden");
        funcionContarProductos(element, index);
      }

      


      

    })
  }) 
  
}





