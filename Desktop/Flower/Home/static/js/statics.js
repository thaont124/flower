statics();
function statics(){
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function(){
        var ResponseJson =  xhttp.responseText
        var Response = JSON.parse(ResponseJson)
        if(xhttp.status=200){
            var s1 = document.getElementById('add');
            var s = '';
            for(var i=0; i<Response.length;i++){
                s += '<tr ><td>' + (i+1) +'</td><td>'+ Response[i].ProductName +'</td>'
                s += '<td><img src="'+Response[i].img+'" alt=""></td>'
                s += '<td>' + Response[i].price +'</td>'
                s += '<td>'+Response[i].total_sales+'</td>'
                s += '<td>'+Response[i].decrease+'</td></tr>'
            }
            s1.innerHTML =s;
        }else{

        }
    }
    xhttp.open("GET", "/Apiv1/Statics", false);
    xhttp.setRequestHeader("Content-type", "application/json")
    xhttp.send();

}