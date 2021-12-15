import {Body, Controller, Get, Post} from '@nestjs/common';
import {UserService} from "./user.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {JwtResponseDto} from "./dto/jwt-response.dto";
import {CredentialsDto} from "./dto/credentials.dto";

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('overview')
    findAll(): Promise<any> {
        return this.userService.findAll();
    }

    @Post('signup')
    public async signup(@Body() data?: CreateUserDto): Promise<JwtResponseDto> {
        return this.userService.signup(data);
    }

    @Post('signin')
    public async createToken(@Body() data: CredentialsDto): Promise<JwtResponseDto> {
        return this.userService.createToken(data);
    }
}
