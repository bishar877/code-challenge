// Solution

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter Basic Salary: ', (basicSalaryInput) => {
    rl.question('Enter Benefits: ', (benefitsInput) => {
        const basicSalary = parseFloat(basicSalaryInput);
        const benefits = parseFloat(benefitsInput);

        if (!isNaN(basicSalary) && !isNaN(benefits)) {
            calculateNetSalary(basicSalary, benefits);
        } else {
            console.log("Please enter valid numerical values for Basic Salary and Benefits.");
        }

        rl.close();
    });
});

function calculateNetSalary(basicSalary, benefits) {
    const payeRates = [
        { lowerLimit: 0, upperLimit: 24000, rate: 0.1 },
        { lowerLimit: 24001, upperLimit: 32333, rate: 0.25 },
        { lowerLimit: 32334, upperLimit: 500000, rate: 0.3 },
        { lowerLimit: 500001, upperLimit: 800000, rate: 0.325 },
        { lowerLimit: 800001, upperLimit: Infinity, rate: 0.35 }
    ];

    const personalRelief = 2400;
    const insuranceRelief = 5000;
    const pensionContributionLimit = 20000;
    const affordableHousingRelief = 9000;

    // NHIF rates
    const nhifRates = [
        { lowerLimit: 0, upperLimit: 5999, deduction: 150 },
        { lowerLimit: 6000, upperLimit: 7999, deduction: 300 },
        { lowerLimit: 8000, upperLimit: 11999, deduction: 400 },
        { lowerLimit: 12000, upperLimit: 14999, deduction: 500 },
        { lowerLimit: 15000, upperLimit: 19999, deduction: 600 },
        { lowerLimit: 20000, upperLimit: 24999, deduction: 750 },
        { lowerLimit: 25000, upperLimit: 29999, deduction: 850 },
        { lowerLimit: 30000, upperLimit: 34999, deduction: 900 },
        { lowerLimit: 35000, upperLimit: 39999, deduction: 950 },
        // Add more rates as needed
    ];

    // NSSF rates
    const nssfTierIRate = 0.06;
    const nssfTierIILimit = 18000;
    const nssfTierIIMaxContribution = 400;

    // Calculate Gross Salary
    const grossSalary = basicSalary + benefits;

    // Calculate PAYE
    let taxableAmount = grossSalary - personalRelief - insuranceRelief - pensionContributionLimit - affordableHousingRelief;
    let paye = 0;

    for (const rate of payeRates) {
        if (taxableAmount > rate.upperLimit) {
            paye += (rate.upperLimit - rate.lowerLimit) * rate.rate;
        } else {
            paye += (taxableAmount - rate.lowerLimit) * rate.rate;
            break;
        }
    }

    // Calculate NHIF Deductions
    let nhifDeduction = 0;
    for (const rate of nhifRates) {
        if (grossSalary >= rate.lowerLimit && grossSalary <= rate.upperLimit) {
            nhifDeduction = rate.deduction;
            break;
        }
    }

    // Calculate NSSF Deductions
    let nssfDeduction = 0;
    if (grossSalary <= nssfTierIILimit) {
        nssfDeduction = grossSalary * nssfTierIRate;
    } else {
        nssfDeduction = nssfTierIILimit * nssfTierIRate + nssfTierIIMaxContribution;
    }

    // Calculate Net Salary
    const netSalary = grossSalary - paye - nhifDeduction - nssfDeduction;

    // Display results
    console.log(`Gross Salary: ${grossSalary}`);
    console.log(`PAYE: ${paye}`);
    console.log(`NHIF Deduction: ${nhifDeduction}`);
    console.log(`NSSF Deduction: ${nssfDeduction}`);
    console.log(`Net Salary: ${netSalary}`);
}
