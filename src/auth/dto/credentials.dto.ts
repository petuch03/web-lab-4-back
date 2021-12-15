import { IsNotEmpty, IsString } from 'class-validator';
import {ApiProperty, PickType} from '@nestjs/swagger';
import {UserEntity} from "../../users/user.entity";

export class CredentialsDto extends PickType(UserEntity, ["email", "password"]) {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'itmo.kruto@mail.ru'})
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'Qwerty1!'})
    readonly password: string;
}