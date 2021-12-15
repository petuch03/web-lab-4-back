import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import {UserService} from "./user.service";
import {UserController} from "./user.controller";
import {ConfigModule} from "@nestjs/config";

@Module({
    imports: [
        ConfigModule.forRoot({isGlobal: true}),
        TypeOrmModule.forFeature([UserEntity]),
    ],
    providers: [UserService],
    controllers: [UserController],
    exports: [TypeOrmModule, UserService],
})
export class UserModule {}