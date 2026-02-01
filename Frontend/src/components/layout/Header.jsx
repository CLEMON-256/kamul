import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import logo from '../../assets/logo.svg'
import '../../styles/Header.css'

const Header = () => {
    const location = useLocation();
    const [isScrolled, SetIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            SetIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll)

    }, [])

    return (
        <header className={`header${isScrolled ? ' scrolled' : ''}`}>
            <div className="container">
                <div className="header-content">
                    <div className="logo">
                        <Link to="/" className="logo-link">
                            <img src={logo} alt="Junior's Restaurant" className="logo-image" />
                            <span className="logo-text">Junior&apos;s Restaurant</span>
                        </Link>
                    </div>
                    <nav className={`nav${isMobileMenuOpen ? ' open' : ''}`} aria-label="Primary navigation">
                        <div className="nav-links" aria-label="Site sections">
                            <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>HOME</Link>
                            <Link to="/about" onClick={() => setIsMobileMenuOpen(false)}>ABOUT US</Link>
                            <Link to="/menu" onClick={() => setIsMobileMenuOpen(false)}>MENU</Link>
                            <Link to="/bakery" onClick={() => setIsMobileMenuOpen(false)} className="nav-link-badge-wrapper">
                                <span className="nav-badge">BEST</span>
                                BAKE SHOP
                            </Link>
                            <Link to="/reservations" className="reserve-btn-link" onClick={() => setIsMobileMenuOpen(false)}>RESERVE</Link>
                        </div>
                    </nav>
                    <button
                        className="mobile-menu-toggle"
                        aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={isMobileMenuOpen}
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        type="button"
                    >
                        <span />
                        <span />
                        <span />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
