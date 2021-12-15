import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import {UserEntity} from "../users/user.entity";

@Entity('hits-4')
export class HitEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    x: number;

    @Column()
    y: number;

    @Column()
    r: number;

    @Column()
    res: string;

    @Column()
    current: Date;

    @Column()
    exec: string;
}