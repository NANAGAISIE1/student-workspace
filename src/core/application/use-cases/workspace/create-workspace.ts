import { WorkspaceService } from "../../interfaces/workspace";
import { Doc } from "@convex/dataModel";

export class CreateWorkspaceUseCase {
  constructor(private workspaceService: WorkspaceService) {}

  async execute(
    workspace: Omit<Doc<"workspaces">, "id">,
  ): Promise<Doc<"workspaces">> {
    return this.workspaceService.createWorkspace(workspace);
  }
}
