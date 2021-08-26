import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @BeforeUpdate()
  @BeforeInsert()
  trimName() {
    if (this?.name) {
      this.name = this.name.trim();
    }
  }

  @BeforeUpdate()
  @BeforeInsert()
  lowercaseEmail() {
    if (this?.email) {
      this.email = this.email.toLowerCase().trim();
    }
  }

  @BeforeUpdate()
  @BeforeInsert()
  async hashPassword() {
    if (this?.password) {
      this.password = await bcrypt.hash(this.password, 12);
    }
  }
}
