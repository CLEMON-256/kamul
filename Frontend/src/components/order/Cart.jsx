// displays items in users cart

import React from 'react';
import { useCart } from '../../contexts/CartContext';
import '../../styles/Cart.css';

const Cart = () => {
    const { cartItems, removeFromCart, clearCart } = useCart();

    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
    return (
        <div class name="cart">
            <h2>Your Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <>
                    <ul>
                        {cartItems.map(item => (
                            <li key={item.id} className="cart-item">
                                <span>{item.name} (x{item.quantity})</span>
                                <span>${item.price * item.quantity}</span>
                                <button onClick={() => removeFromCart(item.id)}>
                                </button>
                            </li>
                        ))}
                    </ul>
                    <p className="total-price">Total: ${totalPrice.toFixed(2)}

                    </p>
                    <button onClick={clearCart}>Clear Cart</button>
                </>

            )
            }
        </div>
    )




}

export default Cart;