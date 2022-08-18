import React from "react"
import { ReplaceStoreAction } from "../store/exportsStore";
import { Editor } from "../types/Types";



export const useImport = (replaceStore:(data: {[key: string]: Editor;}, order: string[]) => ReplaceStoreAction) => 
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
                    replaceStore(importedStore.data, importedStore.order)
                else 
                    alert('IMPORT FAILED: Invalid file')
            }                    
        }
    }