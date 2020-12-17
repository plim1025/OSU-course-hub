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
        if (!Departments.includes(department)) {
            return [
                {
                    field: 'department',
                    message: 'department not valid',
                },
            ];
        }
        return Course.create({ department, number }).save();
    }

    /*@Mutation(() => Course)
    async createCourse(
        @Arg('input') input: CourseInput
    ): Promise<Course | FieldError[]> {
        console.log(input.department);
        console.log(Departments.includes(input.department));
        if (!Departments.includes(input.department)) {
            return [
                {
                    field: 'department',
                    message: 'department not valid',
                },
            ];
        }
        const course = Course.create(input);
        await course.save();
        return course;
    }*/
}
