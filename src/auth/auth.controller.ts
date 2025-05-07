import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import {
    ApiExtraModels,
    ApiNotFoundResponse,
    ApiOperation,
    ApiResponse,
    ApiTags,
    ApiUnauthorizedResponse,
    getSchemaPath,
} from "@nestjs/swagger";
import { UserInfoDto } from "src/user/dto/userInfo.dto";

@ApiExtraModels(UserInfoDto)
@ApiTags("Auth")
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
        schema: {
            type: "object",
            properties: {
                accessToken: {
                    type: "string",
                    example: "jwt-access-token",
                },
                user: {
                    $ref: getSchemaPath("UserInfoDto"),
                },
            },
        },
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
