import { Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm';
import { Course } from './Course';

@Entity()
export class Textbook {
    @PrimaryColumn()
    ISBN: string;

    @Column()
    title: string;

    @Column()
    author: string;

    @Column({ nullable: true })
    coverImageUrl: string;

    @Column()
    edition: number;

    @Column()
    copyrightYear: number;

    @Column({ nullable: true })
    priceNewUSD: number;

    @Column({ nullable: true })
    priceUsedUSD: number;

    @Column({ nullable: true })
    courseId: number;

    @ManyToOne(() => Course, course => course.textbooks)
    course: Course;
}
