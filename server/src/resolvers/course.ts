import { Length } from 'class-validator';
import { Arg, Field, InputType, Mutation, Query, Resolver } from 'type-graphql';
import { Course } from '../entity/Course';
import { Departments, FieldError } from '../util';

@InputType()
class CourseInput {
    @Field()
    department: string;

    @Field()
    @Length(3)
    number: string;
}

@Resolver()
export class CourseResolver {
    @Query(() => [Course])
    async course(): Promise<Course[]> {
        return Course.find({});
    }

    @Mutation(() => Course)
    async createCourse(
        @Arg('input') { department, number }: CourseInput
    ): Promise<Course | FieldError[]> {
        if (!(department in Departments)) {
            return [
                {
                    field: 'department',
                    message: 'department not valid',
                },
            ];
        }
        return Course.create({ department, number }).save();
    }
}
