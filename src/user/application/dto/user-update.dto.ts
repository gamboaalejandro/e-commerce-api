export class UpdateUserDto {
  username?: string;
  address?: string;
  email?: string;
  role?: number;

  constructor(username: string, email: string, address?: string) {
    this.username = username;
    this.email = email;
    this.address = address;
  }
}
