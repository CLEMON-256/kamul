import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { menuAPI } from '../api/services';
import '../styles/LunchMenuSection.css';
import pastaAlfredo from '../assets/pasta_alfredo.png';
import steakTagliata from '../assets/steak_tagliata.png';

const LunchMenuSection = () => {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchLunch = async () => {
            try {
                const [itemRes, catRes] = await Promise.all([
                    menuAPI.getMenuItems(),
                    menuAPI.getCategories()
                ]);
                const lunchCat = catRes.data.find(c => c.slug === 'lunch');
                if (lunchCat) {
                    const filtered = itemRes.data.filter(i => i.category === lunchCat.id);
                    setItems(filtered.slice(0, 2));
                }
            } catch (err) {
                console.error("Error fetching lunch:", err);
            }
        };
        fetchLunch();
    }, []);

    const displayItems = items.length >= 2 ? items : [
        {
            name: "ALFREDO TRUFFLE PASTA",
            description: "A rich garlicky toast with exquisite tomato and basil twist",
            price: 40000,
            image: pastaAlfredo
        },
        {
            name: "STEAK TAGLIATA",
            description: "Tender and Juicy beef strips on a bed of wild rockets with an option of chips or wedges",
            price: 45000,
            image: steakTagliata
        }
    ];

    return (
        <section className="lunch-menu-section">
            <div className="lunch-menu-banner">
                <h2 className="section-title">LUNCH MENU</h2>
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
                                        <div className="checker-category-label">LUNCH</div>
                                        <h3 className="checker-item-name">{item.name}</h3>
                                        <p className="checker-item-desc">{item.description}</p>
                                        <div className="checker-price-line">
                                            <span className="checker-price">{(item.price / 1000).toFixed(0)}K</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="checker-item img-block">
                                    <img src={item.image || pastaAlfredo} alt={item.name} className="checker-img" />
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="checker-item img-block">
                                    <img src={item.image || steakTagliata} alt={item.name} className="checker-img" />
                                </div>
                                <div className="checker-item text-block">
                                    <div className="checker-content">
                                        <div className="checker-category-label">LUNCH</div>
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

export default LunchMenuSection;
