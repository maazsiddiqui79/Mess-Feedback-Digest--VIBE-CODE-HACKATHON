import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from accounts.models import User, StudentProfile

def run():
    print("Creating admin...")
    admin, _ = User.objects.get_or_create(email="admin@messmind.edu", defaults={"role": "SUPER_ADMIN"})
    admin.set_password("admin123")
    admin.is_staff = True
    admin.is_superuser = True
    admin.save()

    print("Creating manager...")
    manager, _ = User.objects.get_or_create(email="manager@messmind.edu", defaults={"role": "MANAGER"})
    manager.set_password("manager123")
    manager.save()

    print("Creating student...")
    student, _ = User.objects.get_or_create(email="student@messmind.edu", defaults={"role": "STUDENT"})
    student.set_password("student123")
    student.save()

    StudentProfile.objects.get_or_create(
        user=student,
        defaults={"student_id": "CS101", "hostel": "Block A", "room": "101"}
    )
    
    print("Database populated with test users!")

if __name__ == '__main__':
    run()
