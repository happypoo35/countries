import { useDispatch } from "react-redux";
import { AppDispatch } from "../rtk/store";

const useAppDispatch: () => AppDispatch = useDispatch;

export default useAppDispatch;
