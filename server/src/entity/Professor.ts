import { Entity, PrimaryGeneratedColumn, PrimaryColumn, Column, OneToMany } from 'typeorm';
import {TaughtCourse} from './TaughtCourse';

@Entity()
export class Professor {
    @PrimaryGeneratedColumn()
    id: string

    //@PrimaryColumn()
    @Column()
    name: string

    //many to many
    @OneToMany(() => TaughtCourse, course => course.professor) //taught course relation
    courses: TaughtCourse[]

    @Column()
    avgQuality: string;

    @Column()
    avgDifficulty: number;

}
