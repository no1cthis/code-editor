import { useEffect, useRef, useState } from "react";
import { useAction } from "../../hooks/useAction";
import { useExport } from "../../hooks/useExport";
import { useImport } from "../../hooks/useImport";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import cl from './addEditor.module.scss'

interface AddEditorProps {
    idPrev: string | null,
    visionAlways?: boolean,
    allowExport?: boolean
}
 
const AddEditor: React.FC<AddEditorProps> = ({idPrev, visionAlways, allowExport}) => {
    const [noDelay, setNoDelay] = useState(false)
    const {insertEditorAfter, replaceStore} = useAction()
    const importBtn = useRef<HTMLInputElement>(null)
   
    const downloadStore = useTypedSelector(store => {
        const tempStore:{data:{}, order: string[]} = {data:{}, order: []}
        tempStore.data = store.editors.data
        tempStore.order = store.editors.order
        return tempStore
    })

    const exportStore = useExport(downloadStore)
    //@ts-ignore
    const importStore = useImport(replaceStore)
   
    return ( 
        <div className={cl.wrapper}
        onMouseMove = {() => {
            //@ts-ignore
            if(window.getComputedStyle(document.querySelector(`.addEditor${idPrev}`), null).opacity == 1)
                setNoDelay(true)
        } }
        onMouseLeave = {() => setNoDelay(false)}
        >
            <button  
            className={`addEditor${idPrev} ${cl.btn} ${visionAlways && cl.visionAlways} ${(noDelay || visionAlways) && cl.noDelay}`} 
            onClick={() => {insertEditorAfter({id: idPrev, type: 'code'})}}
            >
                Add Code
            </button>
            <button 
            className={`addEditor ${cl.btn} ${visionAlways && cl.visionAlways} ${(noDelay || visionAlways) && cl.noDelay}`} 
            onClick={() => {insertEditorAfter({id: idPrev, type: 'text'})}}
            >
                Add Text
            </button>

            {allowExport && 
            <>
            <button  
            className={`addEditor${idPrev} ${cl.btn} ${visionAlways && cl.visionAlways} ${(noDelay || visionAlways) && cl.noDelay}`} 
            onClick={exportStore}
            >
                Export
            </button>
            <button  
            className={`addEditor${idPrev} ${cl.btn} ${visionAlways && cl.visionAlways} ${(noDelay || visionAlways) && cl.noDelay}`} 
            onClick={() => {importBtn.current?.click()}}
            >
                Import
            </button>

            <input ref={importBtn} type="file" onChange={e => importStore(e)} style={{display:"none"}}/>
            </>}
        </div>
     );
}
 
export default AddEditor;