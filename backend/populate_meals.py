import os
import django
from django.utils import timezone

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from meals.models import Meal

def run():
    today = timezone.now().date()
    
    meals = [
        {"name": "Aloo Paratha & Curd", "meal_type": "BREAKFAST", "start_time": "07:30", "end_time": "09:30"},
        {"name": "Paneer Butter Masala & Roti", "meal_type": "LUNCH", "start_time": "12:30", "end_time": "14:30"},
        {"name": "Samosa & Chai", "meal_type": "SNACKS", "start_time": "17:00", "end_time": "18:00"},
        {"name": "Dal Makhani & Jeera Rice", "meal_type": "DINNER", "start_time": "19:30", "end_time": "21:30"}
    ]

    for meal_data in meals:
        Meal.objects.get_or_create(
            name=meal_data["name"],
            date=today,
            defaults={
                "meal_type": meal_data["meal_type"],
                "start_time": meal_data["start_time"],
                "end_time": meal_data["end_time"],
                "menu_description": f"Delicious {meal_data['name']}"
            }
        )
    
    print("Today's meals populated successfully!")

if __name__ == '__main__':
    run()
