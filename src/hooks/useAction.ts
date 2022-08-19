import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { bundling } from "../store/reducers/bundleActionCreators";
import { bundleSlice } from "../store/reducers/bundleSlice";
import { editorSlice } from "../store/reducers/editorSlice";


export const useAction = () =>{
    const dispatch = useDispatch();
    return bindActionCreators({...bundleSlice.actions, ...editorSlice.actions, bundling}, dispatch)
}
