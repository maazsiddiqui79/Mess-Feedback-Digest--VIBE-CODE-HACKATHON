import os
import django
import random
from datetime import timedelta
from django.utils import timezone
from django.core.files.uploadedfile import SimpleUploadedFile

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from accounts.models import User
from meals.models import Meal
from feedback.models import Feedback, FeedbackMedia

def run():
    print("Populating 20 feedback entries...")
    
    # Ensure there are meals
    if not Meal.objects.exists():
        m1 = Meal.objects.create(name="Samosa & Chai", meal_type="SNACKS", date=timezone.now().date(), start_time="16:00", end_time="18:00")
        m2 = Meal.objects.create(name="Dal Makhani", meal_type="DINNER", date=timezone.now().date(), start_time="19:00", end_time="21:00")
        meals = [m1, m2]
    else:
        meals = list(Meal.objects.all())

    # Ensure there are students
    students = list(User.objects.filter(role='STUDENT'))
    if not students:
        print("No students found. Please create students first.")
        return

    # Create dummy image
    dummy_image_content = b'\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\x00\x01\x00\x00\x00\x01\x08\x06\x00\x00\x00\x1f\x15\xc4\x89\x00\x00\x00\nIDATx\x9cc\x00\x01\x00\x00\x05\x00\x01\r\n-\xb4\x00\x00\x00\x00IEND\xaeB`\x82'
    
    tags = {
        'issues': ['Cold Food', 'Undercooked', 'Too Spicy', 'Salty', 'Poor Hygiene', 'Late Service'],
        'positives': ['Tasty', 'Good Portion', 'Hot & Fresh', 'Clean Ambience', 'Polite Staff']
    }

    count = 0
    for i in range(20):
        student = random.choice(students)
        meal = random.choice(meals)
        rating = random.randint(1, 5)
        
        is_positive = rating >= 4
        
        f = Feedback.objects.create(
            student=student,
            meal=meal,
            rating=rating,
            issue_tags=random.sample(tags['issues'], random.randint(1, 3)) if not is_positive else [],
            positive_tags=random.sample(tags['positives'], random.randint(1, 3)) if is_positive else [],
            custom_remark=f"Automated feedback {i}",
            is_anonymous=random.choice([True, False])
        )
        
        # Attach image to some
        if random.choice([True, False]):
            img = SimpleUploadedFile(f"test_image_{i}.png", dummy_image_content, content_type="image/png")
            FeedbackMedia.objects.create(
                feedback=f,
                media_type='IMAGE',
                file=img
            )
        count += 1
        
    print(f"Successfully created {count} feedback entries with media.")

if __name__ == '__main__':
    run()
