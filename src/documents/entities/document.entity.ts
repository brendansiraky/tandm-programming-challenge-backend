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
}