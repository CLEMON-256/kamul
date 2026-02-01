import React, { useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { siteAPI } from '../api/services';
import '../styles/KampalaSection.css';
import interiorTopDefault from '../assets/kampala_interior_top.png';
import interiorBottomDefault from '../assets/kampala_interior_bottom.png';

const KampalaSection = () => {
    const navigate = useNavigate();
    const [gallery, setGallery] = useState([]);
    const today = useMemo(() => new Date(), []);
    const minDate = useMemo(() => new Date().toISOString().split('T')[0], []);

    useEffect(() => {
        const fetchGallery = async () => {
            try {
                const res = await siteAPI.getGallery('kampala');
                if (res.data && res.data.length > 0) {
                    setGallery(res.data);
                }
            } catch (err) {
                console.error("Error fetching gallery for kampala:", err);
            }
        };
        fetchGallery();
    }, []);

    const images = {
        top: gallery[0]?.image || interiorTopDefault,
        bottom: gallery[1]?.image || interiorBottomDefault
    };

    const [reservationData, setReservationData] = useState(() => ({
        date: today.toISOString().split('T')[0],
        guests: 1,
    }));
    // ... rest of the component remains the same ...
    // Wait I should replace the whole start to include useEffect for fetching


    const displayDate = useMemo(() => {
        const d = reservationData.date ? new Date(`${reservationData.date}T00:00:00`) : today;
        const day = String(d.getDate());
        const month = d.toLocaleString(undefined, { month: 'short' });
        return { day, month };
    }, [reservationData.date, today]);

    const handleChange = (e) => {
        setReservationData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleReservation = (e) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (reservationData.date) params.set('date', reservationData.date);
        if (reservationData.guests) params.set('guests', String(reservationData.guests));
        navigate(`/reservations?${params.toString()}`);
    };

    // Scroll Animation Observer
    React.useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('in-view');
                    }
                });
            },
            { threshold: 0.2 } // Trigger when 20% visible
        );

        const grid = document.querySelector('.kampala-grid');
        if (grid) observer.observe(grid);

        return () => {
            if (grid) observer.unobserve(grid);
        };
    }, []);

    return (
        <section className="kampala">
            <div className="container kampala-grid">
                {/* Collage Section */}
                <div className="kampala-collage" aria-hidden="true">
                    <div className="collage-image-wrapper top">
                        <img src={images.top} alt="Modern Dining Interior" />
                    </div>
                    <div className="collage-image-wrapper bottom">
                        <img src={images.bottom} alt="Cozy Evening Ambiance" />
                    </div>
                </div>

                {/* Content Section */}
                <div className="kampala-copy">
                    <div className="kampala-header-group">
                        <span className="kampala-separator">≫</span>
                        <div className="kampala-eyebrow">THE BEST FOOD EVERY DAY</div>
                        <span className="kampala-separator">≪</span>
                    </div>

                    <h2 className="kampala-title">Kampala&apos;s contemporary fine dining at its best</h2>

                    <p className="kampala-text">
                        Nestled in the heart of Kampala, Junior's Restaurant stands out as one of the best
                        restaurants, offering culinary experiences of diverse flavours. Indulge in our
                        monthly food brunches, breakfast, lunch and dinner covering an array of
                        English, Italian, Chinese, Mexican, and Indian cuisines, and savour the
                        sweetness from our bakeshop that makes us a local favourite.
                    </p>

                    <form className="reserve-box" onSubmit={handleReservation}>
                        <div className="reserve-grid">
                            <div className="reserve-field date-field">
                                <div className="reserve-header">SET DATE :</div>
                                <div className="reserve-display">
                                    <span className="reserve-big-val">{displayDate.day}</span>
                                    <span className="reserve-small-val">{displayDate.month}</span>
                                </div>
                                <input
                                    id="kampala-date"
                                    className="reserve-hidden-input"
                                    type="date"
                                    name="date"
                                    value={reservationData.date}
                                    onChange={handleChange}
                                    min={minDate}
                                    required
                                />
                            </div>

                            <div className="reserve-field guests-field">
                                <div className="reserve-header">GUESTS :</div>
                                <div className="reserve-display">
                                    <span className="reserve-big-val">{reservationData.guests}</span>
                                </div>
                                <select
                                    id="kampala-guests"
                                    className="reserve-hidden-input"
                                    name="guests"
                                    value={reservationData.guests}
                                    onChange={handleChange}
                                    required
                                >
                                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                                        <option key={num} value={num}>
                                            {num}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="reserve-action">
                                <button type="submit" className="reserve-btn-outline">RESERVE</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default KampalaSection;

