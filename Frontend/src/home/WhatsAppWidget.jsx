import React, { useState } from 'react';
import logo from '../assets/logos.png';
import '../styles/WhatsAppWidget.css';

const WhatsAppWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const phoneNumber = '256701126433';

    const handleToggle = () => setIsOpen(!isOpen);

    const handleSendMessage = (e) => {
        e.preventDefault();
        const finalMessage = message.trim() || 'Hi';
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(finalMessage)}`;
        window.open(url, '_blank', 'noopener,noreferrer');
        setMessage('');
        setIsOpen(false);
    };

    return (
        <div className={`whatsapp-container ${isOpen ? 'is-open' : ''}`}>
            {isOpen && (
                <div className="whatsapp-chat-box">
                    <div className="whatsapp-chat-card">
                        <button className="whatsapp-close-x" onClick={handleToggle}>×</button>
                        <div className="whatsapp-avatar-container">
                            <img src={logo} alt="Restaurant Logo" />
                        </div>
                        <div className="whatsapp-chat-content">
                            <p>
                                The Junior's Restaurant customer support team is here to Serve you.
                                Please place your order at our Restaurant on 0701126433 OR with the Bakeshop on 0701126433
                            </p>
                        </div>
                    </div>
                    <form className="whatsapp-chat-input-area" onSubmit={handleSendMessage}>
                        <input
                            type="text"
                            placeholder="Type a message..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            autoFocus
                        />
                        <button type="submit" className="whatsapp-send-arrow">
                            <svg viewBox="0 0 24 24" width="24" height="24">
                                <path fill="#25D366" d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                            </svg>
                        </button>
                    </form>
                </div>
            )}

            <button
                className="whatsapp-trigger-bubble"
                onClick={handleToggle}
                aria-label="Contact us on WhatsApp"
            >
                <div className="whatsapp-trigger-content">
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="white"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M12.031 6.172c-2.32 0-4.518.815-6.186 2.296-1.637 1.453-2.533 3.39-2.528 5.46a7.663 7.663 0 0 0 1.056 3.864l-.693 2.54 2.597-.68a7.665 7.665 0 0 0 3.753.98h.003c2.32 0 4.519-.815 6.186-2.296 1.637-1.453 2.533-3.39 2.528-5.46 0-4.223-3.435-7.704-7.716-7.704zm4.444 10.457c-.61 1.055-1.92 1.41-3.13 1.05l-.105-.035c-1.396-.51-2.9-1.93-3.76-3.14-.86-1.21-1.31-2.57-.45-3.8.32-.45.88-.63 1.34-.33l.63.42c.45.3.45.92.11 1.33l-.15.19c-.31.39-.24.79.13 1.25.37.47.88.94 1.43 1.25s1.08.35 1.54.02l.24-.17c.4-.3.97-.24 1.34.15.37.39.75.82 1.1 1.25.35.43.08 1.02-.27 1.56z" />
                    </svg>
                    <span>Hi, how can I help?</span>
                </div>
            </button>
        </div>
    );
};

export default WhatsAppWidget;
