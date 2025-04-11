import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { registerUserDto } from "./dto/registerUser.dto";
import { JwtAuthGuard } from "src/auth/jwt/jwt.guard";
import { User } from "src/common/decorator/user.decorator";

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
    getMe(@User("id") userId: number) {
        return this.userService.getMe(userId);
    }
}
