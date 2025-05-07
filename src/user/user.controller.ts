import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { RegisterUserDto } from "./dto/registerUser.dto";
import { JwtAuthGuard } from "src/auth/jwt/jwt.guard";
import { User } from "src/common/decorator/user.decorator";
import { RoleGuard } from "src/auth/guard/role/role.guard";
import { Roles } from "src/common/decorator/role.decorator";
import { UserRole } from "./interface/user.interface";
import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiExtraModels,
    ApiForbiddenResponse,
    ApiInternalServerErrorResponse,
    ApiNotFoundResponse,
    ApiOperation,
    ApiResponse,
    ApiTags,
    ApiUnauthorizedResponse,
    getSchemaPath,
} from "@nestjs/swagger";
import { UserInfoDto } from "./dto/userInfo.dto";

@ApiExtraModels(UserInfoDto)
@ApiTags("User")
@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post("/register")
    @ApiOperation({
        summary: "Register a new user",
        description: "Endpoint to register a new user.",
    })
    @ApiResponse({
        status: 201,
        description: "User registered successfully.",
    })
    @ApiBadRequestResponse({
        description: "User already exists.",
    })
    @ApiInternalServerErrorResponse({
        description: "Internal server error.",
    })
    registerUser(@Body() userData: RegisterUserDto) {
        return this.userService.registerUser(userData);
    }

    @Get("/")
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth("access-token")
    @ApiOperation({
        summary: "Get all users",
        description: "Endpoint to get all users.",
    })
    @ApiResponse({
        status: 200,
        description: "List of users.",
        schema: {
            type: "array",
            items: {
                $ref: getSchemaPath("UserInfoDto"),
            },
        },
    })
    @ApiUnauthorizedResponse({
        description: "Unauthorized",
    })
    @ApiInternalServerErrorResponse({
        description: "Internal server error.",
    })
    getAllUsers() {
        return this.userService.getAllUsers();
    }

    @Get("/me")
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth("access-token")
    @ApiOperation({
        summary: "Get current user",
        description: "Endpoint to get the current user.",
    })
    @ApiResponse({
        status: 200,
        description: "Current user details.",
        schema: {
            $ref: getSchemaPath("UserInfoDto"),
        },
    })
    @ApiNotFoundResponse({
        description: "User not found.",
    })
    @ApiUnauthorizedResponse({
        description: "Unauthorized",
    })
    @ApiInternalServerErrorResponse({
        description: "Internal server error.",
    })
    getMe(@User("userId") userId: number) {
        return this.userService.getMe(userId);
    }

    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles(UserRole.USER)
    @Get("/user-page")
    @ApiBearerAuth("access-token")
    @ApiOperation({
        summary: "Get user page",
        description: "Endpoint to get user page. Only accessible to users.",
    })
    @ApiResponse({
        status: 200,
        description: "User page",
    })
    @ApiUnauthorizedResponse({
        description: "Unauthorized",
    })
    @ApiForbiddenResponse({
        description: "Forbidden",
    })
    getUserPage() {
        return "User page";
    }

    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles(UserRole.ADMIN)
    @Get("/admin-page")
    @ApiBearerAuth("access-token")
    @ApiOperation({
        summary: "Get admin page",
        description: "Endpoint to get admin page. Only accessible to admins.",
    })
    @ApiResponse({
        status: 200,
        description: "Admin page",
    })
    @ApiUnauthorizedResponse({
        description: "Unauthorized",
    })
    @ApiForbiddenResponse({
        description: "Forbidden",
    })
    getAdminPage() {
        return "Admin page";
    }
}
