import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import '../styles/OrderSuccessPage.css';

const OrderSuccessPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const orderData = location.state?.orderData;

    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!orderData) {
        return (
            <div className="order-success-error">
                <div className="error-card">
                    <h2>No order data found</h2>
                    <p>It seems we couldn't find your order information. If you just placed an order, please contact support.</p>
                    <Link to="/" className="back-home-btn">Return to Home</Link>
                </div>
            </div>
        );
    }

    const { formData, cartItems, total, orderNumber, date } = orderData;

    const handleWhatsAppForward = () => {
        const phoneNumber = '256701126433';
        const itemsList = cartItems.map(item => `${item.title} x ${item.quantity} - UGX ${(item.price * item.quantity).toLocaleString()}`).join('%0A');

        const message = `*NEW ORDER RECEIVED* %0A%0A` +
            `*Order Number:* ${orderNumber}%0A` +
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
    };

    return (
        <div className="order-success-page">
            <div className="container">
                <div className="success-card">
                    <div className="success-header">
                        <div className="success-icon-wrapper">
                            <div className="success-icon-circle">
                                <div className="success-icon">✓</div>
                            </div>
                        </div>
                        <h1>Order Received Successfully!</h1>
                        <p className="success-subtitle">Thank you for your order. We've received it and are preparing it for you.</p>
                    </div>

                    <div className="order-meta-info">
                        <div className="meta-grid">
                            <div className="meta-item">
                                <span className="meta-label">ORDER ID</span>
                                <span className="meta-value">#{orderNumber}</span>
                            </div>
                            <div className="meta-item">
                                <span className="meta-label">DATE</span>
                                <span className="meta-value">{date}</span>
                            </div>
                            <div className="meta-item">
                                <span className="meta-label">TOTAL</span>
                                <span className="meta-value">UGX {total.toLocaleString()}</span>
                            </div>
                            <div className="meta-item">
                                <span className="meta-label">PAYMENT</span>
                                <span className="meta-value">Cash on Delivery</span>
                            </div>
                        </div>
                    </div>

                    <div className="order-details-content">
                        <h2>Order Details</h2>
                        <div className="details-table-wrapper">
                            <table className="order-details-table">
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th className="text-right">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.map((item, index) => (
                                        <tr key={index}>
                                            <td>
                                                <div className="item-info">
                                                    <span className="item-name">{item.title}</span>
                                                    <span className="item-qty"> × {item.quantity}</span>
                                                </div>
                                            </td>
                                            <td className="text-right">UGX {(item.price * item.quantity).toLocaleString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr className="subtotal-row">
                                        <th>Subtotal:</th>
                                        <td className="text-right">UGX {total.toLocaleString()}</td>
                                    </tr>
                                    <tr className="grand-total-row">
                                        <th>Grand Total:</th>
                                        <td className="text-right"><span>UGX {total.toLocaleString()}</span></td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>

                    <div className="success-actions">
                        <button onClick={handleWhatsAppForward} className="whatsapp-forward-btn">
                            <i className="whatsapp-icon"></i> FORWARD TO WHATSAPP
                        </button>
                        <Link to="/" className="back-home-link">Back to Home Page</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccessPage;
