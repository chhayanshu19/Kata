from django.urls import path
from .views import VehicleListCreateView,VehichleDetailView,PurchaseVehicleView

urlpatterns=[
    path("",VehicleListCreateView.as_view(),name="vehicle_list"),
    path("<int:pk>/",VehichleDetailView.as_view(),name="vehicle-detail"),
    path("<int:pk>/purchase/",PurchaseVehicleView.as_view(),name="purchase-vehicle"),
]