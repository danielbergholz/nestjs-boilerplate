import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { User } from 'src/modules/users/entities/user.entity';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(user: User) {
    const payload = {
      sub: user.id,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: this.usersService.removeUnwantedFields(user),
    };
  }

  async comparePasswords(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);

    if (user) {
      const passwordsMatch = await this.comparePasswords(pass, user.password);

      if (passwordsMatch) {
        return user;
      }
    }

    return null;
  }
}
