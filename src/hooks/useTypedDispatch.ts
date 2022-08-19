import { useDispatch } from "react-redux";
import { DispatchType } from "../store/exportsStore";


export const useTypedDispatch = useDispatch<DispatchType>()