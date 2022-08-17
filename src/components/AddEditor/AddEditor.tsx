import { useEffect, useRef, useState } from "react";
import { useAction } from "../../hooks/useAction";
import cl from './addEditor.module.scss'

interface AddEditorProps {
    idPrev: string | null
    visionAlways?: boolean;
}
 
const AddEditor: React.FC<AddEditorProps> = ({idPrev, visionAlways}) => {
    const [noDelay, setNoDelay] = useState(false)
    const {insertCellAfter} = useAction()
   
    

   
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
            className={`addEditor${idPrev} ${cl.btn} ${visionAlways && cl.visionAlways} ${noDelay && cl.noDelay}`} 
            onClick={() => {insertCellAfter(idPrev, 'code')}}
            >
                Add Code
            </button>
            <button 
            className={`addEditor ${cl.btn} ${visionAlways && cl.visionAlways} ${noDelay && cl.noDelay}`} 
            onClick={() => {insertCellAfter(idPrev, 'text')}}
            >
                Add Text
            </button>
        </div>
     );
}
 
export default AddEditor;