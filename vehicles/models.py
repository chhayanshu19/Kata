from django.db import models


class Vehicles(models.Model):
    CATEGORY_CHOICES = [
        ("SUV", "SUV"),
        ("Sedan", "Sedan"),
        ("Hatchback", "Hatchback"),
        ("Truck", "Truck"),
        ("Sports", "Sports"),
    ]

    make = models.CharField(max_length=100)
    model = models.CharField(max_length=100)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.PositiveIntegerField(default=0)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["make", "model"],
                name="unique_make_model",
            )
        ]

    def __str__(self):
        return f"{self.make} {self.model}"