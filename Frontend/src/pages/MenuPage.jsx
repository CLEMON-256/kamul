import React, { useState, useEffect } from 'react';
import CategoryMenuSection from '../components/menu/CategoryMenuSection';
import { menuAPI } from '../api/services';
import '../styles/MenuPage.css';
import heroBackground from '../assets/hero-menu-professional.png';

// Import images for fallback/static mapping
import breakfastCombo from '../assets/breakfast_combo.png';
import chocolateWaffles from '../assets/chocolate_waffles.png';
import pastaAlfredo from '../assets/pasta_alfredo.png';
import steakTagliata from '../assets/steak_tagliata.png';
import pizzaVerde from '../assets/pizza_verde.png';
import burgerMilanese from '../assets/burger_milanese.png';

const MenuPage = () => {
    const [categories, setCategories] = useState([]);
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMenuData = async () => {
            try {
                setLoading(true);
                const [catRes, itemRes] = await Promise.all([
                    menuAPI.getCategories(),
                    menuAPI.getMenuItems()
                ]);
                setCategories(catRes.data);
                setMenuItems(itemRes.data);
            } catch (err) {
                console.error("Error fetching menu:", err);
                setError("Failed to load menu items. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchMenuData();
    }, []);

    // Helper to get images for a category
    const getCategoryImages = (categorySlug) => {
        switch (categorySlug) {
            case 'breakfast':
                return [breakfastCombo, chocolateWaffles, heroBackground];
            case 'lunch':
                return [steakTagliata, pastaAlfredo, burgerMilanese];
            case 'fast_foods':
            case 'fast-foods':
                return [pizzaVerde, burgerMilanese, breakfastCombo];
            case 'pastries':
                return [chocolateWaffles, heroBackground, breakfastCombo];
            default:
                return [heroBackground];
        }
    };

    if (loading) return <div className="loading-state">Loading delicious menu...</div>;
    if (error) return <div className="error-state">{error}</div>;

    return (
        <div className="menu-page">
            <section className="about-hero-full">
                <div className="hero-background">
                    <img src={heroBackground} alt="Delicious Food" />
                    <div className="hero-overlay"></div>
                </div>
                <div className="hero-content">
                    <h1>Our Menu</h1>
                    <p className="hero-subtitle">Experience our culinary excellence</p>
                </div>
            </section>

            <div className="menu-sections-container">
                {categories.map((category, index) => {
                    const categoryItems = menuItems.filter(
                        item => item.category === category.id
                    );

                    if (categoryItems.length === 0) return null;

                    return (
                        <CategoryMenuSection
                            key={category.id}
                            title={category.name}
                            subtitle={category.subtitle || ""}
                            items={categoryItems}
                            images={category.image ? [category.image, ...getCategoryImages(category.slug)] : getCategoryImages(category.slug)}
                            reverse={index % 2 !== 0}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default MenuPage;