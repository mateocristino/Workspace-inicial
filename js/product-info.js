var product = {};
var comment = {};
let relProducts = []


//Función en donde muestro las img en forma de carousel.
function showImagesGallery(array){

    let htmlContentToAppend = "";
    htmlContentToAppend = `<div class="carousel-item active">
    <img class="d-block w-100" src="${array[0]}" alt="">
    </div>`
    let indicators = `<li data-target="#carouselExampleIndicators" data-slide-to="0"
    class="active"></li>`;


    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];

        htmlContentToAppend += `<div class="carousel-item">
        <img class="d-block w-100" src="${array[i]}" alt="">
        </div>`
        indicators += `<li data-target="#carouselExampleIndicators" data-slide-to="${i}"></li>`;
    }

      document.getElementById("indicators").innerHTML = indicators;
      document.getElementById("carousel").innerHTML = htmlContentToAppend;
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            product = resultObj.data;

            let productNameHTML  = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let soldCountHTML = document.getElementById("soldCount");
            let productCostHTML = document.getElementById("productCost");
            
            
        
            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            soldCountHTML.innerHTML = product.soldCount;
            productCostHTML.innerHTML = product.currency + ' ' + product.cost;
            
            

            //Muestro las imagenes en forma de galería
            showImagesGallery(product.images);
        }
    });
});


//Función para productos relacionados
function showRelatedProducts(products, related){

  let htmlContentToAppend = "";

  for(let i = 0; i < related.length; i++){
      let relProducts= products[related[i]];

      htmlContentToAppend += `
      <a href="product-info.html" class="list-group-item list-group-item-action">
      <div class="row">
          <div class="col-3">
              <img src="` + relProducts.imgSrc + `" alt="` + relProducts.description + `" class="img-thumbnail">
          </div>
          <div class="col">
              <div class="d-flex w-100 justify-content-between">
                  <h4 class="mb-1">`+ relProducts.name + `</h4>
                  
                  <small class="text-muted">` + relProducts.soldCount + ` artículos</small>
              </div>
              <p class="mb-1">` + relProducts.description + `</p>
              <p class="text-muted"> ` + relProducts.currency + ' ' + relProducts.cost + ` </p>
          </div>
      </div>
      </a>
      `

      document.getElementById("relatedProductsImg").innerHTML = htmlContentToAppend;
    }
}


//Llamo a la función getJSONData y ejecuto el evento luego de tener el HTML armado.
document.addEventListener("DOMContentLoaded",function(e){
  getJSONData(PRODUCTS_URL)
  .then(resultObj=>{
      if(resultObj.status === "ok"){
        products = resultObj.data;
        related = product.relatedProducts;  
        showRelatedProducts(products, related);

      }
  })
})



//Creo una función para mostrar los comentarios.
function showComments(commentsArray){
    
    let htmlContentToAppend = "";
    
    
    for(let i = 0; i < commentsArray.length; i++){
        let comment = commentsArray[i];

    
      var amarillas = "";
      for (let i=1; i<=comment.score;i++){
      amarillas += `<span class="fa fa-star checked"></span>`
      }
     

      var negras = "";
      for (let i=1; i<=5-comment.score;i++){
      negras += `<span class="fa fa-star"></span>`
      }
      

        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
          <div class="row">
            <div class="col">
              <div class="d-flex w-100 justify-content-between">
                <dt class="mb-1">` + comment.user + `</dt>
                <p class="mb-1">` + amarillas + negras + `</p>
              </div>
              <p class="mb-1">` + comment.description + `</p>
              <small class="mb-1">` + comment.dateTime + `</small>
            </div>
          </div>  
        </div>
        `

        document.getElementById("productComments").innerHTML = htmlContentToAppend;
      
     
    }
}

//Llamo a la función getJSONData y ejecuto el evento luego de tener el HTML armado.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
           showComments(resultObj.data);
        }
    })
}); 


//Creo una función para enviar los comentarios.
function sendOpinion(){
    let opinion = document.getElementById("sendComment").value;
    let rating = document.getElementById("sendRating").value;

    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    if (month < 10){
        month = `0${month}`;
    }
    if (day < 10){
        day = `0${day}`;
    }
    let hour = date.getHours();
    if(hour < 10){
       hour  = `0${hour}`;
    }
    let minutes = date.getMinutes();
    if(minutes < 10){
       minutes = `0${minutes}`;
    }
    let seconds = date.getSeconds();
    if(seconds < 10){
       seconds = `0${seconds}`;
    }
    let dateTime = `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`;


    let htmlContentToAppend = "";

    var amarillas = "";
    for (let i=1; i<=rating;i++){
    amarillas += `<span class="fa fa-star checked"></span>`
    }
     

    var negras = "";
    for (let i=1; i<=5-rating;i++){
    negras += `<span class="fa fa-star"></span>`
    }
      
    

    htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
          <div class="row">
            <div class="col">
              <div class="d-flex w-100 justify-content-between">
                <dt class="mb-1">` + localStorage.getItem("username") + `</dt>
                <p class="mb-1">` + amarillas + negras + `</p>
              </div>
              <p class="mb-1">` + opinion + `</p>
              <small class="mb-1">` + dateTime + `</small>
            </div>
          </div>  
        </div>
        `

    document.getElementById("productComments").innerHTML += htmlContentToAppend;
      
}



