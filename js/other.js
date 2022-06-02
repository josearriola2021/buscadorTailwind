
export const eventos = () => {
    const titleCategoria = document.querySelectorAll(".title-categoria");
    const iconDownCategoria = document.getElementById("iconDownCategoria");
    const iconUpCategoria = document.getElementById("iconUpCategoria");

    titleCategoria.forEach((element) => {
        console.log(titleCategoria);
        element.addEventListener("click", () => {
        iconDownCategoria.classList.toggle("hidden");
        iconUpCategoria.classList.toggle("hidden");
        console.log('Hola mundo');
    })
    })    

}


