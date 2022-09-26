import { HttpException, HttpStatus, Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

import { Not } from "typeorm"

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async getAllExceptMe(userId: number) {
        return await this.userRepository.find({
            where: {
                id: Not(userId)
            }
        })
    }

    async getUserbyUsername(username: string) {
        const [user] = await this.userRepository.find({
            where: { username }
        })

        return user
    }

    async create(createUserDto: CreateUserDto) {
        const userExists = await this.checkIfUserExists(createUserDto.username)

        if (userExists) {
            throw new HttpException('User already exists', HttpStatus.NOT_ACCEPTABLE)
        }

        try {
            await this.userRepository.save(createUserDto)
            return HttpStatus.CREATED
        } catch (error) {
            throw new NotAcceptableException()
        }
    }

    async checkIfUserExists(username: string) {
        const user = await this.userRepository.findOne({
            where: { username }
        })

        return !!user
    }

}
