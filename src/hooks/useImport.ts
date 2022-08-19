import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import React from "react"
import { ReplaceStoreAction } from "../store/storeTypes/actionTypes";
import { Editor } from "../types/Types";



export const useImport = (replaceStore:(store:{data: {[key: string]: Editor;}, order: string[]}) => ReplaceStoreAction) => 
(e:React.ChangeEvent<HTMLInputElement>) => {
        let files = e.target.files
        console.log(files)
        let reader = new FileReader()
        if(files)
            reader.readAsText(files[0])
        reader.onload = (e) => {
            if(e.target?.result)
            {
                //@ts-ignore
                const importedStore = JSON.parse(e.target?.result)
                if(importedStore.data && importedStore.order)
                    replaceStore(importedStore)
                else 
                    alert('IMPORT FAILED: Invalid file')
            }                    
        }
    }