import { IsString, IsNumber } from 'class-validator';

export class UploadDocumentDto {
    @IsString()
    name: string;

    @IsString()
    path: string;

    @IsNumber()
    userId: number;
}