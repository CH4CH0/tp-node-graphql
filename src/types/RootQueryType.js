const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLList
} = require('graphql');

const students = require('../../student.json');
const courses = require('../../course.json');
const grades = require('../../grade.json');

const StudentType = require('./StudentType.js');
const CourseType = require('./CourseType.js');
const GradeType = require('./GradeType.js');

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

module.exports = RootQueryType;