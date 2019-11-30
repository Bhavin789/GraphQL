import { graphql, buildSchema } from "graphql";
import express from "express";
import graphqlHTTP from "express-graphql";

var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

var root = {
  hello: () => {
    return "Its a GraphQL tutorial";
  }
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
