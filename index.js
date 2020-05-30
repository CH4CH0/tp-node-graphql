const express = require('express');
const app = express();
const expressGraphQL = require('express-graphql');
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLInt,
    GraphQLList
} = require('graphql');

const students = require('./student.json');
const courses = require('./course.json');
const grades = require('./grade.json');

const StudentType = new GraphQLObjectType({
    name: 'Student',
    description: 'Represents students',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLNonNull(GraphQLString) },
        lastname: { type: GraphQLNonNull(GraphQLString) },
        courseId: { type: GraphQLNonNull(GraphQLInt) },
        course: {
            type: CourseType,
            resolve: (student) => {
                return courses.find(course => course.id === student.courseId);
            }
        }
    })
});

const CourseType = new GraphQLObjectType({
    name: 'Course',
    description: 'Represents courses',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) }
    })
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

//ROOT QUERY
const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root query',
    fields: () => ({
        students: {
            type: new GraphQLList(StudentType),
            description: 'List of all students', //LISTO TODOS LOS ESTUDIANTES
            resolve: () => students
        },
        courses: {
            type: new GraphQLList(CourseType),
            description: 'List of all courses', //LISTO TODOS LOS CURSOS
            resolve: () => courses
        },
        grades: {
            type: new GraphQLList(GradeType),
            description: 'List of all grades', //LISTO TODOS LOS GRADOS CREOQ SON NOTAS 
            resolve: () => grades
        }
    })
});

const schema = new GraphQLSchema({
    query: RootQueryType
})

app.use('/graphql', expressGraphQL({
    schema: schema,
    graphiql: true
}));

app.listen(3000, () => {
    console.log('Server running');
});