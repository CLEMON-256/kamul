// card component for displaying a single menu-item

import React from 'react';
import { useCart } from '../../contexts/CartContext';
import '../../styles/MenuItemCard.css';

const MenuItemCard = ({ item }) => {
    const { addToCart } = useCart();

    return (
        <div className="menu-item-card">
            <div className="menu-item-image-container">
                <img src={item.image} alt={item.name} className="menu-item-image" />
                <div className="menu-item-overlay">
                    <div className="menu-item-price">${item.price}</div>
                </div>
            </div>
            <div className="menu-item-details">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <button onClick={() => addToCart(item)} className="add-to-cart-btn">
                    <span className="btn-icon">+</span>
                    <span className="btn-text">Add to Cart</span>
                </button>
            </div>
        </div>
    )
}

export default MenuItemCard;