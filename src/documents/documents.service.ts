import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import * as fs from 'fs'

import { UploadDocumentDto } from './dto/upload-document.dto';
import { Document } from './entities/document.entity';
import { SharedDocumentsService } from 'src/shared_documents/shared_documents.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class DocumentsService {
    constructor(
        @InjectRepository(Document)
        private documentRepository: Repository<Document>,

        private sharedDocumentsService: SharedDocumentsService,
        private usersServive: UsersService
    ) {}

    async getDocument(documentId: number, userId: number) {
        const { sharedDocuments, userId: id,  ...rest } = await this.documentRepository.findOne({
            where: {
                id: documentId
            },
            relations: {
                sharedDocuments: true,
            },
        })

        const users = await this.usersServive.getAllExceptMe(userId)

        const shareState = users.reduce((acc, cur) => {
            if (sharedDocuments.length === 0) {
                acc.shareable.push(cur)
                return acc
            }

            if (sharedDocuments.some(s => s.userId === cur.id)) {
                acc.shared.push(cur)
            } else {
                acc.shareable.push(cur)
            }

            return acc
        }, { shared: [], shareable: [] })

        const mapUsers = (users) => {
            return users.map(user => ({
                id: user.id,
                username: user.username
            }))
        }

        return {
            ...rest,
            shared: mapUsers(shareState.shared),
            shareable: mapUsers(shareState.shareable)
        }
    }

    async getMine(userId: number) {
        return await this.documentRepository.find({
            where: { userId },
        })
    }

    async getAllDocumentOwners(documentIds: number[]) {
        const documents = await this.documentRepository.find({
            relations: {
                user: true
            },
            where: { id: In(documentIds) }
        })

        return documents.map(document => ({
            id: document.id,
            user: document.user,
        }))
    }

    async getDocumentById(id: number) {
        return await this.documentRepository.findOne({
            where: { id },
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
        try {
            await this.sharedDocumentsService.delete(id)

            const documentToDelete = await this.getDocumentById(id)
            fs.unlink(documentToDelete.path, () => {})
    
            return await this.documentRepository.delete(id)
        } catch (error) {
            throw new NotAcceptableException()   
        }
    }

    async uploadDocument(uploadDocumentDto: UploadDocumentDto) {
        return await this.documentRepository.save(uploadDocumentDto)
    }
}
