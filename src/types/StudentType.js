const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLInt,
} = require('graphql');

const courses = require('../../course.json');

const CourseType = require('./CourseType.js');

const StudentType = new GraphQLObjectType({
    name: "Student",
    description: "Represents students",
    fields: () => ({
      id: { type: GraphQLNonNull(GraphQLInt) },
      name: { type: GraphQLNonNull(GraphQLString) },
      lastname: { type: GraphQLNonNull(GraphQLString) },
      courseId: { type: GraphQLNonNull(GraphQLInt) },
      course: {
        type: CourseType,
        resolve: (student) => {
          return courses.find((course) => course.id === student.courseId);
        },
      },
    }),
  });

  module.exports = StudentType;