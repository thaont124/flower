update();
function update(){
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function(){
        var ResponseJson =  xhttp.responseText
        var Response = JSON.parse(ResponseJson)
        if(xhttp.status=200){
            var s1 = document.getElementById('update');
            var s = '';
            for (var i=0;i<Response.length;i++){
                s+= '<div class="container__listproduct__product"><div class="product__img"><a href="/ProductDetail/'+ Response[i].id +'"><img src="'+ Response[i].img+'" alt=""></a></div><div class="product__inforproduct"><h1>'+Response[i].Price+'</h1><p> <a href="/ProductDetail/'+ Response[i].id +'">'+Response[i].ProductName +'</a></p>   <div class="addtocart" onclick=addcart('+Response[i].id+')><a href=""> <i class="fas fa-cart-plus"></i> Thêm vào giỏi hàng</a></div> </div></div>';
         
            }
            s1.innerHTML =s;
        }else{

        }
    }
    xhttp.open("GET", "/Apiv1/Update", false);
    xhttp.setRequestHeader("Content-type", "application/json")
    xhttp.send();

}

function productByCategory(idCategory){
    const xhttp =  new XMLHttpRequest();
    
    xhttp.onload = function(){
        var ResponseJson = xhttp.responseText
        var Response =  JSON.parse(ResponseJson)
        if(xhttp.status==200){
            alert("ok")
            var s1 = document.getElementById('update')
            var s = ''
            for (var i=0;i<Response.length;i++){
                s+= '<div class="container__listproduct__product"><div class="product__img"><a href="/ProductDetail/'+ Response[i].idProduct +'"><img src="'+ Response[i].img  +'" alt=""></a></div><div class="product__inforproduct"><h1>'+Response[i].Price+'</h1><p> <a href="/ProductDetail/'+ Response[i].id +'">'+Response[i].ProductName +'</a></p>   <div class="addtocart"><a href="/Cart"> <i class="fas fa-cart-plus"></i> Thêm vào giỏi hàng</a></div> </div></div>';
        
            }
            s1.innerHTML =s;
        }else{

        }
    }
    xhttp.open("GET", "/Apiv1/ProductByIDCategory/"+idCategory, false);
    xhttp.setRequestHeader("Content-type", "application/json")
    xhttp.send();  

        

}