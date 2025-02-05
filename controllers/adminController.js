const User = require("../models/User");
const Resource = require('../models/Resources');
const getUserData = async () => {
    try {
      const users = await User.findAll();
      return users;
    } catch (error) {
      console.error('Error retrieving user data:', error);
      throw error;
    }
  };
  
  const getResourceData = async () => {
    try {
      const resources = await Resource.findAll();
      return resources;
    } catch (error) {
      console.error('Error retrieving resource data:', error);
      throw error;
    }
  };

  module.exports = {
    getUserData , getResourceData
  };
  
