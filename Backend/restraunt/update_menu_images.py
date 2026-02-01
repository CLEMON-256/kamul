import os
import django

# Setup Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'restraunt.settings')
django.setup()

from api.models import MenuItem

def update_images():
    image_mapping = {
        "Grilled Ribeye Steak": "menu_images/grilled_ribeye_steak.png",
        "Fluffy Berry Pancakes": "menu_images/fluffy_berry_pancakes.png",
        "CHOCOLATE BABKA": "menu_images/chocolate_babka.jpg",
        "TRADITIONAL FRUIT CAKE": "menu_images/traditional_fruit_cake.jpg",
        "STEAK TAGLIATA": "menu_images/steak_tagliata.png",
        "ALFREDO TRUFFLE PASTA": "menu_images/alfredo_truffle_pasta.png",
        "Full Breakfast Combo": "menu_images/full_breakfast_combo.png",
        "FRUITTI DI MARE": "menu_images/fruitti_di_mare.png",
        "VERDE PIZZA": "menu_images/verde_pizza.png",
    }

    print("\nUpdating menu item images...")
    for item_name, image_path in image_mapping.items():
        try:
            item = MenuItem.objects.get(name=item_name)
            item.image = image_path
            item.save()
            print(f"Updated: {item_name} -> {image_path}")
        except MenuItem.DoesNotExist:
            print(f"Skipped: '{item_name}' (not found in database)")
        except Exception as e:
            print(f"Error updating {item_name}: {e}")

    print("\nUpdate complete!")

if __name__ == "__main__":
    update_images()
