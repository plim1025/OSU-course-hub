import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Comment } from './Comment';

@Entity()
export class Professor {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column('int', { array: true })
    difficulty: number[] = [];

    @Column('int', { array: true })
    quality: number[] = [];

    @OneToMany(() => Comment, comment => comment.professor)
    comments: Comment[];
}
