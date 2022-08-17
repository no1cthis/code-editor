
import './scss/splitter.scss'
import './scss/style.module.scss'
import './scss/textEditorStyles.scss'
import { Provider } from 'react-redux';
import { store } from './store/store';
import EditorList from './components/EditorList/EditorList';

function App() {

  return (
    <Provider store = {store}>
             <EditorList/>
    </Provider>

  );
}

export default App;
