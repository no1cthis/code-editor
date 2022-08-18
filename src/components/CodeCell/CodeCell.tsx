import { Split } from '@geoffcox/react-splitter';
import { useEffect, useState } from 'react';
import { ResizableBox } from 'react-resizable';
import { bundle } from '../../bundle/bundle';
import { useAction } from '../../hooks/useAction';
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
  const finishCode =
  `import _React from "react";
  import _ReactDOM from "react-dom";

  const show = (value) => {
    const root = document.querySelector('#root')
    if(value.$$typeof)
        _ReactDOM.render(value, root)
    else if(typeof value === 'object')
      root.innerHTML = JSON.stringify(value)
    else
      root.innerHTML = value
  }
   ` + editor.content

   
  console.log(editor.content)
  const { updateCell, bundling } = useAction()

  useEffect(()=>{
    if(!bundle){
      bundling(editor.id, finishCode)
      return
    }
    const timer = setTimeout(async () => {
      bundling(editor.id, finishCode)
  }, 1500) 

  return () => clearTimeout(timer)
  }, [editor.content])
  return (
     <div style={{position: 'relative'}}> 
      <ActionBar id = {editor.id}/>
            <ResizableBox  height={600} width={Infinity}  axis='y' minConstraints={[0,200]} maxConstraints={[0, window.innerHeight * 0.9]}>
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
