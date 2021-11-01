import { Editor, Ui } from "tinymce";

export type MarkType = "word" | "place" | "paragraph";

export interface MarkInfo {
  group: string;
}

const typeName: Record<MarkType, string> = {
  word: "单词",
  place: "位置",
  paragraph: "段落",
};

const makeDialog = (
  onSubmit: (api: Ui.Dialog.DialogInstanceApi<MarkInfo>) => void,
  editor: Editor,
  type: MarkType,
  settings?: MarkInfo
): Ui.Dialog.DialogSpec<MarkInfo> => {
  const body: Ui.Dialog.PanelSpec = {
    type: "panel",
    items: [
      {
        name: "group",
        type: "input",
        label: "输入组名",
      },
    ],
  };
  return {
    title: `插入/编辑 ${typeName[type]}标记`,
    size: "normal",
    body,
    buttons: [
      {
        type: "cancel",
        name: "cancel",
        text: "Cancel",
      },
      {
        type: "submit",
        name: "save",
        text: "Save",
        primary: true,
      },
    ],
    initialData: settings,
    onSubmit,
  };
};

const open = (
  editor: Editor,
  type: MarkType,
  onSubmit: (data: MarkInfo) => void
) => {
  const handleSubmit = (api: Ui.Dialog.DialogInstanceApi<MarkInfo>) => {
    const data: MarkInfo = api.getData();

    if (!data.group) {
      editor.windowManager.alert("没有输入组", () => {
        api.focus("group");
      });
      return;
    }
    onSubmit(data);
    api.close();
  };
  return makeDialog(handleSubmit, editor, type);
};

export { open };
