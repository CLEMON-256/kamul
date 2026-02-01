import React, { useState, useEffect } from 'react';
import { useCart } from '../../contexts/CartContext';
import '../../styles/CategoryMenuSection.css';

const CategoryMenuSection = ({ title, subtitle, items, images, reverse = false }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const { addToCart } = useCart();
    const currency = 'UGX';

    // Auto-rotate images
    useEffect(() => {
        if (!images || images.length === 0) return;

        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % images.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [images]);

    const nextImage = () => {
        if (!images || images.length === 0) return;
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        if (!images || images.length === 0) return;
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const formatPrice = (value) => {
        try {
            return new Intl.NumberFormat('en-UG', { maximumFractionDigits: 0 }).format(value);
        } catch {
            return String(value);
        }
    };

    const currentImage = images && images.length > 0 ? images[currentImageIndex] : null;

    return (
        <section className={`category-menu-section ${reverse ? 'reverse' : ''}`}>
            {/* Visual Side (Left by default, Right if reversed) */}
            <div className="cms-visual-side">
                <div className="cms-carousel">
                    {currentImage && (
                        <div
                            className="cms-image-container"
                            key={currentImageIndex} // Key forces re-render for animation
                        >
                            <img
                                src={currentImage}
                                alt={`${title} showcase`}
                                className="cms-main-image"
                            />
                        </div>
                    )}

                    {images && images.length > 1 && (
                        <div className="cms-controls">
                            <button className="cms-nav-btn prev" onClick={prevImage}>❮</button>
                            <button className="cms-nav-btn next" onClick={nextImage}>❯</button>
                        </div>
                    )}

                    <div className="cms-dots">
                        {images && images.map((_, idx) => (
                            <span
                                key={idx}
                                className={`cms-dot ${idx === currentImageIndex ? 'active' : ''}`}
                                onClick={() => setCurrentImageIndex(idx)}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Menu Content Side */}
            <div className="cms-content-side">
                <div className="cms-header">
                    <h2 className="cms-title">{title}</h2>
                    {subtitle && <p className="cms-subtitle">{subtitle}</p>}
                    <div className="cms-divider"></div>
                </div>

                <div className="cms-items-list">
                    {items.map((item) => (
                        <div key={item.id} className="cms-item-row">
                            <div className="cms-item-info">
                                <h3 className="cms-item-name">{item.name}</h3>
                                <p className="cms-item-desc">{item.description}</p>
                            </div>
                            <div className="cms-item-actions">
                                <span className="cms-item-price">
                                    {formatPrice(item.price)}
                                </span>
                                <button
                                    className="cms-add-btn"
                                    onClick={() => addToCart(item)}
                                    title="Add to Cart"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategoryMenuSection;
