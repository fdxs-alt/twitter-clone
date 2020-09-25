import { Tweet } from './Tweet.entity';
import { Background } from './Background.entity';
import { Avatar } from './Avatar.entity';
import {
    PrimaryGeneratedColumn,
    Column,
    Entity,
    CreateDateColumn,
    BeforeInsert,
    AfterInsert,
    BaseEntity,
    JoinColumn,
    OneToOne,
    ManyToMany,
    JoinTable,
    OneToMany,
} from 'typeorm';
import { hash, compare } from 'bcryptjs';
import { createTransport } from 'nodemailer';

@Entity()
export class User extends BaseEntity {
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

    @Column('numeric', { unique: true })
    phone: number;

    @Column('text')
    password: string;

    @Column('varchar')
    fullName: string;

    @Column('varchar', { unique: true })
    userName: string;

    @Column('boolean', { default: false })
    confirmed: boolean;

    @Column('int', { nullable: true })
    code: number;

    @Column('text', { nullable: true })
    profileLink: string;

    @Column('varchar', { nullable: true })
    country: string;

    @Column('varchar', { nullable: true })
    city: string;

    @Column('text', { nullable: true })
    description: string;

    @ManyToMany(
        () => User,
        user => user.following,
    )
    @JoinTable()
    followers: User[];

    @ManyToMany(
        () => User,
        user => user.followers,
    )
    following: User[];

    @OneToMany(
        () => Tweet,
        tweets => tweets.user,
    )
    tweets: Tweet[];

    @ManyToMany(
        () => Tweet,
        tweet => tweet.userRe,
    )
    @JoinTable()
    retweets: Tweet[];

    @JoinColumn()
    @OneToOne(() => Avatar, {
        eager: true,
        nullable: true,
    })
    avatar?: Avatar;

    @JoinColumn()
    @OneToOne(() => Background, {
        eager: true,
        nullable: true,
    })
    background?: Background;

    @BeforeInsert()
    async hashPassword() {
        this.password = await hash(this.password, 10);
    }

    @BeforeInsert()
    getCode() {
        this.code = Math.floor(1000 + Math.random() * 9000);
    }

    @BeforeInsert()
    getFullName() {
        this.fullName = this.name + ' ' + this.surname;
    }

    async comparePasswords(password: string) {
        return await compare(password, this.password);
    }

    async verifyUser(code: number) {
        if (code === this.code) {
            this.confirmed = true;
            await this.save();
            return true;
        } else return false;
    }

    @AfterInsert()
    async sendEmail() {
        try {
            const transporter = createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.email,
                    pass: process.env.pass,
                },
                logger: true,
            });

            await transporter.sendMail({
                from: 'verify@twitter.com',
                to: this.email,
                subject: `${this.code} is your code`,
                html: `
                <div>
                <h1>Confirm your email</h1>
                <p>To start using twitter, pass the veification code:</p>
                <h1>${this.code}</h1>
                </div>   
                `,
            });
        } catch (error) {
            return;
        }
    }
}
