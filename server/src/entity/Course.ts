import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Comment } from './Comment';
import { Professor } from './Professor';
import { Textbook } from './Textbook';

@Entity()
export class Course {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    difficulty: number[];

    @Column()
    quality: number[];

    @OneToMany(() => Textbook, textbook => textbook.course)
    textbooks: Textbook[];

    @OneToMany(() => Comment, comment => comment.course)
    comments: Comment[];

    @ManyToMany(() => Professor)
    @JoinTable()
    professors: Professor[];
}
