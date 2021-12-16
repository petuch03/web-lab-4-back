import {Body, Controller, Get, Post, UseGuards, Request} from '@nestjs/common';
import {HitService} from './hit.service';
import {JwtAuthGuard} from "../auth/guards/jwt.guard";
import {CreateHitDto} from "./dto/create-hit.dto";
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";

@ApiTags('hit')
@Controller('hit')
export class HitController {
    constructor(private readonly hitService: HitService) {
    }

    @Get('overview')
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    async findAll(@Request() req): Promise<any> {
        const email = req.user.email;
        return this.hitService.findAll(email);
    }

    @Post('check')
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    async check(@Body() data: CreateHitDto, @Request() req): Promise<any> {
        const email = req.user.email;
        return this.hitService.createOne(data, email);
    }
}
