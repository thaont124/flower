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
                s+= '<tr><td>'+ (i+1) +'</td><td>'+ Response[i].FullName +'</td><td>'+ Response[i].UserName +'</td><td>'+ Response[i].Email +'</td><td class="setupproduct"><div class="editproduct"><a href="/EditUser/'+ Response[i].id +'" >Sửa </a></div><div class="deleteproduct" onclick="xoa('+ Response[i].id +')">Xóa </div><div class="clear"></div></td> </tr>'
         
            }
            s1.innerHTML =s;
        }else{

        }
    }
    xhttp.open("GET", "/Apiv1/AllUser", false);
    xhttp.setRequestHeader("Content-type", "application/json")
    xhttp.send();

}
function xoa(id){
    
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function(){
        var ResponseJson =  xhttp.responseText
        var Response = JSON.parse(ResponseJson)
        if(xhttp.status=200){
            add()
            
        }else{

        }
    }
    xhttp.open("DELETE", "/Apiv1/DeleteUser/" + id, false);
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
    xhttp.open("PUT", "/Apiv1/EditUser/" + id, false);
    xhttp.setRequestHeader("Content-type", "application/json")
    xhttp.send();

}