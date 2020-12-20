import { IsInt, Max, MaxLength, Min, MinLength } from 'class-validator';
import { Arg, Field, InputType, Mutation, ObjectType, Query, Resolver } from 'type-graphql';
import { Professor } from '../entity/Professor';
import { Error, Colleges } from '../util';

@InputType()
class ProfessorInput {
    @Field()
    @MinLength(1)
    @MaxLength(255)
    firstName: string;

    @MinLength(1)
    @MaxLength(255)
    @Field()
    lastName: string;

    @Field()
    college: string;

    @IsInt()
    @Min(0)
    @Max(10)
    @Field({ nullable: true })
    rating?: number;
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
    async professor(
        @Arg('input') { firstName, lastName, college }: ProfessorInput
    ): Promise<ProfessorResponse> {
        const professor = await Professor.findOne({ firstName, lastName, college });
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

    // @Mutation(() => ProfessorResponse)
    // async rateQualityProfessor(
    //     @Arg('input') { firstName, lastName, college, rating }: ProfessorInput
    // ): Promise<ProfessorResponse> {
    //     const professor = await Professor.findOne({ firstName, lastName, college });
    //     if (!professor) {
    //         return {
    //             error: {
    //                 path: 'src/resolvers/professor.ts',
    //                 message: 'could not find professor with given firstName/lastName/college',
    //             },
    //         };
    //     }
    //     professor.quality.push(rating);
    // }
}
