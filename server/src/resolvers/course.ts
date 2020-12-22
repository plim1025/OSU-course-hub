import { IsNumberString, Length } from 'class-validator';
import { Arg, Field, InputType, Mutation, ObjectType, Query, Resolver } from 'type-graphql';
import { Course } from '../entity/Course';
import { CourseProfessor } from '../entity/CourseProfessor';
import { Professor } from '../entity/Professor';
import { Departments, Error, Terms } from '../util';

@InputType()
class CourseInput {
    @Field()
    department: string;

    @Field()
    @IsNumberString({ no_symbols: true }, { message: 'Class number must only contain numbers' })
    @Length(3, 3, { message: 'Class number must be 3 digits' })
    number: string;
}

@ObjectType()
class CourseResponse {
    @Field(() => Error, { nullable: true })
    error?: Error;

    @Field(() => Course, { nullable: true })
    course?: Course;
}

@Resolver()
export class CourseResolver {
    @Query(() => [Course])
    async courses(): Promise<Course[]> {
        return Course.find({});
    }

    @Query(() => CourseResponse)
    async course(@Arg('courseID') id: number): Promise<CourseResponse> {
        const course = await Course.findOne({ id });
        if (course) {
            return { course };
        }
        return {
            error: {
                path: 'src/resolvers/course.ts',
                message: 'Could not find course with given ID',
            },
        };
    }

    @Query(() => [Professor])
    async professorCourses(@Arg('courseID') id: number): Promise<Professor[]> {
        const professors = await CourseProfessor.find({ courseID: id });
        const professorIDs = professors.map(professor => professor.professorID);
        return Professor.findByIds(professorIDs);
    }

    @Mutation(() => CourseResponse)
    async createCourse(@Arg('input') { department, number }: CourseInput): Promise<CourseResponse> {
        if (Departments.indexOf(department) === -1) {
            return {
                error: { path: 'src/resolvers/course.ts', message: 'Department does not exist' },
            };
        }
        const duplicateCourse = await Course.findOne({ department, number });
        if (duplicateCourse) {
            return {
                error: { path: 'src/resolvers/course.ts', message: 'Course already exists' },
            };
        }
        const course = await Course.create({ department, number }).save();
        return { course };
    }

    @Mutation(() => CourseResponse)
    async rateQualityCourse(
        @Arg('courseID') id: number,
        @Arg('rating') rating: number
    ): Promise<CourseResponse> {
        if (!Number.isInteger(rating) || rating < 1 || rating > 10) {
            return {
                error: {
                    path: 'src/resolvers/course.ts',
                    message: 'Invalid quality rating for course',
                },
            };
        }
        const course = await Course.findOne({ id });
        if (!course) {
            return {
                error: {
                    path: 'src/resolvers/course.ts',
                    message: 'Could not find course with given ID',
                },
            };
        }
        course.quality.push(rating);
        await course.save();
        return { course };
    }

    @Mutation(() => CourseResponse)
    async rateDifficultyProfessor(
        @Arg('courseID') id: number,
        @Arg('rating') rating: number
    ): Promise<CourseResponse> {
        if (!Number.isInteger(rating) || rating < 1 || rating > 10) {
            return {
                error: {
                    path: 'src/resolvers/course.ts',
                    message: 'Invalid difficulty rating for course',
                },
            };
        }
        const course = await Course.findOne({ id });
        if (!course) {
            return {
                error: {
                    path: 'src/resolvers/course.ts',
                    message: 'Could not find course with given ID',
                },
            };
        }
        course.difficulty.push(rating);
        await course.save();
        return { course };
    }

    @Mutation(() => CourseResponse)
    async addProfessorToCourse(
        @Arg('professorID') professorID: number,
        @Arg('courseID') courseID: number,
        @Arg('termTaught') termTaught: string,
        @Arg('yearTaught') yearTaught: number
    ): Promise<CourseResponse> {
        if (Terms.indexOf(termTaught) === -1) {
            return {
                error: {
                    path: 'src/resolvers/course.ts',
                    message: 'Invalid term',
                },
            };
        }
        if (yearTaught.toString().length !== 4) {
            return {
                error: {
                    path: 'src/resolvers/course.ts',
                    message: 'Invalid year',
                },
            };
        }
        const course = await Course.findOne({ id: courseID });
        const professor = await Professor.findOne({ id: professorID });
        if (!course) {
            return {
                error: {
                    path: 'src/resolvers/course.ts',
                    message: 'Could not find course with given ID',
                },
            };
        }
        if (!professor) {
            return {
                error: {
                    path: 'src/resolvers/course.ts',
                    message: 'Could not find professor with given ID',
                },
            };
        }
        const duplicateCourseProfessor = await CourseProfessor.findOne({ courseID, professorID });
        if (duplicateCourseProfessor) {
            return {
                error: {
                    path: 'src/resolvers/professor.ts',
                    message: 'Course taught by professor already exists',
                },
            };
        }
        await CourseProfessor.create({
            courseID,
            professorID,
            termTaught,
            yearTaught,
        }).save();
        return { course };
    }
}
