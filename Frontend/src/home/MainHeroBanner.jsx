import React, { useState, useEffect } from 'react';
import { siteAPI } from '../api/services';
import '../styles/MainHeroBanner.css';
import heroImage1 from '../assets/hero-background.jpg';
import heroImage2 from '../assets/steak_tagliata.png';
import heroImage3 from '../assets/pasta_alfredo.png';

const MainHeroBanner = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [slides, setSlides] = useState([]);
    const defaultImages = [heroImage1, heroImage2, heroImage3];

    useEffect(() => {
        const fetchSlides = async () => {
            try {
                const res = await siteAPI.getHeroSlides();
                if (res.data && res.data.length > 0) {
                    setSlides(res.data);
                }
            } catch (err) {
                console.error("Error fetching hero slides:", err);
            }
        };
        fetchSlides();
    }, []);

    const displaySlides = slides.length > 0 ? slides : defaultImages.map((img, i) => ({
        id: i,
        image: img,
        title: "Junior's Restaurant",
        subtitle: "FRESH"
    }));

    // Auto-advance slides
    useEffect(() => {
        if (displaySlides.length === 0) return;
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % displaySlides.length);
        }, 6000);
        return () => clearInterval(interval);
    }, [displaySlides.length]);

    const currentSlideData = displaySlides[currentSlide] || {};

    return (
        <section className="main-hero">
            {/* Background Slider */}
            <div className="hero-slider">
                {displaySlides.map((slide, index) => (
                    <div
                        key={index}
                        className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
                        style={{ backgroundImage: `url(${slide.image})` }}
                    />
                ))}
            </div>

            <div className="main-hero-overlay" />

            <div className="container">
                <div className="main-hero-content">
                    <h1 className="sr-only">Junior's Restaurant & Lounge — Kampala's Contemporary Fine Dining</h1>

                    <div className="main-hero-brand">
                        <div className="brand-quality fade-in-up">QUALITY</div>

                        <div className="brand-script-wrapper fade-in-up delay-1">
                            <span className="brand-fresh">{currentSlideData.subtitle || "FRESH"}</span>
                            <div className="brand-script-main">
                                <span className="brand-sweetly">
                                    {currentSlideData.title?.split(' ')[0] || "Junior's"}
                                </span>
                                <span className="brand-defined">
                                    {currentSlideData.title?.split(' ').slice(1).join(' ') || "Restaurant"}
                                </span>
                            </div>
                            <span className="brand-food">FOOD</span>
                        </div>

                        <div className="hero-cta-wrapper fade-in-up delay-2">
                            <a href="/bakery" className="btn-hero-primary">
                                Visit Bake Shop
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Slide Indicators */}
            <div className="hero-indicators">
                {displaySlides.map((_, index) => (
                    <button
                        key={index}
                        className={`indicator-dot ${index === currentSlide ? 'active' : ''}`}
                        onClick={() => setCurrentSlide(index)}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    );
};

export default MainHeroBanner;

