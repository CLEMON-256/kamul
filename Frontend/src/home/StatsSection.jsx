import React from 'react';
import '../styles/StatsSection.css';

const StatsSection = () => {
    return (
        <section className="stats-section">
            <div className="stats-container">
                <div className="stats-box">
                    <div className="stats-icon">
                        <svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10,60 Q40,10 90,60 T170,60 Q190,70 180,90 Q170,110 140,100 Q120,90 100,60 Q80,30 40,60 Z" fill="none" stroke="white" strokeWidth="2" />
                            <circle cx="150" cy="55" r="3" fill="white" />
                        </svg>
                    </div>
                    <div className="stats-number">+76</div>
                    <div className="stats-label">DISHES</div>
                </div>
            </div>
        </section>
    );
};

export default StatsSection;
