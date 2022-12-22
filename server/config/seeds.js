const db = require('./connection');
const { User, Location } = require('../models');

const seedData = async () => {
  // Clear any existing data
  await User.deleteMany({});
  await Location.deleteMany({});

  // Create test users
  const user1 = new User({
    name: 'John Smith',
    email: 'john@example.com',
    password: 'password',
  });
  const user2 = new User({
    name: 'Jane Doe',
    email: 'jane@example.com',
    password: 'password',
  });
  await user1.save();
  await user2.save();

  // Create test locations
  const location1 = new Location({
    name: 'Rocky Mountain National Park',
    type: 'Outdoor',
    location: 'Estes Park, CO',
  });
  const location2 = new Location({
    name: 'Boulder Rock Club',
    type: 'Indoor',
    location: 'Boulder, CO',
  });
  await location1.save();
  await location2.save();

  // Add locations to users' favorites
  user1.favorites.push(location1);
  user1.favorites.push(location2);
  user2.favorites.push(location1);
  await user1.save();
  await user2.save();
};

db.once('open', () => {
  console.log('Connected to MongoDB');
  seedData();
});
