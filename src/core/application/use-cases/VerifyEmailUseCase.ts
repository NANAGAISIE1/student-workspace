import { AuthenticationService } from "../interfaces/AuthenticationService";

export class VerifyEmailUseCase {
  constructor(private authService: AuthenticationService) {}

  async execute(email: string, code: string): Promise<boolean> {
    return await this.authService.verifyEmail(email, code);
  }
}
