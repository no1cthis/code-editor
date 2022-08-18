import { Dispatch } from "react"
import { bundle } from "../../bundle/bundle"
import { Action } from "../exportsStore"
import { ActionType } from "../storeTypes/actionTypes"


export const bundling = (id:string, code:string) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.BUNDLE_START,
            payload: {
                id
            }
        })

        const bundleResult = await bundle(code)

        dispatch({
            type: ActionType.BUNDLE_FINISH,
            payload:{
                id,
                code: bundleResult.code,
                error: bundleResult.err
            }
        })
    }
}