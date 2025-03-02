import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity("contacts")
export class Contact {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    phone: string;

    @Column({nullable: true})
    email: string;

    @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    createdAt: Date;
}