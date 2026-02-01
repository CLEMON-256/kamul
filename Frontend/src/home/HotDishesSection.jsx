import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axios';
import '../styles/HotDishesSection.css';
import pastaAlfredo from '../assets/pasta_alfredo.png';
import burgerMilanese from '../assets/burger_milanese.png';

const HotDishesSection = () => {
    const navigate = useNavigate();
    const [settings, setSettings] = useState(null);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await axiosInstance.get('/settings/');
                if (res.data && res.data.length > 0) {
                    setSettings(res.data[0]);
                }
            } catch (err) {
                console.error("Error fetching settings:", err);
            }
        };
        fetchSettings();
    }, []);

    const contactInfo = {
        address: settings?.address || "Kampala Acacia Mall Ground Floor",
        phone_restraunt: settings?.phone_restraunt || "0701126433",
        phone_bakeshop: settings?.phone_bakeshop || "0701126433",
        email: settings?.email || "juniorsrestaurant@gmail.com"
    };

    // Custom SVGs matching the reference image icons with colors
    const Icons = {
        Continental: (
            <svg viewBox="0 0 100 100" className="svg-icon">
                <path d="M20,60 Q20,80 50,80 Q80,80 80,60 L20,60" fill="#f39c12" stroke="#333" strokeWidth="2" />
                <line x1="40" y1="30" x2="45" y2="60" stroke="#333" strokeWidth="2" />
                <line x1="60" y1="30" x2="55" y2="60" stroke="#333" strokeWidth="2" />
                <path d="M30,60 L70,60" stroke="#333" strokeWidth="2" />
            </svg>
        ),
        Chicken: (
            <svg viewBox="0 0 100 100" className="svg-icon">
                <rect x="35" y="50" width="30" height="30" rx="3" fill="#e74c3c" stroke="#333" strokeWidth="2" />
                <path d="M40,50 Q40,30 50,30 Q60,30 60,50" fill="#f1c40f" stroke="#333" strokeWidth="2" />
                <path d="M45,45 Q55,45 50,30" fill="#f1c40f" stroke="#333" strokeWidth="2" />
            </svg>
        ),
        Experiential: (
            <svg viewBox="0 0 100 100" className="svg-icon">
                <path d="M30,50 Q30,80 50,80 Q70,80 70,50 L30,50" fill="#f39c12" stroke="#333" strokeWidth="2" />
                <path d="M35,30 Q35,50 40,50 M50,30 Q50,50 55,50 M65,30 Q65,50 70,50" stroke="#333" strokeWidth="2" fill="none" />
                <rect x="25" y="45" width="50" height="10" rx="2" fill="#333" />
            </svg>
        ),
        Fish: (
            <svg viewBox="0 0 100 100" className="svg-icon">
                <rect x="20" y="65" width="60" height="10" rx="2" fill="#2ecc71" stroke="#333" strokeWidth="2" />
                <path d="M25,65 Q50,45 75,65" fill="#f1c40f" stroke="#333" strokeWidth="2" />
                <path d="M70,55 Q75,50 80,55" fill="#f1c40f" stroke="#333" strokeWidth="2" />
            </svg>
        ),
        Shell: (
            <svg viewBox="0 0 100 100" className="shell-icon">
                <path d="M50,20 Q70,20 80,50 Q70,80 50,80 Q30,80 20,50 Q30,20 50,20 Z" fill="none" stroke="currentColor" strokeWidth="4" />
                <line x1="50" y1="20" x2="50" y2="80" stroke="currentColor" strokeWidth="2" />
                <line x1="30" y1="35" x2="50" y2="80" stroke="currentColor" strokeWidth="2" />
                <line x1="70" y1="35" x2="50" y2="80" stroke="currentColor" strokeWidth="2" />
            </svg>
        )
    };

    const categories = [
        { id: 'breakfast', name: 'CONTINENTAL', icon: Icons.Continental },
        { id: 'lunch', name: 'CHICKEN', icon: Icons.Chicken },
        { id: 'fast_foods', name: 'EXPERIENTIAL', icon: Icons.Experiential },
        { id: 'pastries', name: 'FISH', icon: Icons.Fish }
    ];

    return (
        <section className="hot-dishes-section">
            <div className="banner-title-bg">
                <h2 className="banner-title">Hot & Tasty Dishes</h2>
            </div>

            <div className="container">
                <div className="section-tagline-wrapper">
                    <p className="section-tagline">
                        <span className="tagline-arrow">≪</span>
                        KITCHEN ALWAYS OPEN
                        <span className="tagline-arrow">≫</span>
                    </p>
                </div>

                <div className="categories-grid">
                    {categories.map((category) => (
                        <Link
                            key={category.id}
                            to={`/menu?category=${category.id}`}
                            className="category-item-ref"
                        >
                            <div className="category-icon-wrapper">{category.icon}</div>
                            <h3 className="category-name-ref">{category.name}</h3>
                        </Link>
                    ))}
                </div>

                <div className="combined-grid">
                    {/* Column 1: Info + Timetable */}
                    <div className="info-timetable-col">
                        <div className="restaurant-info-card-merged">
                            <h3 className="info-title">RESTAURANT</h3>
                            <p className="address-line">{contactInfo.address}</p>
                            <div className="info-merged-row">
                                <span className="info-label">Restaurant:</span>
                                <span className="phone-text">{contactInfo.phone_restraunt}</span>
                            </div>
                            <div className="info-merged-row">
                                <span className="info-label">Bakeshop:</span>
                                <span className="phone-text">{contactInfo.phone_bakeshop}</span>
                            </div>
                            <p className="email-link">{contactInfo.email}</p>
                        </div>
                        <div className="timetable-dark-card">
                            <h3 className="timetable-title-merged">TIMETABLE</h3>
                            <div className="timetable-rows-merged">
                                <div className="time-row-merged">
                                    <span className="meal-name">Breakfast</span>
                                    <span className="meal-dots">......</span>
                                    <span className="meal-time">8:00 - 11:00 am</span>
                                </div>
                                <div className="time-row-merged">
                                    <span className="meal-name">Brunch</span>
                                    <span className="meal-dots">......</span>
                                    <span className="meal-time">11:00 - 1:00 pm</span>
                                </div>
                                <div className="time-row-merged">
                                    <span className="meal-name">Lunch</span>
                                    <span className="meal-dots">......</span>
                                    <span className="meal-time">12:00 - 3:00 pm</span>
                                </div>
                                <div className="time-row-merged">
                                    <span className="meal-name">Dinner</span>
                                    <span className="meal-dots">......</span>
                                    <span className="meal-time">4:00 - 11:00 pm</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Column 2: Lunch Card */}
                    <div className="meal-card-ref" onClick={() => navigate('/menu?category=lunch')}>
                        <img src={pastaAlfredo} alt="Lunch" className="meal-img" />
                        <div className="meal-overlay">
                            <div className="shell-decorator">{Icons.Shell}</div>
                            <h2 className="meal-type-title">Lunch</h2>
                            <span className="check-menu-label">CHECK THE MENU</span>
                        </div>
                    </div>

                    {/* Column 3: Dinner Card */}
                    <div className="meal-card-ref" onClick={() => navigate('/menu?category=dinner')}>
                        <img src={burgerMilanese} alt="Dinner" className="meal-img" />
                        <div className="meal-overlay">
                            <div className="shell-decorator">{Icons.Shell}</div>
                            <h2 className="meal-type-title">Dinner</h2>
                            <span className="check-menu-label">CHECK THE MENU</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HotDishesSection;
