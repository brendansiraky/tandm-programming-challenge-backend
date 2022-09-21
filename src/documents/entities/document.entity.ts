import { SharedDocument } from 'src/shared_documents/entities/shared_document.entity';
import { User } from 'src/users/entities/user.entity';
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Document extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false,
    })
    name: string;

    @Column({
        nullable: false
    })
    path: string;

    @Column({
        nullable: false
    })
    userId: number
    @ManyToOne(() => User, (user) => user.documents)
    user: User

    @OneToMany(() => SharedDocument, (sharedDocument) => sharedDocument.document)
    sharedDocuments: SharedDocument[]
}