import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';

import { JwtAuthGuard } from '../../modules/auth/guards/jwt-auth.guard';
import { IdDto } from '../../shared/dto/id.dto';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthMiddlewareRequest } from '../../shared/dto/auth-middleware.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param() idDto: IdDto) {
    return this.usersService.findOne(idDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  showProfile(@Request() req: AuthMiddlewareRequest) {
    return this.usersService.showProfile(req);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/profile')
  updateProfile(
    @Body() updateUserDto: UpdateUserDto,
    @Request() req: AuthMiddlewareRequest,
  ) {
    return this.usersService.updateProfile(req, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param() idDto: IdDto, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(idDto, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param() idDto: IdDto) {
    return this.usersService.remove(idDto);
  }
}
