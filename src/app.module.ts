import {Module} from '@nestjs/common';
import {HitModule} from "./hits/hit.module";
import {UserModule} from "./users/user.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [TypeOrmModule.forRoot(), HitModule, UserModule, AuthModule],
    controllers: [],
    providers: [],
})
export class AppModule {
}
