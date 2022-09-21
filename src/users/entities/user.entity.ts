import { Document } from 'src/documents/entities/document.entity';
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

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
}