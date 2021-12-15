import {Entity, Column, PrimaryGeneratedColumn, OneToMany, AfterLoad, BeforeInsert, BeforeUpdate, Index} from 'typeorm';
import { HitEntity } from "../hits/hit.entity";
import {ApiHideProperty, ApiProperty} from "@nestjs/swagger";
import {Exclude} from "class-transformer";
import * as crypto from "crypto";
import * as bcrypt from 'bcrypt';

@Entity('users')
export class UserEntity {
    @ApiProperty({ readOnly: true })
    @PrimaryGeneratedColumn()
    public readonly id: string;

    /**
     * [description]
     */
    @Exclude()
    @ApiHideProperty()
    @Index()
    @Column({ type: 'varchar', length: 64 })
    public ppid: string;

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

    @Exclude()
    @ApiHideProperty()
    public _password: string;

    /**
     * [description]
     * @private
     */
    @AfterLoad()
    private loadTempPassword(): void {
        this._password = this.password;
    }

    /**
     * [description]
     */
    @BeforeInsert()
    @BeforeUpdate()
    public async hashPassword(): Promise<void> {
        if (this.password && this.password !== this._password) {
            this.password = await bcrypt.hash(this.password, 8);
        }

        this.ppid = crypto
            .createHash('sha256')
            .update(this.password)
            .digest('base64');
    }

    /**
     * [description]
     * @param password
     */
    public async comparePassword(password: UserEntity['password']): Promise<boolean> {
        return new Promise((resolve, reject) => {
            return bcrypt.compare(password, this.password, (err, same) => {
                if (err) reject(err);
                return same ? resolve(same) : reject(same);
            });
        });
    }

    @OneToMany(type => HitEntity, HitEntity => HitEntity.id)
    public hits: HitEntity[]
}