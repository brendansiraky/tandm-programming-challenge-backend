import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async getUserbyUsername(username: string) {
        const [user] = await this.userRepository.find({
            where: { username }
        })

        return user
    }

    async create(createUserDto: CreateUserDto) {
        try {
            await this.userRepository.save(createUserDto)
            return HttpStatus.CREATED
        } catch (error) {
            return HttpStatus.NOT_ACCEPTABLE
        }
    }

}
