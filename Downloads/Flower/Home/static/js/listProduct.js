add();
function add(){
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function(){
        var ResponseJson =  xhttp.responseText
        var Response = JSON.parse(ResponseJson)
        if(xhttp.status=200){
            var s1 = document.getElementById('add');
            var s = '';
            for(var i=0; i<Response.length;i++){
                s+= '<tr><td>'+ (i+1) + '</td><td>'+ Response[i].ProductName +'</td><td><img src = "'+ Response[i].Imgage +'"></td><td>'+ Response[i].Status +'</td><td>'+Response[i].Price+'</td><td class="setupproduct"><div class="editproduct"> <a href="/EditProduct/'+Response[i].id+'"> Sửa </a></div><div class="deleteproduct" onclick="xoa('+Response[i].id+')"> Xóa</div><div class="clear"></div></td></tr>'
            }
            s1.innerHTML =s;
        }else{

        }
    }
    xhttp.open("GET", "/Apiv1/NewProduct", false);
    xhttp.setRequestHeader("Content-type", "application/json")
    xhttp.send();

}

function xoa(idproduct){
    
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function(){
        var ResponseJson =  xhttp.responseText
        var Response = JSON.parse(ResponseJson)
        if(xhttp.status=200){
            add()
            
        }else{

        }
    }
    xhttp.open("DELETE", "/Apiv1/Delete/" + idproduct, false);
    xhttp.setRequestHeader("Content-type", "application/json")
    xhttp.send();

}
function sua(id){
    
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function(){
        var ResponseJson =  xhttp.responseText
        var Response = JSON.parse(ResponseJson)
        if(xhttp.status=200){
            add()
            
        }else{

        }
    }
    xhttp.open("PUT", "/Apiv1/EditProduct/" + id, false);
    xhttp.setRequestHeader("Content-type", "application/json")
    xhttp.send();

}