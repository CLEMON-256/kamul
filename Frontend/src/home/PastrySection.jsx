import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { menuAPI } from '../api/services';
import '../styles/PastrySection.css';
import chocolateWaffles from '../assets/chocolate_waffles.png';

const PastrySection = () => {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchPastries = async () => {
            try {
                const [itemRes, catRes] = await Promise.all([
                    menuAPI.getMenuItems(),
                    menuAPI.getCategories()
                ]);
                const pastryCat = catRes.data.find(c => c.slug === 'pastries');
                if (pastryCat) {
                    const filtered = itemRes.data.filter(i => i.category === pastryCat.id);
                    setItems(filtered.slice(0, 2));
                }
            } catch (err) {
                console.error("Error fetching pastries:", err);
            }
        };
        fetchPastries();
    }, []);

    const displayItems = items.length >= 2 ? items : [
        {
            name: "TRADITIONAL FRUIT CAKE",
            description: "A brandied 2-months aged dark rich fruit cake. Dense and rich with fruits soaked for months.",
            price: 140000,
            image: chocolateWaffles
        },
        {
            name: "CHOCOLATE BABKA",
            description: "Sweet, braided yeast bread known for its rich, swirled layers.",
            price: 15000,
            image: chocolateWaffles
        }
    ];

    return (
        <section className="pastry-section">
            <div className="pastry-banner">
                <h2 className="section-title">BAKE SHOP MENU</h2>
                <span className="view-full-menu" onClick={() => navigate('/bakery')}>
                    VISIT BAKE SHOP
                </span>
            </div>

            <div className="menu-checker-grid">
                {displayItems.map((item, idx) => (
                    <React.Fragment key={idx}>
                        {idx % 2 === 0 ? (
                            <>
                                <div className="checker-item text-block" onClick={() => navigate('/bakery')} style={{ cursor: 'pointer' }}>
                                    <div className="checker-content">
                                        <div className="checker-category-label">BAKE SHOP</div>
                                        <h3 className="checker-item-name">{item.name}</h3>
                                        <p className="checker-item-desc">{item.description}</p>
                                        <div className="checker-price-line">
                                            <span className="checker-price">{(item.price / 1000).toFixed(0)}K</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="checker-item img-block" onClick={() => navigate('/bakery')} style={{ cursor: 'pointer' }}>
                                    <img src={item.image || chocolateWaffles} alt={item.name} className="checker-img" />
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="checker-item img-block" onClick={() => navigate('/bakery')} style={{ cursor: 'pointer' }}>
                                    <img src={item.image || chocolateWaffles} alt={item.name} className="checker-img" />
                                </div>
                                <div className="checker-item text-block" onClick={() => navigate('/bakery')} style={{ cursor: 'pointer' }}>
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

export default PastrySection;
