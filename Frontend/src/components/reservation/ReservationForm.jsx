import React, { useMemo, useState } from 'react';
import { reservationAPI } from '../../api/services';
import Input from '../common/Input';
import Button from '../common/Button';
import '../../styles/ReservationForm.css';



const ReservationForm = ({ initialValues = {}, onSuccess }) => {
    const minDate = useMemo(() => new Date().toISOString().split('T')[0], []);

    const [formData, setFormData] = useState({
        name: initialValues.name || '',
        email: initialValues.email || '',
        phone: initialValues.phone || '',
        date: initialValues.date || '',
        time: initialValues.time || '',
        guests: initialValues.guests || 1
    });

    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);


const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]:e.target.value});

};

const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true)
        setError(null);
        setSuccess(false)

        try {
            const payload = {
                ...formData,
                guests: Number(formData.guests || 1)
            };
            const res = await reservationAPI.createReservation(payload);
            setSuccess(true);
            onSuccess?.(res?.data || payload);
            setFormData({ name: '', email: '', phone: '', date: '', time: '', guests: 1 });
        } catch (err) {
            setError('Failed to make a reservation. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };
    return (
        <div className="reservation-form">
            <h2>Reserve a Table</h2>

            <form onSubmit={handleSubmit}>
                <Input
                    id="res-name"
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <Input
                    id="res-email"
                    label="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <Input
                    id="res-phone"
                    label="Phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />
                <Input
                    id="res-date"
                    label="Date"
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    min={minDate}
                />
                <Input
                    id="res-time"
                    label="Time"
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                />
                <Input
                    id="res-guests"
                    label="Number of Guests"
                    type="number"
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    min="1"
                    required
                />

                <Button type="submit" disabled={submitting}>
                    {submitting ? 'Submitting...' : 'Make Reservation'}
                </Button>

                {success && <div className="success-message">Reservation successful!</div>}
                {error && <div className="error-message">{error}</div>}
            </form>
        </div>
    );
};
                



 export default ReservationForm;


