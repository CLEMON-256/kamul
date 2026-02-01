import React, { useState, useEffect } from 'react';
import axiosInstance from '../../api/axios';
import '../../styles/Footer.css';
import footerBg from '../../assets/reservation_hero.png';

const Footer = () => {
    const [settings, setSettings] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        email: '',
        guests: '',
        message: ''
    });

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await axiosInstance.get('/settings/');
                if (res.data && res.data.length > 0) {
                    setSettings(res.data[0]);
                }
            } catch (err) {
                console.error("Error fetching settings for footer:", err);
            }
        };
        fetchSettings();
    }, []);

    const phoneDisplay = settings?.phone_restraunt || "+256 701 126 433";

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <footer className="footer-v2">
            <div className="footer-bg-wrapper">
                <img src={footerBg} alt="Footer Background" className="footer-bg-img" />
                <div className="footer-overlay"></div>
            </div>

            <div className="container footer-container-v2">
                <div className="footer-grid-v2">
                    {/* Timing Left Side */}
                    <div className="footer-timing">
                        <div className="timing-content">
                            <h2 className="timing-title">OUR</h2>
                            <h3 className="timing-subtitle">TIMING</h3>

                            <div className="timing-details">
                                <p>MONDAY - SUNDAY</p>
                                <p className="timing-hours">7 AM - 11 PM</p>
                            </div>

                            <div className="timing-phone">{phoneDisplay}</div>

                            <div className="social-icons-footer">
                                <a href="https://www.instagram.com/search/top/?q=0701126433" target="_blank" rel="noopener noreferrer" className="social-icon-f instagram" aria-label="Instagram">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                                </a>
                                <a href="https://www.facebook.com/search/top/?q=0701126433" target="_blank" rel="noopener noreferrer" className="social-icon-f facebook" aria-label="Facebook">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                                </a>
                                <a href="https://www.tiktok.com/search/user?q=0701126433" target="_blank" rel="noopener noreferrer" className="social-icon-f tiktok" aria-label="TikTok">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Form Right Side */}
                    <div className="footer-contact-form">
                        <div className="form-header">
                            <div className="stay-contact">
                                <span className="decorative-arrow">≪</span>
                                STAY IN CONTACT
                                <span className="decorative-arrow">≫</span>
                            </div>
                            <h2 className="footer-form-title">Get in Touch</h2>
                        </div>

                        <form className="contact-form-footer">
                            <div className="form-row-f">
                                <div className="form-group-f">
                                    <label>Name</label>
                                    <input type="text" name="name" value={formData.name} onChange={handleChange} />
                                </div>
                                <div className="form-group-f">
                                    <label>Surname</label>
                                    <input type="text" name="surname" value={formData.surname} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="form-row-f">
                                <div className="form-group-f">
                                    <label>Email</label>
                                    <input type="email" name="email" value={formData.email} onChange={handleChange} />
                                </div>
                                <div className="form-group-f">
                                    <label>Guests</label>
                                    <input type="text" name="guests" value={formData.guests} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="form-group-f message-group-f">
                                <label>Message</label>
                                <textarea name="message" value={formData.message} onChange={handleChange}></textarea>
                            </div>
                            <button type="submit" className="footer-send-btn">SEND MESSAGE</button>
                        </form>
                    </div>
                </div>

                <div className="footer-bottom-v2">
                    <p>&copy; {new Date().getFullYear()} Junior's Restaurant. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
