import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";

@Module({
    imports: [TypeOrmModule.forFeature([User])], // Add your entities here
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService], // Export UserService if needed in other modules
})
export class UserModule {}
