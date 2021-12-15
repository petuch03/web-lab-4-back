import { Controller, Get } from '@nestjs/common';
import { HitService } from './hit.service';

@Controller('hit')
export class HitController {
    constructor(private readonly hitService: HitService) {}

    @Get('overview')
    findAll(): Promise<any> {
        return this.hitService.findAll();
    }
}
