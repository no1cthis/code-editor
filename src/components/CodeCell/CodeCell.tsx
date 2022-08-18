import { Split } from '@geoffcox/react-splitter';
import { useEffect, useState } from 'react';
import { ResizableBox } from 'react-resizable';
import { bundle } from '../../bundle/bundle';
import { useAction } from '../../hooks/useAction';
import { useMergeCode } from '../../hooks/useMergeCode';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { Editor } from '../../types/Types';
import ActionBar from '../ActionBar/ActionBar';
import Loader from '../Loader/Loader';

import CodeEditor from './CodeEditor/CodeEditor';
import Preview from './CodePreview/Preview';

interface CodeCellProps{
  editor:Editor
}

const CodeCell:React.FC<CodeCellProps> = ({editor}) => {
 
  const bundle = useTypedSelector(state => state.bundle[editor.id])

  const code = useMergeCode(editor.id)
 
  const { updateCell, bundling } = useAction()

  useEffect(()=>{
    if(!bundle){
      bundling(editor.id, code)
      return
    }
    const timer = setTimeout(async () => {
      bundling(editor.id, code)
  }, 1500) 

  return () => clearTimeout(timer)
  }, [code])
  return (
     <div style={{position: 'relative'}}> 
      <ActionBar id = {editor.id}/>
            <ResizableBox  height={600} axis='y' minConstraints={[0,200]} maxConstraints={[0, window.innerHeight * 0.9]}>
              <Split initialPrimarySize='60%'>
                  <div style={{width: '100%', height:'100%'}}>
                      <CodeEditor initialValue={editor.content} onChange={(value) => updateCell(editor.id, value)}/>      
                  </div>

                  {
                  bundle?.loading === false 
                  ? <Preview code={bundle.code} err={bundle.error}/> 
                  : <Loader/>
                  }
              </Split>
            </ResizableBox>
    </div>   
  );
}

export default CodeCell;
