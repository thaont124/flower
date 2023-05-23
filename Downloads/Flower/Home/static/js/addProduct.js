function AddProduct() {
    //alert("tuan cho");
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
        xhttp.open("POST", "/Apiv1/AddProduct", false);
        //định dạng gửi đi787
        xhttp.setRequestHeader("Content-type", "application/json")

        //gửi
        xhttp.send(postProduct);
    };
    reader.readAsDataURL(file);

}
var inputFile=document.querySelector('.input-file');

    inputFile.onchange = function(event) {
    let file = event.target.files[0];
    let blobURL = URL.createObjectURL(file);
    inputFile.previousElementSibling.src = blobURL;
};
function flattenCategories(categoriesList) {
    const flattenedList = [];
  
    function flatten(category) {
      if (!category.parent || category.parent.length === 0) {
        flattenedList.push(category);
      } else {
        category.parent.forEach(childCategory => flatten(childCategory));
      }
    }
  
    categoriesList.forEach(category => flatten(category));
    return flattenedList;
  }
  

  
categories();
function categories() {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        var ResponseJson = xhttp.responseText
        var Response = JSON.parse(ResponseJson)
        if (xhttp.status = 200) {
            const flattenedCategories = flattenCategories(Response);
            var categoriesHtml='<option value="">----</option>';
            var categoriesElement= document.getElementById("Category");
            for(var i=0;i<flattenedCategories.length;i++){
                 categoriesHtml+='<option value="'+flattenedCategories[i].id+'">'+flattenedCategories[i].CategoryName+'</option>';
            }
            categoriesElement.innerHTML=categoriesHtml;
        } else {

        }

    }
    xhttp.open("GET", "/Apiv1/Category", false);
    xhttp.setRequestHeader("Content-type", "application/json")
    xhttp.send();
}


var listCategorySelect=[];
var CategoryElement =document.getElementById("Category");
var CategoryListElement =document.getElementById('CategoryList');
var CategorySelectFilmsElement = document.querySelectorAll('#Category option');

var CategoryFilmsElement = document.querySelectorAll('.CategoryDetail');

  CategoryElement.addEventListener("change", function() {

    // Lấy tham chiếu đến phần tử option được chọn
    var selectedOption = this.options[this.selectedIndex];
  
    // Xóa phần tử option được chọn khỏi DOM
    
    CategoryListElement.insertAdjacentHTML("beforeend", ' <div class="CategoryDetail" value="'+selectedOption.value+'">'+selectedOption.innerHTML+'</div>');
    var CategoryFilmsElementx = document.querySelectorAll('.CategoryDetail');
    CategoryFilmsElementx[CategoryFilmsElementx.length-1].addEventListener("click",()=>{
        CategoryElement.insertAdjacentHTML("beforeend", ' <option value="'+CategoryFilmsElementx[CategoryFilmsElementx.length-1].getAttribute("value")+'">'+CategoryFilmsElementx[CategoryFilmsElementx.length-1].innerHTML+'</option>');
        CategoryFilmsElementx[CategoryFilmsElementx.length-1].remove();
        })
    selectedOption.remove();
  });