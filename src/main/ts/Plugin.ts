import { Editor, TinyMCE } from "tinymce";
import { toggleActiveState } from "./core/Actions";
import { getAnchorElement } from "./core/Utils";
import { MarkInfo, open } from "./ui/Dialog";

declare const tinymce: TinyMCE;

const setup = (editor: Editor): void => {
  editor.ui.registry.addToggleButton("spec-mark-word", {
    text: "标记单词",
    tooltip: "标记单词",
    onAction: () => {
      const node = getAnchorElement(editor, "word", editor.selection.getNode());
      if (node) {
        const selectionBookmark = editor.selection.getBookmark();
        editor.dom.remove(node, true);
        editor.focus();
        editor.selection.moveToBookmark(selectionBookmark);
        editor.nodeChanged();
      } else {
        const onSubmit = (data: MarkInfo) => {
          const content = editor.selection.getContent();
          editor.insertContent(
            editor.dom.createHTML(
              "span",
              {
                "data-type": "spec-mark",
                "data-mark-type": "word",
                "data-mark-group": data.group,
              },
              content
            )
          );
          const newNode = editor.selection.getEnd();
          editor.selection.select(newNode);
          editor.nodeChanged();
        };
        editor.windowManager.open(open(editor, "word", onSubmit));
      }
    },
    onSetup: toggleActiveState(editor, "word"),
  });
  editor.ui.registry.addToggleButton("spec-mark-paragraph", {
    text: "标记段落",
    tooltip: "标记段落",
    onAction: () => {
      const node = getAnchorElement(
        editor,
        "paragraph",
        editor.selection.getNode()
      );
      if (node) {
        const selectionBookmark = editor.selection.getBookmark();
        editor.dom.remove(node, true);
        editor.focus();
        editor.selection.moveToBookmark(selectionBookmark);
        editor.nodeChanged();
      } else {
        const onSubmit = (data: MarkInfo) => {
          const paragraph = editor.dom.getParent(
            editor.selection.getNode(),
            "p"
          );
          const newNode = editor.dom.clone(paragraph, false);
          editor.dom.setAttribs(newNode, {
            "data-type": "spec-mark",
            "data-mark-type": "paragraph",
            "data-mark-group": data.group,
          });
          editor.dom.replace(newNode, paragraph, true);
          editor.selection.select(newNode);
          editor.nodeChanged();
        };
        editor.windowManager.open(open(editor, "paragraph", onSubmit));
      }
    },
    onSetup: toggleActiveState(editor, "paragraph"),
  });
  editor.ui.registry.addToggleButton("spec-mark-place", {
    text: "标记位置",
    tooltip: "标记位置",
    onAction: () => {
      const node = getAnchorElement(
        editor,
        "place",
        editor.selection.getNode()
      );
      if (node) {
        const selectionBookmark = editor.selection.getBookmark();
        editor.dom.remove(node);
        editor.focus();
        editor.selection.moveToBookmark(selectionBookmark);
        editor.nodeChanged();
      } else {
        const onSubmit = (data: MarkInfo) => {
          editor.selection.collapse(false);
          const place = editor.dom.createHTML(
            "span",
            {
              "data-type": "spec-mark",
              "data-mark-type": "place",
              "data-mark-group": data.group,
              contenteditable: "false",
            },
            "🔲"
          );
          editor.insertContent(place);
          editor.nodeChanged();
        };
        editor.windowManager.open(open(editor, "place", onSubmit));
      }
    },
    onSetup: toggleActiveState(editor, "place"),
  });
};

export default (): void => {
  tinymce.PluginManager.add("spec-mark", setup);
};
