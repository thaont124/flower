
from datetime import datetime,timedelta
from rest_framework.views import APIView
from rest_framework.response import Response
import json
import io
import base64
from PIL import Image
from django.conf import settings
import os
from Entity.models.Product import Product
from Entity.models.User import User
from Entity.models.Role import Role
from Entity.models.UserRole import UserRole
from Entity.models.CategoryProduct import CategoryProduct
from Entity.models.Category import Category
from Entity.models.Order import Order
from django.db.models import Q,F, Count


from core.settings import BASE_DIR

from django.db import connection
from django.db.models import Sum

class AllFlower(APIView):
    def get(self, request):
        flowers = Product.objects.all()
        flowerList = []
        for flower in flowers:
            flowerList.append({"id" : flower.pk, "ProductName":flower.ProductName, "ProductCode":flower.ProductCode, "Price":flower.Price, "Quatily":flower.Quatily})
        return Response(flowerList, status=200)
class FlowerHot(APIView):
    def get(self, request):
        thirty_days_ago = datetime.now() - timedelta(days=30)
        with connection.cursor() as cursor:
            cursor.execute('SELECT p.id, p.ProductName, p.ProductCode, p.Price, p.Quatily, p.Imgage, p.Status, SUM(o.Amount) AS total_sales, COUNT(o.id) AS total_quantity FROM entity_product AS p LEFT JOIN entity_order AS o ON p.id = o.Product_id AND o.Status = "1" AND o.Date >= %s GROUP BY p.id ORDER BY total_sales DESC', [thirty_days_ago])

            rows = cursor.fetchall()

            data = []
            for row in rows:
                data.append({
                    'id': row[0],
                    'ProductName': row[1],
                    'ProductCode': row[2],
                    'price': row[3],
                    'quantity': row[4],
                    'img': row[5],
                    'status': row[6],
                    'total_sales': row[7] or 0,
                    'total_quantity': row[8] or 0
                })

        return Response(data)

class Statics(APIView):
    def get(self, request):
        thirty_days_ago = datetime.now() - timedelta(days=30)
        sixty_days_ago = datetime.now() - timedelta(days=60)

        with connection.cursor() as cursor:
            cursor.execute(
                '''
                SELECT p.id, p.ProductName, p.ProductCode, p.Price, p.Quatily, p.Imgage, p.Status,
                SUM(o.Amount) AS total_sales, COUNT(o.id) AS total_quantity
                FROM entity_product AS p
                LEFT JOIN entity_order AS o ON p.id = o.Product_id AND o.Status = '1' AND o.Date >= %s
                GROUP BY p.id
                ORDER BY p.id DESC
                ''',
                [thirty_days_ago]
            )

            rows = cursor.fetchall()

            cursor.execute(
                '''
                SELECT p.id, SUM(o.Amount) AS total_sales_2_months_ago, COUNT(o.id) AS total_quantity
                FROM entity_product AS p
                LEFT JOIN entity_order AS o ON p.id = o.Product_id AND o.Status = '1' AND o.Date >= %s
                GROUP BY p.id
                ORDER BY p.id DESC
                ''',
                [sixty_days_ago]
            )

            rows_2_months_ago = cursor.fetchall()

            data = []
            for i in range(len(rows)):
                row = rows[i]
                row_2_months_ago = rows_2_months_ago[i] if i < len(rows_2_months_ago) else None
                decrease = (row[7] or 0) - ((row_2_months_ago[1] or 0) - (row[7] or 0))

                data.append({
                    'id': row[0],
                    'ProductName': row[1],
                    'ProductCode': row[2],
                    'price': row[3],
                    'quantity': row[4],
                    'img': row[5],
                    'status': row[6],
                    'total_sales': row[7] or 0,
                    'decrease': decrease,
                    'total_quantity': row[8] or 0
                })
        data_sorted = sorted(data, key=lambda x: x['total_sales'], reverse=True)

        return Response(data_sorted)

class Login(APIView):
    def post(self, request):
        if 'username' not in request.data:
            return Response({"massage":"Vui lòng nhập tên tài khoản"}, status=400)
        username = request.data['username']
        if 'password' not in request.data:
            return Response({"password":"Vui lòng nhập mật khẩu"}, status=400)
        password = request.data['password']
        try:
            user = User.objects.get(UserName = username, Password = password)
        except:
            return Response({"massage":"Sai tài khoản"}, status=401)
        return Response({"ID":user.id}, status=201)
