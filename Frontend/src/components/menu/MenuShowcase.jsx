import React, { useState, useEffect } from 'react';
import { useCart } from '../../contexts/CartContext';
import '../../styles/MenuShowcase.css';
import menuData from '../../data/menu.json';

// Import images
import breakfastCombo from '../../assets/breakfast_combo.png';
import chocolateWaffles from '../../assets/chocolate_waffles.png';
import pastaAlfredo from '../../assets/pasta_alfredo.png';
import steakTagliata from '../../assets/steak_tagliata.png';
import pizzaVerde from '../../assets/pizza_verde.png';
import burgerMilanese from '../../assets/burger_milanese.png';
import heroBackground from '../../assets/hero-background.jpg';


const MenuShowcase = () => {
    const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
    const { addToCart } = useCart();

    const currency = menuData.currency || 'UGX';
    const categories = menuData.categories || [];

    // Map images to categories/items
    const itemImages = {
        // Map specific item IDs or names if available, otherwise use category defaults
        "breakfast_combo": breakfastCombo,
        "choc_waffles": chocolateWaffles,
        "pasta_alfredo": pastaAlfredo,
        "steak_tagliata": steakTagliata,
        "pizza_verde": pizzaVerde,
        "burger_milanese": burgerMilanese
    };

    // Fallback images per category
    const categoryDefaults = {
        breakfast: breakfastCombo,
        lunch: steakTagliata,
        fast_foods: pizzaVerde,
        pastries: chocolateWaffles
    };

    const currentCategory = categories[activeCategoryIndex];
    const currentCategoryItems = menuData.items.filter(
        item => item.categoryId === currentCategory?.id
    );

    const getImageForItem = (item) => {
        // Try precise match (assuming item has an imageId or we map by name slug)
        // For this demo, we'll try to guess based on known assets or category
        if (item.name.toLowerCase().includes('waffle')) return chocolateWaffles;
        if (item.name.toLowerCase().includes('pizza')) return pizzaVerde;
        if (item.name.toLowerCase().includes('burger')) return burgerMilanese;
        if (item.name.toLowerCase().includes('steak')) return steakTagliata;
        if (item.name.toLowerCase().includes('pasta')) return pastaAlfredo;

        return categoryDefaults[currentCategory?.id] || heroBackground;
    };

    const formatPrice = (value) => {
        try {
            return new Intl.NumberFormat('en-UG', { maximumFractionDigits: 0 }).format(value);
        } catch {
            return String(value);
        }
    };

    return (
        <section className="menu-showcase-grid">
            <div className="container">
                <div className="menu-header text-center">
                    <h2 className="section-title">Our Menu</h2>
                    <p className="section-subtitle">Explore our diverse culinary delights</p>
                </div>

                {/* Category Tabs */}
                <div className="category-tabs">
                    {categories.map((category, index) => (
                        <button
                            key={category.id}
                            className={`tab-btn ${activeCategoryIndex === index ? 'active' : ''}`}
                            onClick={() => setActiveCategoryIndex(index)}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <div className="menu-grid-content visual-menu-view">
                    <div className="category-intro text-center">
                        <h3 className="current-category-title">{currentCategory?.name}</h3>
                        <p className="current-category-desc">{currentCategory?.subtitle}</p>
                    </div>

                    <div className="items-grid">
                        {currentCategoryItems.map((item, index) => (
                            <div
                                key={item.id}
                                className="menu-card menu-visual-row"
                            >
                                <div className="card-image-wrapper">
                                    <img
                                        src={getImageForItem(item)}
                                        alt={item.name}
                                        className="card-image"
                                    />
                                    <div className="card-price-badge">
                                        {formatPrice(item.price)} {currency}
                                    </div>
                                </div>
                                <div className="card-content">
                                    <span className="item-subtitle">{item.tags?.[0] || 'Menu'}</span>
                                    <h4 className="card-title">{item.name}</h4>
                                    <div className="card-divider"></div>
                                    <p className="card-desc">{item.description}</p>
                                    <button
                                        className="btn-add-cart"
                                        onClick={() => addToCart(item)}
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MenuShowcase;
