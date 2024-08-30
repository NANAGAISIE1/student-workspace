import { Doc, Id } from "@convex/dataModel";

export interface UserRepository {
  getCurrentUser(): Promise<Doc<"users"> | null>;
  getUserById(id: Id<"users">): Promise<Doc<"users"> | null>;
  updateUser(user: Doc<"users">): Promise<Id<"users">>;
  deleteUser(id: Id<"users">): Promise<void>;
}
