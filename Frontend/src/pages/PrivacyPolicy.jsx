import React, { useState, useEffect } from 'react';
import './PrivacyPolicy.css';

const PrivacyPolicy = () => {
    const [activeSection, setActiveSection] = useState('intro');

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setActiveSection(id);
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            const sections = ['intro', 'collection', 'usage', 'sharing', 'security', 'cookies', 'rights', 'contact'];

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top >= 0 && rect.top <= 300) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="privacy-container">
            <div className="privacy-header">
                <h1 className="privacy-title">Privacy Policy</h1>
                <p className="privacy-subtitle">How we collect, use, and protect your data.</p>
            </div>

            <div className="privacy-content-wrapper">
                <aside className="privacy-sidebar">
                    <ul className="privacy-nav">
                        <li
                            className={activeSection === 'intro' ? 'active' : ''}
                            onClick={() => scrollToSection('intro')}
                        >
                            1. Introduction
                        </li>
                        <li
                            className={activeSection === 'collection' ? 'active' : ''}
                            onClick={() => scrollToSection('collection')}
                        >
                            2. Information Collection
                        </li>
                        <li
                            className={activeSection === 'usage' ? 'active' : ''}
                            onClick={() => scrollToSection('usage')}
                        >
                            3. How We Use Data
                        </li>
                        <li
                            className={activeSection === 'sharing' ? 'active' : ''}
                            onClick={() => scrollToSection('sharing')}
                        >
                            4. Information Sharing
                        </li>
                        <li
                            className={activeSection === 'security' ? 'active' : ''}
                            onClick={() => scrollToSection('security')}
                        >
                            5. Data Security
                        </li>
                        <li
                            className={activeSection === 'cookies' ? 'active' : ''}
                            onClick={() => scrollToSection('cookies')}
                        >
                            6. Cookies & Tracking
                        </li>
                        <li
                            className={activeSection === 'rights' ? 'active' : ''}
                            onClick={() => scrollToSection('rights')}
                        >
                            7. Your Rights
                        </li>
                        <li
                            className={activeSection === 'contact' ? 'active' : ''}
                            onClick={() => scrollToSection('contact')}
                        >
                            8. Contact Us
                        </li>
                    </ul>
                </aside>

                <main className="privacy-main-content">
                    <section id="intro" className="privacy-section">
                        <h2>1. Introduction</h2>
                        <p>
                            At AutoDrive, we value your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, disclose, and safeguard your data when you visit our website or use our services.
                        </p>
                        <p>
                            By using our services, you agree to the collection and use of information in accordance with this policy.
                        </p>
                    </section>

                    <section id="collection" className="privacy-section">
                        <h2>2. Information Collection</h2>
                        <p>
                            We collect several different types of information to provide and improve our service to you:
                        </p>
                        <ul>
                            <li><strong>Personal Identification Information:</strong> Name, email address, phone number, etc.</li>
                            <li><strong>Vehicle Preferences:</strong> Interest in specific car models, types, or services.</li>
                            <li><strong>Technical Data:</strong> IP address, browser type, device information, and usage data.</li>
                        </ul>
                    </section>

                    <section id="usage" className="privacy-section">
                        <h2>3. How We Use Data</h2>
                        <p>
                            We use the collected data for various purposes, including:
                        </p>
                        <ul>
                            <li>To provide and maintain our Service.</li>
                            <li>To notify you about changes to our Service.</li>
                            <li>To allow you to participate in interactive features when you choose to do so.</li>
                            <li>To provide customer support and respond to inquiries.</li>
                            <li>To monitor the usage of the Service and detect technical issues.</li>
                        </ul>
                    </section>

                    <section id="sharing" className="privacy-section">
                        <h2>4. Information Sharing</h2>
                        <p>
                            We do not sell, trade, or rent your personal identification information to others. We may share generic aggregated demographic information not linked to any personal identification information regarding visitors and users with our business partners, trusted affiliates, and advertisers.
                        </p>
                    </section>

                    <section id="security" className="privacy-section">
                        <h2>5. Data Security</h2>
                        <p>
                            The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
                        </p>
                    </section>

                    <section id="cookies" className="privacy-section">
                        <h2>6. Cookies & Tracking</h2>
                        <p>
                            We use cookies and similar tracking technologies to track the activity on our Service and hold certain information. unique identifiers, and other diagnostic data.
                        </p>
                        <p>
                            You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.
                        </p>
                    </section>

                    <section id="rights" className="privacy-section">
                        <h2>7. Your Rights</h2>
                        <p>
                            Depending on your location, you may have the following rights regarding your personal data:
                        </p>
                        <ul>
                            <li>The right to access, update, or delete the information we have on you.</li>
                            <li>The right of rectification.</li>
                            <li>The right to object.</li>
                            <li>The right of restriction.</li>
                            <li>The right to data portability.</li>
                            <li>The right to withdraw consent.</li>
                        </ul>
                    </section>

                    <section id="contact" className="privacy-section">
                        <h2>8. Contact Us</h2>
                        <p>
                            If you have any questions about this Privacy Policy, please contact us:
                        </p>
                        <ul>
                            <li>By email: privacy@autodrive.com</li>
                            <li>By visiting this page on our website: /contact</li>
                        </ul>
                    </section>
                </main>
            </div>

            <div className="last-updated">
                Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
        </div>
    );
};

export default PrivacyPolicy;
