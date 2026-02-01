import React from 'react';
import '../../styles/Hero.css';
import heroImage from '../../assets/hero-background.jpg';

const Hero = () => {
    return (
        <div className="hero" style={{ backgroundImage: `url(${heroImage})` }}>
            {/* Overlay to make text readable */}
            <div className="hero-overlay"></div>

            <div className="hero-content">
                <h1>Taste the Difference</h1>
                <p>Experience culinary excellence in every bite.</p>
                <div className="hero-buttons">
                    <a href="/menu" className="btn btn-primary">View Menu</a>
                    <a href="/reservations" className="btn btn-secondary">Book a Table</a>
                </div>
            </div>
        </div>
    );
};

export default Hero;