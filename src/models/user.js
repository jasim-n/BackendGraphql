const bcrypt = require('bcryptjs');

class User {
  constructor(id, username, password, role) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.role = role;
  }
}

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

const initializeUsers = async () => {
  const adminPassword = await hashPassword('admin123');
  const employeePassword = await hashPassword('employee123');

  return [
    new User(1, 'admin', adminPassword, 'admin'),
    new User(2, 'employee', employeePassword, 'employee')
  ];
};

const getUsers = async () => {
  return await initializeUsers();
};

module.exports = { User, getUsers };