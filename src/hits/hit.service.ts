import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {HitEntity} from "./hit.entity";

@Injectable()
export class HitService {
    constructor(
        @InjectRepository(HitEntity)
        private usersRepository: Repository<HitEntity>,
    ) {}

    findAll(): Promise<HitEntity[]> {
        return this.usersRepository.find();
    }

    findOne(id: string): Promise<HitEntity> {
        return this.usersRepository.findOne(id);
    }

    async remove(id: string): Promise<void> {
        await this.usersRepository.delete(id);
    }
}