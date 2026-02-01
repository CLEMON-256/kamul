import React, { useState } from 'react';
import { useCart } from '../../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import '../../styles/BakeProductModal.css';

const BakeProductModal = ({ product, onClose }) => {
    const { addToCart } = useCart();
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);

    if (!product) return null;

    const handleIncrement = () => setQuantity(prev => prev + 1);
    const handleDecrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

    const handleAddToCart = () => {
        // Add item to cart with specific quantity
        // Note: CartContext might need adjustment if it only supports adding 1 at a time, 
        // but typically we can loop or pass quantity. 
        // Looking at CartContext: it takes an item. If I passed quantity inside item it might not strictly work 
        // unless I modify context, but standard 'addToCart' often adds 1. 
        // For now, let's call addToCart multiple times or just once if the expectation is simple,
        // BUT better: let's pass a modified item object if the context supports it, 
        // OR simpler: loop addToCart for now to ensure compatibility without changing Context yet.
        // actually looking at context: "return [...prevItems, { ...item, quantity: 1 }];" 
        // it forces quantity to 1 on new add. 
        // I will just loop for now to be safe and robust without refactoring Context this turn.

        for (let i = 0; i < quantity; i++) {
            addToCart(product);
        }

        onClose();
        navigate('/cart', { state: { addedItem: product.title } });
    };

    return (
        <div className="bake-modal-overlay" onClick={onClose}>
            <div className="bake-modal-content" onClick={e => e.stopPropagation()}>
                <button className="bake-modal-close" onClick={onClose}>&times;</button>

                <div className="bake-modal-grid">
                    {/* Left: Image */}
                    <div className="bake-modal-image">
                        <img src={product.image} alt={product.title} />
                    </div>

                    {/* Right: Details */}
                    <div className="bake-modal-details">
                        <div className="modal-header">
                            {product.isBest && <span className="modal-badge">BEST</span>}
                            <h2>{product.title}</h2>
                            <p className="modal-price">UGX {product.price.toLocaleString()}</p>
                        </div>

                        <div className="modal-description">
                            <p>{product.description || "A delicious treat from our bakery, baked fresh daily with the finest ingredients."}</p>
                        </div>

                        <div className="modal-actions">
                            <div className="quantity-selector">
                                <button onClick={handleDecrement}>-</button>
                                <span>{quantity}</span>
                                <button onClick={handleIncrement}>+</button>
                            </div>

                            <button className="add-to-cart-btn" onClick={handleAddToCart}>
                                ADD TO CART
                            </button>
                        </div>

                        <div className="modal-meta">
                            <span className="meta-label">Category:</span>
                            <span className="meta-value">{product.category || "Pastries"}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BakeProductModal;
