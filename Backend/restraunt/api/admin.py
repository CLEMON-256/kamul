from django.contrib import admin
from .models import Category, MenuItem, Reservation, Order, OrderItem, SiteSettings, HeroSlide, GalleryImage

# Register your models here.

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'subtitle', 'image')
    prepopulated_fields = {'slug': ('name',)}

@admin.register(HeroSlide)
class HeroSlideAdmin(admin.ModelAdmin):
    list_display = ('title', 'order', 'is_active')
    list_editable = ('order', 'is_active')

@admin.register(GalleryImage)
class GalleryImageAdmin(admin.ModelAdmin):
    list_display = ('title', 'section', 'image')
    list_filter = ('section',)

@admin.register(MenuItem)
class MenuItemAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'category', 'price', 'is_available')
    list_filter = ('category', 'is_available')
    search_fields = ('name', 'description')

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'first_name', 'last_name', 'status', 'created_at')
    list_filter = ('status', 'created_at')
    search_fields = ('first_name', 'last_name', 'email')

@admin.register(Reservation)
class ReservationAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'time', 'date', 'guests')
    list_filter = ('guests', 'date')
    search_fields = ('name', 'time')

@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ('id', 'order', 'menu_item', 'quantity', 'price')
    list_filter = ('order',)
    search_fields = ('menu_item', 'quantity', 'price')

@admin.register(SiteSettings)
class SiteSettingsAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'email', 'address', 'phone_restraunt', 'phone_bakeshop', 'whatsapp_number']

admin.site.site_header = "Junior's Restaurant and Lounge Admin"
admin.site.site_title = "Junior's Restaurant and Lounge"
admin.site.index_title = "Welcome to Junior's Restaurant and Lounge Administration Portal"
