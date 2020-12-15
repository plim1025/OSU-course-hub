import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Comment } from './Comment';

@Entity()
export class Professor {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    difficulty: number[];

    @Column()
    quality: number[];

    @OneToMany(() => Comment, comment => comment.professor)
    comments: Comment[];
}
