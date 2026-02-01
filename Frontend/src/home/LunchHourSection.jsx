import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axios';
import { menuAPI } from '../api/services';
import '../styles/LunchHourSection.css';
import pastaAlfredo from '../assets/pasta_alfredo.png';
import burgerMilanese from '../assets/burger_milanese.png';
import steakTagliata from '../assets/steak_tagliata.png';
import pizzaVerde from '../assets/pizza_verde.png';
import chocolateWaffles from '../assets/chocolate_waffles.png';

const LunchHourSection = () => {
    const navigate = useNavigate();
    const [settings, setSettings] = useState(null);
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [settingsRes, itemsRes] = await Promise.all([
                    axiosInstance.get('/settings/'),
                    menuAPI.getMenuItems()
                ]);

                if (settingsRes.data && settingsRes.data.length > 0) {
                    setSettings(settingsRes.data[0]);
                }

                // Pick a few items for display, maybe from pastries or lunch
                if (itemsRes.data && itemsRes.data.length >= 4) {
                    setItems(itemsRes.data.slice(0, 4));
                }
            } catch (err) {
                console.error("Error fetching data for LunchHourSection:", err);
            }
        };
        fetchData();
    }, []);

    const contactInfo = {
        name: settings?.name || "Junior's Restaurant",
        address: settings?.address || "Kampala Acacia Mall Ground Floor",
        phone: settings?.phone_restraunt || "0701126433"
    };

    const displayItems = items.length >= 4 ? items : [
        { id: 1, name: 'Pastry Treat Box', price: 50000, image: burgerMilanese },
        { id: 2, name: 'Bread Loaves', price: 8000, image: steakTagliata },
        { id: 3, name: 'Brownie Love Box', price: 32000, image: pizzaVerde },
        { id: 4, name: 'Bento Cake', price: 50000, image: chocolateWaffles }
    ];

    return (
        <section className="lunch-hour-section">
            <div className="container">
                <h2 className="lunch-title">LUNCH HOUR DELIVERIES</h2>

                <div className="lunch-main-grid">
                    <div className="lunch-content-area">
                        <div className="lunch-text-blocks">
                            <p className="lunch-desc-p">
                                Let us handle the lunch hour deliveries and
                                have them delivered to your doorstep with
                                massive love.
                            </p>
                            <p className="lunch-desc-p">
                                Our efficient and effective delivery
                                fee is 2000 to areas as far as anywhere
                                within a 10kms radius. ({contactInfo.phone})
                            </p>
                        </div>

                        <div className="order-delivery-banner" onClick={() => navigate('/menu')}>
                            ORDER FOR THESE AND MORE ITEMS FROM OUR SHOP AND WE WILL DELIVER TO YOU
                        </div>

                        <div className="lunch-items-row">
                            {displayItems.map((item) => (
                                <div key={item.id} className="item-card-mini">
                                    <div className="item-card-img-wrapper">
                                        <img src={item.image || burgerMilanese} alt={item.name} className="item-card-img" />
                                        <div className="item-price-tag">UGX {item.price.toLocaleString()}</div>
                                        <div className="item-name-overlay">{item.name}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="lunch-featured-image-area">
                        <div className="featured-img-container">
                            <img src={pastaAlfredo} alt="Featured Dish" className="featured-img" />
                            <div className="featured-logo-box">
                                <span className="logo-brand">{contactInfo.name}</span>
                                <span className="logo-sub">Acacia Mall</span>
                            </div>
                            <div className="featured-info-overlay">
                                <p>PROUD TO SERVE YOU</p>
                                <p className="small-address">{contactInfo.address}</p>
                                <p className="small-contact">Tel: {contactInfo.phone}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LunchHourSection;
