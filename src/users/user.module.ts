import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import {UserService} from "./user.service";
import {UserController} from "./user.controller";
import {JwtModule} from "@nestjs/jwt";
import {ConfigModule} from "@nestjs/config";
import {PassportModule} from "@nestjs/passport";
import {JwtStrategy} from "./strategies/jwt.strategy";

@Module({
    imports: [
        ConfigModule.forRoot({isGlobal: true}),
        TypeOrmModule.forFeature([UserEntity]),
        PassportModule.registerAsync({
            useFactory: () => ({
                defaultStrategy: 'jwt',
            }),
        }),
        JwtModule.registerAsync({
            useFactory: () => {
                return {
                    secret: 'some-secret',
                    signOptions: {
                        expiresIn: 604800,
                    },
                };
            },
        })
    ],
    providers: [UserService, JwtStrategy],
    controllers: [UserController],
    exports: [TypeOrmModule],
})
export class UserModule {}