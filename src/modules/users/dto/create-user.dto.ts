import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'O campo name não pode ser vazio' })
  @IsString({ message: 'O campo name deve ser uma string' })
  name: string;

  @IsNotEmpty({ message: 'O campo email não pode ser vazio' })
  @IsEmail()
  email: string;

  @MinLength(8, {
    message: 'O campo password precisa ter no mínimo 8 caracteres',
  })
  @IsString({ message: 'O campo password deve ser uma string' })
  @IsNotEmpty({ message: 'O campo password não pode ser vazio' })
  password: string;
}

// Senha com no mínimo 8 caracteres, letra maiuscula e minuscula, numero e caractere especial
// @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/)
