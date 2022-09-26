import { Body, Controller, Get, Post, Request, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
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

    @Get()
    @UseGuards(JwtAuthGuard)
    async getProfile(@Request() req: any) {
        return await this.usersService.getUserbyUsername(req.user.username)
    }
}
