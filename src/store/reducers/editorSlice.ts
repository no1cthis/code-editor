import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import { Editor, EditorType } from "../../types/Types";
// import {Action} from '../actions/action'
import { Direction } from "../storeTypes/storeTypes";

interface EditorState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Editor;
  };
}
const initText: Editor = {
  id: "initText",
  type: "text",
  content: `
## This is my code-editor-app

**Use func show(component) to display your code in the preview window.**

You can hover under the editor to add a new one there.

- Click text to edit
- To change order or delete the editor use buttons on top right corner of the editor
- Can export and import
- Every editor resizable
- You can coding exactly like in VS Code. Imports working via unpkg.com
- Formatting working via Prettier

Code editor it's MonacoEditor,  Text editor - MDEditor

App coded on Typescript + Redux           
`,
};
const initText2: Editor = {
  id: "initText2",
  type: "text",
  content: `## Variables are shareable, you can use it like separate files.  **Use show function just once in every editor!** `,
};
const initCode: Editor = {
  id: "initCode",
  type: "code",
  content: `    import React from "react";
    import ReactDOM from "react-dom/client";
    import "bulma/css/bulma.css";
    
    const Test = () => (
      <section className="section">
        <h1 className="title">{"Hey, It's working!"}</h1>
        <h2 className="subtitle">
          <strong>CSS </strong>
          working too!
        </h2>
      </section>
    )

    show(<Test/>)
          
    const text = <h1 className="title">{'Text from previous editor'}</h1>; `,
};
const initCode2: Editor = {
  id: "initCode2",
  type: "code",
  content: `
    show(text)
      `,
};
const initialState: EditorState = {
  loading: false,
  error: null,
  order: ["initText", "initCode", "initText2", "initCode2"],
  data: {
    initText,
    initCode,
    initText2,
    initCode2,
  },
};

export const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    updateEditor(
      state: EditorState,
      action: PayloadAction<{ id: string; content: string }>
    ) {
      const { id, content } = action.payload;
      state.data[id].content = content;
    },
    insertEditorAfter(
      state: EditorState,
      action: PayloadAction<{ id: string | null; type: EditorType }>
    ) {
      const { id, type } = action.payload;

      const editor: Editor = {
        type: type,
        content: "",
        id: nanoid(),
      };

      state.data[editor.id] = editor;

      const ind = state.order.findIndex((idInArray) => idInArray === id);
      if (ind < 0) state.order.unshift(editor.id);
      else state.order.splice(ind + 1, 0, editor.id);
    },
    deleteEditor(state: EditorState, action: PayloadAction<string>) {
      const id = action.payload;

      delete state.data[id];
      state.order = state.order.filter((idInArray) => idInArray !== id);
    },
    moveEditor(
      state: EditorState,
      action: PayloadAction<{ id: string; direction: Direction }>
    ) {
      const { direction, id } = action.payload;
      const index = state.order.findIndex((id) => id === action.payload.id);
      const newIndex = direction === "up" ? index - 1 : index + 1;

      if (newIndex < 0 || newIndex > state.order.length - 1) return;

      state.order[index] = state.order[newIndex];
      state.order[newIndex] = id;
    },
    replaceStore(
      state: EditorState,
      action: PayloadAction<{
        data: { [key: string]: Editor };
        order: string[];
      }>
    ) {
      state.data = action.payload.data;
      state.order = action.payload.order;
    },
  },
});

export const editorSliceAction = editorSlice.actions;
