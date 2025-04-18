import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./user/user.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeOrmConfig } from "./config/typeorm.config";
import { AuthModule } from "./auth/auth.module";

@Module({
    imports: [TypeOrmModule.forRoot(typeOrmConfig), UserModule, AuthModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
