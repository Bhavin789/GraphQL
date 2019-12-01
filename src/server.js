import { graphql, buildSchema } from "graphql";
import express from "express";
import graphqlHTTP from "express-graphql";

var schema = buildSchema(`
  type Query {
    user(id: Int!): Person
    users(gender: String): [Person] 
  },
  type Person {
    id: Int
    name: String
    gender: String
    age: Int
  }
`);

const users = [
  {
    id: 1,
    name: "Brian",
    age: "21",
    gender: "M"
  },
  {
    id: 2,
    name: "Kim",
    age: "22",
    gender: "M"
  },
  {
    id: 3,
    name: "Joseph",
    age: "23",
    gender: "M"
  },
  {
    id: 3,
    name: "Faith",
    age: "23",
    gender: "F"
  },
  {
    id: 5,
    name: "Joy",
    age: "25",
    gender: "F"
  }
];

const getUser = args => {
  const userId = args.id;
  return users.filter(user => user.id === userId)[0];
};
const getUsers = args => {
  if (args.gender) {
    const gender = args.gender;
    return users.filter(user => user.gender === gender);
  } else {
    return users;
  }
};

var root = {
  user: getUser,
  users: getUsers
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
console.log("Running a GraphQL API server at http://localhost:4000/graphql");
