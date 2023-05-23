function Signup()
{
    alert("tuan cho");
    const xhttp = new XMLHttpRequest();
    var username = document.getElementById('username').value;
    var fullname = document.getElementById('fullname').value;
    var email = document.getElementById('email').value;
    //  Lấy giá trị trong element input với id là password:
    var password = document.getElementById('password').value;
    var password2 = document.getElementById('password2').value;
    if(password!=password2){
        var a = document.getElementById('Error')
        var a1 = '<p>'+'Nhập lại mật khẩu'+'</p>';
        a.innerHTML = a1;

    }else{
        xhttp.onload = function()
            {
                //lấy dữ liệu dạng json
                alert("ok")
                var ResponseJson=xhttp.responseText
                //chuyển về dữ liệU javascript
                var Response= JSON.parse(ResponseJson)
                
                if(xhttp.status==201)
                {
                    //vứi status =201 thành công
                    
                    localStorage.setItem('userID',Response['ID']);
                    window.location = "/Home";
                    //alert("Đăng nhập thành công");
                }
                else{
                    var s = document.getElementById('Error2')
                    var s1 = '<p>'+Response["Vui lòng nhập lại"]+'</p>';
                    s.innerHTML = s1;
                }
            }     
            const userInfo={
                username:username,
                fullname:fullname,
                email:email,
                password:password,
                password2:password2
            }
            postUser=JSON.stringify(userInfo);
            //khai báo phương thức và đường dẫn để request
            xhttp.open("POST","/Apiv1/Signup",false);
            //định dạng gửi đi787
            xhttp.setRequestHeader("Content-type","application/json")
            //gửi
            xhttp.send(postUser);  
        }  
}