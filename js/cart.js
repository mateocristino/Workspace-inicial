let cartProducts = [];


//Función para mostrar el costo total(la suma de los productos mas el envío).
function totalCost(){
    var total = 0 
    for (let i = 0; i < cartProducts.articles.length; i++){
        total += parseInt(document.getElementById("subtotal" + i).textContent) // Pasamos a entero porque está como string.
    }
    document.getElementById("totalcost").innerHTML = total
}


//Función para mostrar el costo subTotal de los productos.
function subTotalCost(id){
var cant = document.getElementById(id).value;  // Tomamos el valor del input.
var subTotal = cant*currencyConv(id)
document.getElementById("subtotal" + id).innerHTML = subTotal 
totalCost() //Llamamos a la función totalCost para mostrar la suma de todos los subtotales.

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
        <td class="align-middle"><input onchange="subTotalCost(id)" id="${i}" type="number" min ="1" value=${cartProd.count}></td>
        <td class="align-middle" id="subtotal${i}">${subTotal}</td>
        </tr>`
                        
                       
       
    }
    document.getElementById("cart").innerHTML += htmlContentToAppend;
    totalCost()
    
    

}



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            cartProducts = resultObj.data;
            showCart(cartProducts);
            

        }
    });
});
