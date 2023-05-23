THAO();
function THAO(){
    
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function(){
        var ResponseJson =  xhttp.responseText
        var Response = JSON.parse(ResponseJson)
        if(xhttp.status=200){
            
            var s1 = document.getElementById('add-product-form');
            var s = ' <label for="name" id="name1">Name:</label><input type="text" id="name" name="name" value="' + Response.ProductName + '"><br><br></br>'
           
            s += '<label for="code" id="code1">Code:</label><input type="text" id="code" name="code" value="'+ Response.ProductCode + '"><br><br>'

            s += '<label for="price" id="price1">Price:</label><input type="number" id="price" name="price" min="0" value="' + Response.Price + '"><br><br>'

            s += '<label for="quatily" id="quatily1">Quantity:</label><input type="number" id="quatily" name="quatily" value="'+ Response.Quantily + '"><br><br>'

            s += ' <img src = "'+ Response.img +'"><label for="img" id="img1"><br><br>Đổi ảnh:</label><input type="file" id="img"><br><br><br>'    
        
            s += '<label for="status" id="status1">Trạng Thái:</label><input type="text" id="status" name="status" value="'+Response.Status+'"><br><br>'
        
            s += '<button type="submit" onclick="EditProduct()">Edit Product</button>'
            s1.innerHTML = s;
        }else{

        }
    }
    xhttp.open("GET", "/Apiv1/productDetail/"+window.location.pathname.substring(13), false);
    xhttp.setRequestHeader("Content-type", "application/json")
    xhttp.send();
}

function EditProduct()
{
    
    const xhttp = new XMLHttpRequest();
    var name = document.getElementById('name').value;

    var code = document.getElementById('code').value;
    var price = document.getElementById('price').value;
    var quatily = document.getElementById('quatily').value;
    var img = document.getElementById('img');
    var status = document.getElementById('status').value;

    // Lấy đối tượng input chứa hình ảnh

    var file = img.files[0];

    // Tạo đối tượng FileReader để đọc file hình ảnh
    var reader = new FileReader();
    reader.onloadend = function () {
        // Chuyển đổi file hình ảnh thành Base64 string
        var base64String = reader.result.split(',')[1];

        // Tạo đối tượng JSON chứa dữ liệu hình ảnh


        // Tạo yêu cầu AJAX với dữ liệu hình ảnh dưới dạng JSON
        
        xhttp.onload = function () {
            //lấy dữ liệu dạng json
            var ResponseJson = xhttp.responseText
            //chuyển về dữ liệU javascript
            var Response = JSON.parse(ResponseJson)

            if (xhttp.status == 200) {
                window.location = "/ListProduct";
            }
            else {

            }
        }
        const productInfo = {
            name: name,
            code: code,
            price: price,
            quatily: quatily,
            img: base64String,
            tt: status,
            filename: file.name,
        }
        postProduct = JSON.stringify(productInfo);
        //khai báo phương thức và đường dẫn để request
        xhttp.open("PUT", "/Apiv1/EditProduct/"+window.location.pathname.substring(13), false);
        //định dạng gửi đi787
        xhttp.setRequestHeader("Content-type", "application/json")

        //gửi
        xhttp.send(postProduct);
    };
    reader.readAsDataURL(file);
 
        
}

