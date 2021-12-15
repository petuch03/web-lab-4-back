import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {HitModule} from "./hits/hit.module";
import {UserModule} from "./users/user.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Connection} from 'typeorm';

@Module({
    imports: [TypeOrmModule.forRoot(), HitModule, UserModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
    constructor(private connection: Connection) {
    }
}
