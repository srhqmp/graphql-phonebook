const typeDefs = `
  type User {
    username: String!
    friends: [Person!]!
    id: ID!
  }

  type Token {
    value: String!
  }

  enum YesNo {
    YES
    NO
  }
  
  type Address {
    street: String!
    city: String!
  }

  type Person {
    name: String!
    phone: String
    address: Address!
    friendOf: [User!]!
    id: ID!
  }
  
  type Query {
    personCount: Int!
    allPersons(phone: YesNo): [Person!]!
    findPerson(name: String!): Person
    friendOf: [User!]!
    me: User
  }

  type Mutation {
    createUser(
      username: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
    addPerson(
      name: String!
      phone: String
      street: String!
      city: String!
    ): Person
    addAsFriend(
      name: String!
    ): User
    editNumber(
      name: String!
      phone: String!
    ): Person
  }

  type Subscription {
    personAdded: Person!
  }
`;

module.exports = typeDefs;
