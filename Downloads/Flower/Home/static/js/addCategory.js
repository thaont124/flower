categories()


function categories() {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        var ResponseJson = xhttp.responseText
        var Response = JSON.parse(ResponseJson)
       
        if (xhttp.status = 200) {

            categoriesHtml='<option value="null" selected>null</option>';
            categoriesElement=document.getElementById("CategoryParent")
            for( var i=0;i<Response.length;i++){
              categoriesHtml+='<option value="'+Response[i].id+'">'+Response[i].CategoryName+'</option>'
            }
            categoriesElement.innerHTML=categoriesHtml;
        } else {

        }

    }
    xhttp.open("GET", "/Apiv1/Category", false);
    xhttp.setRequestHeader("Content-type", "application/json")
    xhttp.send();
}
function postCategory(){
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function () {
      
     
      if (xhttp.status = 201) {
        window.location="/ListType"
      } else {

      }

  }
  const dataCategory ={
    "categoryName":document.getElementById("CategoryName").value
  }
  if(document.getElementById("CategoryParent").value!="null")dataCategory["parent_id"]=document.getElementById("CategoryParent").value;
  var  dataCategoryJson =JSON.stringify(dataCategory);
  xhttp.open("POST", "/Apiv1/Category", false);
  xhttp.setRequestHeader("Content-type", "application/json")
  xhttp.send(dataCategoryJson);
}

