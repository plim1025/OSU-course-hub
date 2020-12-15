import { Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Comment } from './Comment';

@Entity()
export class Student {
    @PrimaryColumn()
    ONID: number;

    @OneToMany(() => Comment, comment => comment.student)
    comments: Comment[];
}
