function Logout()
{
    alert("tuan cho");
    const xhttp = new XMLHttpRequest();
    
    xhttp.onload = function()
        {
            //lấy dữ liệu dạng json
            var ResponseJson=xhttp.responseText
            //chuyển về dữ liệU javascript
            var Response= JSON.parse(ResponseJson)
            if(xhttp.status==200)
            {
                //vứi status =201 thành công
                alert("ok")
                localStorage.clear();
                window.location = "/Login";
                
            }
            else{
               
            }
        }     
        
        
        xhttp.open("POST","/Apiv1/Logout",false);
        //định dạng gửi đi787
        xhttp.setRequestHeader("Content-type","application/json")
        //gửi
        xhttp.send();    
}