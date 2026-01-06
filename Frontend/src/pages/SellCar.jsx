import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUpload, FiCheckCircle } from 'react-icons/fi';

const SellCar = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        brand: '',
        model: '',
        year: '',
        variant: '',
        kilometers: '',
        owner: '',
        fuelType: '',
        transmission: '',
        expectedPrice: '',
        name: '',
        phone: '',
        email: '',
        city: '',
        images: [] // Placeholder for file inputs
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate API call
        console.log('Submitting Sell Car Form:', formData);
        setStep(3); // Success step
    };

    return (
        <div className="sell-car-page">
            <div className="sell-car-hero">
                <h1>Sell Your Car</h1>
                <p>Get the best price for your luxury vehicle. Simple, transparent, and fast.</p>
            </div>

            <div className="sell-car-container">
                {step === 1 && (
                    <div className="sell-car-form-card fade-in">
                        <div className="form-step-indicator">Step 1 of 2: Car Details</div>
                        <h2>Tell us about your car</h2>
                        <form onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
                            <div className="form-grid">
                                <div className="input-group">
                                    <label>Brand</label>
                                    <select name="brand" value={formData.brand} onChange={handleChange} required>
                                        <option value="">Select Brand</option>
                                        <option value="BMW">BMW</option>
                                        <option value="Mercedes">Mercedes-Benz</option>
                                        <option value="Audi">Audi</option>
                                        <option value="Jaguar">Jaguar</option>
                                        <option value="Land Rover">Land Rover</option>
                                        <option value="Porsche">Porsche</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div className="input-group">
                                    <label>Model</label>
                                    <input type="text" name="model" value={formData.model} onChange={handleChange} placeholder="e.g. 3 Series" required />
                                </div>
                                <div className="input-group">
                                    <label>Registration Year</label>
                                    <input type="number" name="year" value={formData.year} onChange={handleChange} placeholder="e.g. 2018" required />
                                </div>
                                <div className="input-group">
                                    <label>Variant</label>
                                    <input type="text" name="variant" value={formData.variant} onChange={handleChange} placeholder="e.g. 320d Luxury Line" />
                                </div>
                                <div className="input-group">
                                    <label>Kilometers Driven</label>
                                    <input type="number" name="kilometers" value={formData.kilometers} onChange={handleChange} placeholder="e.g. 45000" required />
                                </div>
                                <div className="input-group">
                                    <label>No. of Owners</label>
                                    <select name="owner" value={formData.owner} onChange={handleChange} required>
                                        <option value="">Select Owner</option>
                                        <option value="1">1st Owner</option>
                                        <option value="2">2nd Owner</option>
                                        <option value="3">3rd Owner</option>
                                        <option value="4+">4th Owner or more</option>
                                    </select>
                                </div>
                                <div className="input-group">
                                    <label>Fuel Type</label>
                                    <select name="fuelType" value={formData.fuelType} onChange={handleChange} required>
                                        <option value="">Select Fuel</option>
                                        <option value="Petrol">Petrol</option>
                                        <option value="Diesel">Diesel</option>
                                        <option value="Hybrid">Hybrid</option>
                                        <option value="Electric">Electric</option>
                                    </select>
                                </div>
                                <div className="input-group">
                                    <label>Transmission</label>
                                    <select name="transmission" value={formData.transmission} onChange={handleChange} required>
                                        <option value="">Select Transmission</option>
                                        <option value="Automatic">Automatic</option>
                                        <option value="Manual">Manual</option>
                                    </select>
                                </div>
                            </div>
                            <button type="submit" className="btn-next-step">Next: Your Details</button>
                        </form>
                    </div>
                )}

                {step === 2 && (
                    <div className="sell-car-form-card fade-in">
                        <div className="form-step-indicator">Step 2 of 2: Contact Info</div>
                        <h2>Your Contact Information</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-grid">
                                <div className="input-group">
                                    <label>Expected Price (₹)</label>
                                    <input type="number" name="expectedPrice" value={formData.expectedPrice} onChange={handleChange} placeholder="e.g. 2500000" required />
                                </div>
                                <div className="input-group">
                                    <label>City</label>
                                    <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="Your City" required />
                                </div>
                                <div className="input-group">
                                    <label>Your Name</label>
                                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" required />
                                </div>
                                <div className="input-group">
                                    <label>Phone Number</label>
                                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Mobile Number" required />
                                </div>
                                <div className="input-group full-width">
                                    <label>Email Address</label>
                                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="email@example.com" required />
                                </div>
                                <div className="input-group full-width upload-group">
                                    <label className="upload-label">
                                        <FiUpload /> Upload Car Images (Option)
                                        <input type="file" multiple accept="image/*" style={{ display: 'none' }} />
                                    </label>
                                </div>
                            </div>
                            <div className="form-actions">
                                <button type="button" className="btn-back" onClick={() => setStep(1)}>Back</button>
                                <button type="submit" className="btn-submit-sell">Submit Inquiry</button>
                            </div>
                        </form>
                    </div>
                )}

                {step === 3 && (
                    <div className="sell-car-success fade-in">
                        <FiCheckCircle className="success-icon" />
                        <h2>Details Submitted Successfully!</h2>
                        <p>Thank you for choosing AutoDrive. Our valuation experts will contact you shortly with the best quote for your car.</p>
                        <button className="btn-home" onClick={() => navigate('/')}>Return to Home</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SellCar;
