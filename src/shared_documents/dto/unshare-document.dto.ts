import { IsNumber } from 'class-validator';

export class UnshareDocumentDto {
    @IsNumber()
    documentId: number

    @IsNumber()
    userId: number;
}