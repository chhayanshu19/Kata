from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.test import APITestCase

# Create your tests here.
class RegisterTest(APITestCase):
    
    def test_register_user(self):
        data={
            "username":"john",
            "email":"john@test.com",
            "password":"Password123"
        }

        response = self.client.post("/api/auth/register/",data,format="json")

        self.assertEqual(response.status_code,status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(),1)
    
    def test_login_user(self):
        User.objects.create_user(
            username="john",
            email="john@test.com",
            password="Password123"
        )

        response=self.client.post(
            "/api/auth/login/",
            {
                "username":"john",
                "password":"Password123"
            },
            format="json"
        )

        self.assertEqual(response.status_code,status.HTTP_200_OK)
        self.assertIn("access",response.data)
        self.assertIn("refresh",response.data)
