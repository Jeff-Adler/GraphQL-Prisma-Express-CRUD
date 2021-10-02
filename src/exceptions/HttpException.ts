export class HttpException extends Error {
  public status: number;
  public message: string;
  public stack: string | undefined;

  constructor(status: number, message: string, stack?: string) {
    super(message);
    this.status = status;
    this.message = message;
    if (stack) {
      this.stack = stack;
    }
  }
}
