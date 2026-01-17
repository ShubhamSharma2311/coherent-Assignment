require('dotenv').config();
const mongoose = require('mongoose');
const Vaccine = require('./models/Vaccine');
const vaccinesData = require('./data/vaccines.json');

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.DATABASE_URL);
    console.log('MongoDB Connected');

    // Clear existing data
    await Vaccine.deleteMany({});
    console.log('Cleared existing vaccine data');

    // Insert new data
    await Vaccine.insertMany(vaccinesData);
    console.log(`Successfully seeded ${vaccinesData.length} vaccine records`);

    // Close connection
    await mongoose.connection.close();
    console.log('Database seeding completed!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
