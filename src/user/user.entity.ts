import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { UserInterface, UserRole } from "./interface/user.interface";

@Entity({ name: "users" })
export class User implements UserInterface {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar" })
    username: string;

    @Column({ type: "varchar", unique: true })
    email: string;

    @Column({ type: "varchar" })
    password: string;

    @Column({ type: "enum", enum: UserRole, default: UserRole.USER })
    role: UserRole;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @Column({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
        onUpdate: "CURRENT_TIMESTAMP",
    })
    updatedAt: Date;
}
