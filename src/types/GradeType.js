const {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLInt,
} = require('graphql');

const CourseType = require('./CourseType.js');
const StudentType = require('./StudentType.js');

const courses = require('../../course.json');
const students = require('../../student.json');

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

module.exports = GradeType;