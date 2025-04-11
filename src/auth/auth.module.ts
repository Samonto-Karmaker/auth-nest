import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UserModule } from "src/user/user.module";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { config } from "dotenv";

config(); // Load environment variables from .env file

@Module({
    imports: [
        UserModule, // Import UserModule to access user-related functionality
        PassportModule.register({ defaultStrategy: "jwt" }), // Register Passport with JWT strategy
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: process.env.JWT_EXPIRES_IN }, // Set JWT expiration time
        }),
    ],
    providers: [AuthService],
    controllers: [AuthController],
})
export class AuthModule {}
