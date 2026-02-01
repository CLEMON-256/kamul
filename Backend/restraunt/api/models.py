from django.db import models
from django.contrib.auth.models import User

class Category(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    subtitle = models.CharField(max_length=255, blank=True, null=True)
    image = models.ImageField(upload_to='category_images/', blank=True, null=True)

    def __str__(self):
        return self.name

class HeroSlide(models.Model):
    title = models.CharField(max_length=200)
    subtitle = models.CharField(max_length=255, blank=True)
    image = models.ImageField(upload_to='hero_slides/')
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.title

class GalleryImage(models.Model):
    SECTION_CHOICES = (
        ('kampala', 'Kampala Section'),
        ('about', 'About Page'),
        ('general', 'General Gallery'),
    )
    title = models.CharField(max_length=100, blank=True)
    image = models.ImageField(upload_to='gallery/')
    section = models.CharField(max_length=50, choices=SECTION_CHOICES, default='general')
    alt_text = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return self.title or f"Gallery Image {self.id}"
    
class MenuItem(models.Model):
    category = models.ForeignKey(Category, related_name='items', on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to='menu_images/',blank=True, null=True)
    is_available = models.BooleanField(default=True)

    def __str__(self):
        return self.name

class Reservation(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    date = models.DateField()
    time = models.TimeField()
    guests = models.PositiveIntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
    
class Order(models.Model):
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('processing', 'Processing'),
        ('shipped', 'Shipped'),
        ('delivered', 'Delivered'),
        ('canceled', 'Canceled')
    )

    user = models.ForeignKey(User, on_delete= models.SET_NULL, null=True, blank=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    address = models.CharField(max_length=255)
    city = models.CharField(max_length=100)
    total = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Order {self.id} by {self.first_name} {self.last_name }"
    
class SiteSettings(models.Model):
    name = models.CharField(max_length=255, default="Junior's Restaurant and Lounge")
    email = models.EmailField(default="Juniorrestaurant@gmail.com")
    phone_restraunt = models.CharField(max_length=20, default="0701126433")
    phone_bakeshop = models.CharField(max_length=20, default = "0701126433")
    address = models.CharField(max_length=255, default="GroundFloor-Mutasa-Buliding, Kasangati, Kampala")
    tiktok_url = models.URLField(blank=True)
    whatsapp_number = models.CharField(max_length=20, default="256701126433")
    whatsapp_message = models.TextField(default="The Junior's Restaurant customer support team is here to Serve you. Please place your order at our Restaurant on 0701126433 OR with the Bakeshop on 0701126433")

    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name_plural = "Site Settings"

class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name='items', on_delete=models.CASCADE)
    menu_item = models.ForeignKey(MenuItem, on_delete=models.CASCADE)
    quantity = models.PositiveBigIntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return  f"{self.quantity} of {self.menu_item.name}"
