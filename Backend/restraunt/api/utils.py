import logging

logger = logging.getLogger(__name__)

def send_order_notification_sms(order):
    """
    Sends an SMS notification to the restaurant about a new order.
    For now, this is a mock implementation that prints to the console.
    """
    phone_number = "0701126433"  # Restaurant's target number
    
    # In a real implementation, you would use an SMS gateway API here.
    # Example (psuedocode): 
    # sms_gateway.send(to=phone_number, message=f"New Order #{order.id} received!")

    # Get items details
    items = order.items.all()
    items_summary = "\n".join([f"- {item.menu_item.name} x {item.quantity}" for item in items])

    message = (
        f"NEW ORDER NOTIFICATION\n"
        f"Order ID: #{order.id}\n"
        f"Customer: {order.first_name} {order.last_name}\n"
        f"ITEMS:\n{items_summary}\n"
        f"Total: UGX {order.total}\n"
        f"Phone: {order.phone}\n"
        f"Address: {order.address}, {order.city}\n\n"
        f"Check admin panel for preparation."
    )

    # Log/Print the message (Mock sending)
    print("\n" + "="*40)
    print("SIMULATING SMS SENDING...")
    print(f"To: {phone_number}")
    print(f"Message:\n{message}")
    print("="*40 + "\n")

    logger.info(f"SMS notification simulated for Order #{order.id}")
