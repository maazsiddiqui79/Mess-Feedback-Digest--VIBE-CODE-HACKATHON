import os
import django
import random
from django.utils import timezone

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from accounts.models import User
from community.models import CommunityPost

def run():
    print("Fetching users...")
    student = User.objects.get(email="student@messmind.edu")
    
    messages = [
        "Has anyone tried the new paneer dish? It's amazing! 😋",
        "The mess timings are a bit too early for me. Who agrees?",
        "Lost my ID card near the juice counter, please let me know if anyone finds it.",
        "Today's breakfast was top tier. The aloo paratha was perfectly crisp.",
        "Can we request more spicy options for dinner? It's been a bit bland lately."
    ]

    print("Creating community posts...")
    for msg in messages:
        CommunityPost.objects.create(
            author=student,
            post_type='DISCUSSION',
            content=msg,
            status='ACTIVE'
        )
    
    print("Community populated successfully!")

if __name__ == '__main__':
    run()
