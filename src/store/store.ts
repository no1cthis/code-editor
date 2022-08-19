import { rootReducer } from "./reducers/reducers";
import {configureStore} from '@reduxjs/toolkit'



export const store = () => configureStore({
    reducer: rootReducer,
})

export type RootReducer = ReturnType<typeof rootReducer>
export type StoreType = ReturnType<typeof store>
export type DispatchType = StoreType['dispatch']
