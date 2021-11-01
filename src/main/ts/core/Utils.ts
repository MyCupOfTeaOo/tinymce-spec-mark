import { Editor } from "tinymce";
import { MarkType } from "../ui/Dialog";

export const getAnchorElement = (
  editor: Editor,
  type: MarkType,
  selectedElm?: Element
): HTMLAnchorElement | null => {
  selectedElm = selectedElm || editor.selection.getNode();
  return editor.dom.getParent<HTMLAnchorElement>(
    selectedElm,
    `[data-mark-type="${type}"]`
  );
};