class Signup(APIView):
    def post(self, resquest):
        if 'username' not in resquest.data:
            return Response({"message":" Vui lòng nhập tài khoản!"}, status=400)
        username = resquest.data['username']
        if 'password' not in resquest.data:
            return Response({"message":" Vui lòng nhập mật khẩu"}, status=400)
        password = resquest.data['password']
        if 'fullname' not in resquest.data:
            return Response({"message":" Vui lòng nhập họ và tên"}, status=400)
        fullname = resquest.data['fullname']
        if 'email' not in resquest.data:
            return Response({"message":" Vui lòng nhập email"}, status=400)
        email = resquest.data['email']
        
        try:
            User.objects.get(UserName = username)
            return Response({"message":"Tài khoản đã tồi tại"}, status=400)
        except:
            newUser = User(UserName= username, Password = password, FullName= fullname, Email= email)
        role = Role.objects.get(pk=2)
        newUser.save()
        newRole = UserRole(Role = role, User = newUser)
        newRole.save()
        return Response({"ID":newUser.id}, status=201)
class DetailProduct(APIView):
    def get(self, request, id):
        product = Product.objects.get(pk=id)
        productList = {"id":product.id, "ProductName":product.ProductName, "ProductCode":product.ProductCode, "Price":product.Price, "Quatily": product.Quatily, "img": product.Imgage, "Status": product.Status}
        return Response(productList, status=200)
class Update(APIView):
    def get(self, request):
        products = Product.objects.all().order_by('-pk')
        print(products)
        productList = []
        for i in products:

            productList.append({"id":i.pk, "ProductName":i.ProductName, "ProductCode": i.ProductCode, "Price":i.Price, "img":i.Imgage})
        return Response(productList, status=200)
class ProductByIDCategory(APIView):
    def get(self, request, CategoryID):
        productQuery = CategoryProduct.objects.filter(Category__pk=CategoryID)
        product = []
        for i in productQuery:
            product.append({"idCategory":i.Category.id, "idProduct":i.Product.id, "CategoryName": i.Category.CategoryName, "ProductName":i.Product.ProductName, "img": i.Product.Imgage, "Price": i.Product.Price})
        return Response(product, status=200)
class AddProduct(APIView):
    def post(self, request):
        images = request.data['img']
        image = Image.open(io.BytesIO(base64.b64decode(images))) 
        print(image)       
        # Lưu file vào thư mục MEDIA_ROOT của Django
        file_path = os.path.join(settings.MEDIA_ROOT, request.data['filename'])[:-4]+'(0).png'
        check=0
        while  os.path.isfile(file_path) :
            check+=1
            file_path = os.path.join(settings.MEDIA_ROOT, request.data['filename'])[:-4]+'('+str(check)+').png'
        image.save(file_path)
        name = request.data['name']
        tt = request.data['tt']
        price = request.data['price']
        code = request.data['code']
        quatily = request.data['quatily']
        #print(name, img, tt, price, code, quatily)
        new_product = Product(ProductName = name, ProductCode = code, Imgage = file_path[len(os.path.join(BASE_DIR)):], Quatily = quatily, Price = price, Status = tt)
        new_product.save()
        return Response({'message':'thành công'}, status=200)
class NewProduct(APIView):
    def get(self, request):
        product = Product.objects.all()
        products = []
        for i in product:
            products.append({"id" : i.pk, "ProductName":i.ProductName, "ProductCode":i.ProductCode, "Price":i.Price, "Quatily":i.Quatily, "Imgage": i.Imgage, "Status": i.Status})
        return Response(products, status=200)
class Delete(APIView):
    def delete(self, request, id):
        product = Product.objects.get(pk=id)
        product.delete()
        return Response({"message": "đã xóa"}, status=200)
class EditProduct(APIView):
    def put(self, request, id):
        product = Product.objects.get(pk=id)
        name = request.data['name']
        code = request.data['code']
        price = request.data['price']
        quatity = request.data['quatily']
        img = request.data['img']
        tt = request.data['tt']
        product.ProductName= name
        product.ProductCode= code
        product.Price= price
        product.Quatily = quatity
        product.Imgage = img
        product.Status = tt
        product.save()
        return Response({"message": "đã sửa"}, status=200)
