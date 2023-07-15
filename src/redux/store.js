import {createStore} from "redux";
import reducer from "../redux/reducer";

export const store = createStore(reducer, {
    setting: {
        toggle: false,
    },
    loader: {
        isLoading: false,
    }

})