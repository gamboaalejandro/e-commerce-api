export class SuccessResponse<T> {
  status: number = 200;
  message: string = 'Success';
  data?: T; // 📌 Propiedad genérica para cualquier tipo de dato

  constructor(data?: T) {
    if (data) {
      this.data = data;
    }
  }
}

export class ResponseLoginDto extends SuccessResponse<{ token: string }> {
  constructor(token: string) {
    super({ token });
  }
}
