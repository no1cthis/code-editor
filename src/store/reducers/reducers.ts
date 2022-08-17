import { combineReducers } from "redux";
import { cellReducer } from "./cellsReducer";


export const rootReducer = combineReducers({
    cells: cellReducer
})

export type RootReducer = ReturnType<typeof rootReducer>