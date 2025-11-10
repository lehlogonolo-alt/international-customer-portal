const mongoose = require('mongoose');
const Employee = require('../models/Employee');
const generateSeed = require('./employeeSeed');
require('dotenv').config();

async function seedEmployees() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    const employees = await generateSeed();
    console.log(`📦 Generated ${employees.length} employee records`);

    const deleted = await Employee.deleteMany({});
    console.log(`🧹 Deleted ${deleted.deletedCount} existing employees`);

    const inserted = await Employee.insertMany(employees);
    console.log(`✅ Inserted ${inserted.length} new employees`);

    console.log('🎉 Seeding complete');
  } catch (err) {
    console.error('❌ Seeding failed:', err.message);
  } finally {
    mongoose.connection.close();
  }
}

seedEmployees();

