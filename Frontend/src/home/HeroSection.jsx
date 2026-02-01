import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/HeroSection.css';
import heroImage from '../assets/hero-background.jpg';

const HeroSection = () => {
    const navigate = useNavigate();
    const [reservationData, setReservationData ] = useState({
        date: '',
        guests: 2
    });

    const minDate = useMemo(() => new Date().toISOString().split('T')[0], []);

    const handleChange = (e) => {
        setReservationData({
            ...reservationData,
            [e.target.name]: e.target.value
        });
    };
    const handleReservation = (e) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (reservationData.date) params.set('date', reservationData.date);
        if (reservationData.guests) params.set('guests', String(reservationData.guests));
        navigate(`/reservations?${params.toString()}`);
                                                                                                                                                                                                        
    };
    return (
        <section className="hero-section">
            <div
                className="hero-media"
                style={{ backgroundImage: `url(${heroImage})` }}
            />
            <div className="hero-overlay" />
            <div className="container">
                <div className="hero-content">
                    <div className="hero-grid">
                        <div className="hero-copy">
                            <div className="hero-kicker">Quality Fresh Food</div>
                            <h1 className="hero-title">
                                Kampala&apos;s contemporary fine dining at its best
                            </h1>
                            <p className="hero-subtitle">
                                Experience culinary excellence with our fusion of local and international cuisines.
                            </p>
                            <div className="hero-cta">
                                <Link to="/menu" className="cta-btn primary">
                                    View Full Menu
                                </Link>
                                <Link to="/reservations" className="cta-btn secondary">
                                    Book a Table
                                </Link>
                            </div>
                        </div>

                        <div className="hero-reservation">
                            <h3>Make a Reservation</h3>
                            <form onSubmit={handleReservation} className="reservation-form">
                                <div className="form-group">
                                    <label className="hero-label" htmlFor="hero-date">Date</label>
                                    <input
                                        id="hero-date"
                                        type="date"
                                        name="date"
                                        value={reservationData.date}
                                        onChange={handleChange}
                                        required
                                        min={minDate}
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="hero-label" htmlFor="hero-guests">Guests</label>
                                    <select
                                        id="hero-guests"
                                        name="guests"
                                        value={reservationData.guests}
                                        onChange={handleChange}
                                        required
                                    >
                                        {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                                            <option key={num} value={num}>
                                                {num} {num === 1 ? 'Guest' : 'Guests'}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <button type="submit" className="reserve-btn">
                                    Reserve Table
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroSection;