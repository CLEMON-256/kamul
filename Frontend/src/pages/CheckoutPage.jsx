import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { orderAPI } from '../api/services';
import '../styles/CheckoutPage.css';

const CheckoutPage = () => {
    const navigate = useNavigate();
    const { cartItems, clearCart } = useCart();
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    // Calculate totals
    const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const total = subtotal;

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        companyName: '',
        country: 'Uganda',
        streetAddress: '',
        houseNumber: '',
        district: 'Kampala',
        phone: '',
        email: '',
        orderNotes: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);

        try {
            // Prepare data for backend API
            const backendOrderData = {
                first_name: formData.firstName,
                last_name: formData.lastName,
                email: formData.email,
                phone: formData.phone,
                address: formData.streetAddress,
                city: formData.district,
                items: cartItems.map(item => ({
                    menu_item: item.id,
                    quantity: item.quantity
                }))
            };

            // Call backend API
            const response = await orderAPI.createOrder(backendOrderData);
            const createdOrder = response.data;

            // Prepare order data for success page and WhatsApp
            const date = new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });

            const orderData = {
                formData,
                cartItems: [...cartItems],
                total,
                orderNumber: createdOrder.id, // Use real ID from backend
                date
            };

            // 1. Format and trigger WhatsApp forwarding (Optional, since SMS is sent to restaurant)
            const phoneNumber = '256701126433';
            const itemsList = cartItems.map(item => `${item.title} x ${item.quantity} - UGX ${(item.price * item.quantity).toLocaleString()}`).join('%0A');

            const message = `*NEW ORDER RECEIVED* %0A%0A` +
                `*Order Number:* ${createdOrder.id}%0A` +
                `*Date:* ${date}%0A%0A` +
                `*Customer Details:*%0A` +
                `- Name: ${formData.firstName} ${formData.lastName}%0A` +
                `- Phone: ${formData.phone}%0A` +
                `- District: ${formData.district}%0A` +
                `- Address: ${formData.streetAddress}%0A%0A` +
                `*Order Summary:*%0A${itemsList}%0A%0A` +
                `*Total:* UGX ${total.toLocaleString()}%0A` +
                `*Payment Method:* Cash on delivery`;

            const url = `https://wa.me/${phoneNumber}?text=${message}`;
            window.open(url, '_blank', 'noopener,noreferrer');

            // 2. Clear cart
            if (clearCart) clearCart();

            // 3. Redirect to success page
            navigate('/order-success', { state: { orderData } });
        } catch (err) {
            console.error('Order creation failed:', err);
            setError('There was an error processing your order. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="checkout-page">
            <div className="container">
                <h1 className="checkout-title">Checkout</h1>

                <div className="checkout-coupon-toggle">
                    <span className="icon">📄</span>
                    Have a coupon? <a href="#">Click here to enter your code</a>
                </div>

                <form className="checkout-form" onSubmit={handleSubmit}>
                    <div className="checkout-grid">
                        {/* Left Column: Billing Details */}
                        <div className="billing-details">
                            <h2>Billing details</h2>

                            <div className="form-row-half">
                                <div className="form-group">
                                    <label>First name *</label>
                                    <input type="text" name="firstName" required value={formData.firstName} onChange={handleInputChange} />
                                </div>
                                <div className="form-group">
                                    <label>Last name *</label>
                                    <input type="text" name="lastName" required value={formData.lastName} onChange={handleInputChange} />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Company name (optional)</label>
                                <input type="text" name="companyName" value={formData.companyName} onChange={handleInputChange} />
                            </div>

                            <div className="form-group">
                                <label>Country / Region *</label>
                                <select name="country" value={formData.country} onChange={handleInputChange}>
                                    <option value="Uganda">Uganda</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Street address *</label>
                                <input
                                    type="text"
                                    name="streetAddress"
                                    placeholder="House number and street name"
                                    required
                                    value={formData.streetAddress}
                                    onChange={handleInputChange}
                                    className="mb-10"
                                />
                                <input
                                    type="text"
                                    name="houseNumber"
                                    placeholder="Apartment, suite, unit, etc. (optional)"
                                    value={formData.houseNumber}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>District *</label>
                                <select name="district" value={formData.district} onChange={handleInputChange}>
                                    <option value="Kampala">Kampala</option>
                                    <option value="Entebbe">Entebbe</option>
                                    <option value="Wakiso">Wakiso</option>
                                    <option value="Mukono">Mukono</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Phone *</label>
                                <input type="tel" name="phone" required value={formData.phone} onChange={handleInputChange} />
                            </div>

                            <div className="form-group">
                                <label>Email address *</label>
                                <input type="email" name="email" required value={formData.email} onChange={handleInputChange} />
                            </div>
                        </div>

                        {/* Right Column: Additional Info */}
                        <div className="additional-info">
                            <h2>Additional information</h2>
                            <div className="form-group">
                                <label>Order notes (optional)</label>
                                <textarea
                                    name="orderNotes"
                                    placeholder="Notes about your order, e.g. special notes for delivery."
                                    value={formData.orderNotes}
                                    onChange={handleInputChange}
                                    rows="4"
                                ></textarea>
                            </div>
                        </div>
                    </div>

                    {/* Order Summary Section */}
                    <div className="order-review-section">
                        <h2>Your order</h2>
                        <table className="checkout-review-table">
                            <thead>
                                <tr>
                                    <th className="product-name">Product</th>
                                    <th className="product-total">Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map(item => (
                                    <tr key={item.id} className="cart_item">
                                        <td className="product-name">
                                            {item.title} <strong className="product-quantity">× {item.quantity}</strong>
                                        </td>
                                        <td className="product-total">
                                            UGX {(item.price * item.quantity).toLocaleString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr className="cart-subtotal">
                                    <th>Subtotal</th>
                                    <td><strong>UGX {subtotal.toLocaleString()}</strong></td>
                                </tr>
                                <tr className="order-total">
                                    <th>Total</th>
                                    <td><strong>UGX {total.toLocaleString()}</strong></td>
                                </tr>
                            </tfoot>
                        </table>

                        {/* Payment Section */}
                        <div className="payment-box">
                            <div className="payment-method">
                                <input type="radio" id="cod" name="payment_method" checked readOnly />
                                <label htmlFor="cod">CASH ON DELIVERY</label>
                                <div className="payment-desc">
                                    <p>Pay with cash upon delivery.</p>
                                </div>
                            </div>

                            <div className="privacy-policy-text">
                                Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our <a href="#">privacy policy</a>.
                            </div>

                            {error && <div className="checkout-error-message">{error}</div>}

                            <button
                                type="submit"
                                className="place-order-btn"
                                disabled={submitting}
                            >
                                {submitting ? 'PROCESSING...' : 'PLACE ORDER'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CheckoutPage;
