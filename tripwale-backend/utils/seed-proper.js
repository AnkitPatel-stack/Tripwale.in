const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    
    // Clear existing data
    const collections = await mongoose.connection.db.collections();
    for (let collection of collections) {
      await collection.deleteMany({});
    }
    console.log('🗑️  Cleared all collections');
    
    // Import models
    const User = require('./models/User');
    const Category = require('./models/Category');
    const Trip = require('./models/Trip');
    
    // Create Admin User
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('Admin@123', salt);
    
    const admin = await User.create({
      name: 'Admin',
      email: 'admin@tripwale.in',
      password: hashedPassword,
      phone: '6266203629',
      role: 'admin'
    });
    console.log('👑 Admin user created:', admin.email);
    
    // Create regular user
    const user = await User.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      phone: '9876543210',
      role: 'user'
    });
    console.log('👤 Regular user created:', user.email);
    
    // Create Categories
    const categories = [
      {
        name: 'Domestic Tours',
        description: 'Explore beautiful destinations across India',
        icon: 'location_city',
        order: 1
      },
      {
        name: 'International Tours',
        description: 'Discover amazing destinations around the world',
        icon: 'flight',
        order: 2
      },
      {
        name: 'Religious Yatra',
        description: 'Spiritual journeys to sacred places',
        icon: 'temple_hindu',
        order: 3
      },
      {
        name: 'Corporate Trips',
        description: 'Team building and corporate retreats',
        icon: 'business',
        order: 4
      },
      {
        name: 'Student Tours',
        description: 'Educational and fun trips for students',
        icon: 'school',
        order: 5
      },
      {
        name: 'Weekend Getaways',
        description: 'Quick escapes for weekend relaxation',
        icon: 'weekend',
        order: 6
      },
      {
        name: 'One-Day Tours',
        description: 'Perfect day trips for busy schedules',
        icon: 'today',
        order: 7
      }
    ];
    
    const createdCategories = await Category.insertMany(categories);
    console.log('🏷️  Categories created:', createdCategories.length);
    
    // Create Sample Trips (without complex itinerary to avoid validation issues)
    const trips = [
      {
        title: 'Kashmir Paradise Tour',
        description: 'Experience the beauty of Kashmir with houseboat stays and shikara rides',
        shortDescription: '7 days in the paradise of India',
        category: createdCategories[0]._id,
        type: 'domestic',
        duration: { days: 7, nights: 6 },
        price: { perPerson: 25000, childDiscount: 2000, seniorDiscount: 1500 },
        destinations: ['Srinagar', 'Gulmarg', 'Pahalgam', 'Sonamarg'],
        inclusions: ['Accommodation', 'Meals', 'Transport', 'Guide'],
        exclusions: ['Airfare', 'Personal Expenses'],
        startDate: new Date('2024-03-15'),
        endDate: new Date('2024-03-21'),
        maxPeople: 15,
        availableSeats: 15,
        isFeatured: true,
        isActive: true
      },
      {
        title: 'Dubai Luxury Tour',
        description: 'Experience the luxury and excitement of Dubai',
        shortDescription: '5 days in the city of gold',
        category: createdCategories[1]._id,
        type: 'international',
        duration: { days: 5, nights: 4 },
        price: { perPerson: 45000, childDiscount: 3000, seniorDiscount: 2500 },
        destinations: ['Dubai', 'Abu Dhabi'],
        inclusions: ['5-star Hotel', 'Breakfast', 'City Tours', 'Desert Safari'],
        exclusions: ['Visa', 'International Flight'],
        startDate: new Date('2024-04-10'),
        endDate: new Date('2024-04-14'),
        maxPeople: 20,
        availableSeats: 20,
        isFeatured: true,
        isActive: true
      }
    ];
    
    const createdTrips = await Trip.insertMany(trips);
    console.log('✈️  Sample trips created:', createdTrips.length);
    
    console.log('\n✅ Database seeded successfully!');
    console.log('\n📋 Summary:');
    console.log(`- Admin: ${admin.email} (password: Admin@123)`);
    console.log(`- User: ${user.email} (password: password123)`);
    console.log(`- Categories: ${createdCategories.length}`);
    console.log(`- Trips: ${createdTrips.length}`);
    
    console.log('\n🔑 Test Credentials:');
    console.log('Admin Login:');
    console.log('  Email: admin@tripwale.in');
    console.log('  Password: Admin@123');
    console.log('\nUser Login:');
    console.log('  Email: john@example.com');
    console.log('  Password: password123');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    console.error('Full error:', error);
    process.exit(1);
  }
}

seedDatabase();