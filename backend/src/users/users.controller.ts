import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Delete,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { TipoUsuario } from '../common/enums/tipo-usuario.enum';
import { ParseIntPipe } from '@nestjs/common';
import { Param } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles(TipoUsuario.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  create(@Body() data: CreateUserDto) {
    return this.usersService.create(data);
  }

  @Roles(TipoUsuario.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('perfil')
  getProfile(@Request() req) {
    return req.user;
  }

  @Roles(TipoUsuario.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Roles(TipoUsuario.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
