from PIL import Image
import os

img_path = r"c:\Users\Junior love\Desktop\restraunt app\Frontend\src\assets\about-hero.jpg"
original_path = r"C:\Users\Junior love\.gemini\antigravity\brain\43ae3645-96e7-451b-8c82-dd9f427b1560\uploaded_media_1769762113051.jpg"

if os.path.exists(original_path):
    img = Image.open(original_path)
    width, height = img.size
    
    # We want to remove the BAKED IN navbar (top) and baked in "About Us" text (center)
    # The Navbar is at the very top.
    # The "About Us" text is roughly in the middle 30% to 70%.
    
    # Let's crop the top 20% to remove the navbar
    top_crop = int(height * 0.20)
    
    # To remove the "About Us" text, we might need to crop more, 
    # but then we lose the drinks. 
    # Better to just use the drinks part.
    
    # Actually, I'll just crop the TOP to remove the navbar. 
    # And I'll remove my manual H1 if it's annoying, 
    # OR I'll use a completely different nice image.
    
    # I'll use a DIFFERENT image from the assets that is clean. 
    # hero-background.jpg is clean.
    
    # Wait, I'll just crop the top 15% and see.
    left = 0
    top = int(height * 0.15)
    right = width
    bottom = height
    
    cropped_img = img.crop((left, top, right, bottom))
    cropped_img.save(img_path)
    print(f"Successfully cropped navbar out. New size: {cropped_img.size}")
else:
    print("Original file not found.")
