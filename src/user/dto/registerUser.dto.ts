import { ApiProperty } from "@nestjs/swagger";
import { UserRole } from "../interface/user.interface";
import {
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsString,
    MinLength,
} from "class-validator";

export class registerUserDto {
    @ApiProperty({
        description: "Username of the user",
        example: "john_doe",
        required: true,
        type: String,
    })
    @IsString()
    @IsNotEmpty()
    username: string;

    @ApiProperty({
        description: "Email of the user",
        example: "john.doe@example.com",
        required: true,
        format: "email",
        type: String,
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        description: "Password of the user",
        example: "password123",
        required: true,
        format: "password",
        minLength: 6,
        type: String,
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password: string;

    @ApiProperty({
        description: "Role of the user",
        example: UserRole.USER,
        required: true,
        enum: UserRole,
        type: String,
    })
    @IsEnum(UserRole)
    @IsNotEmpty()
    role: UserRole;
}
