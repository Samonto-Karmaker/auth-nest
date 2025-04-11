import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { registerUserDto } from "./dto/registerUser.dto";

@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    getAllUsers() {
        return this.userService.getAllUsers();
    }

    @Post("/register")
    registerUser(@Body() userData: registerUserDto) {
        return this.userService.registerUser(userData);
    }
}
