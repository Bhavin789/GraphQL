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

Mongoose.connect("mongodb://localhost/graphqltutorial");

const PersonModel = Mongoose.model("person", {
  firstName: String,
  lastName: String
});

const PersonType = new GraphQLObjectType({
  name: "Person",
  fields: {
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString }
  }
});

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: {
      people: {
        type: GraphQLList(PersonType),
        resolve: (root, args, context, info) => {
          return PersonModel.find().exec();
        }
      },
      person: {
        type: PersonType,
        resolve: (root, args, context, info) => {
          return PersonType.findById(args.id).exec();
        }
      }
    }
  }),
  mutation: new GraphQLObjectType({
    name: "Mutation",
    fields: {
      person: {
        type: PersonType,
        args: {
          firstname: { type: GraphQLNonNull(GraphQLString) },
          lastname: { type: GraphQLNonNull(GraphQLString) }
        },
        resolve: (root, args, context, info) => {
          var person = new PersonModel(args);
          return person.save();
        }
      }
    }
  })
});

// var schema = buildSchema(`
//   type Query {
//     user(id: Int!): Person
//     users(gender: String): [Person]
//   },
//   type Mutation{
//     updateUser(id: Int!, age: Int!): Person
//   }
//   type Person {
//     id: Int
//     name: String
//     gender: String
//     age: Int
//   }
// `);

// const users = [
//   {
//     id: 1,
//     name: "Brian",
//     age: "21",
//     gender: "M"
//   },
//   {
//     id: 2,
//     name: "Kim",
//     age: "22",
//     gender: "M"
//   },
//   {
//     id: 3,
//     name: "Joseph",
//     age: "23",
//     gender: "M"
//   },
//   {
//     id: 3,
//     name: "Faith",
//     age: "23",
//     gender: "F"
//   },
//   {
//     id: 5,
//     name: "Joy",
//     age: "25",
//     gender: "F"
//   }
// ];

// /**
//  * Query Resolver functions
//  */

// const getUser = args => {
//   const userId = args.id;
//   return users.filter(user => user.id === userId)[0];
// };
// const getUsers = args => {
//   if (args.gender) {
//     const gender = args.gender;
//     return users.filter(user => user.gender === gender);
//   } else {
//     return users;
//   }
// };

// /**
//  * Mutation Resolver function
//  */

// const updateUser = ({ id, age }) => {
//   users.map(user => {
//     if (user.id === id) {
//       user.age = age;
//     }
//   });

//   return users.filter(user => user.id === id)[0];
// };

// var root = {
//   user: getUser,
//   users: getUsers,
//   updateUser: updateUser
// };

var app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true
  })
);

app.listen(3000);
console.log("Running a GraphQL API server at http://localhost:4000/graphql");
