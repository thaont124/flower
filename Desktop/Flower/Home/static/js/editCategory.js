var categorySelected=0
getCategiryById();

categories()
function getCategiryById(){
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        var ResponseJson = xhttp.responseText
        var Response = JSON.parse(ResponseJson)
       
        if (xhttp.status = 200) {
                categorySelected=Response;
          
        } else {

        }

    }
    xhttp.open("GET", "/Apiv1/Category/"+window.location.pathname.substring(14), false);
    xhttp.setRequestHeader("Content-type", "application/json")
    xhttp.send();
}

function categories() {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        var ResponseJson = xhttp.responseText
        var Response = JSON.parse(ResponseJson)
       
        if (xhttp.status = 200) {
            document.getElementById("CategoryName").value=categorySelected.CategoryName;
            categoriesHtml='<option value="null" ';
            if(categorySelected.CategoryParent=='null')categoriesHtml+='selected ';
            categoriesHtml+='>null</option>';
            categoriesElement=document.getElementById("CategoryParent")
            for( var i=0;i<Response.length;i++){
              categoriesHtml+='<option value="'+Response[i].id+'" ';
              if(Response[i].id==categorySelected.CategoryParent)categoriesHtml+='selected '
              categoriesHtml+='>'+Response[i].CategoryName+'</option>'
            }
            categoriesElement.innerHTML=categoriesHtml;
        } else {

        }

    }
    xhttp.open("GET", "/Apiv1/Category", false);
    xhttp.setRequestHeader("Content-type", "application/json")
    xhttp.send();
}
function PatchCategory(){
    const xhttp = new XMLHttpRequest();
  xhttp.onload = function () {
      
     
      if (xhttp.status = 200) {
        window.location="/ListType"
      } else {

      }

  }
  const dataCategory ={
    "categoryName":document.getElementById("CategoryName").value
  }
  if(document.getElementById("CategoryParent").value!="null")dataCategory["parent_id"]=document.getElementById("CategoryParent").value;
  else dataCategory["parent_id"]=null;
  var  dataCategoryJson =JSON.stringify(dataCategory);
  xhttp.open("PATCH", "/Apiv1/Category/"+window.location.pathname.substring(14), false);
  xhttp.setRequestHeader("Content-type", "application/json")
  xhttp.send(dataCategoryJson);
}