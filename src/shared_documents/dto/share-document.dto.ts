import { IsNumber } from 'class-validator';

export class ShareDocumentDto {
    @IsNumber()
    userId: number;
}