class DeleteUser(APIView):
    def delete(self, request, id):
        user = User.objects.get(pk=id)
        user.delete()
        return Response({"message": "đã xóa"}, status=200)
class AllUser(APIView):
    def get(self, request):
        user = User.objects.all()
        users = []
        for i in user:
            users.append({"id":i.pk, "UserName": i.UserName, "FullName": i.FullName, "Email": i.Email})
        return Response(users, status=200)
class EditProduct(APIView):
    def put(self, request, id):
        images = request.data['img']
        image = Image.open(io.BytesIO(base64.b64decode(images))) 
        print(image)       
        # Lưu file vào thư mục MEDIA_ROOT của Django
        file_path = os.path.join(settings.MEDIA_ROOT, request.data['filename'])[:-4]+'(0).png'
        check=0
        while  os.path.isfile(file_path) :
            check+=1
            file_path = os.path.join(settings.MEDIA_ROOT, request.data['filename'])[:-4]+'('+str(check)+').png'
        image.save(file_path)
        product = Product.objects.get(pk=id)
        name = request.data['name']
        code = request.data['code']
        price = request.data['price']
        quatity = request.data['quatily']
        tt = request.data['tt']
        product.ProductName= name
        product.ProductCode= code
        product.Price= price
        product.Quatily = quatity
        product.Imgage = file_path[len(os.path.join(BASE_DIR)):]
        product.Status = tt
        product.save()
        return Response({"message": "đã sửa"}, status=200)
class Search(APIView):
    def get(self, request , key):
        productQuery = Product.objects.filter(ProductName__icontains=key)
        product = []
        for i in productQuery:
            product.append({"id":i.pk, "ProductName": i.ProductName, "ProductCode": i.ProductCode, "Price": i.Price, "Quatily": i.Quatily, "Imgage": i.Imgage, "Status": i.Status})
        return Response(product, status=200)
class Pay(APIView):
    def get(self, request, id):
        product = Product.objects.get(pk=id)
        productList = {"id":product.id, "ProductName":product.ProductName, "ProductCode":product.ProductCode, "Price":product.Price, "Quatily": product.Quatily, "Status": product.Status}
        return Response(productList, status=200)
class ListRole(APIView):
    def get(self, request):
        userID = request.headers['userID']
        from django.db import connection
        with connection.cursor() as cursor:
            cursor.execute('SELECT entity_role.id, entity_role.RoleName FROM entity_user join entity_userrole on entity_user.id=entity_userrole.User_id join entity_role on entity_userrole.Role_id=entity_role.id Where User_id='+str(userID)+' group by entity_role.id')
            rows = cursor.fetchall()
        print(rows)
        a = []
        for i in range(len(rows)):
            a.append({"idRole": rows[i][0], "RoleName": rows[i][1]})
        print(a)
        return Response(a, status=200)
class NormalRole(APIView):
    def get(self, request):
        userID = request.headers['userID']
        roleID = 2
        from django.db import connection
        with connection.cursor() as cursor:
            cursor.execute('SELECT entity_role.id, entity_role.RoleName FROM entity_user join entity_userrole on entity_user.id=entity_userrole.User_id join entity_role on entity_userrole.Role_id=entity_role.id Where User_id='+str(userID)+' and Role_id='+str(roleID)+' group by entity_role.id')
            rows = cursor.fetchall()
        print(rows)
        a = []
        for i in range(len(rows)):
            a.append({"idRole": rows[i][0], "RoleName": rows[i][1]})
        print(a)
        return Response(a, status=200)
class EditUser(APIView):
    def put(self, request, id):
        user = User.objects.get(pk=id)
        fullname = request.data['fullname']
        name = request.data['name']
        email = request.data['email']
        user.FullName = fullname
        user.UserName = name
        user.Email = email
        user.save()
        return Response({"message": "đã sửa"}, status=200)
