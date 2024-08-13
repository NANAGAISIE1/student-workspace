import {
  TriggerComboboxPlugin,
  withTriggerCombobox,
} from "@udecode/plate-combobox";
import { createPluginFactory } from "@udecode/plate-common";

interface MyPlugin extends TriggerComboboxPlugin {}
export const createComboboxPlugin = createPluginFactory<MyPlugin>({
  isElement: true,
  isInline: true,
  isVoid: true,
  withOverrides: withTriggerCombobox,
  key: "combobox-plugin",
  options: {
    createComboboxInput: (trigger) => ({
      children: [{ text: "" }],
      trigger,
      type: "combobox-plugin",
    }),
    trigger: "@",
    triggerPreviousCharPattern: /^\s?$/,
  },
});
