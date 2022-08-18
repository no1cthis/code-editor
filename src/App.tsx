
import './scss/splitter.scss'
import './scss/style.module.scss'
import './scss/textEditorStyles.scss'
import { Provider } from 'react-redux';
import { store } from './store/store';
import EditorList from './components/EditorList/EditorList';
import { useTypedSelector } from './hooks/useTypedSelector';
import { Editor } from './types/Types';
import { useAction } from './hooks/useAction';
import { useEffect } from 'react';
import localforage from 'localforage';

function App() {
  return (
                <EditorList/>
  );
}

export default App;
