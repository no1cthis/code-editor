import { combineReducers } from "redux";
import { bundleSlice } from "./bundleSlice";
import { editorSlice } from "./editorSlice";


export const rootReducer = combineReducers({
    editors: editorSlice.reducer,
    bundle: bundleSlice.reducer
})
