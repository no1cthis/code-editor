import MonacoEditor, { EditorDidMount} from "@monaco-editor/react";
import { useRef } from "react";
import prettier from 'prettier'
import parser from 'prettier/parser-babel'
import cl from './codeEditor.module.scss'


interface CodeEditorProps{
    initialValue?: string,
    onChange(value:string): void
}

const CodeEditor: React.FC<CodeEditorProps> = ({initialValue, onChange}) => {

    const editorRef = useRef<any>()
    const onEditorDidMount:EditorDidMount = (getValue, monacoEditor) =>{
        editorRef.current = monacoEditor;
        monacoEditor.onDidChangeModelContent(()=>{
            onChange(getValue())
        })
    }

    const formatCode = () =>{
        const unformatedCode = editorRef.current.getModel().getValue()

        const formattedCode = prettier.format(unformatedCode, {
            parser: 'babel',
            plugins: [parser],
            semi: true,
            singleQuote: true
        })

        editorRef.current.setValue(formattedCode)
    }

    return( 
        <div className={cl.wrapper}>
            <button className={cl.btn} onClick={formatCode}>Format code</button>
            <MonacoEditor
            editorDidMount={onEditorDidMount}
            value={initialValue} 
            height={'100%'}
            width={'100%'} 
            language='javascript' 
            theme="dark"
            options={{
                wordWrap:'on',
                minimap: {
                    enabled: false
                },
                cursorBlinking: "smooth",
                mouseWheelZoom: true,
                mouseStyle: 'text',
                cursorSmoothCaretAnimation: true,
                cursorStyle: 'underline',
                smoothScrolling: true,
                folding: false,
                lineNumbersMinChars: 2,
                fontSize: 24,
                scrollBeyondLastLine: false,
                colorDecorators: true
            }}
            />
        </div>
    )
}

export default CodeEditor;