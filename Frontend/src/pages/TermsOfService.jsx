import React, { useState, useEffect } from 'react';
import './TermsOfService.css';

const TermsOfService = () => {
    const [activeSection, setActiveSection] = useState('acceptance');

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setActiveSection(id);
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            const sections = ['acceptance', 'eligibility', 'services', 'user-conduct', 'intellectual-property', 'termination', 'disclaimer', 'contact'];

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
        <div className="terms-container">
            <div className="terms-header">
                <h1 className="terms-title">Terms of Service</h1>
                <p className="terms-subtitle">Please read these terms carefully before using our services.</p>
            </div>

            <div className="terms-content-wrapper">
                <aside className="terms-sidebar">
                    <ul className="terms-nav">
                        <li
                            className={activeSection === 'acceptance' ? 'active' : ''}
                            onClick={() => scrollToSection('acceptance')}
                        >
                            1. Acceptance of Terms
                        </li>
                        <li
                            className={activeSection === 'eligibility' ? 'active' : ''}
                            onClick={() => scrollToSection('eligibility')}
                        >
                            2. Eligibility
                        </li>
                        <li
                            className={activeSection === 'services' ? 'active' : ''}
                            onClick={() => scrollToSection('services')}
                        >
                            3. Services Offered
                        </li>
                        <li
                            className={activeSection === 'user-conduct' ? 'active' : ''}
                            onClick={() => scrollToSection('user-conduct')}
                        >
                            4. User Conduct
                        </li>
                        <li
                            className={activeSection === 'intellectual-property' ? 'active' : ''}
                            onClick={() => scrollToSection('intellectual-property')}
                        >
                            5. Intellectual Property
                        </li>
                        <li
                            className={activeSection === 'termination' ? 'active' : ''}
                            onClick={() => scrollToSection('termination')}
                        >
                            6. Termination
                        </li>
                        <li
                            className={activeSection === 'disclaimer' ? 'active' : ''}
                            onClick={() => scrollToSection('disclaimer')}
                        >
                            7. Disclaimers
                        </li>
                        <li
                            className={activeSection === 'contact' ? 'active' : ''}
                            onClick={() => scrollToSection('contact')}
                        >
                            8. Contact Us
                        </li>
                    </ul>
                </aside>

                <main className="terms-main-content">
                    <section id="acceptance" className="terms-section">
                        <h2>1. Acceptance of Terms</h2>
                        <p>
                            Welcome to AutoDrive. By accessing or using our website, mobile application, and services (collectively, the "Services"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you may not use our Services.
                        </p>
                        <p>
                            These Terms constitute a legally binding agreement between you and AutoDrive regarding your use of the Services. We may update these Terms from time to time, and your continued use of the Services after any changes constitutes your acceptance of the new Terms.
                        </p>
                    </section>

                    <section id="eligibility" className="terms-section">
                        <h2>2. Eligibility</h2>
                        <p>
                            To use our Services, you must be at least 18 years old and capable of forming a binding contract. By using our Services, you represent and warrant that you meet these eligibility requirements.
                        </p>
                        <p>
                            If you are accessing the Services on behalf of a company or other legal entity, you represent regarding that you have the authority to bind such entity to these Terms.
                        </p>
                    </section>

                    <section id="services" className="terms-section">
                        <h2>3. Services Offered</h2>
                        <p>
                            AutoDrive provides a platform for users to:
                        </p>
                        <ul>
                            <li>Browse and purchase vehicles from our curated inventory.</li>
                            <li>Sell their own vehicles through our listing service.</li>
                            <li>Access financial tools such as EMI calculators.</li>
                            <li>Book appointments for vehicle services and maintenance.</li>
                        </ul>
                        <p>
                            We reserve the right to modify, suspend, or discontinue any part of our Services at any time without notice.
                        </p>
                    </section>

                    <section id="user-conduct" className="terms-section">
                        <h2>4. User Conduct</h2>
                        <p>
                            You agree not to engage in any of the following prohibited activities:
                        </p>
                        <ul>
                            <li>Using the Services for any illegal purpose or in violation of any local, state, national, or international law.</li>
                            <li>Posting false, misleading, or fraudulent information regarding vehicles or personal details.</li>
                            <li>Interfering with or disrupting the security or integrity of the Services.</li>
                            <li>Attempting to gain unauthorized access to other user accounts or our systems.</li>
                            <li>Harassing, threatening, or defrauding other users.</li>
                        </ul>
                    </section>

                    <section id="intellectual-property" className="terms-section">
                        <h2>5. Intellectual Property</h2>
                        <p>
                            The content, organization, graphics, design, compilation, and other matters related to the Services are protected under applicable copyrights, trademarks, and other proprietary (including but not limited to intellectual property) rights.
                        </p>
                        <p>
                            The copying, redistribution, use, or publication by you of any such matters or any part of the Services is strictly prohibited without our express written permission. You do not acquire ownership rights to any content, document, or other materials viewed through the Services.
                        </p>
                    </section>

                    <section id="termination" className="terms-section">
                        <h2>6. Termination</h2>
                        <p>
                            We may terminate or suspend your account and bar access to the Services immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.
                        </p>
                        <p>
                            Upon termination, your right to use the Services will immediately cease. If you wish to terminate your account, you may simply discontinue using the Services.
                        </p>
                    </section>

                    <section id="disclaimer" className="terms-section">
                        <h2>7. Disclaimers and Limitation of Liability</h2>
                        <p>
                            The Services are provided on an "AS IS" and "AS AVAILABLE" basis. AutoDrive expressly disclaims all warranties of any kind, whether express or implied, including, but not limited to, the implied warranties of merchantability, fitness for a particular purpose, and non-infringement.
                        </p>
                        <p>
                            In no event shall AutoDrive be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Services.
                        </p>
                    </section>

                    <section id="contact" className="terms-section">
                        <h2>8. Contact Us</h2>
                        <p>
                            If you have any questions about these Terms, please contact us at:
                        </p>
                        <ul>
                            <li>Email: support@autodrive.com</li>
                            <li>Phone: +1 (555) 123-4567</li>
                            <li>Address: 123 Auto Drive Lane, Motor City, CA 90210</li>
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

export default TermsOfService;
