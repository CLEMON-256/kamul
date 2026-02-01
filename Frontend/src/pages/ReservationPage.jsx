import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ReservationForm from '../components/reservation/ReservationForm';
import '../styles/ReservationPage.css';
import reservationHero from '../assets/reservation_hero.png';

const ReservationPage = () => {
  const [searchParams] = useSearchParams();
  const [submitted, setSubmitted] = useState(null);

  const initialValues = useMemo(() => {
    const date = searchParams.get('date') || '';
    const guestsParam = searchParams.get('guests');
    const guests = guestsParam ? Math.max(1, Number(guestsParam)) : 1;
    return { date, guests };
  }, [searchParams]);

  return (
    <div className="reservation-page">
      <div className="reservation-hero-bg">
        <img src={reservationHero} alt="Fine Dining Table" />
        <div className="hero-overlay-dark"></div>
      </div>

      <div className="container reservation-content">
        <div className="reservation-header-group">
          <span className="res-eyebrow">RESERVE YOUR SPOT</span>
          <h1>Book a Table</h1>
          <p className="res-subtitle">Experience culinary excellence in an atmosphere of refined elegance.</p>
        </div>

        <div className="reservation-form-wrapper">
          <ReservationForm initialValues={initialValues} onSuccess={(data) => setSubmitted(data)} />
        </div>

        {submitted && (
          <div className="reservation-confirmation" role="status" aria-live="polite">
            <h2>Reservation received</h2>
            <p>
              Thanks{submitted.name ? `, ${submitted.name}` : ''}. We’ve received your request for{' '}
              <strong>{submitted.guests}</strong> guest(s) on <strong>{submitted.date}</strong>.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReservationPage;
