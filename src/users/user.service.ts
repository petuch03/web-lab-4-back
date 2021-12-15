import {ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {FindConditions, FindOneOptions, Repository} from 'typeorm';
import {UserEntity} from './user.entity';
import {classToPlain} from "class-transformer";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private usersRepository: Repository<UserEntity>,
    ) {
    }

    findAll(): Promise<UserEntity[]> {
        return this.usersRepository.find();
    }

    findOne(email: string): Promise<UserEntity> {
        return this.usersRepository.findOneOrFail({email: email});
    }

    async createOne(entityLike: Partial<UserEntity>): Promise<UserEntity> {
        return this.usersRepository.manager.transaction(async () => {
            const newPass = await bcrypt.hash(entityLike.password, 10);
            const entity = this.usersRepository.create({...entityLike, password: newPass});
            return this.usersRepository.save(entity).catch(() => {
                throw new ConflictException('troubles with saving');
            });
        });
    }
}