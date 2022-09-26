import { MinLength, MaxLength, IsString, IsNotEmpty } from 'class-validator';

export class CreateUserDto {

    @MinLength(2, { message: 'Username is too short' })
    @MaxLength(28, { message: 'Username is too long' })
    @IsNotEmpty()
    username: string;

    @MinLength(4, { message: 'Full Name is too short' })
    @MaxLength(48, { message: 'Full Name is too long' })
    @IsNotEmpty()
    full_name: string;

    @MinLength(6, { message: 'Password is too short' })
    @MaxLength(20, { message: 'Password is too long' })
    @IsString()
    @IsNotEmpty()
    password: string;
}