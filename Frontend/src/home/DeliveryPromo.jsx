import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import '../styles/DeliveryPromo.css';
import menuData from '../data/menu.json';
import heroBackground from '../assets/hero-background.jpg';

const DeliveryPromo = () => {
    const { addToCart } = useCart();

    const currency = menuData.currency || 'UGX';

    const featuredProducts = useMemo(() => {
        const items = menuData.items || [];
        // Priority order for delivery products matching Junior's Restaurant
        const deliveryProductIds = [
            'bake-treat-box',      // Pastry Treat Box
            'bake-bread-loaves',   // Bread Loaves
            'bake-brownie-love-box', // Brownie Love Box
            'bake-bento-cake'      // Bento Cake
        ];

        // Get products in the specified order
        const orderedProducts = deliveryProductIds
            .map(id => items.find(item => item.id === id))
            .filter(Boolean);

        // If we have all 4, return them; otherwise fill with other pastries
        if (orderedProducts.length === 4) {
            return orderedProducts;
        }

        // Fallback: get any pastries category items
        const pastries = items.filter((i) => i.categoryId === 'pastries');
        return pastries.slice(0, 4);
    }, []);

    const formatUGX = (value) => {
        try {
            return new Intl.NumberFormat('en-UG', { maximumFractionDigits: 0 }).format(value);
        } catch {
            return String(value);
        }
    };

    return (
        <section className="delivery-promo" id="lunch-hour-deliveries">
            <div className="container">
                {/* Top copy block matching Sweetly layout */}
                <header className="delivery-header">
                    <h2 className="delivery-title">LUNCH HOUR DELIVERIES</h2>
                    <div className="delivery-copy">
                        <p>
                            Let us handle the lunch hour deliveries and have them delivered to your doorstep with
                            massive love.
                        </p>
                        <p>
                            Our delivery efficient and effective delivery fee is 2000 to areas as far as anywhere within
                            a 10kms radius. <span className="delivery-phone">(0701126433)</span>
                        </p>
                    </div>
                    <Link
                        to="/bakery"
                        className="delivery-cta"
                    >
                        ORDER FOR THESE AND MORE ITEMS FROM OUR SHOP AND WE WILL DELIVER TO YOU
                    </Link>
                </header>

                {/* Product strip similar to Pastry Treat Box row */}
                <div className="delivery-strip">
                    {featuredProducts.map((product) => (
                        <div key={product.id} className="delivery-card">
                            <div className="delivery-card-image">
                                <img src={heroBackground} alt={product.name} />
                                <span className="delivery-price-badge">
                                    {currency} {formatUGX(product.price)}
                                </span>
                            </div>
                            <div className="delivery-card-body">
                                <h3 className="delivery-card-name">{product.name}</h3>
                                <button
                                    type="button"
                                    className="delivery-card-btn"
                                    onClick={() => addToCart(product)}
                                >
                                    Quick Add
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default DeliveryPromo;