import React, { useEffect, useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../styles/CartPage.css';

const CartPage = () => {
    const { cartItems, removeFromCart, updateQuantity } = useCart(); // Assuming updateQuantity exists or I'll add logic
    const location = useLocation();
    const navigate = useNavigate();
    const [justAdded, setJustAdded] = useState(null);

    useEffect(() => {
        if (location.state && location.state.addedItem) {
            setJustAdded(location.state.addedItem);
            // Clear state after showing so refresh doesn't show it again? 
            // implementation detail, leaving as is for now.
            window.history.replaceState({}, document.title);
        }
    }, [location]);

    const calculateSubtotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const handleCheckout = () => {
        navigate('/checkout');
    };

    // Helper to format price
    const formatPrice = (price) => {
        return `UGX ${price.toLocaleString()}`;
    };

    return (
        <div className="cart-page">
            <div className="container">
                <h1 className="cart-title">Cart</h1>

                {justAdded && (
                    <div className="cart-notification">
                        <span className="check-icon">✓</span>
                        <p>"{justAdded}" has been added to your cart.</p>
                        <Link to="/bakery" className="continue-shopping-btn">CONTINUE SHOPPING</Link>
                    </div>
                )}

                {cartItems.length === 0 ? (
                    <div className="empty-cart-message">
                        <p>Your cart is currently empty.</p>
                        <Link to="/bakery" className="return-shop-btn">RETURN TO SHOP</Link>
                    </div>
                ) : (
                    <div className="cart-content">
                        <div className="cart-table-wrapper">
                            <table className="cart-table">
                                <thead>
                                    <tr>
                                        <th className="product-remove">&nbsp;</th>
                                        <th className="product-thumbnail">&nbsp;</th>
                                        <th className="product-name">Product</th>
                                        <th className="product-price">Price</th>
                                        <th className="product-quantity">Quantity</th>
                                        <th className="product-subtotal">Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.map((item) => (
                                        <tr key={item.id} className="cart-item">
                                            <td className="product-remove">
                                                <button onClick={() => removeFromCart(item.id)}>&times;</button>
                                            </td>
                                            <td className="product-thumbnail">
                                                <img src={item.image} alt={item.title} />
                                            </td>
                                            <td className="product-name">
                                                <Link to={`/product/${item.id}`}>{item.title}</Link>
                                            </td>
                                            <td className="product-price">
                                                {formatPrice(item.price)}
                                            </td>
                                            <td className="product-quantity">
                                                <div className="quantity-input">
                                                    {/* Minimal quantity display for now, context might need update for live edit */}
                                                    <span>{item.quantity}</span>
                                                </div>
                                            </td>
                                            <td className="product-subtotal">
                                                {formatPrice(item.price * item.quantity)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="cart-actions">
                            <div className="coupon-section">
                                <input type="text" placeholder="Coupon code" />
                                <button className="apply-coupon-btn">Apply coupon</button>
                            </div>
                            <button className="update-cart-btn" disabled>Update cart</button>
                        </div>

                        <div className="cart-collaterals">
                            <div className="cart-totals">
                                <h2>Cart totals</h2>
                                <table>
                                    <tbody>
                                        <tr className="cart-subtotal">
                                            <th>Subtotal</th>
                                            <td>{formatPrice(calculateSubtotal())}</td>
                                        </tr>
                                        <tr className="order-total">
                                            <th>Total</th>
                                            <td><strong>{formatPrice(calculateSubtotal())}</strong></td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className="proceed-to-checkout">
                                    <button onClick={handleCheckout} className="checkout-btn">
                                        PROCEED TO CHECKOUT
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartPage;
