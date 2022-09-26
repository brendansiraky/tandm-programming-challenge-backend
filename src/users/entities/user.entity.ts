import { Document } from 'src/documents/entities/document.entity';
import { SharedDocument } from 'src/shared_documents/entities/shared_document.entity';
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false,
    })
    full_name: string;

    @Column({
        nullable: false,
        unique: true
    })
    username: string;

    @Column({
        nullable: false
    })
    password: string;

    @OneToMany(() => Document, (document) => document.user)
    documents: Document[]

    @OneToMany(() => SharedDocument, (sharedDocument) => sharedDocument.user)
    sharedDocuments: SharedDocument[]
}