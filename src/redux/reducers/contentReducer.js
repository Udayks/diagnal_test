import { SAVE_CONTENT } from '../actions/types';

const initialState = {
    contentList: null
};

const contentReducer = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_CONTENT:
            return {
                ...state,
                contentList: action.payload
            };
        default:
            return state;
    }
}

export default contentReducer;