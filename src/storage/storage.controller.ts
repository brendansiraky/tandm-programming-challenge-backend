import { Controller, Get, NotFoundException, Param, Res } from '@nestjs/common';
import { Response } from 'express'
import * as fs from 'fs'

@Controller('storage')
export class StorageController {

    @Get('documents/:path')
    getDocumentImage(@Param('path') path: string, @Res() res: Response) {
        const basePath = 'storage/documents'
        if (fs.existsSync(`${basePath}/${path}`)) {
            return res.sendFile(path, { root: basePath })
        }

        throw new NotFoundException()
    }
}
