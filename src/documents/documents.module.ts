import { forwardRef, Module } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { DocumentsController } from './documents.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Document } from './entities/document.entity';
import { SharedDocumentsModule } from 'src/shared_documents/shared_documents.module';
import { UsersModule } from 'src/users/users.module';

@Module({
	imports: [TypeOrmModule.forFeature([Document]), SharedDocumentsModule, UsersModule],
	providers: [DocumentsService],
	controllers: [DocumentsController],
	exports: [DocumentsService]
})
export class DocumentsModule { }
