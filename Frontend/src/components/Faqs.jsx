import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

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
        <section className="py-20 px-6 bg-gray-50">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Frequently Asked Questions</h2>
                    <p className="text-gray-500 text-lg">Find answers to common questions about our services</p>
                </div>

                {/* FAQ Items */}
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer transition-all duration-300 ${activeIndex === index ? 'shadow-lg' : 'hover:shadow-lg'
                                }`}
                            onClick={() => toggleAccordion(index)}
                        >
                            <div className="flex items-center justify-between p-6">
                                <h3 className="font-semibold text-slate-800 pr-4">{faq.question}</h3>
                                <span className={`text-[#ff3d00] transition-transform duration-300 ${activeIndex === index ? 'rotate-180' : ''}`}>
                                    <FiChevronDown className="text-xl" />
                                </span>
                            </div>
                            <div className={`overflow-hidden transition-all duration-300 ${activeIndex === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                                }`}>
                                <p className="px-6 pb-6 text-gray-600 leading-relaxed">{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Faqs;
