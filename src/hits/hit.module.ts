import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HitEntity } from './hit.entity';
import {HitController} from "./hit.controller";
import {HitService} from "./hit.service";

@Module({
    imports: [TypeOrmModule.forFeature([HitEntity])],
    providers: [HitService],
    exports: [TypeOrmModule],
    controllers: [HitController]
})
export class HitModule {}