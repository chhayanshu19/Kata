from django.urls import path
from .views import VehicleListCreateView,VehichleDetailView,PurchaseVehicleView,RestockVehicleView

urlpatterns=[
    path("",VehicleListCreateView.as_view(),name="vehicle_list"),
    path("<int:pk>/",VehichleDetailView.as_view(),name="vehicle-detail"),
    path("<int:pk>/purchase/",PurchaseVehicleView.as_view(),name="purchase-vehicle"),
    path("<int:pk>/restock/",RestockVehicleView.as_view(),name="restock-vehicle")
]