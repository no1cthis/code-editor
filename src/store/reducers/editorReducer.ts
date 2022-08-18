import { nanoid } from 'nanoid'
import { Editor } from '../../types/Types'
import {Action} from '../actions/action'
import { ActionType } from '../storeTypes/actionTypes'


interface EditorState {
    loading: boolean;
    error: string | null;
    order: string[];
    data: {
      [key: string]: Editor;
    };
  }
  const initText:Editor ={
    id: 'initText',
    type: 'text',
    content: `
## This my code-editor-app

**Use func show(component) for display your code in preview window.**

You can hover under editor to add new one there.

- Click text to edit
- To change order or delete editor use buttons on top right corner of editor
- Can export and import
- Every editor resizable
- You can coding exactly like in VS Code. Imports working via unpkg.com
- Formatting working via Prettier

Code editor it's MonacoEditor,  Text editor - MDEditor

App coded on Typescript + Redux          
`
  }
  const initText2:Editor ={
    id: 'initText2',
    type: 'text',
    content: `## Variables are shareable, you can use it like separate files.  **Use show function just once in every editor!** `
  }
  const initCode:Editor ={
    id: 'initCode',
    type: 'code',
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
          
    const text = <h1 className="title">{'Text from previous editor'}</h1>; `
  }
  const initCode2:Editor ={
    id: 'initCode2',
    type: 'code',
    content: `
    show(text)
      `
  }
  const initialState = {
    loading: false,
    error: null,
    order: ['initText', 'initCode', 'initText2', 'initCode2'],
    data: {
        initText,
        initCode,
        initText2,
        initCode2
    },
  };

export const editorReducer = (state:EditorState = initialState, action: Action): EditorState => {
    const tempState = {...state}
       switch(action.type){
        case ActionType.INSERT_CELL_AFTER:
            
            const editor:Editor = {
                type: action.payload.type,
                content: action.payload.content,
                id: nanoid()
            }

            tempState.data[editor.id] = editor

            const ind = tempState.order.findIndex(id => id === action.payload.id)
            if(ind<0)
                tempState.order.unshift(editor.id)
            else
                tempState.order.splice(ind+1, 0, editor.id);

            return tempState

        case ActionType.DELETE_CELL:
 
            delete tempState.data[action.payload];
            tempState.order = tempState.order.filter(id => id!==action.payload)

            return tempState

        case ActionType.MOVE_CELL:
            const {direction} = action.payload;
            const index = state.order.findIndex(id => id === action.payload.id)
            const newIndex = direction === 'up' ? index - 1 : index + 1

            if(newIndex < 0 || newIndex > state.order.length-1)
            return tempState

            tempState.order[index] = state.order[newIndex]
            tempState.order[newIndex] = action.payload.id

            return tempState

        case ActionType.UPDATE_CELL:
            tempState.data[action.payload.id].content = action.payload.content

            return tempState
        case ActionType.REPLACE_STORE:
            tempState.data = action.payload.data
            tempState.order = action.payload.order

            return tempState
        default:
            return tempState
    }
}
