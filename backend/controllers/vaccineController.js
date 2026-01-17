const Vaccine = require('../models/Vaccine');
const { calculateCAGR, calculateTotalMarketSize, calculateAveragePrice, calculateTotalDoses, calculateAverageEfficacy } = require('../utils/calculations');

const buildFilter = (queryParams) => {
  const filter = {};
  if (queryParams.region && queryParams.region !== 'All') {
    filter.region = queryParams.region;
  }
  if (queryParams.brand && queryParams.brand !== 'All') {
    filter.brand = queryParams.brand;
  }
  if (queryParams.year && queryParams.year !== 'All') {
    filter.year = parseInt(queryParams.year);
  }
  if (queryParams.vaccine && queryParams.vaccine !== 'All') {
    filter.vaccine = queryParams.vaccine;
  }
  return filter;
};

const getVaccines = async (req, res) => {
  try {
    const filter = buildFilter(req.query);
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const sortBy = req.query.sortBy || 'id';
    const sortOrder = req.query.sortOrder === 'desc' ? -1 : 1;
    
    const skip = (page - 1) * limit;
    const sortObj = { [sortBy]: sortOrder };
    
    const [data, totalItems] = await Promise.all([
      Vaccine.find(filter)
        .sort(sortObj)
        .skip(skip)
        .limit(limit)
        .lean(),
      Vaccine.countDocuments(filter)
    ]);
    
    res.json({
      data,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalItems / limit),
        totalItems,
        itemsPerPage: limit
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSummary = async (req, res) => {
  try {
    const filter = buildFilter(req.query);
    const data = await Vaccine.find(filter).lean();
    
    const summary = {
      cagr: calculateCAGR(data),
      totalMarketSize: calculateTotalMarketSize(data),
      averagePrice: calculateAveragePrice(data),
      totalDoses: calculateTotalDoses(data),
      averageEfficacy: calculateAverageEfficacy(data),
      totalRecords: data.length
    };
    
    res.json(summary);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getFilters = async (req, res) => {
  try {
    const [regions, brands, years, vaccineTypes] = await Promise.all([
      Vaccine.distinct('region'),
      Vaccine.distinct('brand'),
      Vaccine.distinct('year'),
      Vaccine.distinct('vaccine')
    ]);
    
    res.json({
      regions: ['All', ...regions.sort()],
      brands: ['All', ...brands.sort()],
      years: ['All', ...years.sort()],
      vaccineTypes: ['All', ...vaccineTypes.sort()]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getChartData = async (req, res) => {
  try {
    const filter = buildFilter(req.query);
    const data = await Vaccine.find(filter).lean();
    
    const marketByRegion = {};
    const marketByYear = {};
    const marketByBrand = {};
    const dosesByRegion = {};
    const efficacyByBrand = {};
    const priceByVaccine = {};
    
    data.forEach(d => {
      marketByRegion[d.region] = (marketByRegion[d.region] || 0) + d.marketSize;
      marketByYear[d.year] = (marketByYear[d.year] || 0) + d.marketSize;
      marketByBrand[d.brand] = (marketByBrand[d.brand] || 0) + d.marketSize;
      dosesByRegion[d.region] = (dosesByRegion[d.region] || 0) + d.dosesDistributed;
      
      if (!efficacyByBrand[d.brand]) {
        efficacyByBrand[d.brand] = { total: 0, count: 0 };
      }
      efficacyByBrand[d.brand].total += d.efficacy;
      efficacyByBrand[d.brand].count += 1;
      
      if (!priceByVaccine[d.vaccine]) {
        priceByVaccine[d.vaccine] = { total: 0, count: 0 };
      }
      priceByVaccine[d.vaccine].total += d.price;
      priceByVaccine[d.vaccine].count += 1;
    });
    
    const avgEfficacyByBrand = {};
    Object.keys(efficacyByBrand).forEach(brand => {
      avgEfficacyByBrand[brand] = Math.round(efficacyByBrand[brand].total / efficacyByBrand[brand].count);
    });
    
    const avgPriceByVaccine = {};
    Object.keys(priceByVaccine).forEach(vaccine => {
      avgPriceByVaccine[vaccine] = Math.round(priceByVaccine[vaccine].total / priceByVaccine[vaccine].count * 100) / 100;
    });
    
    res.json({
      marketByRegion: Object.entries(marketByRegion).map(([name, value]) => ({ name, value })),
      marketByYear: Object.entries(marketByYear).map(([name, value]) => ({ name: parseInt(name), value })).sort((a, b) => a.name - b.name),
      marketByBrand: Object.entries(marketByBrand).map(([name, value]) => ({ name, value })),
      dosesByRegion: Object.entries(dosesByRegion).map(([name, value]) => ({ name, value })),
      efficacyByBrand: Object.entries(avgEfficacyByBrand).map(([name, value]) => ({ name, value })),
      priceByVaccine: Object.entries(avgPriceByVaccine).map(([name, value]) => ({ name, value }))
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Bonus: GenAI Insights Feature
const getInsights = async (req, res) => {
  try {
    const filter = buildFilter(req.query);
    const data = await Vaccine.find(filter).lean();
    
    if (data.length === 0) {
      return res.json({ insights: [] });
    }
    
    const insights = [];
    
    // Market Leader Insight
    const brandMarketShare = {};
    data.forEach(d => {
      brandMarketShare[d.brand] = (brandMarketShare[d.brand] || 0) + d.marketSize;
    });
    const topBrand = Object.entries(brandMarketShare).sort((a, b) => b[1] - a[1])[0];
    insights.push({
      type: 'market_leader',
      title: 'Market Leader',
      description: `${topBrand[0]} leads with $${topBrand[1].toFixed(0)}M market size (${(topBrand[1] / calculateTotalMarketSize(data) * 100).toFixed(1)}% share)`,
      icon: 'LEADER'
    });
    
    // Growth Trend Insight
    const cagr = calculateCAGR(data);
    if (cagr > 0) {
      insights.push({
        type: 'growth',
        title: 'Growth Trajectory',
        description: `Market showing ${cagr > 20 ? 'strong' : 'steady'} growth at ${cagr}% CAGR`,
        icon: 'GROWTH'
      });
    }
    
    // Efficacy Insight
    const avgEfficacy = calculateAverageEfficacy(data);
    const highEfficacyCount = data.filter(d => d.efficacy >= 90).length;
    insights.push({
      type: 'efficacy',
      title: 'Efficacy Performance',
      description: `Average efficacy at ${avgEfficacy}%. ${highEfficacyCount} vaccines show 90%+ efficacy`,
      icon: 'EFFICACY'
    });
    
    // Price Analysis
    const avgPrice = calculateAveragePrice(data);
    const priceRange = { 
      min: Math.min(...data.map(d => d.price)), 
      max: Math.max(...data.map(d => d.price)) 
    };
    insights.push({
      type: 'pricing',
      title: 'Price Analysis',
      description: `Average price $${avgPrice}, ranging from $${priceRange.min} to $${priceRange.max}`,
      icon: 'PRICE'
    });
    
    // Regional Distribution
    const regionCount = [...new Set(data.map(d => d.region))].length;
    const topRegion = Object.entries(
      data.reduce((acc, d) => {
        acc[d.region] = (acc[d.region] || 0) + d.dosesDistributed;
        return acc;
      }, {})
    ).sort((a, b) => b[1] - a[1])[0];
    
    insights.push({
      type: 'distribution',
      title: 'Global Reach',
      description: `Operating in ${regionCount} regions. ${topRegion[0]} leads in distribution with ${(topRegion[1] / 1000000).toFixed(0)}M doses`,
      icon: 'GLOBAL'
    });
    
    res.json({ insights });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getVaccines, getSummary, getFilters, getChartData, getInsights };
