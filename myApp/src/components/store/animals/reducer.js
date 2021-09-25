import { SET } from "./actions";

const initialState = {
    animals: [{}, {}, {}]
};

export const animalsReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case SET: {

            return {
                ...state,
                animals: state.animals.map((content, index) => {
                    if (index === payload.index) {
                        return payload.animal
                    }

                    return content;
                })
            };
        }
        default:
            return state;
    }
};