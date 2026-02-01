import React from 'react';
import FeaturedDishes from './FeatureDishes';
import LunchHourSection from './LunchHourSection';

const Home = () => {
    return (
        <div className="home-page">
            {/* Hero Section with Background Image */}
            <div
                className="hero-section"
                style={{
                    // The path starts with / because it is in the public folder
                    backgroundImage: "url('/images/background.jpg')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '60vh', // Takes up 60% of the screen height
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'white',
                    textAlign: 'center',
                    marginBottom: '2rem'
                }}
            >
                {/* Logo Image */}
                <img
                    src="/images/logo.png"
                    alt="Restaurant Logo"
                    style={{ width: '150px', marginBottom: '1rem', borderRadius: '50%' }}
                />
                <h1>Welcome to Our Restaurant</h1>
            </div>

            {/* Your existing Featured Dishes section */}
            <FeaturedDishes />

            {/* New Lunch Hour Section */}
            <LunchHourSection />
        </div>
    );
};

export default Home;