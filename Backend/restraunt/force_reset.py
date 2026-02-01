import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'restraunt.settings')
django.setup()

from django.db import connection

def force_reset():
    tables = [
        'api_orderitem', 'api_order', 'api_menuitem', 
        'api_category', 'api_reservation', 'api_sitesettings', 
        'api_heroslide', 'api_galleryimage'
    ]
    with connection.cursor() as cursor:
        print("Force dropping tables...")
        for table in tables:
            try:
                cursor.execute(f"DROP TABLE IF EXISTS {table} CASCADE;")
                print(f"Dropped {table}")
            except Exception as e:
                print(f"Error dropping {table}: {e}")
        
        # Also clean migration history
        print("Cleaning migration history for 'api'...")
        cursor.execute("DELETE FROM django_migrations WHERE app = 'api';")
        print("Migration history cleaned.")

if __name__ == "__main__":
    force_reset()
