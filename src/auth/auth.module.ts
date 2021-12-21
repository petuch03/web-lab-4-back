import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {UserModule} from "../users/user.module";
import {PassportModule} from "@nestjs/passport";
import {LocalStrategy} from "./strategies/local.strategy";
import {AuthController} from "./auth.controller";
import {JwtModule} from "@nestjs/jwt";
import {JwtStrategy} from "./strategies/jwt.strategy";

@Module({
    imports: [
        UserModule,
        PassportModule,
        JwtModule.register({
            secret: 'labka_nomer_4',
            signOptions: {expiresIn: '604800s'},
        }),],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    exports: [AuthService, JwtStrategy],
    controllers: [AuthController],
})
export class AuthModule {
}
