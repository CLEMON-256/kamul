// main landing page
import React from 'react';
import MainHeroBanner from '../home/MainHeroBanner';
import KampalaSection from '../home/KampalaSection';
import HomeVideoSection from '../home/HomeVideoSection';
import HotDishesSection from '../home/HotDishesSection';
import LunchHourSection from '../home/LunchHourSection';
import BreakfastSection from '../home/BreakfastSection';
import LunchMenuSection from '../home/LunchMenuSection';
import PastrySection from '../home/PastrySection'; // New component
import FastFoodSection from '../home/FastFoodSection'; // New component
import '../styles/HomePage.css';

const HomePage = () => {
    return (
        <div className="home-page">
            <div className="page-content">
                <MainHeroBanner />
                <KampalaSection />
                <HomeVideoSection />
                <BreakfastSection />
                <LunchMenuSection />
                <PastrySection />
                <FastFoodSection />
                <HotDishesSection />
                <LunchHourSection />

            </div>

        </div>
    );
};

export default HomePage;