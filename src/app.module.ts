import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { typeOrmConfig } from './config/typeorm.config';
import { UsersModule } from './users/users.module';

@Module({
	imports: [
		TypeOrmModule.forRoot(typeOrmConfig),
		UsersModule,
		AuthModule,
	],
})
export class AppModule { }
