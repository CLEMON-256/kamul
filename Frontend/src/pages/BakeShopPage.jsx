import React, { useState } from 'react';
import '../styles/BakeShopPage.css';
import BakeProductModal from '../components/common/BakeProductModal';
import bakeHero from '../assets/chocolate_waffles.png';

// Import product images
import product1 from '../assets/breakfast_combo.png';
import product2 from '../assets/chocolate_waffles.png';
import product3 from '../assets/burger_milanese.png';

const products = [
    {
        id: 1,
        title: "Cupped Cake-To-Go",
        price: 25000,
        image: product2,
        description: "Our signature moist cake layers served in a convenient cup. Perfect for snacking on the go! Layered with rich buttercream and topped with sprinkles.",
        category: "Cakes",
        isBest: true
    },
    {
        id: 2,
        title: "Chocolate Babka",
        price: 15000,
        image: product1,
        description: "Chocolate babka is a sweet, braided yeast bread or cake, known for its rich, swirled layers. It is often enjoyed as a dessert or sweet breakfast treat. The taste is a delightful combination of sweetness, richness of buttery layers and chocolately notes.",
        category: "Season Pastries",
        isBest: true
    },
    {
        id: 3,
        title: "Bento Cake",
        price: 50000,
        image: product3,
        description: "A cute, lunchbox-sized cake perfect for small celebrations or personal indulgence. Available in Vanilla, Chocolate, or Red Velvet flavors.",
        category: "Cakes"
    },
    {
        id: 4,
        title: "Pastry Treat Box",
        price: 50000,
        image: product1,
        description: "An assortment of our finest daily pastries including croissants, danishes, and muffins. The perfect gift for any pastry lover.",
        category: "Assortment"
    },
    {
        id: 5,
        title: "Bread Loaves",
        price: 8000,
        image: product2,
        description: "Freshly baked artisan bread loaves. Crusty on the outside, soft and airy on the inside. Baked fresh every morning.",
        category: "Bread"
    },
    {
        id: 6,
        title: "Brownie Love Box",
        price: 32000,
        image: product3,
        description: "A decadent box of our fudgy, rich chocolate brownies. Includes Walnut, Double Chocolate, and Salted Caramel variations.",
        category: "Brownies"
    }
];

const BakeShopPage = () => {
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleReadMore = (product) => {
        setSelectedProduct(product);
    };

    const handleCloseModal = () => {
        setSelectedProduct(null);
    };

    return (
        <div className="bake-shop-page">
            {/* Bake Hero Section */}
            <section className="bake-hero">
                <div className="bake-hero-bg">
                    <img src={bakeHero} alt="Fresh Pastries" />
                    <div className="bake-hero-overlay"></div>
                </div>

                <div className="container">
                    <div className="bake-hero-content">
                        <h1>Shop</h1>
                        <div className="breadcrumb-nav">
                            <span>Home</span> <span className="separator">/</span> <span>Bake Shop</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Intro Content */}
            <section className="bake-content">
                <div className="container">
                    <div className="bake-header-split">
                        <div className="bake-text-col">
                            <span className="bake-eyebrow">OUR BAKE SHOP</span>
                            <p className="bake-intro">
                                We love to focus on sweet and savoury pastries. Allowing you get a complete feel of our bake
                                section, satisfy your cravings and indulge your curiosity: we truly are an adventurous bakery in
                                Kampala.
                            </p>
                        </div>

                        <div className="bake-info-col">
                            <div className="shop-info-card">
                                <h3>SHOP INFO</h3>
                                <div className="contact-details">
                                    <p className="label">Contact Details</p>
                                    <p className="phone">+256 701 126 433</p>
                                    <p className="email">juniorsrestaurant@gmail.com</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Product Grid */}
                    <div className="products-grid">
                        {products.map((product) => (
                            <div key={product.id} className="product-card">
                                <div className="product-image-wrapper">
                                    <img src={product.image} alt={product.title} />
                                </div>
                                <div className="product-info">
                                    <h3>{product.title}</h3>
                                    <p className="product-price">UGX {product.price.toLocaleString()}</p>
                                    <button
                                        className="read-more-btn"
                                        onClick={() => handleReadMore(product)}
                                    >
                                        READ MORE
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </section>

            {/* Copyright Footer */}
            <div className="bake-footer">
                <p>Copyright - Junior's Restaurant, 2026</p>
            </div>

            {/* Modal */}
            {selectedProduct && (
                <BakeProductModal
                    product={selectedProduct}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
};

export default BakeShopPage;
