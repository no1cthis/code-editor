import { useAction } from "../../hooks/useAction";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faArrowUp, faTrash } from '@fortawesome/free-solid-svg-icons'

import cl from './ActionBar.module.scss'
import { useTypedSelector } from "../../hooks/useTypedSelector";

interface ActionBarProps {
    id: string
}
 
const ActionBar: React.FC<ActionBarProps> = ({id}) => {
    const inactive = useTypedSelector(store => {
        const {order} = store.editors
        if (order[0] === id)
            return 'up'
        if(order[order.length-1] === id)
            return 'down'
        return null
    })
    const {deleteEditor, moveEditor} = useAction()
    return ( 
        <div className={cl.wrapper}>
            
            {inactive != 'up' &&    <button className={cl.btn} onClick={() => {moveEditor({id, direction:'up'})}}><FontAwesomeIcon icon={faArrowUp} /></button>}
            {inactive != 'down' &&  <button className={cl.btn} onClick={() => {moveEditor({id, direction:'down'})}}><FontAwesomeIcon icon={faArrowDown} /></button>}
            <button className={cl.btn} onClick={() => {deleteEditor(id)}}><FontAwesomeIcon icon={faTrash} /></button>
        </div>
     );
}
 
export default ActionBar;