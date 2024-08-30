import { AuthenticationService } from "../interfaces/AuthenticationService";

export class SignInWithGitHubUseCase {
  constructor(private authService: AuthenticationService) {}

  async execute(): Promise<void> {
    await this.authService.signInWithGitHub();
  }
}
