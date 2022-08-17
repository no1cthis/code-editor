import { useAction } from "../../hooks/useAction";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faArrowUp, faMinus } from '@fortawesome/free-solid-svg-icons'

import cl from './ActionBar.module.scss'

interface ActionBarProps {
    id: string
}
 
const ActionBar: React.FC<ActionBarProps> = ({id}) => {
    const {deleteCell, moveCell} = useAction()
    return ( 
        <div className={cl.wrapper}>
            
            <button className={cl.btn} onClick={() => {moveCell(id, 'up')}}><FontAwesomeIcon icon={faArrowUp} /></button>
            <button className={cl.btn} onClick={() => {moveCell(id, 'down')}}><FontAwesomeIcon icon={faArrowDown} /></button>
            <button className={cl.btn} onClick={() => {deleteCell(id)}}><FontAwesomeIcon icon={faMinus} /></button>
        </div>
     );
}
 
export default ActionBar;