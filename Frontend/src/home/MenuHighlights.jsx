import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import '../styles/MenuHighlights.css';
import menuData from '../data/menu.json';
import heroBackground from '../assets/hero-background.jpg';

const MenuHighlights = () => {
    const categories = useMemo(() => (menuData.categories || []).slice(0, 4), []);
    const categoryImagesById = useMemo(
        () => ({
            breakfast: heroBackground,
            lunch: heroBackground,
            fast_foods: heroBackground,
            pastries: heroBackground
        }),
        []
    );

    return (
        <section className="menu-highlights">
            <div className="container">
                <div className="section-header">
                    <h2>Explore Our Menu</h2>
                    <p>Discover our carefully crafted dishes from around the world</p>
                </div>
                <div className="categories-grid">
                    {categories.map((category) => (
                        <Link 
                            key={category.id} 
                            to={`/menu?category=${encodeURIComponent(category.id)}`}
                            className="category-card"
                        >
                            <div className="category-image">
                                <img 
                                    src={categoryImagesById[category.id] || heroBackground}
                                    alt={category.name}
                                />
                                <div className="category-overlay"></div>
                            </div>
                            <div className="category-content">
                                <h3>{category.name}</h3>
                                <p>{category.subtitle || `View ${category.name} Items`}</p>
                                <span className="category-arrow">→</span>
                            </div>
                        </Link>
                    ))}
                </div>
                
                <div className="view-all-menu">
                    <Link to="/menu" className="view-all-btn">
                        View Full Menu
                    </Link>
                </div>
            </div>
        </section>
    )


}

export default MenuHighlights;