import {
    PrimaryGeneratedColumn,
    Column,
    Entity,
    CreateDateColumn,
    BeforeInsert,
} from 'typeorm';
import { hash, compare } from 'bcryptjs';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar', { unique: true })
    email: string;

    @Column('varchar')
    name: string;

    @Column('varchar')
    surname: string;

    @CreateDateColumn()
    created: Date;

    @Column({ unique: true })
    phone: number;

    @Column('text')
    password: string;

    @Column('varchar')
    fullName: string;

    @BeforeInsert()
    async hashPassword() {
        this.password = await hash(this.password, 10);
    }

    @BeforeInsert()
    getFullName() {
        this.fullName = this.name + ' ' + this.surname;
    }

    toResponse() {
        const { fullName, email, created, phone, id } = this;

        return {
            fullName,
            email,
            created,
            phone,
            id,
        };
    }

    async comparePasswords(password: string) {
        return await compare(password, this.password);
    }
}
