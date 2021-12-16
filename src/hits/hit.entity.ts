import {Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne} from 'typeorm';

import {ApiProperty} from "@nestjs/swagger";
import {UserEntity} from "../users/user.entity";

@Entity('hits-4')
export class HitEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ type: 'float8'})
    x: number;

    @Column({ type: 'float8'})
    y: number;

    @Column({ type: 'float8'})
    r: number;

    @Column({ type: 'varchar', length: 50 })
    @ApiProperty({ maxLength: 50 })
    res: string;

    @Column()
    current: Date;

    @Column()
    user: string;
}