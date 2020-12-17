import { Entity, PrimaryGeneratedColumn, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class Textbook {
    @PrimaryColumn()
    isbn: number;

    @Column()
    title: string;

    @Column()
    author: string;

    @Column()
    coverImageURL: string;

    @Column()
    edition: number;

    @Column()
    year: number;

    //relate to course
}
