import { IsNumberString, Length } from 'class-validator';
import { Arg, Field, InputType, Mutation, ObjectType, Query, Resolver } from 'type-graphql';
import { Student } from '../entity/Student';
import { Error } from '../util';

@InputType()
class StudentInput {
    @Field()
    @IsNumberString({ no_symbols: true }, { message: 'ONID must only contain numbers' })
    @Length(9, 9, { message: 'ONID must be of length 9' })
    ONID: string;
}

@ObjectType()
class StudentResponse {
    @Field(() => Error, { nullable: true })
    error?: Error;

    @Field(() => Student, { nullable: true })
    student?: Student;
}

@Resolver()
export class StudentResolver {
    @Query(() => [Student])
    async students(): Promise<Student[]> {
        return Student.find({});
    }

    @Query(() => StudentResponse)
    async student(@Arg('ONID') ONID: string): Promise<StudentResponse> {
        const student = await Student.findOne({ ONID });
        if (student) {
            return { student };
        }
        return {
            error: {
                path: 'src/resolvers/student.ts',
                message: 'Could not find student with given ONID',
            },
        };
    }

    @Mutation(() => Student)
    async createStudent(@Arg('input') { ONID }: StudentInput): Promise<Student> {
        return Student.create({ ONID }).save();
    }
}
