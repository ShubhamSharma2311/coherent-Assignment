const calculateCAGR = (data) => {
  if (data.length === 0) return 0;
  const years = [...new Set(data.map(d => d.year))].sort();
  if (years.length < 2) return 0;
  const startYear = years[0];
  const endYear = years[years.length - 1];
  const startValue = data.filter(d => d.year === startYear).reduce((sum, d) => sum + d.marketSize, 0);
  const endValue = data.filter(d => d.year === endYear).reduce((sum, d) => sum + d.marketSize, 0);
  if (startValue === 0) return 0;
  const n = endYear - startYear;
  const cagr = (Math.pow(endValue / startValue, 1 / n) - 1) * 100;
  return Math.round(cagr * 100) / 100;
};

const calculateTotalMarketSize = (data) => {
  return data.reduce((sum, d) => sum + d.marketSize, 0);
};

const calculateAveragePrice = (data) => {
  if (data.length === 0) return 0;
  const avg = data.reduce((sum, d) => sum + d.price, 0) / data.length;
  return Math.round(avg * 100) / 100;
};

const calculateTotalDoses = (data) => {
  return data.reduce((sum, d) => sum + d.dosesDistributed, 0);
};

const calculateAverageEfficacy = (data) => {
  if (data.length === 0) return 0;
  const avg = data.reduce((sum, d) => sum + d.efficacy, 0) / data.length;
  return Math.round(avg * 100) / 100;
};

module.exports = {
  calculateCAGR,
  calculateTotalMarketSize,
  calculateAveragePrice,
  calculateTotalDoses,
  calculateAverageEfficacy
};
