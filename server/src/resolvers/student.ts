import { Length } from 'class-validator';
import { Arg, Field, InputType, Mutation, Query, Resolver } from 'type-graphql';
import { Student } from '../entity/Student';
import { FieldError } from '../util';

@InputType()
class StudentInput {
    @Field()
    @Length(9)
    ONID: string;
}

@Resolver()
export class StudentResolver {
    //Get all students
    @Query(() => [Student])
    async students(): Promise<Student[]> {
        return Student.find({});
    }

    //Get a student
    @Query(() => Student)
    async student(@Arg('ONID') ONID: string) {
        return Student.findOne({where: {ONID}});
    }

    @Mutation(() => Student)
    //Create a student
    async createStudent(
        @Arg('input') { ONID }: StudentInput
    ): Promise<Student | FieldError[]> {
        return Student.create({ ONID }).save();
    }
}
