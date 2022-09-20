import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService
    ) {}

    @Post()
    @UsePipes(ValidationPipe)
    async createUser(@Body() user: CreateUserDto) {
        return await this.usersService.create(user)
    }
}
