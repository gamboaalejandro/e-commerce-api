import {
  IsString,
  IsEmail,
  MinLength,
  IsOptional,
  IsInt,
  IsNotEmpty,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  @IsOptional()
  @IsInt({ message: 'Role must be an integer' })
  role?: number;

  constructor(
    username: string,
    email: string,
    password: string,
    address?: string,
    role?: number
  ) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.address = address;
    this.role = role ?? 1; // Rol por defecto: 1 (usuario normal)
  }
}
