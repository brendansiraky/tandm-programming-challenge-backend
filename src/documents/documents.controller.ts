import { Controller, Delete, Get, NotAcceptableException, Param, Post, Request, UnauthorizedException, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer'

import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { DocumentsService } from './documents.service';

@Controller('documents')
export class DocumentsController {
    constructor(
        private readonly documentsService: DocumentsService
    ) { }

    @UseGuards(JwtAuthGuard)
    @Get('mine')
    async getMine(@Request() req: any) {
        return await this.documentsService.getMine(req.user.id)
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getDocument(@Param('id') id: number, @Request() req: any) {
        try {
            const documentIsMine = await this.documentsService.checkIsMine(id, req.user.id)
            if (documentIsMine) {
                return await this.documentsService.getDocument(id, req.user.id)
            } else {
                throw new UnauthorizedException()
            }
        } catch (error) {
            throw new NotAcceptableException()
        }
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id') id: number, @Request() req: any) {
        try {
            const documentIsMine = await this.documentsService.checkIsMine(id, req.user.id)
            if (documentIsMine) {
                return await this.documentsService.delete(id)
            } else {
                throw new UnauthorizedException()
            }
        } catch (error) {
            throw new NotAcceptableException()
        }
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: 'storage/documents',
            filename: (req: any, file, cb) => {
                const date = new Date()
                const milliseconds = date.getMilliseconds().toString()
                const fileNameSplit = file.originalname.split(".")
                const fileName = fileNameSplit[0]
                const fileExtention = fileNameSplit[fileNameSplit.length - 1]

                cb(null, `${req.user.id}-${fileName}-${milliseconds}.${fileExtention}`)
            },
        }),
        limits: { fieldSize: 1024 * 1024 * 5 }
    }))
    async uploadDocument(@Request() req: any, @UploadedFile() file: Express.Multer.File) {
        return await this.documentsService.uploadDocument({
            name: file.originalname,
            path: file.path,
            userId: req.user.id
        })
    }
}

