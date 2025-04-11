import { Injectable } from "@nestjs/common";
import { registerUserDto } from "./dtos/registerUser.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
    // This is a placeholder for the actual user data source
    private users: registerUserDto[] = [];

    // Method to register a new user
    async registerUser(userData: registerUserDto) {
        const newUser = { ...userData };
        newUser.password = await bcrypt.hash(userData.password, 10); // Hash the password
        this.users.push(newUser);
        return newUser;
    }

    // Method to get all users
    getAllUsers() {
        return this.users;
    }
}
