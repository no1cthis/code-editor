import MDEditor from "@uiw/react-md-editor";
import { useEffect, useRef, useState } from "react";
import { useAction } from "./../../hooks/useAction";
import { Editor } from "./../../types/Types";
import ActionBar from "./../ActionBar/ActionBar";

interface TextEditorProps{
    editor:Editor
}

const TextEditor:React.FC<TextEditorProps> = ({editor}) => {
    const [editing, setEditing] = useState(false)
    const editorRef = useRef<HTMLDivElement>(null)

    const { updateCell} = useAction()
    useEffect(()=>{
        const offEditing = (e:MouseEvent) => {
            if(editorRef.current && e.target && editorRef.current.contains(e.target as Node)){
                return
            }

            setEditing(false)
        }


        document.addEventListener('click', offEditing, {capture: true})
        return () =>{
            document.removeEventListener('click', offEditing, {capture: true})
        }
    }, [])

    const component =  editing 
                        ?   (<div ref={editorRef}>
                                <MDEditor value = {editor.content} onChange={(text) => updateCell(editor.id, (text || ''))}/>
                            </div>)
                        :   ( <div onClick={() => setEditing(true)}>
                                <MDEditor.Markdown source={editor.content  || '# Click to edit this'}/>
                            </div> )

    return <div style={{position:'relative'}}>
        <ActionBar id = {editor.id}/>
        {component}
        </div>;
}

export default TextEditor;