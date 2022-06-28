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
            console.log(menuCategoriaMobileIconClose);
            console.log(menuOrdenarMobile);

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




