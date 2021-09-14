import { TOGGLE_CHECKBOX } from "./actions";

const initialState = {
    profile: { name: "Ivan", checkbox: true }
};

export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_CHECKBOX: {
            return {
                ...state,
                profile: { name: state.profile.name, checkbox: !state.profile.checkbox },
            };
        }
        default:
            return state;
    }
};