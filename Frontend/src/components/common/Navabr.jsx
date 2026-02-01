import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import logo from '../../assets/logo.svg';
import '../../styles/Navbar.css';

const Navbar = () => {
    const { user, logout } = useAuth();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { to: '/', label: 'Home' },
        { to: '/about', label: 'About' },
        { to: '/menu', label: 'Menu' },
        { to: '/bakery', label: 'Bake Shop', badge: 'BEST' },
        { to: '/reservations', label: 'Reservations' },
    ];

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
            <div className="container">
                <Link to="/" className="navbar-brand">
                    <img src={logo} alt="Junior's Restaurant and Lounge" className="navbar-logo" />
                </Link>

                <div className={`navbar-menu ${isMobileMenuOpen ? 'open' : ''}`}>
                    {navLinks.map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            className="navbar-link"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {link.label}
                            {link.badge && <span className="nav-badge">{link.badge}</span>}
                        </Link>
                    ))}

                    {user ? (
                        <>
                            <Link
                                to="/order-history"
                                className="navbar-link"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                My Orders
                            </Link>
                            <button
                                onClick={() => {
                                    logout();
                                    setIsMobileMenuOpen(false);
                                }}
                                className="navbar-btn logout-btn"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link
                            to="/login"
                            className="navbar-btn login-btn"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Login
                        </Link>
                    )}
                </div>

                <button
                    className="navbar-toggle"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
