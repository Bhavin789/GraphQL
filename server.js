import { graphql, buildSchema } from "graphql";

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

graphql(schema, "{ hello }", root).then(response => {
  console.log(response);
});
