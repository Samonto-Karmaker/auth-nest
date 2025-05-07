import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { RegisterUserDto } from "./dto/registerUser.dto";
import { JwtAuthGuard } from "src/auth/jwt/jwt.guard";
import { User } from "src/common/decorator/user.decorator";
import { RoleGuard } from "src/auth/guard/role/role.guard";
import { Roles } from "src/common/decorator/role.decorator";
import { UserRole } from "./interface/user.interface";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags("User")
@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post("/register")
    @ApiOperation({
        summary: "Register a new user",
        description: "Endpoint to register a new user.",
    })
    registerUser(@Body() userData: RegisterUserDto) {
        return this.userService.registerUser(userData);
    }

    @Get("/")
    @UseGuards(JwtAuthGuard)
    @ApiOperation({
        summary: "Get all users",
        description: "Endpoint to get all users.",
    })
    getAllUsers() {
        return this.userService.getAllUsers();
    }

    @Get("/me")
    @UseGuards(JwtAuthGuard)
    @ApiOperation({
        summary: "Get current user",
        description: "Endpoint to get the current user.",
    })
    getMe(@User("userId") userId: number) {
        return this.userService.getMe(userId);
    }

    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles(UserRole.USER)
    @Get("/user-page")
    @ApiOperation({
        summary: "Get user page",
        description: "Endpoint to get user page. Only accessible to users.",
    })
    getUserPage() {
        return "User page";
    }

    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles(UserRole.ADMIN)
    @Get("/admin-page")
    @ApiOperation({
        summary: "Get admin page",
        description: "Endpoint to get admin page. Only accessible to admins.",
    })
    getAdminPage() {
        return "Admin page";
    }
}
