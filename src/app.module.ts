import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { typeOrmConfig } from './config/typeorm.config';
import { UsersModule } from './users/users.module';
import { DocumentsModule } from './documents/documents.module';
import { StorageController } from './storage/storage.controller';

@Module({
	imports: [
		TypeOrmModule.forRoot(typeOrmConfig),
		UsersModule,
		AuthModule,
		DocumentsModule,
	],
	controllers: [StorageController],
})
export class AppModule { }
