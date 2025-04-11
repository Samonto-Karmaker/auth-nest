import { Body, Controller, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { registerUserDto } from "./dto/registerUser.dto";

@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post("/register")
    registerUser(@Body() userData: registerUserDto) {
        return this.userService.registerUser(userData);
    }
}
