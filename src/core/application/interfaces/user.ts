import { User } from "@/core/domain/entities/user";
import { Id } from "@convex/dataModel";

export interface UserRepository {
  getCurrentUser(): Promise<User | null>;
  getUserById(id: Id<"users">): Promise<User | null>;
  createUser(user: Omit<User, "id">): Promise<User>;
  updateUser(user: User): Promise<User>;
  deleteUser(id: Id<"users">): Promise<void>;
}
