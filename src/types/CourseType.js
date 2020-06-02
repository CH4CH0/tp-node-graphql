const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLInt,
} = require('graphql');

const CourseType = new GraphQLObjectType({
    name: "Course",
    description: "Represents courses",
    fields: () => ({
      id: { type: GraphQLNonNull(GraphQLInt) },
      name: { type: GraphQLNonNull(GraphQLString) },
      description: { type: GraphQLNonNull(GraphQLString) },
    }),
  });

  module.exports = CourseType;