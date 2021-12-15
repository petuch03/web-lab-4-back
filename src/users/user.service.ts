import {ConflictException, Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {FindConditions, FindOneOptions, Repository} from 'typeorm';
import { UserEntity } from './user.entity';
import {CreateUserDto} from "./dto/create-user.dto";
import {CredentialsDto} from "./dto/credentials.dto";
import {classToPlain} from "class-transformer";
import {JwtResponseDto} from "./dto/jwt-response.dto";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private usersRepository: Repository<UserEntity>,
        private jwtService: JwtService,
    ) {}

    findAll(): Promise<UserEntity[]> {
        return this.usersRepository.find();
    }

    findOne(id: string): Promise<UserEntity> {
        return this.usersRepository.findOne(id);
    }


    async createOne(entityLike: Partial<UserEntity>): Promise<UserEntity> {
        return this.usersRepository.manager.transaction(async () => {
            console.log(entityLike);
            const entity = this.usersRepository.create(entityLike);
            console.log(entity);
            return this.usersRepository.save(entity).catch(() => {
                throw new ConflictException('troubles with saving');
            });
        });
    }

    public async createToken({ email, password }: CredentialsDto): Promise<JwtResponseDto> {
        const user = await this.validateUser({ email });
        // console.log(`user`);
        // console.log(user);
        // console.log(`user`);
        await user.comparePassword(password).catch(() => {
            throw new UnauthorizedException('AUTH_INCORRECT_CREDENTIALS');
        });

        return this.generateToken(user);
    }

    public async validateUser(data: Partial<UserEntity>): Promise<UserEntity> {
        return this.selectOne(data, { loadEagerRelations: true }).catch(() => {
            throw new UnauthorizedException('AUTH_INCORRECT_CREDENTIALS');
        });
    }

    public async selectOne(
        conditions: FindConditions<UserEntity>,
        options: FindOneOptions<UserEntity> = { loadEagerRelations: true },
    ): Promise<UserEntity> {
        return this.usersRepository.findOneOrFail(conditions, classToPlain(options)).catch(() => {
            throw new NotFoundException('USER_NOT_FOUND');
        });
    }

    public generateToken({ id, ppid }: UserEntity): JwtResponseDto {
        const expiresIn = 604800;
        const token = this.jwtService.sign({ id, ppid });
        return { expiresIn, token };
    }

    async signup(entityLike: Partial<UserEntity>): Promise<JwtResponseDto> {
        console.log(entityLike);
        let isUserExists = false;
        await this
            .selectOne({ email: entityLike.email })
            .then(() => {
                isUserExists = true;
            })
            .catch(() => {});
        if (!isUserExists) {
            const createdUser = await this.createOne(entityLike);
            return this.generateToken(createdUser);
        }

        throw new ConflictException('USER_ALREADY_EXIST');
    }
}