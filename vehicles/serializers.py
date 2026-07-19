from rest_framework import serializers
from .models import Vehicles


class VehicleSerializer(serializers.ModelSerializer):

    class Meta:
        model = Vehicles
        fields = "__all__"

    def validate_price(self, value):

        if value <= 0:
            raise serializers.ValidationError(
                "Price must be greater than zero."
            )

        return value

    def validate_quantity(self, value):

        if value < 0:
            raise serializers.ValidationError(
                "Quantity cannot be negative."
            )

        return value

    def validate(self, attrs):

        make = attrs.get("make")
        model = attrs.get("model")

        queryset = Vehicles.objects.filter(
            make__iexact=make,
            model__iexact=model,
        )

        # Ignore the current vehicle while editing
        if self.instance:
            queryset = queryset.exclude(pk=self.instance.pk)

        if queryset.exists():
            raise serializers.ValidationError(
                "A vehicle with this make and model already exists."
            )

        return attrs

    def validate_make(self, value):
        if not value.strip():
            raise serializers.ValidationError("Make is required.")
        return value.strip()

    def validate_model(self, value):
        if not value.strip():
            raise serializers.ValidationError("Model is required.")
        return value.strip()