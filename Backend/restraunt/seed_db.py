import os
import django

# Setup Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'restraunt.settings')
django.setup()

from django.db import connection, transaction
from api.models import Category, MenuItem

def repair_and_seed():
    with connection.cursor() as cursor:
        print("Checking if 'subtitle' column exists in 'api_category'...")
        cursor.execute("""
            SELECT column_name 
            FROM information_schema.columns 
            WHERE table_name='api_category' AND column_name='subtitle';
        """)
        if not cursor.fetchone():
            print("Column 'subtitle' missing. Adding it...")
            cursor.execute("ALTER TABLE api_category ADD COLUMN subtitle varchar(255);")
            print("Column 'subtitle' added.")
        else:
            print("Column 'subtitle' already exists.")

    with transaction.atomic():
        print("\nSeeding categories...")
        fast_food, created = Category.objects.get_or_create(
            slug='fast-foods',
            defaults={'name': 'Fast Foods', 'subtitle': 'Quick and Delicious'}
        )
        if created:
            print(f"Created category: {fast_food.name}")
        else:
            print(f"Category already exists: {fast_food.name}")

        breakfast, created = Category.objects.get_or_create(
            slug='breakfast',
            defaults={'name': 'Breakfast', 'subtitle': 'Start your day right'}
        )

        lunch, created = Category.objects.get_or_create(
            slug='lunch',
            defaults={'name': 'Lunch', 'subtitle': 'Mid-day delights'}
        )

        pastries, created = Category.objects.get_or_create(
            slug='pastries',
            defaults={'name': 'Pastries', 'subtitle': 'Sweet and Savory Treats'}
        )

        print("\nSeeding menu items...")
        items = [
            {
                "category": fast_food,
                "name": "VERDE PIZZA",
                "description": "Topped with pesto chicken with cheese.",
                "price": 28000.00
            },
            {
                "category": fast_food,
                "name": "FRUITTI DI MARE",
                "description": "Topped with our exotic mix of seafood and cheese.",
                "price": 30000.00
            },
            {
                "category": breakfast,
                "name": "Full Breakfast Combo",
                "description": "Eggs, bacon, sausages, and toast.",
                "price": 25000.00
            },
            {
                "category": lunch,
                "name": "ALFREDO TRUFFLE PASTA",
                "description": "A rich garlicky toast with exquisite tomato and basil twist",
                "price": 40000.00
            },
            {
                "category": lunch,
                "name": "STEAK TAGLIATA",
                "description": "Tender and Juicy beef strips on a bed of wild rockets with an option of chips or wedges",
                "price": 45000.00
            },
            {
                "category": pastries,
                "name": "TRADITIONAL FRUIT CAKE",
                "description": "A brandied 2-months aged dark rich fruit cake. Dense and rich with fruits soaked for months.",
                "price": 140000.00
            },
            {
                "category": pastries,
                "name": "CHOCOLATE BABKA",
                "description": "Sweet, braided yeast bread known for its rich, swirled layers.",
                "price": 15000.00
            }
        ]

        for item_data in items:
            item, created = MenuItem.objects.get_or_create(
                name=item_data['name'],
                defaults=item_data
            )
            if created:
                print(f"Created item: {item.name}")
            else:
                print(f"Item already exists: {item.name}")

    print("\nDatabase repair and seeding complete!")

if __name__ == "__main__":
    repair_and_seed()
