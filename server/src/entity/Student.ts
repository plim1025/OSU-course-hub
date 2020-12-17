import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Student {
    @PrimaryGeneratedColumn()
    id: number; //student id

}
