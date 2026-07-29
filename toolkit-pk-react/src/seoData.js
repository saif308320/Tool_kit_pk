// Ready-to-use SEO title + description for every page.
// Usage inside each page component:
//
//   import SeoHead from '../components/SeoHead.jsx'
//   import { SEO } from '../seoData.js'
//   ...
//   return (
//     <div className="calc-wrap">
//       <SeoHead {...SEO.bmi} />
//       ...rest of your JSX unchanged...
//
export const SEO = {
  home: {
    path: '/',
    title: 'ToolKitPK — Free Online Calculators & Tools for Pakistan',
    description: 'Free, fast calculators built for Pakistan — Zakat, Loan/EMI, Salary Tax, BMI, Age, Currency, Namaz Timings, and more. No sign-up needed.',
  },
  zakat: {
    path: '/zakat-calculator',
    title: 'Zakat Calculator 2026 — Calculate Zakat on Gold, Cash & Savings | ToolKitPK',
    description: 'Free Zakat calculator for Pakistan. Calculate Zakat on gold, silver, cash, and savings using the current Nisab threshold — instant, accurate, no sign-up.',
  },
  currency: {
    path: '/currency-converter',
    title: 'Currency Converter — PKR & Live Exchange Rates | ToolKitPK',
    description: 'Convert Pakistani Rupee to USD, SAR, AED, GBP, and other major currencies instantly with up-to-date exchange rates.',
  },
  loan: {
    path: '/loan-calculator',
    title: 'Loan / EMI Calculator — Monthly Installment Calculator | ToolKitPK',
    description: 'Calculate your monthly loan installment (EMI), total interest, and repayment schedule instantly for any loan amount and tenure.',
  },
  tax: {
    path: '/salary-tax-calculator',
    title: 'Salary Tax Calculator Pakistan 2026 — Income Tax Estimator | ToolKitPK',
    description: 'Estimate your monthly and annual income tax in Pakistan based on the latest tax slabs. Free salary tax calculator, updated for 2026.',
  },
  bmi: {
    path: '/bmi-calculator',
    title: 'BMI Calculator — Check Your Body Mass Index Free | ToolKitPK',
    description: 'Free BMI calculator for Pakistan. Enter height and weight in metric or imperial units to instantly check your Body Mass Index category.',
  },
  age: {
    path: '/age-calculator',
    title: 'Age Calculator — Find Your Exact Age in Years, Months & Days | ToolKitPK',
    description: 'Calculate your exact age in years, months, and days from your date of birth. Free, instant, and accurate age calculator.',
  },
  percentage: {
    path: '/percentage-calculator',
    title: 'Percentage Calculator — Quick Percentage Calculations | ToolKitPK',
    description: 'Calculate percentages, percentage increase/decrease, and percentage of a number instantly with this free online tool.',
  },
  unitConverter: {
    path: '/unit-converter',
    title: 'Unit Converter — Length, Weight, Volume & Temperature | ToolKitPK',
    description: 'Convert between metric and imperial units for length, weight, volume, and temperature instantly. Free unit converter for everyday use.',
  },
  discount: {
    path: '/discount-calculator',
    title: 'Discount Calculator — Calculate Sale Price & Savings | ToolKitPK',
    description: 'Calculate the final price after a discount, plus how much you save, instantly with this free discount calculator.',
  },
  gpa: {
    path: '/gpa-calculator',
    title: 'GPA Calculator — Calculate Your Grade Point Average | ToolKitPK',
    description: 'Free GPA calculator for students in Pakistan. Add your subjects and grades to instantly calculate your semester or cumulative GPA.',
  },
  namaz: {
    path: '/namaz-timings',
    title: 'Namaz Timings Today — Prayer Times for Pakistan | ToolKitPK',
    description: 'Accurate daily Namaz (prayer) timings for cities across Pakistan — Fajr, Zuhr, Asr, Maghrib, and Isha.',
  },
  islamicDate: {
    path: '/islamic-date-converter',
    title: 'Islamic Date Converter — Hijri to Gregorian Calendar | ToolKitPK',
    description: 'Convert dates between the Islamic Hijri calendar and the Gregorian calendar instantly, free and accurate.',
  },
  compoundInterest: {
    path: '/compound-interest-calculator',
    title: 'Compound Interest Calculator — Investment Growth Estimator | ToolKitPK',
    description: 'Calculate how your savings or investment grows over time with compound interest. Free, instant compound interest calculator.',
  },
  electricityBill: {
    path: '/electricity-bill-calculator',
    title: 'Electricity Bill Calculator Pakistan — Estimate Your Bill | ToolKitPK',
    description: 'Estimate your monthly electricity bill in Pakistan based on units consumed and current per-unit tariff rates.',
  },
  fuelCost: {
    path: '/fuel-cost-calculator',
    title: 'Petrol / Fuel Cost Calculator — Trip Fuel Estimator | ToolKitPK',
    description: 'Calculate the fuel cost for your trip based on distance, fuel efficiency, and current petrol price in Pakistan.',
  },
  wordCounter: {
    path: '/word-counter',
    title: 'Word & Character Counter — Free Online Text Counter | ToolKitPK',
    description: 'Count words, characters, sentences, and paragraphs in your text instantly. Free online word counter tool.',
  },
  passwordGenerator: {
    path: '/password-generator',
    title: 'Strong Password Generator — Free & Secure | ToolKitPK',
    description: 'Generate strong, random, secure passwords instantly with customizable length and character options.',
  },
  calorie: {
    path: '/calorie-calculator',
    title: 'Calorie / BMR Calculator — Daily Calorie Needs | ToolKitPK',
    description: 'Calculate your daily calorie needs (BMR and TDEE) based on age, weight, height, and activity level.',
  },
  pregnancy: {
    path: '/pregnancy-due-date-calculator',
    title: 'Pregnancy Due Date Calculator — Estimate Your Due Date | ToolKitPK',
    description: 'Estimate your pregnancy due date based on your last menstrual period. Free, instant pregnancy due date calculator.',
  },
  dateCountdown: {
    path: '/date-countdown-calculator',
    title: 'Date Countdown Calculator — Days Until Any Date | ToolKitPK',
    description: 'Calculate the number of days, weeks, or months until any future date, or since any past date.',
  },
  about: {
    path: '/about',
    title: 'About ToolKitPK — Free Calculators Built for Pakistan',
    description: 'Learn about ToolKitPK — a free collection of everyday calculators built for people in Pakistan, in both English and Urdu.',
  },
  contact: {
    path: '/contact',
    title: 'Contact ToolKitPK — Questions, Feedback & Support',
    description: 'Get in touch with the ToolKitPK team for questions, suggestions, or to report an issue with any calculator.',
  },
  privacy: {
    path: '/privacy-policy',
    title: 'Privacy Policy | ToolKitPK',
    description: 'Read the ToolKitPK privacy policy — how we handle your data, cookies, and third-party advertising.',
  },
  terms: {
    path: '/terms-of-service',
    title: 'Terms of Service | ToolKitPK',
    description: 'Read the terms of service for using ToolKitPK\u2019s free online calculators and tools.',
  },
}