import {ConflictException, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {HitEntity} from "./hit.entity";
import {UserEntity} from "../users/user.entity";

@Injectable()
export class HitService {
    constructor(
        @InjectRepository(HitEntity)
        private hitRepository: Repository<HitEntity>,
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>
    ) {
    }

    findAll(email: string): Promise<HitEntity[]> {
        return this.hitRepository.createQueryBuilder("hit")
            .where("hit.user = :email", { email: email })
            .getMany()
    }

    findOne(id: string): Promise<HitEntity> {
        return this.hitRepository.findOneOrFail(id);
    }

    async createOne(hitToCreate: Partial<HitEntity>, email: string): Promise<HitEntity> {
        hitToCreate.y = parseFloat(hitToCreate.y.toString().replace(',', '.'));
        if(isNaN(hitToCreate.y)) {
            throw new ConflictException('INVALID_Y');
        }
        return this.hitRepository.manager.transaction(async () => {
            const hitDB = {
                ...hitToCreate,
                res: await this.check(hitToCreate),
                current: new Date(),
                user: email
            };

            const entity = this.hitRepository.create(hitDB);

            return await this.hitRepository.save(entity).catch(() => {
                throw new ConflictException('troubles with saving');
            });
        });
    }

    async check(hitToCreate: Partial<HitEntity>): Promise<string> {
        let flag = false;
        if (hitToCreate.x < -4 || hitToCreate.x > 4) {
            throw new ConflictException('INVALID_X');
        }
        if (hitToCreate.y <= -3 || hitToCreate.y >= 5) {
            throw new ConflictException('INVALID_Y');
        }
        if (hitToCreate.r < -4 || hitToCreate.r > 4) {
            throw new ConflictException('INVALID_R');
        }

        if (hitToCreate.r > 0) {
            if (hitToCreate.y < (0-hitToCreate.x / 2 + hitToCreate.r / 2)
                && hitToCreate.y >= 0
                && hitToCreate.x >= 0) {
                flag = true;
            }
            if (hitToCreate.y >= 0
                && hitToCreate.x <= 0
                && Math.pow(hitToCreate.r, 2) > (Math.pow(hitToCreate.y, 2) + Math.pow(hitToCreate.x, 2))) {
                flag = true;
            }
            if (hitToCreate.y <= 0
                && hitToCreate.x <= 0
                && hitToCreate.x >= (-hitToCreate.r)
                && hitToCreate.y >= (-hitToCreate.r / 2)) {
                flag = true;
            }
        } else if (hitToCreate.r < 0) {
            if (hitToCreate.y > (0-hitToCreate.x / 2 + hitToCreate.r / 2)
                && hitToCreate.y <= 0
                && hitToCreate.x <= 0) {
                flag = true;
            }
            if (hitToCreate.y <= 0
                && hitToCreate.x >= 0
                && Math.pow(hitToCreate.r, 2) > (Math.pow(hitToCreate.y, 2) + Math.pow(hitToCreate.x, 2))) {
                flag = true;
            }
            if (hitToCreate.y >= 0
                && hitToCreate.x >= 0
                && hitToCreate.x <= (-hitToCreate.r)
                && hitToCreate.y <= (-hitToCreate.r / 2)) {
                flag = true;
            }
        } else if (hitToCreate.r == 0 && hitToCreate.x == 0 && hitToCreate.y == 0) {
            flag = true;
        }
        return flag ? 'true' : 'false';
    }
}