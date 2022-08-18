import { Editor, EditorType } from "../../types/Types";
import { ActionType } from "../storeTypes/actionTypes";
import { Direction } from "../storeTypes/storeTypes";

export interface MoveCellAction{
    type:ActionType.MOVE_CELL,
    payload: {
        id: string,
        direction: Direction
    }
}

export interface DeleteCellAction{
    type: ActionType.DELETE_CELL,
    payload: string
}

export interface InsertCellAfterAction{
    type: ActionType.INSERT_CELL_AFTER,
    payload: {
        id: string | null,
        type: EditorType,
        content: string
    }
}

export interface UpdateCellAction{
    type: ActionType.UPDATE_CELL,
    payload: {
        id: string,
        content: string
    }
}

export interface BundleStartAction{
    type: ActionType.BUNDLE_START,
    payload: {
        id: string,
    }
}

export interface BundleFinishAction{
    type: ActionType.BUNDLE_FINISH,
    payload: {
        id: string,
        code: string,
        error: string
    }
}

export interface ReplaceStoreAction{
    type: ActionType.REPLACE_STORE,
    payload: {
        order: string[],
        data: {
            [key: string]: Editor;
          };
    }
}

export type Action =
| MoveCellAction
| DeleteCellAction
| InsertCellAfterAction
| UpdateCellAction
| BundleStartAction
| BundleFinishAction
| ReplaceStoreAction