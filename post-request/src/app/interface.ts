export class UserInfo {
  status: string;
  message: string;
  token: string;
  constructor(status: string, message: string, token: string) {
    this.status = status;
    this.message = message;
    this.token = token;
  }
}
