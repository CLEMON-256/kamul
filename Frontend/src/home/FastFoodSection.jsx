import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { menuAPI } from '../api/services';
import '../styles/FastFoodSection.css';
import pizzaVerde from '../assets/pizza_verde.png';

const FastFoodSection = () => {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchFastFood = async () => {
            try {
                const [itemRes, catRes] = await Promise.all([
                    menuAPI.getMenuItems(),
                    menuAPI.getCategories()
                ]);
                const fastFoodCat = catRes.data.find(c => c.slug === 'fast_foods' || c.slug === 'fast-foods');
                if (fastFoodCat) {
                    const filtered = itemRes.data.filter(i => i.category === fastFoodCat.id);
                    setItems(filtered.slice(0, 2));
                }
            } catch (err) {
                console.error("Error fetching fast food:", err);
            }
        };
        fetchFastFood();
    }, []);

    const displayItems = items.length >= 2 ? items : [
        {
            name: "VERDE PIZZA",
            description: "Topped with pesto chicken with cheese.",
            price: 28000,
            image: pizzaVerde
        },
        {
            name: "FRUITTI DI MARE",
            description: "Topped with our exotic mix of seafood and cheese.",
            price: 30000,
            image: pizzaVerde
        }
    ];

    return (
        <section className="fastfood-section">
            <div className="fastfood-banner">
                <h2 className="section-title">PIZZA & FAST FOODS</h2>
                <span className="view-full-menu" onClick={() => navigate('/menu')}>
                    VIEW FULL MENU
                </span>
            </div>

            <div className="menu-checker-grid">
                {displayItems.map((item, idx) => (
                    <React.Fragment key={idx}>
                        {idx % 2 === 0 ? (
                            <>
                                <div className="checker-item text-block">
                                    <div className="checker-content">
                                        <div className="checker-category-label">FAST FOOD</div>
                                        <h3 className="checker-item-name">{item.name}</h3>
                                        <p className="checker-item-desc">{item.description}</p>
                                        <div className="checker-price-line">
                                            <span className="checker-price">{(item.price / 1000).toFixed(0)}K</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="checker-item img-block">
                                    <img src={item.image || pizzaVerde} alt={item.name} className="checker-img" />
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="checker-item img-block">
                                    <img src={item.image || pizzaVerde} alt={item.name} className="checker-img" />
                                </div>
                                <div className="checker-item text-block">
                                    <div className="checker-content">
                                        <div className="checker-category-label">FAST FOOD</div>
                                        <h3 className="checker-item-name">{item.name}</h3>
                                        <p className="checker-item-desc">{item.description}</p>
                                        <div className="checker-price-line">
                                            <span className="checker-price">{(item.price / 1000).toFixed(0)}K</span>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </section>
    );
};

export default FastFoodSection;
