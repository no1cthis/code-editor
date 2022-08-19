import { bundle } from "../../bundle/bundle"
import { DispatchType } from "../exportsStore"

import { bundleSlice } from "./bundleSlice"


export const bundling = (id:string, code:string) => {
    return async (dispatch: DispatchType) => {
        dispatch(bundleSlice.actions.bundleStart(id))

        const bundleResult = await bundle(code)

        dispatch(bundleSlice.actions.bundleFinish({id, code: bundleResult.code, error: bundleResult.err}))
    }
}