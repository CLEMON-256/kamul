import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import '../styles/CategoryShowcase.css';
import menuData from '../data/menu.json';
import heroBackground from '../assets/hero-background.jpg';

const CategoryShowcase = ({ categoryId }) => {
    const { addToCart } = useCart();

    const category = useMemo(() =>
        menuData.categories.find(cat => cat.id === categoryId),
        [categoryId]
    );

    const categoryItems = useMemo(() =>
        (menuData.items || [])
            .filter(item => item.category === categoryId)
            .slice(0, 4), // Show first 4 items
        [categoryId]
    );

    if (!category) return null;

    const currency = menuData.currency || 'UGX';

    return (
        <section className="category-showcase">
            {/* Teal Header */}
            <div className="category-header">
                <h2>{category.name}</h2>
                <Link to={`/menu?category=${categoryId}`} className="view-menu-link">
                    View Full Menu
                </Link>
            </div>

            {/* Menu Items Grid */}
            <div className="container">
                <div className="items-grid">
                    {categoryItems.map((item, index) => (
                        <div key={item.id || index} className="menu-item-card">
                            <div className="item-image">
                                <img
                                    src={item.image || heroBackground}
                                    alt={item.name}
                                />
                            </div>
                            <div className="item-content">
                                <div className="item-category-label">{item.subcategory || category.name}</div>
                                <h3 className="item-name">
                                    <span className="decorative-line">—</span>
                                    {item.name}
                                    <span className="decorative-line">—</span>
                                </h3>
                                <p className="item-description">{item.description}</p>
                                <div className="item-footer">
                                    <span className="item-price">{currency} {item.price.toLocaleString()}</span>
                                    <button
                                        className="add-to-cart-btn"
                                        onClick={() => addToCart(item)}
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategoryShowcase;
