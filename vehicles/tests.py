from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Vehicles
# Create your tests here.

class VehicleTest(APITestCase):
    def setUp(self):
        self.user=User.objects.create_user(
            username="john",
            password="Password123",
        )

        refresh=RefreshToken.for_user(self.user)
        self.client.credentials(
            HTTP_AUTHORIZATION=f"Bearer {refresh.access_token}"
        )

    def test_create_vehicle(self):
        data={
            "make":"BMW",
            "model":"M4",
            "category":"Sports",
            "price":"8500000",
            "quantity":5
        }

        response=self.client.post(
            "/api/vehicles/",data,format="json"
        )

        self.assertEqual(response.status_code,status.HTTP_201_CREATED)
        self.assertEqual(Vehicles.objects.count(),1)
    
    def test_get_vehicle_list(self):
        Vehicles.objects.create(
            make="BMW",
            model="M4",
            category="Sports",
            price=8500000,
            quantity=5
        )

        response=self.client.get("/api/vehicles/")
        self.assertEqual(response.status_code,status.HTTP_200_OK)
        self.assertEqual(len(response.data),1)
    
    def test_update_vehicle(self):
        vehicle=Vehicles.objects.create(
            make="BMW",
            model="M4",
            category="Sports",
            price=8500000,
            quantity=5
        )

        response=self.client.put(
            f"/api/vehicles/{vehicle.id}/",
            {
                "make": "BMW",
                "model": "M5",
                "category": "Sports",
                "price": "9000000",
                "quantity": 3
            },
            format="json"
        )
        self.assertEqual(response.status_code,status.HTTP_200_OK)

    def test_delete_vehicle(self):
            
        vehicle = Vehicles.objects.create(
            make="BMW",
            model="M4",
            category="Sports",
            price=8500000,
            quantity=5
        )

        response = self.client.delete(
            f"/api/vehicles/{vehicle.id}/"
        )

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_purchase_vehicle(self):
        vehicle = Vehicles.objects.create(
            make="BMW",
            model="M4",
            category="Sports",
            price=8500000,
            quantity=5
        )
        response=self.client.post(
            f"/api/vehicles/{vehicle.id}/purchase/"
        )
        vehicle.refresh_from_db()

        self.assertEqual(response.status_code,status.HTTP_200_OK)
        self.assertEqual(vehicle.quantity,4)
    
    def test_purchase_out_of_stock(self):
        vehicle=Vehicles.objects.create(
            make="BMW",
            model="M4",
            category="Sports",
            price=8500000,
            quantity=0
        )
        response=self.client.post(
            f"/api/vehicles/{vehicle.id}/purchase/"
        )
        self.assertEqual(response.status_code,status.HTTP_400_BAD_REQUEST)