import React, { useState, useEffect } from 'react';

const TermsOfService = () => {
    const [activeSection, setActiveSection] = useState('acceptance');

    const sections = [
        { id: 'acceptance', label: '1. Acceptance of Terms' },
        { id: 'eligibility', label: '2. Eligibility' },
        { id: 'services', label: '3. Services Offered' },
        { id: 'user-conduct', label: '4. User Conduct' },
        { id: 'intellectual-property', label: '5. Intellectual Property' },
        { id: 'termination', label: '6. Termination' },
        { id: 'disclaimer', label: '7. Disclaimers' },
        { id: 'contact', label: '8. Contact Us' }
    ];

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setActiveSection(id);
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            for (const section of sections) {
                const element = document.getElementById(section.id);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top >= 0 && rect.top <= 300) {
                        setActiveSection(section.id);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-700 text-white py-16 px-6 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
                <p className="text-lg text-white/80">Please read these terms carefully before using our services.</p>
            </div>

            <div className="max-w-6xl mx-auto py-12 px-6 flex flex-col lg:flex-row gap-8">
                {/* Sidebar */}
                <aside className="lg:w-64 flex-shrink-0">
                    <div className="sticky top-24 bg-white rounded-2xl p-6 shadow-lg">
                        <ul className="space-y-2">
                            {sections.map((section) => (
                                <li
                                    key={section.id}
                                    className={`cursor-pointer px-4 py-2 rounded-lg text-sm transition-colors ${activeSection === section.id
                                            ? 'bg-[#ff3d00] text-white font-medium'
                                            : 'text-gray-600 hover:bg-gray-100'
                                        }`}
                                    onClick={() => scrollToSection(section.id)}
                                >
                                    {section.label}
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 bg-white rounded-2xl p-8 shadow-lg">
                    <section id="acceptance" className="mb-10">
                        <h2 className="text-2xl font-bold text-slate-800 mb-4">1. Acceptance of Terms</h2>
                        <p className="text-gray-600 leading-relaxed mb-3">
                            Welcome to AutoDrive. By accessing or using our website, mobile application, and services (collectively, the "Services"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you may not use our Services.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            These Terms constitute a legally binding agreement between you and AutoDrive regarding your use of the Services. We may update these Terms from time to time, and your continued use of the Services after any changes constitutes your acceptance of the new Terms.
                        </p>
                    </section>

                    <section id="eligibility" className="mb-10">
                        <h2 className="text-2xl font-bold text-slate-800 mb-4">2. Eligibility</h2>
                        <p className="text-gray-600 leading-relaxed mb-3">
                            To use our Services, you must be at least 18 years old and capable of forming a binding contract. By using our Services, you represent and warrant that you meet these eligibility requirements.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            If you are accessing the Services on behalf of a company or other legal entity, you represent that you have the authority to bind such entity to these Terms.
                        </p>
                    </section>

                    <section id="services" className="mb-10">
                        <h2 className="text-2xl font-bold text-slate-800 mb-4">3. Services Offered</h2>
                        <p className="text-gray-600 leading-relaxed mb-3">
                            AutoDrive provides a platform for users to:
                        </p>
                        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-3">
                            <li>Browse and purchase vehicles from our curated inventory.</li>
                            <li>Sell their own vehicles through our listing service.</li>
                            <li>Access financial tools such as EMI calculators.</li>
                            <li>Book appointments for vehicle services and maintenance.</li>
                        </ul>
                        <p className="text-gray-600 leading-relaxed">
                            We reserve the right to modify, suspend, or discontinue any part of our Services at any time without notice.
                        </p>
                    </section>

                    <section id="user-conduct" className="mb-10">
                        <h2 className="text-2xl font-bold text-slate-800 mb-4">4. User Conduct</h2>
                        <p className="text-gray-600 leading-relaxed mb-3">
                            You agree not to engage in any of the following prohibited activities:
                        </p>
                        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                            <li>Using the Services for any illegal purpose or in violation of any local, state, national, or international law.</li>
                            <li>Posting false, misleading, or fraudulent information regarding vehicles or personal details.</li>
                            <li>Interfering with or disrupting the security or integrity of the Services.</li>
                            <li>Attempting to gain unauthorized access to other user accounts or our systems.</li>
                            <li>Harassing, threatening, or defrauding other users.</li>
                        </ul>
                    </section>

                    <section id="intellectual-property" className="mb-10">
                        <h2 className="text-2xl font-bold text-slate-800 mb-4">5. Intellectual Property</h2>
                        <p className="text-gray-600 leading-relaxed mb-3">
                            The content, organization, graphics, design, compilation, and other matters related to the Services are protected under applicable copyrights, trademarks, and other proprietary (including but not limited to intellectual property) rights.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            The copying, redistribution, use, or publication by you of any such matters or any part of the Services is strictly prohibited without our express written permission.
                        </p>
                    </section>

                    <section id="termination" className="mb-10">
                        <h2 className="text-2xl font-bold text-slate-800 mb-4">6. Termination</h2>
                        <p className="text-gray-600 leading-relaxed mb-3">
                            We may terminate or suspend your account and bar access to the Services immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            Upon termination, your right to use the Services will immediately cease. If you wish to terminate your account, you may simply discontinue using the Services.
                        </p>
                    </section>

                    <section id="disclaimer" className="mb-10">
                        <h2 className="text-2xl font-bold text-slate-800 mb-4">7. Disclaimers and Limitation of Liability</h2>
                        <p className="text-gray-600 leading-relaxed mb-3">
                            The Services are provided on an "AS IS" and "AS AVAILABLE" basis. AutoDrive expressly disclaims all warranties of any kind, whether express or implied, including, but not limited to, the implied warranties of merchantability, fitness for a particular purpose, and non-infringement.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            In no event shall AutoDrive be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
                        </p>
                    </section>

                    <section id="contact" className="mb-6">
                        <h2 className="text-2xl font-bold text-slate-800 mb-4">8. Contact Us</h2>
                        <p className="text-gray-600 leading-relaxed mb-3">
                            If you have any questions about these Terms, please contact us at:
                        </p>
                        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                            <li>Email: support@autodrive.com</li>
                            <li>Phone: +1 (555) 123-4567</li>
                            <li>Address: 123 Auto Drive Lane, Motor City, CA 90210</li>
                        </ul>
                    </section>
                </main>
            </div>

            <div className="text-center text-gray-500 text-sm pb-8">
                Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
        </div>
    );
};

export default TermsOfService;
