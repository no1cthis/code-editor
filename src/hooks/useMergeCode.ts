import { useTypedSelector } from "./useTypedSelector";


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

export const useMergeCode = (currentId:string):string => {
    return useTypedSelector(state => {
    const {data, order, } = state.editors
    let code=''
        for(let i = 0; i< order.length; i++)
        {
          if(data[order[i]].type === 'code'){ 
              if(data[order[i]].id === currentId){
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
}