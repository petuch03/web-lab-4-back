import {ExtractJwt, Strategy} from 'passport-jwt';
import {PassportStrategy} from '@nestjs/passport';
import {Injectable} from '@nestjs/common';
import {UserEntity} from "../../users/user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'abobus322.b',
            usernameField: 'email',
        });
    }

    async validate(payload: any): Promise<Partial<UserEntity>> {
        return {id: payload.id || payload.sub, email: payload.email || payload.username};
    }
}