const employeeResolvers = require('./employee');
const authResolvers = require('./auth');

module.exports = {
  ...employeeResolvers,
  ...authResolvers
};