import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { DocumentsService } from 'src/documents/documents.service';
import { ShareDocumentDto } from './dto/share-document.dto';
import { SharedDocumentsService } from './shared_documents.service';

@Controller('shared-documents')
export class SharedDocumentsController {
    constructor(
        private sharedDocumentsService: SharedDocumentsService,
        private documentsService: DocumentsService
    ) {}

    @UseGuards(JwtAuthGuard)
    @Post(':documentId')
    async share(@Body() shareDocumentDto: ShareDocumentDto, @Param('documentId') documentId: number, @Request() req: any) {
        if (req.user.id === Number(shareDocumentDto.userId)) {
            throw new HttpException('You cannot share this with yourself', HttpStatus.NOT_ACCEPTABLE)
        }

        const isAuthorized = await this.documentsService.checkIsMine(documentId, req.user.id)

        if (!isAuthorized) {
            throw new UnauthorizedException()
        }

        return await this.sharedDocumentsService.share(shareDocumentDto, documentId)
    }

    @UseGuards(JwtAuthGuard)
    @Patch('/comment/:documentId')
    async updateComment(@Body() updateCommentDto: { comment: string }, @Param('documentId') documentId: number, @Request() req: any) {
        const isAuthorized = await this.sharedDocumentsService.checkIsAuthorized(documentId, req.user.id)

        if (!isAuthorized) {
            throw new UnauthorizedException()
        }

        return await this.sharedDocumentsService.updateComment({ comment: updateCommentDto.comment, documentId })
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getAll(@Request() req: any) {
        return await this.sharedDocumentsService.getAll(req.user.id)
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':documentId/:userId')
    async unshare(@Param('documentId') documentId: number, @Param('userId') userId: number, @Request() req: any) {
        const isAuthorized = await this.documentsService.checkIsMine(documentId, req.user.id)
        if (!isAuthorized) {
            throw new UnauthorizedException()
        }

        return await this.sharedDocumentsService.unshare({ documentId, userId })
    }
}
