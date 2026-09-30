from rest_framework import serializers
from .models import Meal

class MealSerializer(serializers.ModelSerializer):
    class Meta:
        model = Meal
        fields = ['id', 'name', 'meal_type', 'date', 'start_time', 'end_time', 'menu_description', 'is_active']
