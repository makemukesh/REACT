import React from 'react';

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
        <section className="py-20 px-6 bg-white">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Why Choose Us</h2>
                    <p className="text-gray-500 text-lg">We are dedicated to providing the best automotive experience</p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-gray-50 rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
                        >
                            <div className="w-16 h-16 bg-[#ff3d00]/10 rounded-2xl flex items-center justify-center mx-auto mb-5 text-3xl group-hover:bg-[#ff3d00] group-hover:scale-110 transition-all duration-300">
                                {feature.icon}
                            </div>
                            <h3 className="text-lg font-bold text-slate-800 mb-3">{feature.title}</h3>
                            <p className="text-gray-600 text-sm">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
