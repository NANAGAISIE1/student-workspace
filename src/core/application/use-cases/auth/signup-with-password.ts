import { AuthenticationService } from "../../interfaces/auth";

export class SignUpUseCase {
  constructor(private authService: AuthenticationService) {}

  async execute(email: string, password: string, name: string): Promise<void> {
    await this.authService.signUp(email, password, name);
  }
}
