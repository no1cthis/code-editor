import { useTypedSelector } from "../../hooks/useTypedSelector"
import AddEditor from "../AddEditor/AddEditor"
import CodeCell from "../CodeCell/CodeCell"
import TextEditor from "../TextEditor/TextEditor"

const EditorList: React.FC = () =>{
  const editors = useTypedSelector(state => {
        const {data, order} = state.cells 
        return order.map(id => data[id]) 
    })

    let formattedEditors = editors.map(editor =>{
        if (editor.type === 'text')
            return  <>
                        <TextEditor key={editor.id} editor = {editor}/>
                        <AddEditor idPrev={editor.id}/>
                    </>
        if (editor.type === 'code')
            return  <>
                        <CodeCell key={editor.id} editor = {editor}/>
                        <AddEditor idPrev={editor.id}/>
                    </> 
    })

    const visionAlways = editors.length === 0 ? true : false

    return  <div>
                <AddEditor  visionAlways={visionAlways} idPrev={null}/>
                {[...formattedEditors]}
            </div>
}

export default EditorList