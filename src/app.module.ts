import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {HitModule} from "./hits/hit.module";
import {UserModule} from "./users/user.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import { AuthModule } from './auth/auth.module';
import {AuthController} from "./auth/auth.controller";

@Module({
    imports: [TypeOrmModule.forRoot(), HitModule, UserModule, AuthModule],
    controllers: [AppController, AuthController],
    providers: [AppService],
})
export class AppModule {
}
