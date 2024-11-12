const Employee = require('../models/employee');

const employees = [
  new Employee(1, 'John Doe', 25, 'A', ['Math', 'Science'], 95.5),
  new Employee(2, 'Jane Smith', 27, 'B', ['English', 'History'], 92.3)
];

const employeeResolvers = {
  employees: ({ name, class: class_, sortBy = 'name', page = 1, limit = 10 }, context) => {
    if (!context.isAuth) {
      throw new Error('Not authenticated');
    }

    let filteredEmployees = employees;

    if (name) {
      filteredEmployees = filteredEmployees.filter(e => e.name.toLowerCase().includes(name.toLowerCase()));
    }

    if (class_) {
      filteredEmployees = filteredEmployees.filter(e => e.class === class_);
    }

    filteredEmployees.sort((a, b) => a[sortBy] > b[sortBy] ? 1 : -1);

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    return filteredEmployees.slice(startIndex, endIndex);
  },

  employee: ({ id }, context) => {
    if (!context.isAuth) {
      throw new Error('Not authenticated');
    }
    return employees.find(e => e.id === parseInt(id));
  },

  addEmployee: ({ name, age, class: class_, subjects, attendance }, context) => {
    if (!context.isAuth || context.user.role !== 'admin') {
      throw new Error('Not authorized');
    }

    const newEmployee = new Employee(
      employees.length + 1,
      name,
      age,
      class_,
      subjects,
      attendance
    );
    employees.push(newEmployee);
    return newEmployee;
  },

  updateEmployee: ({ id, name, age, class: class_, subjects, attendance }, context) => {
    if (!context.isAuth || context.user.role !== 'admin') {
      throw new Error('Not authorized');
    }

    const employee = employees.find(e => e.id === parseInt(id));
    if (employee) {
      employee.name = name || employee.name;
      employee.age = age || employee.age;
      employee.class = class_ || employee.class;
      employee.subjects = subjects || employee.subjects;
      employee.attendance = attendance || employee.attendance;
    }
    return employee;
  }
};

module.exports = employeeResolvers;