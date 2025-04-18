import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from "@nestjs/common";
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
                throw new BadRequestException("User already exists");
            }

            const hashedPassword = await bcrypt.hash(userData.password, 10);
            const newUser = this.userRepository.create({
                ...userData,
                password: hashedPassword,
            });
            return await this.userRepository.save(newUser);
        } catch (error) {
            console.error("Error registering user:", error);
            if (error instanceof BadRequestException) {
                throw error;
            }
            throw new InternalServerErrorException("Internal server error");
        }
    }

    async getAllUsers(): Promise<User[]> {
        try {
            return await this.userRepository.find();
        } catch (error) {
            console.error("Error fetching users:", error);
            throw new InternalServerErrorException("Internal server error");
        }
    }

    async getMe(userId: number): Promise<User> {
        try {
            const user = await this.userRepository.findOne({
                where: { id: userId },
                select: ["id", "email", "username", "role"],
            });
            if (!user) {
                throw new NotFoundException("User not found");
            }
            return user;
        } catch (error) {
            console.error("Error fetching user:", error);
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException("Internal server error");
        }
    }

    async getUserByEmail(email: string): Promise<User> {
        try {
            const user = await this.userRepository.findOne({
                where: { email },
            });

            if (!user) {
                throw new NotFoundException("User not found");
            }

            return user;
        } catch (error) {
            console.error("Error fetching user by email:", error);
            throw new InternalServerErrorException("Internal server error");
        }
    }
}
