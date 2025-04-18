import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { registerUserDto } from "./dto/registerUser.dto";
import { JwtAuthGuard } from "src/auth/jwt/jwt.guard";
import { User } from "src/common/decorator/user.decorator";
import { RoleGuard } from "src/auth/guard/role/role.guard";
import { Roles } from "src/common/decorator/role.decorator";
import { UserRole } from "./interface/user.interface";

@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post("/register")
    registerUser(@Body() userData: registerUserDto) {
        return this.userService.registerUser(userData);
    }

    @Get("/")
    @UseGuards(JwtAuthGuard)
    getAllUsers() {
        return this.userService.getAllUsers();
    }

    @Get("/me")
    @UseGuards(JwtAuthGuard)
    getMe(@User("userId") userId: number) {
        return this.userService.getMe(userId);
    }

    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles(UserRole.USER)
    @Get("/user-page")
    getUserPage() {
        return "User page";
    }

    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles(UserRole.ADMIN)
    @Get("/admin-page")
    getAdminPage() {
        return "Admin page";
    }
}
