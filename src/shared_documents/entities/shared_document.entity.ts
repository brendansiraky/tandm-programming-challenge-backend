import { Document } from 'src/documents/entities/document.entity';
import { User } from 'src/users/entities/user.entity';
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SharedDocument extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: true,
    })
    comment: string;

    @Column({
        nullable: false
    })
    userId: number
    @ManyToOne(() => User, (user) => user.sharedDocuments)
    user: User

    @Column({
        nullable: false
    })
    documentId: number
    @ManyToOne(() => Document, (document) => document.sharedDocuments)
    document: Document
}