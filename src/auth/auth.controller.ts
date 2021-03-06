import {Controller, Request, Post, UseGuards, Body, Get} from '@nestjs/common';
import {LocalAuthGuard} from "./guards/local-auth.guard";
import {AuthService} from "./auth.service";
import {JwtAuthGuard} from "./guards/jwt.guard";
import {JwtResponseDto} from "./dto/jwt-response.dto";
import {CreateUserDto} from "./dto/create-user.dto";
import {ApiImplicitBody} from "@nestjs/swagger/dist/decorators/api-implicit-body.decorator";
import {CredentialsDto} from "./dto/credentials.dto";
import {ApiBearerAuth, ApiOkResponse, ApiTags} from "@nestjs/swagger";

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService) {}

    @Post('signin')
    @UseGuards(LocalAuthGuard)
    @ApiImplicitBody({ name: '', type: CredentialsDto, content: {} })
    @ApiOkResponse({ description: 'access Token' })
    public async signin(@Request() req): Promise<JwtResponseDto> {
        return this.authService.signin(req.user);
    }

    @Post('signup')
    @ApiOkResponse({ description: 'access Token' })
    public async signup(@Body() data: CreateUserDto): Promise<JwtResponseDto> {
        return this.authService.signup(data);
    }

    @Get('profile')
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    async getProfile(@Request() req) {
        return req.user;
    }
}