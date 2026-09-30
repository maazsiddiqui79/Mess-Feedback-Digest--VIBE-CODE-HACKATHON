import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from accounts.models import User, StudentProfile

STUDENTS = [
    {"email": "arjun.sharma@messmind.edu",   "name": "Arjun Sharma",   "student_id": "CS2021001", "hostel": "Block A", "room": "101"},
    {"email": "priya.patel@messmind.edu",     "name": "Priya Patel",    "student_id": "CS2021002", "hostel": "Block A", "room": "102"},
    {"email": "rahul.verma@messmind.edu",     "name": "Rahul Verma",    "student_id": "CS2021003", "hostel": "Block B", "room": "201"},
    {"email": "sneha.gupta@messmind.edu",     "name": "Sneha Gupta",    "student_id": "CS2021004", "hostel": "Block B", "room": "204"},
    {"email": "kiran.nair@messmind.edu",      "name": "Kiran Nair",     "student_id": "CS2021005", "hostel": "Block C", "room": "301"},
    {"email": "ankita.joshi@messmind.edu",    "name": "Ankita Joshi",   "student_id": "CS2021006", "hostel": "Block C", "room": "305"},
    {"email": "deepak.mehra@messmind.edu",    "name": "Deepak Mehra",   "student_id": "CS2021007", "hostel": "Block D", "room": "401"},
    {"email": "pooja.reddy@messmind.edu",     "name": "Pooja Reddy",    "student_id": "CS2021008", "hostel": "Block D", "room": "404"},
    {"email": "vijay.kumar@messmind.edu",     "name": "Vijay Kumar",    "student_id": "CS2021009", "hostel": "Block A", "room": "105"},
    {"email": "meera.iyer@messmind.edu",      "name": "Meera Iyer",     "student_id": "CS2021010", "hostel": "Block B", "room": "208"},
]

def run():
    print("Creating 10 students...")
    for s in STUDENTS:
        user, created = User.objects.get_or_create(
            email=s["email"],
            defaults={"role": "STUDENT"}
        )
        user.set_password("student123")
        user.save()

        StudentProfile.objects.get_or_create(
            user=user,
            defaults={
                "student_id": s["student_id"],
                "hostel": s["hostel"],
                "room": s["room"],
                "name": s["name"],
                "description": f"Engineering student at MessMind University. Hostel {s['hostel']}, Room {s['room']}."
            }
        )
        status = "Created" if created else "Already exists"
        print(f"  [{status}] {s['email']}")

    print("\nDone! All 10 students populated.")
    print("Password for all students: student123")

if __name__ == '__main__':
    run()
