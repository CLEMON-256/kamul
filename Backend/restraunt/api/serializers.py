from rest_framework import serializers
from .models import MenuItem, Category, Reservation, Order, OrderItem, SiteSettings, HeroSlide, GalleryImage

class MenuItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = MenuItem
        fields = '__all__'

class CategorySerializer(serializers.ModelSerializer):
    items = MenuItemSerializer(many=True, read_only=True)
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'subtitle', 'image', 'items']

class HeroSlideSerializer(serializers.ModelSerializer):
    class Meta:
        model = HeroSlide
        fields = '__all__'

class GalleryImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = GalleryImage
        fields = '__all__'

class SiteSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteSettings
        fields = '__all__'

class ReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = '__all__'

class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields= ('menu_item', 'quantity')

from .utils import send_order_notification_sms

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)

    class Meta:
        model = Order
        fields = (
            'id', 'first_name', 'last_name', 'email', 'phone', 'address', 'city', 'items'
        )

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        order = Order.objects.create(total=0, **validated_data)
        total = 0
        for item_data in items_data:
            menu_item = item_data['menu_item']
            quantity = item_data['quantity']
            price = menu_item.price
            total += price * quantity
            OrderItem.objects.create(order=order, menu_item=menu_item, quantity=quantity, price=price)

        order.total = total
        order.save()
        
        # Send SMS notification
        try:
            send_order_notification_sms(order)
        except Exception as e:
            # We don't want to fail the order if SMS fails, just log it
            print(f"Error sending SMS: {e}")
            
        return order
        


        
