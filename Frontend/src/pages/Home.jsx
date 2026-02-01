import React from 'react';
import Hero from '../components/layout/Hero';

const Home = () => {
    return (
        <div className="home-page">
            <Hero />
            <div className="container" style={{ padding: '4rem 20px' }}>
                <h2>Welcome to Our Restaurant</h2>
                <p>Scroll down to see the header change color!</p>
                {/* Add your image grid or other content here */}
            </div>
        </div>
    );
};

export default Home;