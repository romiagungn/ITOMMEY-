import { combineReducers } from "redux";

const initialState = {
    isLoading: false,
    alertMessage: '',
    showMessage: false,
    product: [],
    datas: [],
    postData: [],
    updateData: [],
    deleteData: [],
    createSuccess : false,
    createFailed : false,
    updateSuccess: false,
    updateFailed: false,
 
}
const ReduxData = (state = initialState, action) => {
    switch (action.type) {
        case "IS_LOADING":
            return { ...state, isLoading: !state.isLoading };
        case 'GET_BRANCH_SUCCESS':
            return { ...state, product: action.datas }
        case 'GET_GET_DATABYID_SUCCESS':
            return { ...state, datas: action.datas }
        case 'GET_POST_DATA_SUCCESS':
            return { ...state, 
                isLoading: false,
                postData: action.datas,
                createSuccess : true,
                createFailed : false,
             }
        case 'GET_POST_DATA_FAILURE':
            return { 
                ...state, 
                alertMessage: action.err,
                showMessage: true,
                createSuccess: false,
                createFailed: true,
            }
        case 'GET_UPDATE_DATA_SUCCESS':
            return { ...state, 
                updateData: action.datas, 
                updateSuccess: true,
                updateFailed: false,
            }
        case 'GET_UPDATE_DATA_FAILURE':
            return { 
                ...state, 
                alertMessage: action.err,
                showMessage: true,
                updateSuccess: false,
                updateFailed: true,
            }
        case 'GET_DELETE_DATA_SUCCESS':
            return { ...state, deleteData: action.datas }
        case 'RESET_STATUS': {
            return {
                ...state,
                alertMessage: '',
                showMessage: false,
                updateSuccess: false,
                updateFailed: false,
                createSuccess : false,
                createFailed : false,
            };
        }
        default:
            return state
    }
}

export default combineReducers({
    ReduxData
});