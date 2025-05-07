import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import {
    ApiNotFoundResponse,
    ApiOperation,
    ApiResponse,
    ApiUnauthorizedResponse,
} from "@nestjs/swagger";

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("/")
    @ApiOperation({
        summary: "Login",
        description: "Endpoint to login a user.",
    })
    @ApiResponse({
        status: 201,
        description: "User logged in successfully.",
    })
    @ApiUnauthorizedResponse({
        description: "Invalid credentials.",
    })
    @ApiNotFoundResponse({
        description: "User not found.",
    })
    async login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }
}
