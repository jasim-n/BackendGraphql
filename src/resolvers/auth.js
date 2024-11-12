const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getUsers } = require('../models/user');
const { JWT_SECRET } = require('../config/auth');

const authResolvers = {
  login: async ({ username, password }) => {
    const users = await getUsers();
    const user = users.find(u => u.username === username);
    
    if (!user) {
      throw new Error('User not found');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    
    if (!isValidPassword) {
      throw new Error('Invalid password');
    }

    const token = jwt.sign(
      { 
        userId: user.id, 
        username: user.username, 
        role: user.role 
      },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    return {
      token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role
      }
    };
  }
};

module.exports = authResolvers;