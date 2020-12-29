import { MaxLength, MinLength } from 'class-validator';
import { Arg, Field, InputType, Mutation, ObjectType, Query, Resolver } from 'type-graphql';
import { Course } from '../entity/Course';
import { CourseProfessor } from '../entity/CourseProfessor';
import { Professor } from '../entity/Professor';
import { Colleges, Error, Terms } from '../util';

@InputType()
class ProfessorInput {
    @Field()
    @MinLength(1, { message: 'First name cannot be blank' })
    @MaxLength(255, { message: 'First name cannot be longer than 255 characters' })
    firstName: string;

    @Field()
    @MinLength(1, { message: 'Last name cannot be blank' })
    @MaxLength(255, { message: 'Last name cannot be longer than 255 characters' })
    lastName: string;

    @Field()
    college: string;
}

@ObjectType()
class ProfessorResponse {
    @Field(() => Error, { nullable: true })
    error?: Error;

    @Field(() => Professor, { nullable: true })
    professor?: Professor;
}

@Resolver()
export class ProfessorResolver {
    @Query(() => [Professor])
    async professors(): Promise<Professor[]> {
        return Professor.find({});
    }

    @Query(() => ProfessorResponse)
    async professor(@Arg('professorID') id: number): Promise<ProfessorResponse> {
        const professor = await Professor.findOne({ id });
        if (professor) {
            return { professor };
        }
        return {
            error: {
                path: 'src/resolvers/professor.ts',
                message: `Could not find professor with given ID: ${id}`,
            },
        };
    }

    @Query(() => [Course])
    async professorCourses(@Arg('professorID') id: number): Promise<Course[]> {
        const courses = await CourseProfessor.find({ professorID: id });
        const courseIDs = courses.map(course => course.courseID);
        return Course.findByIds(courseIDs);
    }

    @Mutation(() => ProfessorResponse)
    async createProfessor(
        @Arg('input') { firstName, lastName, college }: ProfessorInput
    ): Promise<ProfessorResponse> {
        if (Colleges.indexOf(college) === -1) {
            return {
                error: {
                    path: 'src/resolvers/professor.ts',
                    message: `Invalid college: ${college}`,
                },
            };
        }
        const duplicateProfessor = await Professor.findOne({ firstName, lastName, college });
        if (duplicateProfessor) {
            return {
                error: {
                    path: 'src/resolvers/professor.ts',
                    message: `Professor with first name: ${firstName} and last name: ${lastName} in college ${college} already exists`,
                },
            };
        }
        const professor = await Professor.create({ firstName, lastName, college }).save();
        return { professor };
    }

    @Mutation(() => ProfessorResponse)
    async rateQualityProfessor(
        @Arg('professorID') id: number,
        @Arg('rating') rating: number
    ): Promise<ProfessorResponse> {
        if (!Number.isInteger(rating) || rating < 1 || rating > 10) {
            return {
                error: {
                    path: 'src/resolvers/professor.ts',
                    message: `Invalid quality rating for professor: ${rating}`,
                },
            };
        }
        const professor = await Professor.findOne({ id });
        if (!professor) {
            return {
                error: {
                    path: 'src/resolvers/professor.ts',
                    message: `Could not find professor with given ID: ${id}`,
                },
            };
        }
        professor.quality.push(rating);
        await professor.save();
        return { professor };
    }

    @Mutation(() => ProfessorResponse)
    async rateDifficultyProfessor(
        @Arg('professorID') id: number,
        @Arg('rating') rating: number
    ): Promise<ProfessorResponse> {
        if (!Number.isInteger(rating) || rating < 1 || rating > 10) {
            return {
                error: {
                    path: 'src/resolvers/professor.ts',
                    message: `Invalid difficulty rating for professor: ${rating}`,
                },
            };
        }
        const professor = await Professor.findOne({ id });
        if (!professor) {
            return {
                error: {
                    path: 'src/resolvers/professor.ts',
                    message: `Could not find professor with given ID: ${id}`,
                },
            };
        }
        professor.difficulty.push(rating);
        await professor.save();
        return { professor };
    }

    @Mutation(() => ProfessorResponse)
    async addCourseToProfessor(
        @Arg('professorID') professorID: number,
        @Arg('courseID') courseID: number,
        @Arg('termTaught') termTaught: string,
        @Arg('yearTaught') yearTaught: number
    ): Promise<ProfessorResponse> {
        if (Terms.indexOf(termTaught) === -1) {
            return {
                error: {
                    path: 'src/resolvers/professor.ts',
                    message: `Invalid term: ${termTaught}`,
                },
            };
        }
        if (yearTaught.toString().length !== 4) {
            return {
                error: {
                    path: 'src/resolvers/professor.ts',
                    message: `Invalid year: ${yearTaught}`,
                },
            };
        }
        const course = await Course.findOne({ id: courseID });
        const professor = await Professor.findOne({ id: professorID });
        if (!course) {
            return {
                error: {
                    path: 'src/resolvers/professor.ts',
                    message: `Could not find course with given ID: ${courseID}`,
                },
            };
        }
        if (!professor) {
            return {
                error: {
                    path: 'src/resolvers/professor.ts',
                    message: `Could not find professor with given ID: ${professorID}`,
                },
            };
        }
        const duplicateCourseProfessor = await CourseProfessor.findOne({ courseID, professorID });
        if (duplicateCourseProfessor) {
            return {
                error: {
                    path: 'src/resolvers/professor.ts',
                    message: `Course with ID: ${courseID} taught by professor with ID: ${professorID} already exists`,
                },
            };
        }
        await CourseProfessor.create({
            courseID,
            professorID,
            termTaught,
            yearTaught,
        }).save();
        return { professor };
    }
}
