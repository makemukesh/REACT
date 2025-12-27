import React from 'react';
import './Header.css';

const WhyChooseUs = () => {
    const features = [
        {
            title: "Wide Variety",
            description: "Choose from hundreds of premium luxury and sports cars.",
            icon: "🚗"
        },
        {
            title: "Trusted Service",
            description: "Our certified mechanics ensure every vehicle is in top condition.",
            icon: "🔧"
        },
        {
            title: "Financing Made Easy",
            description: "Get approved quickly with our hassle-free financing options.",
            icon: "💰"
        },
        {
            title: "Customer Support",
            description: "24/7 dedicated support to assist you with any queries.",
            icon: "🎧"
        }
    ];

    return (
        <section className="why-choose-us">
            <div className="section-header">
                <h2>Why Choose Us</h2>
                <p>We are dedicated to providing the best automotive experience</p>
            </div>
            <div className="features-grid">
                {features.map((feature, index) => (
                    <div key={index} className="feature-card">
                        <div className="feature-icon">{feature.icon}</div>
                        <h3>{feature.title}</h3>
                        <p>{feature.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default WhyChooseUs;
