import { productos } from "./dataProductos.js";

const crearProductos = () => {
    let producto = {
        nombre:"",
        precio:"",
    }

    const registroForm = document.forms["registroForm"];
    
    //Validación y frontend para agregar productos
    const validacion = (e) => {
        const {nombre, precio} = producto;
        e.preventDefault();
        if([nombre.trim(), precio.trim()].includes("")){
            alert("Completa todos los datos");
        }else{
            productos.push(producto);
            alert("Producto creado");
        }
    }

    
    const handleInput = (e) => {
        producto = {
            ...producto,
            [e.target.name]: e.target.value,
        }
    }
    
    registroForm["nombre"].addEventListener("input", handleInput);
    registroForm["precio"].addEventListener("input", handleInput);

    registroForm.addEventListener("submit", validacion)

    
    

}

crearProductos();