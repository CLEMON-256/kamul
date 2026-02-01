import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { menuAPI } from '../api/services';
import '../styles/BreakfastSection.css';
import breakfastCombo from '../assets/breakfast_combo.png';
import chocolateWaffles from '../assets/chocolate_waffles.png';

const BreakfastSection = () => {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBreakfast = async () => {
            try {
                const [itemRes, catRes] = await Promise.all([
                    menuAPI.getMenuItems(),
                    menuAPI.getCategories()
                ]);
                const breakfastCat = catRes.data.find(c => c.slug === 'breakfast');
                if (breakfastCat) {
                    const filtered = itemRes.data.filter(i => i.category === breakfastCat.id);
                    setItems(filtered.slice(0, 2)); // Take first 2 for the checker grid
                }
            } catch (err) {
                console.error("Error fetching breakfast:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchBreakfast();
    }, []);

    // Fallback data if API is empty
    const displayItems = items.length >= 2 ? items : [
        {
            name: "ENGLISH BREAKFAST",
            description: "Baked beans, beef/pork sausages, Eggs of your choice, Mushrooms, Tomato wedges, Bacon, Toast, Either Coffee, Tea or Juice",
            price: 35000,
            image: breakfastCombo
        },
        {
            name: "CHOCOLATE WAFFLES",
            description: "Rich moist and fluffy waffles, waffles exotic fruits, whipped cream, chocolate sauce and honey",
            price: 30000,
            image: chocolateWaffles
        }
    ];

    return (
        <section className="breakfast-section">
            <div className="breakfast-banner">
                <div className="banner-content">
                    <h2 className="section-title">BREAKFAST MENU</h2>
                    <span className="view-full-menu" onClick={() => navigate('/menu')}>
                        VIEW FULL MENU
                    </span>
                </div>
            </div>

            <div className="menu-checker-grid">
                {displayItems.map((item, idx) => (
                    <React.Fragment key={idx}>
                        {idx % 2 === 0 ? (
                            <>
                                <div className="checker-item text-block">
                                    <div className="checker-content">
                                        <div className="checker-category-label">BREAKFAST</div>
                                        <h3 className="checker-item-name">{item.name}</h3>
                                        <p className="checker-item-desc">{item.description}</p>
                                        <div className="checker-price-line">
                                            <span className="checker-price">{(item.price / 1000).toFixed(0)}K</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="checker-item img-block">
                                    <img src={item.image || breakfastCombo} alt={item.name} className="checker-img" />
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="checker-item img-block">
                                    <img src={item.image || chocolateWaffles} alt={item.name} className="checker-img" />
                                </div>
                                <div className="checker-item text-block">
                                    <div className="checker-content">
                                        <div className="checker-category-label">BAKE SHOP</div>
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

export default BreakfastSection;
