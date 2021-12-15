import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import {ConfigService} from "@nestjs/config";
import {UserEntity} from "../user.entity";
import {JwtValidateResponseDto} from "../dto/jwt-validate-response.dto";
import {UserService} from "../user.service";
import {ExtractJwt, Strategy} from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'some-secret',
      ignoreExpiration: true,
    });
  }

  public async validate({
    id,
    ppid,
  }: JwtValidateResponseDto): Promise<UserEntity> {
    return this.userService.validateUser({ id, ppid });
  }
}
