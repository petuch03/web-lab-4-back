import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
} from 'typeorm';
import {ApiHideProperty, ApiProperty} from "@nestjs/swagger";
import {Exclude} from "class-transformer";

@Entity('users')
export class UserEntity {
    @ApiProperty({ readOnly: true })
    @PrimaryGeneratedColumn()
    public readonly id: string;

    @ApiProperty({ maxLength: 50 })
    @Column({ type: 'varchar', length: 50 })
    public firstName: string;

    @ApiProperty({ maxLength: 50 })
    @Column({ type: 'varchar', length: 50 })
    public lastName: string;

    @ApiProperty({ maxLength: 320, uniqueItems: true })
    @Column({ type: 'varchar', length: 320, unique: true })
    public email: string;

    @Exclude()
    @ApiHideProperty()
    @Column({ type: 'varchar', length: 64 })
    public password: string;
}