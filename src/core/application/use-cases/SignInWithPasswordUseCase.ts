import { AuthenticationService } from "../interfaces/AuthenticationService";

export class SignInWithPasswordUseCase {
  constructor(private authService: AuthenticationService) {}

  async execute(email: string, password: string): Promise<boolean> {
    return await this.authService.signInWithPassword(email, password);
  }
}
