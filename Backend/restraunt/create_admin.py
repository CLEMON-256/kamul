import os
import django
import sys

# Setup Django environment
# Add the current directory to sys.path so 'restraunt.settings' can be found
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'restraunt.settings')
django.setup()

from django.contrib.auth import get_user_model

def create_or_reset_admin(username, password, email='admin@example.com'):
    User = get_user_model()
    
    if not User.objects.filter(username=username).exists():
        User.objects.create_superuser(username, email, password)
        print(f"✅ Superuser '{username}' created successfully.")
    else:
        user = User.objects.get(username=username)
        user.set_password(password)
        user.is_staff = True
        user.is_superuser = True
        user.save()
        print(f"✅ Password for '{username}' has been reset successfully.")

if __name__ == "__main__":
    # You can change these values as needed
    ADMIN_USERNAME = 'admin'
    ADMIN_PASSWORD = 'YourNewSecurePassword123!' 
    
    print(f"Attempting to setup admin account: {ADMIN_USERNAME}")
    create_or_reset_admin(ADMIN_USERNAME, ADMIN_PASSWORD)
    print("\nIMPORTANT: Please remember your new credentials!")
