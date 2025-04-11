import { Injectable } from "@nestjs/common";
import { registerUserDto } from "./dto/registerUser.dto";
import * as bcrypt from "bcrypt";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async registerUser(userData: registerUserDto): Promise<User> {
        try {
            // Check if the user already exists
            const existingUser = await this.userRepository.findOne({
                where: { email: userData.email },
                select: ["id", "email"],
            });

            if (existingUser) {
                throw new Error("User already exists");
            }

            const hashedPassword = await bcrypt.hash(userData.password, 10);
            const newUser = this.userRepository.create({
                ...userData,
                password: hashedPassword,
            });
            return await this.userRepository.save(newUser);
        } catch (error) {
            console.error("Error registering user:", error);
            if (error instanceof Error) {
                throw new Error(error.message);
            }
            throw new Error("Error registering user");
        }
    }
}
