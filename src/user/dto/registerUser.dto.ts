/* eslint-disable @typescript-eslint/no-unsafe-call */
import { UserRole } from "../interface/user.interface";
import {
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsString,
    MinLength,
} from "class-validator";

export class registerUserDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password: string;

    @IsEnum(UserRole)
    @IsNotEmpty()
    role: UserRole;
}
