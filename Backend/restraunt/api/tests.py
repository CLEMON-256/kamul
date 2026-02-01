from django.test import TestCase
from .models import Category, MenuItem, Order, OrderItem
from .serializers import OrderSerializer
from unittest.mock import patch

class OrderCreationTest(TestCase):
    def setUp(self):
        self.category = Category.objects.create(name="Fast Food", slug="fast-food")
        self.item = MenuItem.objects.create(
            category=self.category,
            name="Burger",
            description="Juicy burger",
            price=15000.00
        )

    @patch('api.serializers.send_order_notification_sms')
    def test_order_creation_triggers_sms(self, mock_send_sms):
        data = {
            'first_name': 'John',
            'last_name': 'Doe',
            'email': 'john@example.com',
            'phone': '0701126433',
            'address': 'Kasangati',
            'city': 'Kampala',
            'items': [
                {'menu_item': self.item.id, 'quantity': 2}
            ]
        }
        
        serializer = OrderSerializer(data=data)
        self.assertTrue(serializer.is_valid(), serializer.errors)
        order = serializer.save()
        
        # Verify order details
        self.assertEqual(order.total, 30000.00)
        self.assertEqual(order.items.count(), 1)
        
        # Verify SMS notification was called
        mock_send_sms.assert_called_once_with(order)
        print(f"\nTest successful: Order #{order.id} created and SMS simulation triggered.")
