const express = require("express");
const app = express();
const expressGraphQL = require("express-graphql");
const { GraphQLSchema } = require("graphql");

//No estaba claro en el ejercicio pero yo asumi que a la hora de eliminar un estudiante tambien se elimine
// su nota correspondiente, porque no tiene sentido tener una nota en el sistema sin un estudiante relacionado.

//Mutation
const RootMutationType = require("./types/RootMutationType.js");

//Root Query
const RootQueryType = require("./types/RootQueryType.js");

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});

app.use(
  "/graphql",
  expressGraphQL({
    schema: schema,
    graphiql: true,
  })
);

app.listen(3000, () => {
  console.log("Server running");
});
