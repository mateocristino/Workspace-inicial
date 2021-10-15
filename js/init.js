const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/654.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";

var showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function(url){
    var result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}



function showUsername(){

    if(localStorage.getItem("username") != null) {
      

      var htmlContentToAppend = 

      ` <div id="dropdown" class="dropdown">
          <button class="btn btn-secondary dropdown-toggle" id="userDropdown" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
          ${localStorage.getItem("username")}
          </button>
          <div class="dropdown-menu" aria-labelledby="userDropdown">
             <a class="dropdown-item" href="my-profile.html">Mi perfil</a>
             <a class="dropdown-item" href="cart.html">Mi carrito</a>
             <a id="logout" class="dropdown-item" href="index.html">Cerrar sesión</a>
          </div>
        </div>
      `;

      document.getElementById("barraNegra").innerHTML += htmlContentToAppend;
  
    }

}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
  showUsername();
  if (document.getElementById("logout")!==null){
    document.getElementById("logout").addEventListener("click", function(event){
       localStorage.clear();
    })
  } else if (localStorage.getItem("username")===null){
      alert("Inicie sesión para ver nuestro contenido.");
      location.href = "index.html";
  }
});
