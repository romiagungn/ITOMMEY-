import axios from 'axios'

const URL = `${process.env.REACT_APP_BASE_URL}`;

export const resetStatus = () => ({
    type: 'RESET_STATUS',
});

export const isLoading = () => ({
    type: "IS_LOADING",
});

const request = axios.create({
    baseURL: URL,
});

const getBranchSuccess = (datas) => ({
    type: 'GET_BRANCH_SUCCESS',
    datas,
});
const getBranchFailure = (err) => ({
    type: 'GET_BRANCH_FAILURE',
    err,
});

const getByIdSuccess = (datas) => ({
    type: 'GET_GET_DATABYID_SUCCESS',
    datas,
});
const getByIdFailure = (err) => ({
    type: 'GET_GET_DATABYID__FAILURE',
    err,
});

const postDataSuccess = (datas) => ({
    type: 'GET_POST_DATA_SUCCESS',
    datas,
});
const postDataFailure = (err) => ({
    type: 'GET_POST_DATA_FAILURE',
    err,
});

const updateDataSuccess = (datas) => ({
    type: 'GET_UPDATE_DATA_SUCCESS',
    datas,
});
const updateDataFailure = (err) => ({
    type: 'GET_UPDATE_DATA_FAILURE',
    err,
});

const delleteDataSuccess = (datas) => ({
    type: 'GET_DELETE_DATA_SUCCESS',
    datas,
});
const delleteDataFailure = (err) => ({
    type: 'GET_DELETE_DATA_FAILURE',
    err,
});

export const getDataProduct = () => {
    return async (dispatch) => {
        dispatch(isLoading())
        try {
            try {
                const response = await request.get(URL)
                dispatch(getBranchSuccess(response.data));
            } catch (error) {
                const err = error;
                console.info(err)
                dispatch(getBranchFailure(error));
            }
        } finally {
            setTimeout(() => {
                dispatch(isLoading());
            }, 3000);
        }
    };
};

export const getById = (id) => {
    return async (dispatch) => {
        dispatch(isLoading())
        try {
            try {
                const response = await request.get(`${URL}/${id}`)
                dispatch(getByIdSuccess(response.data));
            } catch (error) {
                console.info(error)
                dispatch(getByIdFailure(error));
            }
        } finally {
            setTimeout(() => {
                dispatch(isLoading());
            }, 3000);
        }
    };
};

export const postData = (payload) => {
    return async (dispatch) => {
        dispatch(isLoading())
        try {
            try {
                const response = await request.post(URL, {
                    name: payload.name,
                    qty: payload.qty,
                    picture: payload.picture,
                    expiredAt: payload.expiredAt,
                    isActive: payload.isActive,
                });
                dispatch(postDataSuccess(response.data));
            } catch (error) {
                console.info(error)
                dispatch(postDataFailure(error.response.statusText));
            }
        } finally {
            setTimeout(() => {
                dispatch(isLoading());
            }, 3000);
        }
    };
};

export const updateData = (payload) => {
    return async (dispatch) => {
        dispatch(isLoading())
        try {
            try {
                const response = await request.put(`${URL}/${payload.id}`, {
                    name: payload.name,
                    qty: payload.qty,
                    picture: payload.picture,
                    expiredAt: payload.expiredAt,
                    isActive: payload.isActive,
                });
                dispatch(updateDataSuccess(response.data));
            } catch (error) {
                console.info(error)
                dispatch(updateDataFailure(error.response.statusText));
            }
        } finally {
            setTimeout(() => {
                dispatch(isLoading());
            }, 3000);
        }
    };
};

export const deleteData = (values) => {
    return async (dispatch) => {
        dispatch(isLoading())
        try {
            try {
                const response = await request.put(`${URL}/${values.id}`, {
                    isActive: false,
                });
                dispatch(delleteDataSuccess(response.data));
            } catch (error) {
                console.info(error)
                dispatch(delleteDataFailure(error));
            }
        } finally {
            setTimeout(() => {
                dispatch(isLoading());
            }, 3000);
        }
    };
};