import { Arg, Field, InputType, Mutation, ObjectType, Query, Resolver } from 'type-graphql';
import { Professor } from '../entity/Professor';
import { Error, Colleges } from '../util';

@InputType()
class ProfessorInput {
    @Field()
    firstName: string;

    @Field()
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

    @Query(() => Professor)
    async professor(
        @Arg('firstName') firstName: string,
        @Arg('lastName') lastName: string
    ): Promise<Professor | Error> {
        const professor = await Professor.findOne({ firstName, lastName });
        if (professor) {
            return professor;
        }
        return {
            path: 'src/resolvers/professor.ts',
            message: 'could not find professor with given firstName/lastName',
        };
    }

    @Mutation(() => ProfessorResponse)
    async createProfessor(
        @Arg('input') { firstName, lastName, college }: ProfessorInput
    ): Promise<ProfessorResponse> {
        if (!firstName) {
            return {
                error: {
                    path: 'src/resolvers/professor.ts',
                    message: 'First name cannot be blank',
                },
            };
        }
        if (firstName.length > 255) {
            return {
                error: {
                    path: 'src/resolvers/professor.ts',
                    message: 'First name must be under 255 characters',
                },
            };
        }
        if (!lastName) {
            return {
                error: { path: 'src/resolvers/professor.ts', message: 'Last name cannot be blank' },
            };
        }
        if (lastName.length > 255) {
            return {
                error: {
                    path: 'src/resolvers/professor.ts',
                    message: 'Last name must be under 255 characters',
                },
            };
        }
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
}
