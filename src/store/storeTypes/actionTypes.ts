import { Editor } from "../../types/Types";

export interface ReplaceStoreAction{
    type: string,
    payload: {
        order: string[],
        data: {
            [key: string]: Editor;
          };
    }
}