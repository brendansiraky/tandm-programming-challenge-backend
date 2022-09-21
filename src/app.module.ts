import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { typeOrmConfig } from './config/typeorm.config';
import { UsersModule } from './users/users.module';
import { DocumentsModule } from './documents/documents.module';
import { SharedDocumentsModule } from './shared_documents/shared_documents.module';
import { StorageModule } from './storage/storage.module';

@Module({
	imports: [
		TypeOrmModule.forRoot(typeOrmConfig),
		UsersModule,
		AuthModule,
		DocumentsModule,
		SharedDocumentsModule,
		StorageModule,
	],
})
export class AppModule { }
