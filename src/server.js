import {
  graphql,
  buildSchema,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema
} from "graphql";
import express from "express";
import graphqlHTTP from "express-graphql";
import Mongoose from "mongoose";

Mongoose.connect("mongodb://localhost/graphqltutorial-user");

const PersonModel = Mongoose.model("user", {
  id: Number,
  name: String,
  age: Number,
  gender: String
});

var schema = buildSchema(`
  type Query {
    user(id: Int!): Person
    users(gender: String): [Person]
  },
  type Mutation{
    updateUser(id: Int!, age: Int!, name: String!): Person
  }
  type Person {
    id: Int
    name: String
    gender: String
    age: Int
  }
`);

/**
 * Query Resolver functions
 */

const getUser = args => {
  return PersonModel.find().exec();
};

const getUsers = args => {
  return PersonModel.find().exec();
};

/**
 * Mutation Resolver function
 */

const updateUser = ({ id, age, name, gender = "F" }) => {
  var person = new PersonModel({ id, age, name, gender });
  return person.save();
};

var root = {
  user: getUser,
  users: getUsers,
  updateUser: updateUser
};

var app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
  })
);

app.listen(3000);
console.log("Running a GraphQL API server at http://localhost:3000/graphql");
