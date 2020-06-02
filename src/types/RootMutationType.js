const _ = require("lodash");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt,
} = require("graphql");

const students = require("../../student.json");
const courses = require("../../course.json");
const grades = require("../../grade.json");

const StudentType = require("./StudentType.js");
const CourseType = require("./CourseType.js");
const GradeType = require("./GradeType.js");

const RootMutationType = new GraphQLObjectType({
  name: "Mutation",
  description: "Root mutation",
  fields: () => ({
    addStudent: {
      type: StudentType,
      description: "Add a student",
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        lastname: { type: GraphQLNonNull(GraphQLString) },
        courseId: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve: (parent, args) => {
        const student = {
          id: students.length + 1,
          name: args.name,
          lastname: args.lastname,
          courseId: args.courseId,
        };
        students.push(student);
        return student;
      },
    },
    addCourse: {
      type: CourseType,
      description: "Add a course",
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: (parent, args) => {
        const course = {
          id: courses.length + 1,
          name: args.name,
          description: args.description,
        };
        courses.push(course);
        return course;
      },
    },
    addGrade: {
      type: GradeType,
      description: "Add a grade",
      args: {
        courseId: { type: GraphQLNonNull(GraphQLInt) },
        studentId: { type: GraphQLNonNull(GraphQLInt) },
        grade: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve: (parent, args) => {
        const grade = {
          id: grades.length + 1,
          courseId: args.courseId,
          studentId: args.studentId,
          grade: args.grade,
        };
        grades.push(grade);
        return grade;
      },
    },
    removeStudent: {
      type: StudentType,
      description: "Delete a student",
      args: {
        id: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve: (parent, args) => {
        _.remove(students, (student) => {
          return student.id === args.id;
        });

        _.remove(grades, (grade) => {
          return grade.studentId === args.id;
        });
      },
    },
    removeCurse: {
      type: CourseType,
      description: "Delete a course",
      args: {
        id: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve: (parent, args) => {
        _.remove(courses, (course) => {
          return course.id === args.id;
        });
      },
    },
    removeGrade: {
      type: GradeType,
      description: "Remove a grade",
      args: {
        id: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve: (parent, args) => {
        _.remove(grades, (grade) => {
          return grade.id === args.id;
        });
      },
    },
  }),
});

module.exports = RootMutationType;
