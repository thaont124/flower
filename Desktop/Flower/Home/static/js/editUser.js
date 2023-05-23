old();
function old(){
    
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function(){
        var ResponseJson =  xhttp.responseText
        var Response = JSON.parse(ResponseJson)
        if(xhttp.status=200){
            
            var s1 = document.getElementById('form');
            var a = 0;
            for(var i=0; i<Response.length;i++){
                if(Response[i].id==window.location.pathname.substring(10)){
                    a=i;
                    break;
                }
            }
            var s ='<label for="fullname" >FullName:</label><input type="text" id="fullname" name="fullname" value="' + Response[a].FullName +'"><br><br><label for="name" >Name:</label><input type="text" id="name" name="name" value="'+ Response[a].UserName +'"><br><br><label for="email" >Email:</label><input type="text" id="email" name="email" value="'+ Response[a].Email +'"><br><br><button type="submit" onclick="sua()">Edit User</button>';
            s1.innerHTML = s;
        }else{

        }
    }
    xhttp.open("GET", "/Apiv1/AllUser", false);
    xhttp.setRequestHeader("Content-type", "application/json")
    xhttp.send();
}

function sua()
{
    
    const xhttp = new XMLHttpRequest();
    var fullname = document.getElementById('fullname').value;
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    
    
        xhttp.onload = function()
            {
                //lấy dữ liệu dạng json
                var ResponseJson=xhttp.responseText
                //chuyển về dữ liệU javascript
                var Response= JSON.parse(ResponseJson)
                
                if(xhttp.status==200)
                {
                   
                   
                    window.location = "/ListUser";
                }
                else{
                    
                }
            }     
            const userInfo={
                fullname : fullname,
                name : name,
                email : email,
               
            }
            putUser=JSON.stringify(userInfo);
            //khai báo phương thức và đường dẫn để request
            xhttp.open("PUT","/Apiv1/EditUser/"+window.location.pathname.substring(10),false);
            //định dạng gửi đi787
            xhttp.setRequestHeader("Content-type","application/json")
            //gửi
            xhttp.send(putUser);  
        
}