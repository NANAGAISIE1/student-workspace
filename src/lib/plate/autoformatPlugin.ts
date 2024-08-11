import { AutoformatPlugin } from "@udecode/plate-autoformat";
import { PlatePlugin } from "@udecode/plate-common";

import { autoformatRules } from "@renderer/lib/plate/autoformatRules";

export const autoformatPlugin: Partial<PlatePlugin<AutoformatPlugin>> = {
  options: {
    rules: autoformatRules as any,
    enableUndoOnDelete: true,
  },
};
