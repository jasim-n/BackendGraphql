const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type User {
    id: ID!
    username: String!
    role: String!
  }

  type AuthData {
    token: String!
    user: User!
  }

  type Employee {
    id: ID!
    name: String!
    age: Int!
    class: String!
    subjects: [String]!
    attendance: Float!
  }

  type Query {
    employees(name: String, class: String, sortBy: String, page: Int, limit: Int): [Employee]
    employee(id: ID!): Employee
  }

  type Mutation {
    login(username: String!, password: String!): AuthData
    addEmployee(name: String!, age: Int!, class: String!, subjects: [String]!, attendance: Float!): Employee
    updateEmployee(id: ID!, name: String, age: Int, class: String, subjects: [String], attendance: Float): Employee
  }
`);

module.exports = schema;