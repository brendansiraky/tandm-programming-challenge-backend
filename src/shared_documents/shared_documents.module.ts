import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentsModule } from 'src/documents/documents.module';
import { SharedDocument } from './entities/shared_document.entity';
import { SharedDocumentsController } from './shared_documents.controller';
import { SharedDocumentsService } from './shared_documents.service';

@Module({
	imports: [TypeOrmModule.forFeature([SharedDocument]), forwardRef(() => DocumentsModule)],
	controllers: [SharedDocumentsController],
	providers: [SharedDocumentsService],
	exports: [SharedDocumentsService]
})
export class SharedDocumentsModule { }
