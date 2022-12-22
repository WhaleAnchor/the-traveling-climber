const { AuthenticationError } = require('apollo-server-express');
const { User, Product, Category, Order } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async (_, __, { req }) => {
      // Check if user is authenticated
      if (!req.user) {
        throw new AuthenticationError('You must be logged in to view users');
      }

      try {
        const users = await User.find();
        return users;
      } catch (err) {
        console.error(err);
      }
    },
    user: async (_, { id }, { req }) => {
      // Check if user is authenticated
      if (!req.user) {
        throw new AuthenticationError('You must be logged in to view a user');
      }

      try {
        const user = await User.findById(id);
        return user;
      } catch (err) {
        console.error(err);
      }
    },
    locations: async (_, __, { req }) => {
      // Check if user is authenticated
      if (!req.user) {
        throw new AuthenticationError('You must be logged in to view locations');
      }

      try {
        const locations = await Location.find();
        return locations;
      } catch (err) {
        console.error(err);
      }
    },
    location: async (_, { id }, { req }) => {
      // Check if user is authenticated
      if (!req.user) {
        throw new AuthenticationError('You must be logged in to view a location');
      }

      try {
        const location = await Location.findById(id);
        return location;
      } catch (err) {
        console.error(err);
      }
    },
  },
  MMutation: {
    addUser: async (_, { name, email }) => {
      try {
        const user = await new User({ name, email }).save();
        // Sign a new JWT for the new user
        const token = signToken({ ...user._doc });
        return { token, user };
      } catch (err) {
        console.error(err);
      }
    },
    addLocation: async (_, { name, type, location }, { req }) => {
      // Check if user is authenticated
      if (!req.user) {
        throw new AuthenticationError('You must be logged in to add a location');
      }

      try {
        const loc = await new Location({ name, type, location }).save();
        return loc;
      } catch (err) {
        console.error(err);
      }
    },
    addFavorite: async (_, { locationId }, { req }) => {
      // Check if user is authenticated
      if (!req.user) {
        throw new AuthenticationError('You must be logged in to add a favorite');
      }

      try {
        const user = await User.findById(req.user._id);
        user.favorites.push(locationId);
        await user.save();
        return user;
      } catch (err) {
        console.error(err);
      }
    },
    removeFavorite: async (_, { locationId }, { req }) => {
      // Check if user is authenticated
      if (!req.user) {
        throw new AuthenticationError('You must be logged in to remove a favorite');
      }

      try {
        const user = await User.findById(req.user._id);
        user.favorites = user.favorites.filter(
          (favorite) => favorite.toString() !== locationId
        );
        await user.save();
        return user;
      } catch (err) {
        console.error(err);
      }
    },
  },
};

module.exports = resolvers;
