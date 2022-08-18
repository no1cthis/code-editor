import { ActionType } from "../storeTypes/actionTypes";
import { DeleteCellAction, InsertCellAfterAction, MoveCellAction, ReplaceStoreAction, UpdateCellAction } from "../actions/action";
import { Editor, EditorType } from "../../types/Types";
import { Direction } from "../storeTypes/storeTypes";

export const updateCell = (id:string, content:string):UpdateCellAction => {
    return {
        type: ActionType.UPDATE_CELL,
        payload:{
            id,
            content
        }
    }
}


export const insertCellAfter = (id:string|null, type:EditorType, content:string = ''):InsertCellAfterAction => {
    return {
        type: ActionType.INSERT_CELL_AFTER,
        payload:{
            id,
            type,
            content
        }
    }
}


export const deleteCell = (id:string):DeleteCellAction => {
    return {
        type: ActionType.DELETE_CELL,
        payload: id
    }
}


export const moveCell = (id: string, direction: Direction ):MoveCellAction => {
    return{
        type:ActionType.MOVE_CELL,
        payload:{
            id,
            direction
        }
    }
}

export const replaceStore = (data: {[key: string]: Editor}, order: string[]): ReplaceStoreAction => {
    return {
        type:ActionType.REPLACE_STORE,
        payload: {
            order,
            data
        }
    }
}

