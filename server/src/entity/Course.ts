import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryColumn } from 'typeorm';
import { Comment } from './Comment';
import { Professor } from './Professor';
import { Textbook } from './Textbook';

@Entity()
export class Course {
    @PrimaryColumn()
    department: string;

    @PrimaryColumn()
    number: number;

    @Column({ type: 'int', array: true })
    difficulty: number[] = [];

    @Column({ type: 'int', array: true })
    quality: number[] = [];

    @OneToMany(() => Textbook, textbook => textbook.course)
    textbooks: Textbook[];

    @OneToMany(() => Comment, comment => comment.course)
    comments: Comment[];

    @ManyToMany(() => Professor)
    @JoinTable()
    professors: Professor[];
}
