import { TinyMCE } from "tinymce";

import Plugin from "../../main/ts/Plugin";

declare let tinymce: TinyMCE;

Plugin();

tinymce.init({
  selector: "textarea.tinymce",
  plugins: "code spec-mark link quickbars",
  toolbar: "spec-mark-word spec-mark-paragraph spec-mark-place bold link",
  quickbars_selection_toolbar: "bold | quicklink",
  content_css: "http://127.0.0.1:5500/src/demo/html/demo.css",
});
