import { Arg, Field, InputType, Mutation, ObjectType, Query, Resolver } from 'type-graphql';
import { Student } from '../entity/Student';
import { Error } from '../util';

@InputType()
class StudentInput {
    @Field()
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
                message: `Could not find student with given ONID: ${ONID}`,
            },
        };
    }

    @Mutation(() => Student)
    async createStudent(@Arg('input') { ONID }: StudentInput): Promise<Student> {
        return Student.create({ ONID }).save();
    }
}
