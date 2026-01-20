const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

async function cleanDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    
    // Get all collections
    const collections = await mongoose.connection.db.collections();
    
    for (let collection of collections) {
      await collection.deleteMany({});
      console.log(`🗑️  Cleared collection: ${collection.collectionName}`);
    }
    
    console.log('✅ Database cleared successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error clearing database:', error);
    process.exit(1);
  }
}

cleanDatabase();