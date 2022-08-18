import { combineReducers } from "redux";
import { bundleReducer } from "./bundleReducer";
import { editorReducer } from "./editorReducer";


export const rootReducer = combineReducers({
    editors: editorReducer,
    bundle: bundleReducer
})

export type RootReducer = ReturnType<typeof rootReducer>