class AddCart(APIView):
    def post(self,request,id):
        userid = request.headers['userID']
        amount = request.data['Amount']
        product = Product.objects.get(pk=id)
        user = User.objects.get(pk=userid)
        print(userid,amount,id)
        if not userid:
            return Response({"message": "Bạn chưa đăng nhập"}, status=401)
        try:
            order = Order.objects.get(User_id=user.pk, Product_id=product.pk, Status = "0")
            order.Amount += int(amount)
            order.save()
        except:
            order = Order(User=user, Product=product,Amount=amount,Date= datetime.now(), Status = "0")
            print(order)
            print("thao")
            order.save()
        return Response({"message": "Đã thêm vào giỏ hàng"}, status=200)  
class Cart(APIView):
    def get(self, request):
        userid = request.headers['userID']
        user = User.objects.get(pk=userid)
        orders = Order.objects.all()
        print("CartGet")
        cartList = []
        for order in orders:
            if order.User == user and order.Status == "0":
                cartList.append({"id" : order.pk, "ProductId": order.Product.pk,  "ProductName":order.Product.ProductName, "ProductCode":order.Product.ProductCode, "Price":order.Product.Price, "Quatily":order.Product.Quatily, "Status":order.Status, "Amount":order.Amount})
        return Response(cartList, status=200)
    
    
    
class OrderProduct(APIView):
    def get(self,request):
        
        userid = request.headers['userID']
        user = User.objects.get(pk=userid)
        orders = Order.objects.all()
        # Lọc các đơn hàng của user có status là 1
        user_orders = [order for order in orders if order.User == user and order.Status == "1"]

        # Sắp xếp theo ngày đặt hàng (ngày gần nhất đến xa nhất)
        sorted_orders = sorted(user_orders, key=lambda x: x.Date, reverse=True)

        # Tạo danh sách đơn hàng đã sắp xếp để trả về
        cartList = []
        for order in sorted_orders:
            cartList.append({
                "id": order.pk,
                "ProductId": order.Product.pk,
                "ProductName": order.Product.ProductName,
                'img': order.Product.Imgage,
                "ProductCode": order.Product.ProductCode,
                "Price": order.Product.Price,
                "Quatily": order.Product.Quatily,
                "Date" : order.Date,
                "Status": order.Status,
                "Amount": order.Amount
            })

        # Trả về danh sách đã sắp xếp
        return Response(cartList, status=200)
    def post(self, request):
        userid = request.headers['userID']
        products = json.loads(request.body)['productList']
        user = User.objects.get(pk=userid)
        for product in products:
            product_id = product['product_id']
            amount = product['amount']
            phone = product['phone']
            print("phone=", phone)
            address = product['address']
            try:
                order = Order.objects.get(User=user, Product__pk=product_id, Status='0')
                order.Status = "1"
                order.Amount = amount
                order.PhoneNumber = phone
                order.Date=datetime.now()
                order.Address = address
                order.save()
            except:
                try:
                    product_obj = Product.objects.get(pk=product_id)
                except Product.DoesNotExist:
                    return Response("Sản phẩm không tồn tại", status=400)
                order = Order(User=user, Product=product_obj, Amount=amount, Date=datetime.now(), Status='1', PhoneNumber = phone, Address = address)
                order.save()
        return Response("Đặt hàng thành công", status=200)
    
    def delete(self, request, id):
        order = Order.objects.get(pk=id)
        order.delete()
        return Response({"message": "đã xóa"}, status=200)
class Account(APIView):
    def get(self, request):
        userid = request.headers['userId']
        user = User.objects.get(pk=userid)
        userQuery = {"id": user.id, "UserName": user.UserName, "FullName": user.FullName, "Email": user.Email, "Password" : user.Password}
        return Response(userQuery, status=200)
    def put(self, request):
        userid = request.headers['userId']
        user = User.objects.get(pk=userid)
        name = request.data['name']
        email = request.data['email']

        user.FullName = name
        user.Email = email
        
        user.save()
        return Response({"message": "đã sửa"}, status=200)
class Password(APIView):
    def put(self, request):
        userid = request.headers['userId']
        user = User.objects.get(pk=userid)
        password = request.data['password']
        user.Password = password
        user.save()
        return Response({"message": "đã sửa mật khẩu"}, status=200)
class Logout(APIView):
    def post(self, request):
        # Xóa session của người dùng để đăng xuất
        request.session.flush()
        return Response({"message": "Đăng xuất thành công"}, status=200)

