import { MaxLength, MinLength } from 'class-validator';
import { CourseProfessor } from 'src/entity/CourseProfessor';
import { Arg, Field, InputType, Mutation, ObjectType, Query, Resolver } from 'type-graphql';
import { Professor } from '../entity/Professor';
import { Colleges, Error } from '../util';

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
                message: 'Could not find professor with given firstName/lastName/college',
            },
        };
    }

    @Mutation(() => ProfessorResponse)
    async createProfessor(
        @Arg('input') { firstName, lastName, college }: ProfessorInput
    ): Promise<ProfessorResponse> {
        if (Colleges.indexOf(college) === -1) {
            return {
                error: { path: 'src/resolvers/professor.ts', message: 'College does not exist' },
            };
        }
        const duplicateProfessor = await Professor.findOne({ firstName, lastName, college });
        if (duplicateProfessor) {
            return {
                error: { path: 'src/resolvers/professor.ts', message: 'Professor already exists' },
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
                    message: 'Invalid quality rating for professor',
                },
            };
        }
        const professor = await Professor.findOne({ id });
        if (!professor) {
            return {
                error: {
                    path: 'src/resolvers/professor.ts',
                    message: 'Could not find professor with given firstName/lastName/college',
                },
            };
        }
        professor.quality.push(rating);
        professor.save();
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
                    message: 'Invalid difficulty rating for professor',
                },
            };
        }
        const professor = await Professor.findOne({ id });
        if (!professor) {
            return {
                error: {
                    path: 'src/resolvers/professor.ts',
                    message: 'Could not find professor with given firstName/lastName/college',
                },
            };
        }
        professor.difficulty.push(rating);
        professor.save();
        return { professor };
    }

    // @Mutation(() => ProfessorResponse)
    // async addCourseToProfessor(
    //     @Arg('professorID') professorID: number,
    //     @Arg('courseID') courseID: number,
    //     @Arg('term') term: string,
    // ) {
    //     if(term) {

    //     }
    //     const courseProfessor = await CourseProfessor.create({ })
    // }
}
