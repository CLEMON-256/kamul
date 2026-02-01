import { Link } from 'react-router-dom';
import '../styles/AboutUsPage.css';
import heroBackground from '../assets/hero-background.jpg';
import cleanHero from '../assets/steak_tagliata.png';
import dimSumImage from '../assets/dim_sum_basket.png';
import hotDishesCta from '../assets/hot-dishes-cta.png';

const AboutUsPage = () => {

    return (
        <div className="about-us-page">
            {/* Hero Section */}
            <section className="about-hero-full">
                <div className="hero-background">
                    <img src={cleanHero} alt="About Us" />
                    <div className="hero-overlay"></div>
                </div>
                <div className="hero-content">
                    <h1>About Us</h1>
                </div>
            </section>

            {/* Story Section */}
            <section className="story-section">
                <div className="container">
                    <div className="story-content">
                        <div className="story-image-wrapper">
                            <img src={dimSumImage} alt="Dim Sum Dumplings" className="story-main-img" />
                            <div className="dish-overlay-card">
                                <span className="dish-icon">🐟</span>
                                <span className="dish-count">+76</span>
                                <span className="dish-label">DISHES</span>
                            </div>
                        </div>
                        <div className="story-text">
                            <div className="content-tagline">
                                <span className="separator">∞</span>
                                <span className="text">FRESH FOOD EVERY DAY</span>
                                <span className="separator">∞</span>
                            </div>
                            <h2>Redefining Family Dining & Food experiences in Kampala</h2>
                            <p>
                                Meet culinary excellence in a chic contemporary dining ambiance, with a fusion of
                                cuisines and a delightful à la carte menu. Our skilled chefs bring the best flavours to
                                your plate, complemented by a bar team crafting refreshing beverages. Join our
                                vibrant community of families and groups, delighting themselves in our offerings
                                with an average order value of Shs. 212,000.
                            </p>
                            <p>
                                At Junior's Restaurant, we pride ourselves on creating casual dining moments at
                                Kampala Acacia Mall Ground Floor, accompanied by soulful music and a commitment to sustainability.
                                Our commitment to sourcing raw materials directly from farmers ensures fresh,
                                quality ingredients, while our dedication to preserving natural spaces around the
                                restaurant enhances the overall ambiance.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Client Testimonials Section */}
            <section className="testimonials-section">
                <div className="container">
                    <div className="section-header">
                        <h2>Client Testimonial</h2>
                        <p className="section-subtitle">Thank You For Supporting Us!</p>
                    </div>
                    <div className="testimonials-grid">
                        {[
                            {
                                name: "Lana Lana",
                                quote: "I thought this was kimchi! I had the best salmon here through.",
                                social: "facebook"
                            },
                            {
                                name: "Jim Lwanga",
                                quote: "I have been to Junior's Restaurant once and it was worth it.",
                                social: "facebook"
                            },
                            {
                                name: "Sarah Nakato",
                                quote: "The ambiance at Acacia Mall Ground Floor is perfect for family gatherings. We celebrated my daughter's birthday here and it was magical!",
                                social: "facebook"
                            },
                            {
                                name: "David Okello",
                                quote: "Best restaurant in Kampala! The fusion dishes are incredible and the service is top-notch.",
                                social: "facebook"
                            }
                        ].map((testimonial, index) => (
                            <div key={index} className="testimonial-card">
                                <div className="testimonial-header">
                                    <div className="quote-icon-top">❝</div>
                                    <div className="social-badge">
                                        <span className="social-icon">f</span>
                                        <span className="customer-name">#{testimonial.name}</span>
                                    </div>
                                </div>
                                <div className="testimonial-content">
                                    <p className="testimonial-quote">{testimonial.quote}</p>
                                </div>
                                <div className="quote-icon-bottom">❞</div>
                                <div className="testimonial-footer">
                                    <p className="thank-you-text">Thank You For Supporting Us!</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Quick Ordering Process Section */}
            <section className="ordering-process-section">
                <div className="container">
                    <div className="process-header">
                        <span className="process-eyebrow">&gt;&gt; QUICK ORDERING PROCESS</span>
                        <h2 className="process-title">Need Your Lunch Delivered To You?</h2>
                    </div>
                    <div className="process-steps">
                        {[
                            {
                                number: "1",
                                title: "CHECK THE MENU",
                                description: "Look through our menu for what we have under the different cuisines, desserts and pastries.",
                                bullets: [
                                    "Indulge yourself in the menus",
                                    "Experiment by ordering"
                                ]
                            },
                            {
                                number: "2",
                                title: "SELECT A DISH",
                                description: "Ready to order? Call us on send us a WhatsApp to place your order and more. Special considerations?",
                                bullets: [
                                    "WhatsApp us on 0701126433",
                                    "Or check out IG for details on delivery"
                                ]
                            },
                            {
                                number: "3",
                                title: "ORDER IT",
                                description: "Our favorite part. You order; We prepare and deliver. Pay using whichever platform makes life easier.",
                                bullets: [
                                    "Pay using cash on delivery",
                                    "Use mobile money or card"
                                ]
                            },
                            {
                                number: "4",
                                title: "TASTE THE MEAL",
                                description: "We love to know what you think, share with us a review of your experience with us.",
                                bullets: [
                                    "Use Google reviews and ratings",
                                    "OR send us a text"
                                ]
                            }
                        ].map((step, index) => (
                            <div key={index} className="process-step">
                                <div className="step-number">{step.number}</div>
                                <h3 className="step-title">{step.title}</h3>
                                <p className="step-description">{step.description}</p>
                                <ul className="step-bullets">
                                    {step.bullets.map((bullet, i) => (
                                        <li key={i}>{bullet}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Hot and Tasty Dishes CTA Section */}
            <section className="hot-dishes-cta">
                <div className="cta-background">
                    <img src={hotDishesCta} alt="Hot and Tasty Dishes" />
                    <div className="cta-overlay"></div>
                </div>
                <div className="cta-content container">
                    <h2>Hot and Tasty Dishes</h2>
                    <p>
                        Looking for Pizza, Tacos, Biryani, Pad Thai, Curry, BBQ Ribs, or diverse flavours from
                        Italian, Mexican, American, Chinese, Indian, and Spanish cuisines, visit us at Junior's
                        Restaurant in Kampala Acacia Mall.
                    </p>
                    <Link to="/contact" className="cta-button">CONTACT US</Link>
                </div>
            </section>

            {/* Copyright Footer */}
            <div className="copyright-footer">
                <p>Copyright - Junior's Restaurant, 2026</p>
                <div className="footer-whatsapp">
                    <span>Hi, how can I help?</span>
                </div>
            </div>

        </div >
    );
};

export default AboutUsPage;