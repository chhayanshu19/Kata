from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .serializers import VehicleSerializer
from .models import Vehicles
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
# Create your views here.

class VehicleListCreateView(generics.ListCreateAPIView):
    queryset=Vehicles.objects.all()
    serializer_class=VehicleSerializer
    permission_classes=[IsAuthenticated]

class VehichleDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Vehicles.objects.all()
    serializer_class = VehicleSerializer
    permission_classes=[IsAuthenticated]

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