class CategoryAPI(APIView):
    def post(self, request):
        name = request.data.get('categoryName')
        
        category = Category.objects.create(CategoryName=name)
        return Response({'id': category.id, 'name': category.CategoryName}, status=201)


    


    def get(self, request):
        categories = Category.objects.filter(parent_id=None)
        listCategory=[]
        def categoriesRelation(categories,listparent):
            for category in categories:            
                childrenCategory= Category.objects.filter(parent_id=category.pk)
                if(childrenCategory):
                    parent=[]
                    listparent.append({"id":category.id,"CategoryName":category.CategoryName ,"children":parent})
                    categoriesRelation(childrenCategory,parent)
                else:
                    listparent.append({"id":category.id,"CategoryName":category.CategoryName})
        categoriesRelation(categories,listCategory)
        return Response(listCategory, status=200)

class CategoryAPIByID(APIView):
    def get(self,request,id):
        category =Category.objects.get(pk=id)
        categoryParent =category.parent
        if category.parent != None:
            categoryParent=category.parent.id
        return Response({"id":category.id,"CategoryName":category.CategoryName,"CategoryParent":categoryParent},status=200)
    def patch(self, request, id):
        name = request.data.get('categoryName')
        parent_id = request.data.get('parent_id')
        
        try:
            category = Category.objects.get(id=id)
        except Category.DoesNotExist:
            return Response({'error': 'Category does not exist.'}, status=404)
        
        if name:
            category.CategoryName = name
        if parent_id == None:
               
                category.parent = None
        if parent_id:
            
            try:
                parent_category = Category.objects.get(id=parent_id)
                category.parent = parent_category
            except Category.DoesNotExist:
                return Response({'error': 'Parent category does not exist.'}, status=400)
           
        
        category.save()
        return Response({'id': category.id, 'name': category.CategoryName, 'parent_id': category.parent_id})

    
    def delete(self, request, id):
        try:
            category = Category.objects.get(id=id)
        except Category.DoesNotExist:
            return Response({'error': 'Category does not exist.'}, status=404)
        
       
        category.delete()
        return Response({'message': 'Category deleted successfully.'},status=204)
        
class ProductByCategory(APIView):
    def get(self, request, category_id):
        category_products = CategoryProduct.objects.filter(Category_id=category_id)
            
            # Lấy danh sách các sản phẩm
        product_ids = category_products.values_list('Product_id', flat=True)
        products = Product.objects.filter(id__in=product_ids)
        
        # Tạo danh sách kết quả
        result = []
        for product in products:
            product_data = {
                'id': product.pk,
                'ProductName': product.ProductName,
                'ProductCode': product.ProductCode,
                'Price': product.Price,
                'Quatily': product.Quatily,
                'Imgage': product.Imgage,
                'Status': product.Status
            }
            result.append(product_data)
        
        return Response(result, status=200)
class Recommend(APIView):
    def get(self, request):
        userid = request.headers['userId']
        user = User.objects.get(pk=userid) 
        hoa = Order.objects.filter(User=user)
        if(len(hoa)==0):
            thirty_days_ago = datetime.now() - timedelta(days=30)
            with connection.cursor() as cursor:
                cursor.execute('SELECT p.id, p.ProductName, p.ProductCode, p.Price, p.Quatily, p.Imgage, p.Status, SUM(o.Amount) AS total_sales, COUNT(o.id) AS total_quantity FROM entity_product AS p LEFT JOIN entity_order AS o ON p.id = o.Product_id AND o.Status = "1" AND o.Date >= %s GROUP BY p.id ORDER BY total_sales DESC', [thirty_days_ago])
                rows = cursor.fetchall()
                data = []
                for row in rows:
                    data.append({
                        'id': row[0],
                        'ProductName': row[1],
                        'ProductCode': row[2],
                        'price': row[3],
                        'quantity': row[4],
                        'img': row[5],
                        'status': row[6],
                        'total_sales': row[7] or 0,
                        'total_quantity': row[8] or 0
                    })

            return Response(data)
    def get_smallest_categories(request):
        smallest_categories = Category.objects.exclude(children__isnull=False).values('id', 'CategoryName')
        return Response(list(smallest_categories), safe=False)
        

        