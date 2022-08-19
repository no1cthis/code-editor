import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { Action } from '../exportsStore';




interface BundleReducerState{
    [key:string]: {
        loading: boolean,
        error: string,
        code: string
    } | undefined
}

const initialState: BundleReducerState = {}

export const bundleSlice = createSlice({
    name: 'bundle',
    initialState,
    reducers:{
        bundleStart(state: BundleReducerState, action: PayloadAction<string>){
            state[action.payload] = {
                loading: true,
                error: '',
                code: ''
            }
        },
        bundleFinish(state: BundleReducerState, action: PayloadAction<{id:string, code:string, error:string}>){
            state[action.payload.id] = {
                loading: false,
                error: action.payload.error,
                code: action.payload.code
            }
        }
    }
})


export const bundleSliceAction = bundleSlice.actions
