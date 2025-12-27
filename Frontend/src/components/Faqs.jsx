import React, { useState } from 'react';
import './Header.css';

const Faqs = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const faqs = [
        {
            question: "How do I book a test drive?",
            answer: "You can book a test drive by navigating to any car details page and clicking the 'Book Test Drive' button, or by visiting our Contact page."
        },
        {
            question: "Do you offer financing options?",
            answer: "Yes, we offer flexible financing options through our banking partners. You can discuss this with our sales team during your visit."
        },
        {
            question: "What is your warranty policy?",
            answer: "All our new cars come with a standard manufacturer warranty. Pre-owned vehicles include a comprehensive 1-year dealership warranty."
        },
        {
            question: "Can I trade in my old car?",
            answer: "Absolutely! We offer competitive trade-in values for your existing vehicle. Bring it in for a free evaluation."
        }
    ];

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="faqs-section">
            <div className="section-header">
                <h2>Frequently Asked Questions</h2>
                <p>Find answers to common questions about our services</p>
            </div>
            <div className="faqs-container">
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className={`faq-item ${activeIndex === index ? 'active' : ''}`}
                        onClick={() => toggleAccordion(index)}
                    >
                        <div className="faq-question">
                            <h3>{faq.question}</h3>
                            <span className="faq-icon">{activeIndex === index ? '−' : '+'}</span>
                        </div>
                        <div className="faq-answer">
                            <p>{faq.answer}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Faqs;
