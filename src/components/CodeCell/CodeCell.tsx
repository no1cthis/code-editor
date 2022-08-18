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
// `import _React from "react";
// import _ReactDOM from "react-dom";`

const CodeCell:React.FC<CodeCellProps> = ({editor}) => {
  const showFunc =
  `;import _React from "react";
    import _ReactDOM from "react-dom";
    var show = (value) => {
    const root = document.querySelector('#root')
    if(value.$$typeof)
        _ReactDOM.render(value, root)
    else if(typeof value === 'object')
      root.innerHTML = JSON.stringify(value)
    else
      root.innerHTML = value
  }
   `
   const showFuncEmpty = `var show = (value) => {};`
  const bundle = useTypedSelector(state => state.bundle[editor.id])


  const code = useTypedSelector(state => {
    const {data, order, } = state.editors
    let code=''
        for(let i = 0; i< order.length; i++)
        {
          if(data[order[i]].type === 'code'){ 
              if(data[order[i]].id === editor.id){
                code += (showFunc + data[order[i]].content)
                break;
              }
              else {
                code += (showFuncEmpty + data[order[i]].content)
              }
          }
              
        }

    return code
  })
 
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
