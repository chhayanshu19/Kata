from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .serializers import VehicleSerializer
from .models import Vehicles
# Create your views here.

class VehicleListCreateView(generics.ListCreateAPIView):
    queryset=Vehicles.objects.all()
    serializer_class=VehicleSerializer
    permission_classes=[IsAuthenticated]

class VehichleDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Vehicles.objects.all()
    serializer_class = VehicleSerializer
    permission_classes=[IsAuthenticated]