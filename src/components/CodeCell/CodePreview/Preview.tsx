import React, { useEffect, useRef } from 'react';
import './preview.scss'

interface PreviewProps {
    code:string;
    err:string;
}

const html =  `
<html>
<head></head>
<style>html{background-color: #fff}</style>
<body>
<div id='root'></div>
<script>
const handleErr = (err) => {
  const root = document.querySelector('#root')
  root.innerHTML = "<div style = 'color: red'><h1>Something wrong in code</h1><h3>"+err+"</h3></div><h3 style='color:red'>Details in console</h3>"
  console.error(err)
}

window.addEventListener('message', event =>{
  try{
  eval(event.data)
  }catch(err){
    handleErr(err)
  }
}, false)
window.addEventListener('error', event =>{
  event.preventDefault()
  handleErr(event.error)
})
</script>
</body>
</html>
`;
 
const Preview: React.FC<PreviewProps> = ({code, err}) => {
    const iframe = useRef<any>()
    useEffect(()=>{
        iframe.current.srcdoc = html
        setTimeout(()=>{
          iframe.current.contentWindow.postMessage(code, '*')
        }, 50)
    }, [code])
    
    return ( 
    <div className={'preview_wrapper'}>
      <iframe  
      className={'preview'}
      title='code view' 
      ref={iframe} 
      srcDoc={html} 
      sandbox={'allow-scripts'}
      ></iframe>   
      <h1 className='preview__error'>{err}</h1>
    </div>
    );
}
 
export default Preview;