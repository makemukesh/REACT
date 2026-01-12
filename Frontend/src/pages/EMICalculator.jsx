import React, { useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const EMICalculator = () => {
    const [loanAmount, setLoanAmount] = useState(1000000);
    const [interestRate, setInterestRate] = useState(8.5);
    const [loanTenure, setLoanTenure] = useState(5);

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
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-700 text-white py-20 px-6 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">EMI Calculator</h1>
                <p className="text-lg text-white/80 max-w-2xl mx-auto">
                    Plan your luxury car purchase with our easy-to-use loan calculator.
                </p>
            </div>

            {/* Calculator */}
            <div className="max-w-4xl mx-auto py-12 px-6">
                <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Inputs */}
                        <div className="space-y-8">
                            <div>
                                <label className="flex justify-between text-sm font-medium text-gray-700 mb-3">
                                    <span>Loan Amount</span>
                                    <span className="text-[#ff3d00] font-bold">₹ {loanAmount.toLocaleString()}</span>
                                </label>
                                <input
                                    type="range"
                                    min="100000"
                                    max="10000000"
                                    step="10000"
                                    value={loanAmount}
                                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#ff3d00]"
                                />
                                <div className="flex justify-between text-xs text-gray-400 mt-1">
                                    <span>₹1 Lakh</span>
                                    <span>₹1 Crore</span>
                                </div>
                            </div>

                            <div>
                                <label className="flex justify-between text-sm font-medium text-gray-700 mb-3">
                                    <span>Interest Rate</span>
                                    <span className="text-[#ff3d00] font-bold">{interestRate}%</span>
                                </label>
                                <input
                                    type="range"
                                    min="5"
                                    max="20"
                                    step="0.1"
                                    value={interestRate}
                                    onChange={(e) => setInterestRate(Number(e.target.value))}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#ff3d00]"
                                />
                                <div className="flex justify-between text-xs text-gray-400 mt-1">
                                    <span>5%</span>
                                    <span>20%</span>
                                </div>
                            </div>

                            <div>
                                <label className="flex justify-between text-sm font-medium text-gray-700 mb-3">
                                    <span>Loan Tenure</span>
                                    <span className="text-[#ff3d00] font-bold">{loanTenure} Years</span>
                                </label>
                                <input
                                    type="range"
                                    min="1"
                                    max="7"
                                    step="1"
                                    value={loanTenure}
                                    onChange={(e) => setLoanTenure(Number(e.target.value))}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#ff3d00]"
                                />
                                <div className="flex justify-between text-xs text-gray-400 mt-1">
                                    <span>1 Year</span>
                                    <span>7 Years</span>
                                </div>
                            </div>
                        </div>

                        {/* Results */}
                        <div>
                            <div className="relative mb-8">
                                <Doughnut data={chartData} options={chartOptions} />
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-sm text-gray-500">Monthly EMI</span>
                                    <span className="text-2xl font-bold text-slate-800">₹ {emi.toLocaleString()}</span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between py-3 border-b border-gray-100">
                                    <span className="text-gray-600">Principal Amount</span>
                                    <span className="font-semibold text-slate-800">₹ {loanAmount.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between py-3 border-b border-gray-100">
                                    <span className="text-gray-600">Total Interest</span>
                                    <span className="font-semibold text-[#ff3d00]">₹ {totalInterest.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between py-3 bg-slate-50 rounded-xl px-4">
                                    <span className="text-gray-700 font-medium">Total Payable</span>
                                    <span className="font-bold text-lg text-slate-800">₹ {totalPayment.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EMICalculator;
