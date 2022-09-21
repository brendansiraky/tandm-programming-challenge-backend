import { IsNumber, IsString } from 'class-validator';

export class UpdateCommentDto {
    @IsNumber()
    documentId: number
    
    @IsString()
    comment: string;
}