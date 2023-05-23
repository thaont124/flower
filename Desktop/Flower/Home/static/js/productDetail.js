detail();
function detail(){
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function(){
        var ResponseJson = xhttp.responseText
        var Response = JSON.parse(ResponseJson)
        if(xhttp.status=200){
            alert('ok');
            var s1 = document.getElementById('detail');
            var s = '<div class="container__product__img"><img src="'+ Response.img + '" alt=""></div>'
            s +=  '<div class="container__product__main"><div class="container__product__main__infor">'
            s +=  '<h1>'+ Response.ProductName +'</h1>'
            s +=  '<p>Mã Sản Phẩm: <span>'+ Response.ProductCode +'</span></p>'
            s +=  '<h2>'+ Response.Price +'</h2></div>'
            s +=  '<div class="container__product__main__buy"><div class="product__buy__quantily">'
            s +=  '<label for="">Số lượng: </label><input type="text" name="" id="amount"></div>'
            s +=  '<div class="product__buy__button" onclick=addcart('+Response.id+')><a href=""><i class="fas fa-cart-plus"></i> Thêm vào giỏ hàng</a></div></div></div>'
            s1.innerHTML = s;
        }else{

        }
        
    }
    xhttp.open("GET", "/Apiv1/productDetail/"+window.location.pathname.substring(15), false);
    xhttp.setRequestHeader("Content-type", "application/json")
    xhttp.send();
}

function addcart(id) {

  var amount;
  var amountElement = document.getElementById("amount");
  
  if (amountElement === null || amountElement.value === "") {
    amount = 1;
  } else {
    amount = amountElement.value;
  }
  
    const xhttp = new XMLHttpRequest();
    const userID = localStorage.getItem('userID');

    xhttp.onload = function() {
      // lấy dữ liệu dạng json
      var ResponseJson = xhttp.responseText;
      // chuyển về dữ liệu javascript
      var Response = JSON.parse(ResponseJson);
      if (xhttp.status == 200) {
        alert("Đã thêm vào giỏ hàng");
      } else {
        alert("Sai");
      }
    };
    const order = {
      Amount: amount
    };
    postOrder = JSON.stringify(order);
    // khai báo phương thức và đường dẫn để request
    xhttp.open("POST", "/Apiv1/AddCart/"+id, false);
    // định dạng gửi đi
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.setRequestHeader("userID", userID);
    // gửi
    xhttp.send(postOrder);
  }