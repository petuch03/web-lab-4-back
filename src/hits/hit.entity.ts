import {Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

import {ApiProperty} from "@nestjs/swagger";

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