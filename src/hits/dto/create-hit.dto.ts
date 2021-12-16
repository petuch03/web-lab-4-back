import {
    IsNumber, Max, Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateHitDto {

    @IsNumber()
    @Min(-4)
    @Max(4)
    @ApiProperty({ example: -1.13414 })
    public readonly x: number;

    @IsNumber()
    @Min(-3)
    @Max(5)
    @ApiProperty({ example: 0.1984234 })
    public readonly y: number;

    @IsNumber()
    @Min(-4)
    @Max(4)
    @ApiProperty({ example: 2.9138 })
    public readonly r: number;
}