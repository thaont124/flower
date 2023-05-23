from django.urls import path
from .views import AllFlower, FlowerHot, Login, Signup, DetailProduct, Update, ProductByIDCategory,AddProduct, NewProduct, Delete, EditProduct, DeleteUser, AllUser, EditUser, Search, Pay, ListRole, NormalRole,Cart, Account, Password, Logout, OrderProduct, AddCart, Statics, CategoryAPI, ProductByCategory,CategoryAPIByID, Recommend


urlpatterns = {
    path('AllFlower',AllFlower.as_view()),
    path('FlowerHot',FlowerHot.as_view()),
    path('Login',Login.as_view()),
    path('Signup', Signup.as_view()),
    path('productDetail/<int:id>', DetailProduct.as_view()),
    path('Update', Update.as_view()),
    path('ProductByIDCategory/<int:CategoryID>', ProductByIDCategory.as_view()),
    path('AddProduct', AddProduct.as_view()),
    path('NewProduct', NewProduct.as_view()),
    path('Delete/<int:id>', Delete.as_view()), 
    path('EditProduct/<int:id>', EditProduct.as_view()),
    path('DeleteUser/<int:id>', DeleteUser.as_view()),
    path('AllUser', AllUser.as_view()),
    path('EditUser/<int:id>', EditUser.as_view()),
    path('Search/<str:key>', Search.as_view()),
    path('Pay/<int:id>', Pay.as_view() ),
    path('ListRole', ListRole.as_view()),
    path('NormalRole', NormalRole.as_view()),
    path('Cart', Cart.as_view()),
    path('AddCart/<int:id>', AddCart.as_view()),
    path('Account', Account.as_view()),
    path('Password', Password.as_view()),
    path('Logout', Logout.as_view()), 
    path('Order', OrderProduct.as_view()),
    path('Order/<int:id>', OrderProduct.as_view()),
    path('Statics', Statics.as_view()),
    path('Category', CategoryAPI.as_view()),
    path('Category/<int:id>', CategoryAPIByID.as_view()),
    path('ProductByCategory/<int:category_id>', ProductByCategory.as_view()),
    path('Recommend', Recommend.as_view()),
}