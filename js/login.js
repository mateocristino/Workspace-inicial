
function guardarUsuario(){
    let nombre = document.getElementById("name").value;
    let password = document.getElementById("pass").value;
    if (nombre === "") {
        alert("Ingresar usuario");
        return false;
    }else if (password === "") {
        alert("Ingresar contraseña");
        return false;
    }else{
    localStorage.setItem("username",nombre);
    return true;
    }
}




//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

});