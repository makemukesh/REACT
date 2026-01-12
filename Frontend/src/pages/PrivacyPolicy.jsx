import React, { useState, useEffect } from 'react';

const PrivacyPolicy = () => {
    const [activeSection, setActiveSection] = useState('intro');

    const sections = [
        { id: 'intro', label: '1. Introduction' },
        { id: 'collection', label: '2. Information Collection' },
        { id: 'usage', label: '3. How We Use Data' },
        { id: 'sharing', label: '4. Information Sharing' },
        { id: 'security', label: '5. Data Security' },
        { id: 'cookies', label: '6. Cookies & Tracking' },
        { id: 'rights', label: '7. Your Rights' },
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
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
                <p className="text-lg text-white/80">How we collect, use, and protect your data.</p>
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
                    <section id="intro" className="mb-10">
                        <h2 className="text-2xl font-bold text-slate-800 mb-4">1. Introduction</h2>
                        <p className="text-gray-600 leading-relaxed mb-3">
                            At AutoDrive, we value your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, disclose, and safeguard your data when you visit our website or use our services.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            By using our services, you agree to the collection and use of information in accordance with this policy.
                        </p>
                    </section>

                    <section id="collection" className="mb-10">
                        <h2 className="text-2xl font-bold text-slate-800 mb-4">2. Information Collection</h2>
                        <p className="text-gray-600 leading-relaxed mb-3">
                            We collect several different types of information to provide and improve our service to you:
                        </p>
                        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                            <li><strong>Personal Identification Information:</strong> Name, email address, phone number, etc.</li>
                            <li><strong>Vehicle Preferences:</strong> Interest in specific car models, types, or services.</li>
                            <li><strong>Technical Data:</strong> IP address, browser type, device information, and usage data.</li>
                        </ul>
                    </section>

                    <section id="usage" className="mb-10">
                        <h2 className="text-2xl font-bold text-slate-800 mb-4">3. How We Use Data</h2>
                        <p className="text-gray-600 leading-relaxed mb-3">
                            We use the collected data for various purposes, including:
                        </p>
                        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                            <li>To provide and maintain our Service.</li>
                            <li>To notify you about changes to our Service.</li>
                            <li>To allow you to participate in interactive features when you choose to do so.</li>
                            <li>To provide customer support and respond to inquiries.</li>
                            <li>To monitor the usage of the Service and detect technical issues.</li>
                        </ul>
                    </section>

                    <section id="sharing" className="mb-10">
                        <h2 className="text-2xl font-bold text-slate-800 mb-4">4. Information Sharing</h2>
                        <p className="text-gray-600 leading-relaxed">
                            We do not sell, trade, or rent your personal identification information to others. We may share generic aggregated demographic information not linked to any personal identification information regarding visitors and users with our business partners, trusted affiliates, and advertisers.
                        </p>
                    </section>

                    <section id="security" className="mb-10">
                        <h2 className="text-2xl font-bold text-slate-800 mb-4">5. Data Security</h2>
                        <p className="text-gray-600 leading-relaxed">
                            The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
                        </p>
                    </section>

                    <section id="cookies" className="mb-10">
                        <h2 className="text-2xl font-bold text-slate-800 mb-4">6. Cookies & Tracking</h2>
                        <p className="text-gray-600 leading-relaxed mb-3">
                            We use cookies and similar tracking technologies to track the activity on our Service and hold certain information, unique identifiers, and other diagnostic data.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.
                        </p>
                    </section>

                    <section id="rights" className="mb-10">
                        <h2 className="text-2xl font-bold text-slate-800 mb-4">7. Your Rights</h2>
                        <p className="text-gray-600 leading-relaxed mb-3">
                            Depending on your location, you may have the following rights regarding your personal data:
                        </p>
                        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                            <li>The right to access, update, or delete the information we have on you.</li>
                            <li>The right of rectification.</li>
                            <li>The right to object.</li>
                            <li>The right of restriction.</li>
                            <li>The right to data portability.</li>
                            <li>The right to withdraw consent.</li>
                        </ul>
                    </section>

                    <section id="contact" className="mb-6">
                        <h2 className="text-2xl font-bold text-slate-800 mb-4">8. Contact Us</h2>
                        <p className="text-gray-600 leading-relaxed mb-3">
                            If you have any questions about this Privacy Policy, please contact us:
                        </p>
                        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                            <li>By email: privacy@autodrive.com</li>
                            <li>By visiting this page on our website: /contact</li>
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

export default PrivacyPolicy;
