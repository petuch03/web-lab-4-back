import {ConflictException, Injectable} from '@nestjs/common';
import {UserService} from '../users/user.service';
import {UserEntity} from "../users/user.entity";
import {JwtService} from "@nestjs/jwt";
import {JwtResponseDto} from "./dto/jwt-response.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity)
        private usersRepository: Repository<UserEntity>,
        private readonly userService: UserService,
        private readonly jwtService: JwtService) {
    }

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.userService.findOne(email);
        if (user && await bcrypt.compare(pass, user.password)) {
            const {password, ...result} = user;
            return result;
        }
        return null;
    }

    async signin(user: UserEntity) {
        const payload = {username: user.email, sub: user.id};
        return {
            expiresIn: 604800,
            token: this.jwtService.sign(payload),
        };
    }

    async signup(entityLike: Partial<UserEntity>): Promise<JwtResponseDto> {
        let isUserExists = false;
        await this.userService
            .findOne(entityLike.email)
            .then(() => {
                isUserExists = true;
            })
            .catch(() => {
            });
        if (!isUserExists) {
            const createdUser = await this.userService.createOne(entityLike);
            return {
                expiresIn: 604800,
                token: this.jwtService.sign({id: createdUser.id, email: createdUser.email}),
            };
        }

        throw new ConflictException('USER_ALREADY_EXIST');
    }
}
