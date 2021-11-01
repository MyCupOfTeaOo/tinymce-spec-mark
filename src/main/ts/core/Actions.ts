import { Editor, Ui, Events } from "tinymce";
import { MarkType } from "../ui/Dialog";
import { getAnchorElement } from "./Utils";

export const toggleActiveState =
  (editor: Editor, type: MarkType) =>
  (api: Ui.Toolbar.ToolbarToggleButtonInstanceApi): (() => void) => {
    const updateState = () => {
      if (
        !editor.mode.isReadOnly() &&
        getAnchorElement(editor, type, editor.selection.getNode()) !== null
      ) {
        api.setActive(true);
      } else {
        api.setActive(false);
      }
    };
    updateState();
    return toggleState(editor, updateState);
  };

export const toggleState = (
  editor: Editor,
  toggler: (e: Events.NodeChangeEvent) => void
): (() => void) => {
  editor.on("NodeChange", toggler);
  return () => editor.off("NodeChange", toggler);
};
