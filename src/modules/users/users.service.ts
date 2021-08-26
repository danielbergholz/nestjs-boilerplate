import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { randomBytes } from 'crypto';

import { IdDto } from '../../shared/dto/id.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { AuthMiddlewareRequest } from '../../shared/dto/auth-middleware.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.find({
      order: { created_at: 'DESC' },
    });
  }

  async findOne(idDto: IdDto): Promise<User> {
    const { id } = idDto;

    // check if user exists
    const user = await this.usersRepository.findOne(id);

    if (!user) {
      throw new BadRequestException(`Usuário não encontrado`);
    }

    return user;
  }

  async showProfile(req: AuthMiddlewareRequest): Promise<User> {
    const { user: userFromJwt } = req;
    const { id } = userFromJwt;

    // check if user exists
    const user = await this.usersRepository.findOne(id);

    if (!user) {
      throw new BadRequestException(`O usuário com ID = ${id} não existe`);
    }

    return user;
  }

  async updateProfile(
    req: AuthMiddlewareRequest,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const { user: userFromJwt } = req;
    const { id } = userFromJwt;

    // check if user exists
    const user = await this.usersRepository.findOne(id);

    if (!user) {
      throw new BadRequestException(`O usuário com ID = ${id} não existe`);
    }

    // enable only name or password update
    const { name, password } = updateUserDto;

    // error if new fields are empty
    if (!name && !password) {
      throw new BadRequestException(
        `Os campos: name ou password precisam ser enviados no corpo da requisição`,
      );
    }

    // update user
    if (name) {
      user.name = name;
    }
    if (password) {
      user.password = password;
    }

    await this.usersRepository.save(user);

    return this.removeUnwantedFields(user);
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { name, password } = createUserDto;
    const email = createUserDto.email.toLowerCase();

    // check if user exists by the lowercase email
    const userExists = await this.usersRepository.findOne({
      where: { email },
    });

    if (userExists) {
      throw new BadRequestException(`O email ${email} não está disponível`);
    }

    // create new user
    const user = this.usersRepository.create({
      email,
      name,
      password,
    });

    await this.usersRepository.save(user);

    return this.removeUnwantedFields(user);
  }

  async update(idDto: IdDto, updateUserDto: UpdateUserDto): Promise<User> {
    const { id } = idDto;

    // check if user exists
    const user = await this.usersRepository.findOne(id);

    if (!user) {
      throw new BadRequestException(`O usuário com ID = ${id} não existe`);
    }

    // enable only name or password update
    const { name, password } = updateUserDto;

    // error if new fields are empty
    if (!name && !password) {
      throw new BadRequestException(
        `Os campos: name ou password precisam ser enviados no corpo da requisição`,
      );
    }

    // update user
    if (name) {
      user.name = name;
    }
    if (password) {
      user.password = password;
    }

    await this.usersRepository.save(user);

    return this.removeUnwantedFields(user);
  }

  async remove(idDto: IdDto): Promise<void> {
    const { id } = idDto;

    // check if user exists
    const user = await this.usersRepository.findOne(id);

    if (!user) {
      throw new BadRequestException(`O usuário com ID = ${id} não existe`);
    }

    await this.usersRepository.delete(id);
  }

  // CAUTION: this function returns the user WITH PASSWORD
  // it is used by the AuthService login
  async findByEmail(email: string): Promise<User> {
    if (!email) {
      throw new BadRequestException(`O campo email é obrigatório`);
    }

    email = email.toLowerCase();

    const user = await this.usersRepository.findOne({
      where: { email },
      select: ['id', 'name', 'email', 'password'],
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }

  removeUnwantedFields(user: User): User {
    delete user.password;
    delete user.created_at;
    delete user.updated_at;

    return user;
  }
}
