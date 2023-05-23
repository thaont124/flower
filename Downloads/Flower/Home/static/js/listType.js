categories()
function categories() {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        var ResponseJson = xhttp.responseText
        var Response = JSON.parse(ResponseJson)
        if (xhttp.status = 200) {
         
            var serverListElement = document.getElementById('categories');
            //khai báo biến String(dùng để thay đổi html trong thẻ bên trên)
            var serverListHTML = '';
            for (var i = 0; i < Response.length; i++) {

                serverListHTML += '<table id="table__productlist"><thead>'
                serverListHTML += '<tr><th></th><th>'+ Response[i].CategoryName +'</th><th>Tùy chọn</th></tr></thead><tbody>'
                try{

                    for (var j = 0; j < Response[i].parent.length; j++) {
                        serverListHTML += '<tr>';
                        serverListHTML += '<td>' + (j + 1) + '</td>';
                        serverListHTML += '<td>' + Response[i].parent[j].CategoryName + '</td>';
                        serverListHTML += '<td class="setupproduct">';
                        serverListHTML += '<div class="editproduct" onclick="editCategory(' + Response[i].parent[j].id + ')">Sửa</div>';
                        serverListHTML += '<div class="deleteproduct" onclick="deleteCategory(' + Response[i].parent[j].id + ')">Xóa</div>';
                        serverListHTML += '<div class="clear"></div>';
                        serverListHTML += '</td>';
                        serverListHTML += '</tr>';
                    }
            
                }
                catch{
                    
                }
                serverListHTML += '</tbody></table><br><br>'
                
            }
            serverListElement.innerHTML = serverListHTML;
        } else {

        }

    }
    xhttp.open("GET", "/Apiv1/Category", false);
    xhttp.setRequestHeader("Content-type", "application/json")
    xhttp.send();
}
function editCategory(idCategory){
    window.location="/EditCategory/"+idCategory;
}
function deleteCategory(idCategory){
    const xhttp =new XMLHttpRequest();
    xhttp.onload = function(){
        if(xhttp.status===204){
            categories();
        }
    }
    xhttp.open("DELETE", "/Apiv1/Category/"+idCategory, false);
    xhttp.setRequestHeader("Content-type", "application/json")
    xhttp.send();
}