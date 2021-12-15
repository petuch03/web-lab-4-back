import {
    IsEmail, Matches,
    MaxLength,
    MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @MinLength(1)
    @MaxLength(50)
    @ApiProperty({ example: 'John' })
    public readonly firstName: string;

    @MinLength(1)
    @MaxLength(50)
    @ApiProperty({ example: 'Doe' })
    public readonly lastName: string;

    @IsEmail()
    @ApiProperty({ example: 'itmo.kruta@internet.ru', maxLength: 320 })
    public readonly email: string;

    @Matches('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=\\S+$).{8,32}$')
    @MaxLength(64)
    @ApiProperty({ example: 'Qwerty1!' })
    public readonly password: string;
}
