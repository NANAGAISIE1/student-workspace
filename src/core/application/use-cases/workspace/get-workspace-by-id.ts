import { WorkspaceService } from "../../interfaces/workspace";
import { Doc, Id } from "@convex/dataModel";

export class GetWorkspaceByIdUseCase {
  constructor(private workspaceService: WorkspaceService) {}

  async execute(id: Id<"workspaces">): Promise<Doc<"workspaces"> | null> {
    return this.workspaceService.getWorkspaceById(id);
  }
}
