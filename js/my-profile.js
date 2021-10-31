
//Función para seleccionar imagen.
function selectFile() {
	let select = document.getElementById("photo"); //contenedor de la imagen
	let file = document.getElementById("inputFoto").files[0]; 

	let reader = new FileReader(); 

	//Se activa cuando la imagen sea seleccionada.
	reader.onloadend = function () {
		select.src = reader.result;
	}

	//Se pone imagen por defecto si no hay imagen seleccionada en file.
	if (file) {
		reader.readAsDataURL(file);
	} else {
		select.src = "https://i.ibb.co/NFJM7W5/Figura-2-Avatar-que-aparece-por-defecto-en-Facebook.png";
	}
}


//Función para guardar los datos de mi perfil.
function saveProfileData(){
    let select = document.getElementById("photo")
    let profileData = {
        firstName: document.getElementById("firstName").value,
        secondName: document.getElementById("secondName").value,
        lastName: document.getElementById("lastName").value,
        secLastName: document.getElementById("secLastName").value,
        age: document.getElementById("age").value,
        cellPhone: document.getElementById("cellPhone").value,
        email: document.getElementById("email").value,
        image: select.src
    }
    localStorage.setItem("profileInfo",JSON.stringify(profileData));
}

//Función para mostrar los datos de mi perfil.
function showProfileData(){
    let select = document.getElementById("photo");
    if (localStorage.getItem("profileInfo") != null) {
        let data = JSON.parse(localStorage.getItem("profileInfo"));
    
        document.getElementById("firstName").value = data.firstName;
        document.getElementById("secondName").value = data.secondName;
        document.getElementById("lastName").value = data.lastName;
        document.getElementById("secLastName").value = data.secLastName;
        document.getElementById("age").value = data.age;
        document.getElementById("cellPhone").value = data.cellPhone;
        document.getElementById("email").value = data.email;

        select.src = data.image;
    }else{
        select.src = "https://i.ibb.co/NFJM7W5/Figura-2-Avatar-que-aparece-por-defecto-en-Facebook.png";
    }

}



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
   showProfileData();
});