export interface AuthenticationService {
  signInWithGitHub(): Promise<void>;
  signInWithGoogle(): Promise<void>;
  signInWithPassword(email: string, password: string): Promise<boolean>;
  signUp(email: string, password: string, name: string): Promise<void>;
  verifyEmail(email: string, code: string): Promise<boolean>;
}
