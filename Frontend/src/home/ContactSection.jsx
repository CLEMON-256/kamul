import React, { useState } from 'react';
import '../styles/ContactSection.css';

const ContactSection = () => {
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        email: '',
        guests: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <section className="contact-section">
            <div className="contact-grid">
                {/* Timing Left Side */}
                <div className="timing-info">
                    <div className="timing-content">
                        <h2 className="timing-title">OUR</h2>
                        <h3 className="timing-subtitle">TIMING</h3>

                        <div className="timing-details">
                            <p>MONDAY - SUNDAY</p>
                            <p className="timing-hours">7 AM - 11 PM</p>
                        </div>

                        <div className="timing-phone">+256760275451</div>

                        <div className="social-icons">
                            <a href="#" className="social-icon instagram"></a>
                            <a href="#" className="social-icon facebook"></a>
                            <a href="#" className="social-icon tiktok"></a>
                        </div>
                    </div>
                </div>

                {/* Form Right Side */}
                <div className="contact-form-container">
                    <div className="form-header">
                        <div className="stay-contact">
                            <span className="decorative-arrow">≪</span>
                            STAY IN CONTACT
                            <span className="decorative-arrow">≫</span>
                        </div>
                        <h2 className="form-title">Get in Touch</h2>
                    </div>

                    <form className="contact-form">
                        <div className="form-row">
                            <div className="form-group">
                                <label>Name</label>
                                <input type="text" name="name" value={formData.name} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Surname</label>
                                <input type="text" name="surname" value={formData.surname} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" name="email" value={formData.email} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Guests</label>
                                <input type="text" name="guests" value={formData.guests} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="form-group message-group">
                            <label>Message</label>
                            <textarea name="message" value={formData.message} onChange={handleChange}></textarea>
                        </div>
                        <button type="submit" className="send-message-btn">SEND MESSAGE</button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
