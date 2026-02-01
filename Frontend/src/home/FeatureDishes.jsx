import React, { useMemo, useState } from 'react';
import { useCart } from "../contexts/CartContext";
import '../styles/FeaturedDishes.css';
import menuData from '../data/menu.json';
import heroBackground from '../assets/hero-background.jpg';

const FeaturedDishes = () => {
    const [activeFilter, setActiveFilter] = useState('All');
    const { addToCart } = useCart();

    const filters = ['All', 'Continental', 'Chicken', 'Fish', 'Vegetarian', 'Beef'];

    const currency = menuData.currency || 'UGX';
    const featuredIds = useMemo(() => new Set(menuData.featuredItemIds || []), []);
    const dishes = useMemo(() => {
        const items = menuData.items || [];
        const featured = items.filter((i) => featuredIds.has(i.id));
        return featured.map((i) => ({ ...i, isFeatured: true }));
    }, [featuredIds]);

    const filteredDishes = useMemo(() => {
        if (activeFilter === 'All') return dishes;
        return dishes.filter((dish) => (dish.tags || []).includes(activeFilter));
    }, [activeFilter, dishes]);

    const formatUGX = (value) => {
        try {
            return new Intl.NumberFormat('en-UG', { maximumFractionDigits: 0 }).format(value);
        } catch {
            return String(value);
        }
    };

    return (
        <section className="featured-dishes">
            <div className="container">
                <div className="section-header">
                    <h2>Hot & Tasty Dishes</h2>
                    <p>Our chef's special selections crafted to perfection</p>
                </div>

                <div className="filter-tabs">
                    {filters.map((filter) => (
                        <button
                            key={filter}
                            className={`filter-tab ${activeFilter === filter ? 'active' : ''}`}
                            onClick={() => setActiveFilter(filter)}
                        >
                            {filter}
                        </button>
                    ))}
                </div>

                <div className="dishes-grid">
                    {filteredDishes.map((dish) => (
                        <div key={dish.id} className="dish-card">
                            <div className="dish-image">
                                <img
                                    src={heroBackground}
                                    alt={dish.name}
                                />
                                <span className="featured-badge">Featured</span>
                            </div>
                            <div className="dish-content">
                                <h3>{dish.name}</h3>
                                <p className="dish-description">{dish.description}</p>
                                <div className="dish-footer">
                                    <span className="dish-price">
                                        {currency} {formatUGX(dish.price)}
                                    </span>
                                    <button
                                        className="add-to-cart-btn"
                                        onClick={() => addToCart(dish)}
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

export default FeaturedDishes;