import { Entity, Column } from 'typeorm';

@Entity()
export class Tag {
    @Column('text')
    text: string;
}
