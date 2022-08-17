import { Split } from '@geoffcox/react-splitter';
import { useEffect, useState } from 'react';
import { ResizableBox } from 'react-resizable';
import { bundle } from '../../bundle/bundle';
import { useAction } from '../../hooks/useAction';
import { Editor } from '../../types/Types';
import ActionBar from '../ActionBar/ActionBar';

import CodeEditor from './CodeEditor/CodeEditor';
import Preview from './CodePreview/Preview';

interface CodeCellProps{
  editor:Editor
}

const CodeCell:React.FC<CodeCellProps> = ({editor}) => {

  const [code, setCode] = useState('')
  const [err, setErr] = useState('')

  const { updateCell } = useAction()

  useEffect(()=>{
    const timer = setTimeout(async () => {
      const result = await bundle(editor.content)
    setCode(result.code)
    setErr(result.err)
  }, 1500) 

  return () => clearTimeout(timer)
  }, [editor.content])

  useEffect( ()=>{
   ( async () => {
      const result = await bundle(editor.content)
      setCode(result.code)
      setErr(result.err)
    })()
    
  }, [])

  return (
     <div style={{position: 'relative'}}> 
      <ActionBar id = {editor.id}/>
            <ResizableBox  height={600}  axis='y' minConstraints={[0,200]} maxConstraints={[0, window.innerHeight * 0.9]}>
              <Split initialPrimarySize='60%'>
                  <div style={{width: '100%', height:'100%'}}>
                      <CodeEditor initialValue={editor.content} onChange={(value) => updateCell(editor.id, value)}/>      
                  </div>

                  <Preview code={code} err={err}/>
              </Split>
            </ResizableBox>
    </div>   
  );
}

export default CodeCell;
