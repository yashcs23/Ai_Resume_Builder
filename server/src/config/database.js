const mongoose = require('mongoose');

const connectDatabase = async () => {
  const { MONGO_URI } = process.env;

  if (!MONGO_URI) {
    console.warn('⚠️  MONGO_URI is not defined - running without database');
    return;
  }

  try {
    mongoose.set('strictQuery', true);

    await mongoose.connect(MONGO_URI, {
      autoIndex: true,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });

    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.warn('⚠️  MongoDB connection warning:', error.message);
    console.warn('⚠️  Server will run without database functionality');
  }
};

module.exports = connectDatabase;
