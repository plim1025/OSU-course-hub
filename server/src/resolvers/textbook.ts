import { UserInputError } from 'apollo-server-express';
import { Max, Min } from 'class-validator';
import { Arg, Field, ID, InputType, Int, Mutation, Query, Resolver } from 'type-graphql';
import { Course } from '../entity/Course';
import { CourseTextbook } from '../entity/CourseTextbook';
import { Textbook } from '../entity/Textbook';
import { Terms } from '../util';

@InputType()
class TextbookInput {
    @Field(() => ID)
    ISBN: string;

    @Field()
    title: string;

    @Field()
    author: string;

    @Field({ nullable: true })
    coverImageUrl?: string;

    @Field(() => Int)
    edition: number;

    @Field(() => Int)
    @Min(1000)
    @Max(9999)
    copyrightYear: number;

    @Field({ nullable: true })
    priceNewUSD?: number;

    @Field({ nullable: true })
    priceUsedUSD?: number;
}

@Resolver()
export class TextbookResolver {
    @Query(() => [Textbook])
    async courseTextbooks(@Arg('courseID') id: number): Promise<Textbook[]> {
        const textbooks = await CourseTextbook.find({ courseID: id });
        const textbookISBNs = textbooks.map(textbook => textbook.ISBN);
        return Textbook.findByIds(textbookISBNs);
    }

    @Mutation(() => Textbook)
    async addTextbookToCourse(
        @Arg('input') input: TextbookInput,
        @Arg('courseID') courseID: number,
        @Arg('termUsed') termUsed: string,
        @Arg('yearUsed') yearUsed: number
    ): Promise<Textbook> {
        const validationErrors: any = {};
        if (Terms.indexOf(termUsed) === -1) {
            validationErrors.term = `Invalid Term: ${termUsed}`;
        }
        if (yearUsed.toString().length !== 4) {
            validationErrors.year = `Invalid Year: ${yearUsed}`;
        }
        const duplicateTextbook = await CourseTextbook.findOne({ courseID, ISBN: input.ISBN });
        if (duplicateTextbook) {
            validationErrors.textbook = `Textbook with ISBN: ${input.ISBN} for course with ID: ${courseID} already exists`;
        }
        const course = await Course.findOne({ id: courseID });
        if (!course) {
            validationErrors.course = `Could not find course with given ID: ${courseID}`;
        }
        if (Object.keys(validationErrors).length > 0) {
            throw new UserInputError('Validation error(s)', {
                validationErrors,
            });
        }
        let textbook = await Textbook.findOne({ ISBN: input.ISBN });
        if (!textbook) {
            textbook = await Textbook.create(input).save();
        }
        await CourseTextbook.create({
            courseID,
            ISBN: input.ISBN,
            termUsed,
            yearUsed,
        }).save();
        return textbook;
    }
}
