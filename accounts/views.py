from rest_framework import generics
from .serializers import RegisterSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import (
    RegisterSerializer,
    CustomTokenObtainPairSerializer,
)

class RegisterView(generics.CreateAPIView):
    serializer_class=RegisterSerializer

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer