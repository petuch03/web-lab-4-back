import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HitEntity } from './hit.entity';
import {HitController} from "./hit.controller";
import {HitService} from "./hit.service";
import {AuthModule} from "../auth/auth.module";
import {UserModule} from "../users/user.module";
import {UserService} from "../users/user.service";

@Module({
    imports: [TypeOrmModule.forFeature([HitEntity]), AuthModule, UserModule],
    providers: [HitService, UserService],
    exports: [TypeOrmModule],
    controllers: [HitController]
})
export class HitModule {}