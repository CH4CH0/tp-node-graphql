const express = require('express');
const app = express();
const _ = require('lodash');
const expressGraphQL = require('express-graphql');
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLInt,
    GraphQLList
} = require('graphql');

const students = require('../student.json');
const courses = require('../course.json');
const grades = require('../grade.json');

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

const CourseType = new GraphQLObjectType({
  name: "Course",
  description: "Represents courses",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLNonNull(GraphQLString) },
  }),
});

const GradeType = new GraphQLObjectType({
    name: 'Grade',
    description: 'Represents grades',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt) },
        courseId: { type: GraphQLNonNull(GraphQLInt) },
        studentId: { type: GraphQLNonNull(GraphQLInt) },
        grade: { type: GraphQLNonNull(GraphQLInt) },
        course:{
            type: CourseType,
            resolve: (grade) => {
                return courses.find(course => course.id === grade.courseId);
            }
        },
        student: {
            type: StudentType,
            resolve: (grade) => {
                return students.find(student => student.id === grade.studentId);
            }
        }
    })
});

//Mutations
const RootMutationType = new GraphQLObjectType({
    name: 'Mutation',
    description: 'Root mutation',
    fields: () => ({
        addStudent: {
            type: StudentType,
            description: 'Add a student', 
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                lastname: { type: GraphQLNonNull(GraphQLString) },
                courseId : { type: GraphQLNonNull(GraphQLInt) }
            },
            resolve: (parent, args) => {
                const student = {
                    id: students.length + 1,
                    name: args.name,
                    lastname: args.lastname,
                    courseId: args.courseId
                }
                students.push(student);
                return student;
            }
        },
        addCourse: {
            type: CourseType,
            description: 'Add a course', 
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                description: { type: GraphQLNonNull(GraphQLString) }
            },
            resolve: (parent, args) => {
                const course = {
                    id: courses.length + 1,
                    name: args.name,
                    description: args.description
                }
                courses.push(course);
                return course;
            }
        },
        addGrade: {
            type: GradeType,
            description: 'Add a grade', 
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
                    grade: args.grade
                }
                grades.push(grade);
                return grade;
            }
        },
        removeStudent: {
            type: StudentType,
            description: 'Delete a student', 
            args: {
                id: { type: GraphQLNonNull(GraphQLInt) }
            },
            resolve: (parent, args) => {
                _.remove(students, (student) => {
                    return student.id === args.id;
                });
            }
        },
        removeCurse: {
            type: CourseType,
            description: 'Delete a course', 
            args: {
                id: { type: GraphQLNonNull(GraphQLInt) }
            },
            resolve: (parent, args) => {
                _.remove(courses, (course) => {
                    return course.id === args.id;
                });
            }
        },
        removeGrade: {
            type: GradeType,
            description: 'Remove a grade', 
            args: {
                id: { type: GraphQLNonNull(GraphQLInt) }
            },
            resolve: (parent, args) => {
                _.remove(grades, (grade) => {
                    return grade.id === args.id;
                });
            }
        }

    })
});

//ROOT QUERY
const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root query',
    fields: () => ({
        students: {
            type: new GraphQLList(StudentType),
            description: 'List of all students', 
            resolve: () => students
        },
        courses: {
            type: new GraphQLList(CourseType),
            description: 'List of all courses', 
            resolve: () => courses
        },
        grades: {
            type: new GraphQLList(GradeType),
            description: 'List of all grades',  
            resolve: () => grades
        },
        student: {
            type: StudentType,
            description: 'Particular student', 
            args: {
                id: { type: GraphQLInt }
            },
            resolve: (parent, args) => students.find(student => student.id === args.id)
        },
        course: {
            type: CourseType,
            description: 'Particular course', 
            args: {
                id: { type: GraphQLInt }
            },
            resolve: (parent, args) => courses.find(course => course.id === args.id)
        },
        grade: {
            type: GradeType,
            description: 'Particular grade', 
            args: {
                id: { type: GraphQLInt }
            },
            resolve: (parent, args) => grades.find(grade => grade.id === args.id)
        }
    })
});

const schema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType
})

app.use('/graphql', expressGraphQL({
    schema: schema,
    graphiql: true
}));

app.listen(3000, () => {
    console.log('Server running');
});