import { forwardRef, HttpException, HttpStatus, Inject, Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DocumentsService } from 'src/documents/documents.service';
import { Repository } from 'typeorm';
import { ShareDocumentDto } from './dto/share-document.dto';
import { UnshareDocumentDto } from './dto/unshare-document.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { SharedDocument } from './entities/shared_document.entity';

@Injectable()
export class SharedDocumentsService {
    constructor(
        @InjectRepository(SharedDocument)
        private sharedDocumentRepository: Repository<SharedDocument>,

        @Inject(forwardRef(() => DocumentsService))
        private documentsService: DocumentsService
    ) { }

    async share(shareDocumentDto: ShareDocumentDto, documentId: number) {
        const shareAlreadyExists = await this.sharedDocumentRepository.findOne({
            where: {
                userId: shareDocumentDto.userId,
                documentId
            }
        })

        if (shareAlreadyExists) {
            throw new HttpException('You have already shared this document with this user.', HttpStatus.NOT_ACCEPTABLE)
        }

        try {
            const saved = await this.sharedDocumentRepository.save({
                ...shareDocumentDto,
                documentId
            })
            return saved
        } catch (error) {
            throw new NotAcceptableException()
        }

    }

    async unshare(unshareDocumentDto: UnshareDocumentDto) {
        return await this.sharedDocumentRepository.delete({
            userId: unshareDocumentDto.userId,
            documentId: unshareDocumentDto.documentId
        })
    }

    async getAll(userId: number) {
        const documents = await this.sharedDocumentRepository.find({
            where: {
                userId,
            },
            relations: {
                document: true,
                user: true,
            }
        })

       const documentsWithUser = await this.documentsService.getAllDocumentOwners(documents.map(d => d.documentId))

        return documents.map(document => ({
            id: document.id,
            sharedBy: documentsWithUser.find(dwu => dwu.id === document.documentId)?.user?.username,
            name: document.document.name,
            path: document.document.path,
            comment: document.comment
        }))
    }

    async checkIsAuthorized(documentId: number, userId: number) {
        const document = await this.sharedDocumentRepository.findOne({
            where: {
                id: documentId,
                userId
            }
        })

        return !!document
    } 

    async updateComment(updateCommentDto: UpdateCommentDto) {
        const { comment, documentId } = updateCommentDto
        return await this.sharedDocumentRepository.update({ id: documentId }, { comment })
    }

    async delete(documentId: number) {
        return await this.sharedDocumentRepository.delete({ documentId })
    }

}
