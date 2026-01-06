import React, { useState } from 'react';
import { Doughnut } from 'react-chartjs-2'; // Assuming chart.js might be used, but let's stick to simple CSS for now or use Chart.js if installed.
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const EMICalculator = () => {
    const [loanAmount, setLoanAmount] = useState(1000000);
    const [interestRate, setInterestRate] = useState(8.5);
    const [loanTenure, setLoanTenure] = useState(5); // in years

    const calculateEMI = () => {
        const principal = loanAmount;
        const rate = interestRate / 12 / 100;
        const time = loanTenure * 12;

        if (principal > 0 && rate > 0 && time > 0) {
            const emi = (principal * rate * Math.pow(1 + rate, time)) / (Math.pow(1 + rate, time) - 1);
            return Math.round(emi);
        }
        return 0;
    };

    const emi = calculateEMI();
    const totalPayment = emi * loanTenure * 12;
    const totalInterest = totalPayment - loanAmount;

    const chartData = {
        labels: ['Principal Amount', 'Total Interest'],
        datasets: [
            {
                data: [loanAmount, totalInterest],
                backgroundColor: ['#1e293b', '#ff3d00'],
                borderWidth: 0,
            },
        ],
    };

    const chartOptions = {
        cutout: '70%',
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    usePointStyle: true,
                    padding: 20,
                    font: {
                        family: "'Poppins', sans-serif",
                        size: 14
                    }
                }
            }
        }
    };

    return (
        <div className="emi-page">
            <div className="emi-hero">
                <h1>EMI Calculator</h1>
                <p>Plan your luxury car purchase with our easy-to-use loan calculator.</p>
            </div>

            <div className="emi-container">
                <div className="emi-card">
                    <div className="calculator-inputs">
                        <div className="input-range-group">
                            <label>Loan Amount: <span>₹ {loanAmount.toLocaleString()}</span></label>
                            <input
                                type="range"
                                min="100000"
                                max="10000000"
                                step="10000"
                                value={loanAmount}
                                onChange={(e) => setLoanAmount(Number(e.target.value))}
                            />
                        </div>

                        <div className="input-range-group">
                            <label>Interest Rate (%): <span>{interestRate}%</span></label>
                            <input
                                type="range"
                                min="5"
                                max="20"
                                step="0.1"
                                value={interestRate}
                                onChange={(e) => setInterestRate(Number(e.target.value))}
                            />
                        </div>

                        <div className="input-range-group">
                            <label>Loan Tenure (Years): <span>{loanTenure} Years</span></label>
                            <input
                                type="range"
                                min="1"
                                max="7"
                                step="1"
                                value={loanTenure}
                                onChange={(e) => setLoanTenure(Number(e.target.value))}
                            />
                        </div>
                    </div>

                    <div className="calculator-results">
                        <div className="chart-wrapper">
                            <Doughnut data={chartData} options={chartOptions} />
                            <div className="center-text">
                                <span>Monthly EMI</span>
                                <h3>₹ {emi.toLocaleString()}</h3>
                            </div>
                        </div>

                        <div className="result-details">
                            <div className="result-row">
                                <span>Principal Amount</span>
                                <strong>₹ {loanAmount.toLocaleString()}</strong>
                            </div>
                            <div className="result-row">
                                <span>Total Interest</span>
                                <strong>₹ {totalInterest.toLocaleString()}</strong>
                            </div>
                            <div className="result-row total">
                                <span>Total Payable</span>
                                <strong>₹ {totalPayment.toLocaleString()}</strong>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EMICalculator;
