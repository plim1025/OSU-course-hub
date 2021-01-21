import { UserInputError } from 'apollo-server-express';
import { IsNumberString, Length } from 'class-validator';
import { Arg, Field, InputType, Mutation, Query, Resolver } from 'type-graphql';
import { Course } from '../entity/Course';
import { CourseProfessor } from '../entity/CourseProfessor';
import { Professor } from '../entity/Professor';
import { Departments, Terms } from '../util';

@InputType()
class CourseInput {
    @Field()
    department: string;

    @Field()
    @IsNumberString({ no_symbols: true }, { message: 'Class number must only contain numbers' })
    @Length(3, 3, { message: 'Class number must be 3 digits' })
    number: string;
}

@Resolver()
export class CourseResolver {
    @Query(() => [Course])
    async courses(): Promise<Course[]> {
        return Course.find({});
    }

    @Query(() => Course)
    async course(@Arg('courseID') id: number): Promise<Course> {
        const course = await Course.findOne({ id });
        if (course) {
            return course;
        }
        throw new UserInputError('Validation error(s)', {
            validationErrors: { course: `Could not find course with given ID: ${id}` },
        });
    }

    @Query(() => [Professor])
    async courseProfessors(@Arg('courseID') id: number): Promise<Professor[]> {
        const professors = await CourseProfessor.find({ courseID: id });
        const professorIDs = professors.map(professor => professor.professorID);
        return Professor.findByIds(professorIDs);
    }

    @Mutation(() => Course)
    async createCourse(@Arg('input') { department, number }: CourseInput): Promise<Course> {
        const validationErrors: any = {};
        if (Departments.indexOf(department) === -1) {
            validationErrors.department = `Invalid department: ${department}`;
        }
        const duplicateCourse = await Course.findOne({ department, number });
        if (duplicateCourse) {
            validationErrors.course = `Course with department ${department} and number ${number} already exists`;
        }
        const course = await Course.create({ department, number }).save();
        return course;
    }

    @Mutation(() => Course)
    async addProfessorToCourse(
        @Arg('professorID') professorID: number,
        @Arg('courseID') courseID: number,
        @Arg('termTaught') termTaught: string,
        @Arg('yearTaught') yearTaught: number
    ): Promise<Course> {
        const validationErrors: any = {};
        if (Terms.indexOf(termTaught) === -1) {
            validationErrors.term = `Invalid term: ${termTaught}`;
        }
        if (yearTaught.toString().length !== 4) {
            validationErrors.year = `Invalid year: ${yearTaught}`;
        }
        const course = await Course.findOne({ id: courseID });
        const professor = await Professor.findOne({ id: professorID });
        if (!course) {
            validationErrors.course = `Could not find course with given ID: ${courseID}`;
        }
        if (!professor) {
            validationErrors.professor = `Could not find professor with given ID: ${professorID}`;
        }
        const duplicateCourseProfessor = await CourseProfessor.findOne({ courseID, professorID });
        if (duplicateCourseProfessor) {
            validationErrors.courseProfessor = `Course with ID: ${courseID} taught by professor with ID: ${professorID} already exists`;
        }
        if (Object.keys(validationErrors).length > 0 || !course) {
            throw new UserInputError('Validation error(s)', {
                validationErrors,
            });
        }
        await CourseProfessor.create({
            courseID,
            professorID,
            termTaught,
            yearTaught,
        }).save();
        return course;
    }
}
