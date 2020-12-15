import { Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm';
import { Course } from './Course';

@Entity()
export class Textbook {
    @PrimaryColumn()
    ISBN: number;

    @Column()
    title: string;

    @Column()
    author: string;

    @Column()
    coverImageUrl: string;

    @Column()
    edition: number;

    @Column()
    copyrightYear: number;

    @Column()
    priceNewUSD: number;

    @Column()
    priceUsedUSD: number;

    @Column({ nullable: true })
    courseId: number;

    @ManyToOne(() => Course, course => course.textbooks)
    course: Course;
}
