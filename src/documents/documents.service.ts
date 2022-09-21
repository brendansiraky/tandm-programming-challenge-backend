import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as fs from 'fs'

import { UploadDocumentDto } from './dto/upload-document.dto';
import { Document } from './entities/document.entity';

@Injectable()
export class DocumentsService {
    constructor(
        @InjectRepository(Document)
        private documentRepository: Repository<Document>,
    ) {}

    async getAll() {
        return await this.documentRepository.find()
    }

    async getMine(userId: number) {
        return await this.documentRepository.find({
            where: { userId }
        })
    }

    async getDocumentById(id: number) {
        return await this.documentRepository.findOne({
            where: { id }
        })
    }

    async checkIsMine(documentId: number, userId: number) {
        const document = await this.documentRepository.findOne({
            where: {
                userId,
                id: documentId
            }
        })

        return !!document
    }

    async delete(id: number) {
        const documentToDelete = await this.getDocumentById(id)
        fs.unlink(documentToDelete.path, () => {})

        return await this.documentRepository.delete(id)
    }

    async uploadDocument(uploadDocumentDto: UploadDocumentDto) {
        return await this.documentRepository.save(uploadDocumentDto)
    }
}
