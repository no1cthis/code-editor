import { Action } from '../exportsStore';
import { ActionType } from '../storeTypes/actionTypes';


interface BundleReducerState{
    [key:string]: {
        loading: boolean,
        error: string,
        code: string
    } | undefined
}

const initialState = {}

export const bundleReducer = (state:BundleReducerState = initialState, action:Action): BundleReducerState =>{
    const tempState = {...state}
    switch(action.type){
        case ActionType.BUNDLE_START:
            tempState[action.payload.id] = {
                loading: true,
                error: '',
                code: ''
            }
            return tempState
        case ActionType.BUNDLE_FINISH:
            tempState[action.payload.id] = {
                loading: false,
                error: action.payload.error,
                code: action.payload.code
            }
            return tempState
        default:
            return tempState
    }
}