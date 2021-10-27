import { Editor, TinyMCE } from 'tinymce';

declare const tinymce: TinyMCE;

const setup = (editor: Editor, url: string): void => {
  editor.ui.registry.addButton('spec-mark', {
    text: 'spec-mark button',
    onAction: () => {
      editor.setContent('<p>content added from spec-mark</p>');
    }
  });
};

export default (): void => {
  tinymce.PluginManager.add('spec-mark', setup);
};
