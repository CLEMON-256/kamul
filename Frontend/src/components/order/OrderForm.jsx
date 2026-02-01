import React, { useState } from 'react';
import axiosInstance from '../api/axios';
import { useCart } from '../../contexts/CartContext';
import '../../styles/OrderForm.css';

const OrderForm = () => {
    const { cartItems, clearCart, getCartTotal } = useCart();
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        address: '',
        city: ''
    });
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        const orderData = {
            ...formData,
            total: getCartTotal(),
            items: cartItems.map(item => ({
                menu_item: item.id,
                quantity: item.quantity,
                price: item.price
            }))
        };

        try {
            await axiosInstance.post('/orders/', orderData);
            alert('Order placed successfully!');
            clearCart();
        } catch (error) {
            console.error("Order error:", error);
            alert('Failed to place order. Please check your connection.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="order-form-container">
            <h3>Delivery Details</h3>
            <form onSubmit={handleSubmit} className="order-form">
                <div className="form-row">
                    <div className="form-group">
                        <label>First Name</label>
                        <input type="text" name="first_name" required onChange={handleChange} value={formData.first_name} />
                    </div>
                    <div className="form-group">
                        <label>Last Name</label>
                        <input type="text" name="last_name" required onChange={handleChange} value={formData.last_name} />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" name="email" required onChange={handleChange} value={formData.email} />
                    </div>
                    <div className="form-group">
                        <label>Phone Number</label>
                        <input type="text" name="phone" required onChange={handleChange} value={formData.phone} />
                    </div>
                </div>

                <div className="form-group">
                    <label>Delivery Address</label>
                    <textarea name="address" required onChange={handleChange} value={formData.address}></textarea>
                </div>

                <div className="form-group">
                    <label>City</label>
                    <input type="text" name="city" required onChange={handleChange} value={formData.city} />
                </div>

                <div className="form-summary">
                    <div className="summary-total">
                        <span>Total Amount:</span>
                        <span>UGX {getCartTotal().toLocaleString()}</span>
                    </div>
                </div>

                <button
                    type="submit"
                    className="order-submit-btn"
                    disabled={submitting || cartItems.length === 0}
                >
                    {submitting ? 'Processing...' : 'Place Order Now'}
                </button>
            </form>
        </div>
    );
};

export default OrderForm;

