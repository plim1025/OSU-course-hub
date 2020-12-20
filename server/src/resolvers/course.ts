import { Field, InputType, Query, Resolver } from 'type-graphql';
import { Course } from '../entity/Course';

@InputType()
class CourseInput {
    @Field()
    department: string;

    @Field()
    number: string;
}

@Resolver()
export class CourseResolver {
    @Query(() => [Course])
    async courses(): Promise<Course[]> {
        return Course.find({});
    }

    // @Query(() => Course)

    // @Mutation(() => Course)
    // async createCourse(
    //     @Arg('input') { department, number }: CourseInput
    // ): Promise<Course | FieldError[]> {
    //     if (!(department in Departments)) {
    //         return [
    //             {
    //                 field: 'department',
    //                 message: 'department not valid',
    //             },
    //         ];
    //     }
    //     return Course.create({ department, number }).save();
    // }
}
