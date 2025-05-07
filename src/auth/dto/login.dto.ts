import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
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
        type: String,
    })
    @IsNotEmpty()
    @IsString()
    password: string;
}
