import { MinLength, MaxLength, IsString, IsNotEmpty } from 'class-validator';

export class CreateUserDto {

    @MinLength(2, { message: 'Username is too short' })
    @MaxLength(28, { message: 'Password is too long' })
    @IsNotEmpty()
    username: string;

    @MinLength(6, { message: 'Password is too short' })
    @MaxLength(20, { message: 'Password is too long' })
    @IsString()
    @IsNotEmpty()
    password: string;

    role: string

}