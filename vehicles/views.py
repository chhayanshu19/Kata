from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .serializers import VehicleSerializer
from .models import Vehicles
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAdminUser
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
# Create your views here.

class VehicleListCreateView(generics.ListCreateAPIView):
    queryset=Vehicles.objects.all()
    serializer_class=VehicleSerializer
    permission_classes=[IsAuthenticated]

class VehichleDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Vehicles.objects.all()
    serializer_class = VehicleSerializer
    def get_permissions(self):
        if self.request.method=="DELETE":
            return [IsAdminUser()]
        return [IsAuthenticated()]

class PurchaseVehicleView(APIView):
    permission_classes=[IsAuthenticated]
    def post(self,request,pk):
        vehicle=get_object_or_404(Vehicles,pk=pk)
        if vehicle.quantity==0:
            return Response(
                {"error":"Vehicle is out of stock."},
                status=status.HTTP_400_BAD_REQUEST
            )
        vehicle.quantity-=1
        vehicle.save()

        return Response(
            {
                "message":"Vehicle purchased successfully.",
                "remaining_quality":vehicle.quantity
            },
            status=status.HTTP_200_OK
        )

class RestockVehicleView(APIView):

    permission_classes = [IsAdminUser]

    def post(self, request, pk):

        vehicle = get_object_or_404(Vehicles, pk=pk)

        quantity = request.data.get("quantity")

        if quantity is None:
            return Response(
                {"error": "Quantity is required."},
                status=status.HTTP_400_BAD_REQUEST
            )

        quantity = int(quantity)

        if quantity <= 0:
            return Response(
                {"error": "Quantity must be greater than zero."},
                status=status.HTTP_400_BAD_REQUEST
            )

        vehicle.quantity += quantity
        vehicle.save()

        return Response(
            {
                "message": "Vehicle restocked successfully.",
                "quantity": vehicle.quantity
            },
            status=status.HTTP_200_OK
        )

class VehicleListCreateView(generics.ListCreateAPIView):
    queryset = Vehicles.objects.all().order_by("id")
    serializer_class = VehicleSerializer
    permission_classes = [IsAuthenticated]

    filter_backends = [
        DjangoFilterBackend,
        SearchFilter,
        OrderingFilter,
    ]

    filterset_fields = [
        "category",
    ]

    search_fields = [
        "make",
        "model",
    ]

    ordering_fields = [
        "price",
        "quantity",
    ]