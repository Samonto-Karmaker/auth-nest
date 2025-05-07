import { ApiProperty } from "@nestjs/swagger";
import { UserRole } from "../interface/user.interface";

export class UserInfoDto {
    @ApiProperty({
        description: "ID of the user",
        example: 1,
        required: true,
        type: Number,
    })
    id: number;

    @ApiProperty({
        description: "Username of the user",
        example: "john_doe",
        required: true,
        type: String,
    })
    username: string;

    @ApiProperty({
        description: "Email of the user",
        example: "john.doe@example.com",
        required: true,
        format: "email",
        type: String,
    })
    email: string;

    @ApiProperty({
        description: "Role of the user",
        example: UserRole.USER,
        required: true,
        enum: UserRole,
        type: String,
    })
    role: UserRole;
}
