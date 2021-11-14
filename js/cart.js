let cartProducts = [];


//Función para mostrar el costo subTotal de los productos.
function subTotalCost(id){
    var cant = document.getElementById(id).value;  // Tomamos el valor del input.
    var subTotal = cant*currencyConv(id)
    document.getElementById("subtotal" + id).innerHTML = subTotal
    sumSubTotal() //Llamamos a la función totalCost para mostrar la suma de todos los subtotales.
}

//Función para mostrar la suma de los subtotales.
function sumSubTotal(){
    htmlContentToAppend = "";
    var subtotal = 0 
    for (let i = 0; i < cartProducts.articles.length; i++){
        subtotal += parseFloat(document.getElementById("subtotal" + i).textContent) // Pasamos a entero porque está como string.
    }
    document.getElementById("sumSubTotal").innerHTML = subtotal;
    updateTotalCosts()
}


function totalModify(){
    document.getElementById("totalCost").innerHTML = `<b>${parseFloat(document.getElementById("sumSubTotal").innerHTML) +
    parseFloat(document.getElementById("shippingCost").innerHTML)}</b>`;
}



let comissionPercentage = 0;
document.getElementById("premiumradio").addEventListener("change", function(){
    comissionPercentage = 0.15;
    updateTotalCosts();
});

document.getElementById("expressradio").addEventListener("change", function(){
    comissionPercentage = 0.07;
    updateTotalCosts();
});

document.getElementById("standardradio").addEventListener("change", function(){
    comissionPercentage = 0.05;
    updateTotalCosts();
});



function updateTotalCosts(){
    let subtotal = parseFloat(document.getElementById("sumSubTotal").innerHTML);
    
    let shippingCost = subtotal * comissionPercentage;
    document.getElementById("shippingCost").innerHTML = shippingCost;

    let total =  subtotal +  shippingCost;
    document.getElementById("totalCost").innerHTML = total;
}
   


//Función para conversión de moneda
function currencyConv(i){
    
    if(cartProducts.articles[i].currency=== 'USD'){
        return cartProducts.articles[i].unitCost*40;
    }else{
        return cartProducts.articles[i].unitCost;
    }
}


//Función para mostrar carrito
function showCart(){
    let htmlContentToAppend = "";
    for (let i = 0; i < cartProducts.articles.length; i++) {
    var cartProd = cartProducts.articles[i];
    var price = currencyConv(i);
    var subTotal = cartProd.count * price;
    
        
    
        htmlContentToAppend += `
        <tr>
        <td><img src="${cartProd.src}" class = "img-fluid" style ="max-width:50px!important"></td>
        <td class="align-middle">${cartProd.name}</td>
        <td class="align-middle">${cartProd.currency} ${cartProd.unitCost}</td>
        <td class="align-middle"><input onchange="subTotalCost(${i})" id="${i}" type="number" min ="1" value=${cartProd.count}></td>
        <td class="align-middle" id="subtotal${i}">${subTotal}</td>
        <td class="align-middle"> <button type="button" class="btn btn-secondary" onclick="deleteElement('${i}')"><i class="fas fa-trash"></i></button> </td>
        </tr>`
                        
                       
       
    }
    document.getElementById("cart").innerHTML = htmlContentToAppend;
    sumSubTotal()
    
    

}


function deleteElement(i){
    
    cartProducts.articles.splice(i, 1);
    let j = 0
    for(let product of cartProducts.articles){
        product.count = document.getElementById(j).value; 
        
    }

    showCart();
    sumSubTotal();
    totalModify();
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            cartProducts = resultObj.data;
            showCart(cartProducts);
            sumSubTotal()
            totalModify()

        }
    });
});



// Example starter JavaScript for disabling form submissions if there are invalid fields
(function() {
    'use strict';
    window.addEventListener('load', function() {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.getElementsByClassName('needs-validation');
      // Loop over them and prevent submission
      var validation = Array.prototype.filter.call(forms, function(form) {
        form.addEventListener('submit', function(event) {
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add('was-validated');
        }, false);
      });
    }, false);
})();



function validatePurchase() {
    if (boolCard) {
        let cardNumber = document.getElementById("cardNumber").value;
        let cardExpire = document.getElementById("cardExpire").value;
        let cardCode = document.getElementById("cardCode").value;
        

        if ((cardNumber != "") && (cardExpire != "") && (cardCode != "")){
            alert("¡Su compra ha sido realizada con éxito!");    
            return true
        } else {
            alert("Completar campos de tarjeta");
            return false;
        }
    } else if(boolTransfer) {
         let bankAccount = document.getElementById("bankAccount").value;
         if (bankAccount != ""){
            alert("¡Su compra ha sido realizada con éxito!");
            return true
         } else {
            alert("Completar campos de transferencia");
            return false;   
         }
    //} else if (!(boolCard || boolTransfer)){
    } else {
        alert("Seleccionar forma de pago");
        return false;
    }
}

let boolTransfer = false;
let boolCard = true;
function okTransfer(){
    boolTransfer = true;
    boolCard = false;
}

function okCard(){
    boolCard = true;
    boolTransfer = false;
}

function habilitedPurchase(){
    //if (document.getElementById("card").checked) {
    if (boolCard) {
       let card = document.getElementById("cardNumber").value;
       let cardExpire = document.getElementById("cardExpire").value;
       let cardCode = document.getElementById("cardCode").value;
       

       if ((card != "") && (cardExpire != "") && (cardCode != "")){
           /*jquery*/
          $("#paymentModal").modal('hide');
       }
   } else  if (boolTransfer) { 
        let bankAccount = document.getElementById("bankAccount").value;
        if (bankAccount != ""){
           /*jquery*/
          $("#paymentModal").modal('hide');
        }
   }
   return false;
}
