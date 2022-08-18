import { Fragment } from "react"
import { useTypedSelector } from "../../hooks/useTypedSelector"
import AddEditor from "../AddEditor/AddEditor"
import CodeCell from "../CodeCell/CodeCell"
import TextEditor from "../TextEditor/TextEditor"

const EditorList: React.FC = () =>{
  const editors = useTypedSelector(state => {
        const {data, order} = state.editors 
        return order.map(id => data[id]) 
    })

    let formattedEditors = editors.map(editor =>{
        if (editor.type === 'text')
            return  <Fragment key={editor.id}>
                        <TextEditor editor = {editor}/>
                        <AddEditor idPrev={editor.id}/>
                    </Fragment>
        if (editor.type === 'code')
            return  <Fragment key={editor.id}>
                        <CodeCell editor = {editor}/>
                        <AddEditor idPrev={editor.id}/>
                    </Fragment> 
    })

    const visionAlways = editors.length === 0 ? true : false

    return  <div>
                <AddEditor  visionAlways={visionAlways} idPrev={null}/>
                {[...formattedEditors]}
            </div>
}

export default EditorList