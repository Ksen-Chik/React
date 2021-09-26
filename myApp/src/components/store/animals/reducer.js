import { ADD, SET, STATE_OK } from "./actions";

const initialState = {
    animals: []
};

export const animalsReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ADD: {
            for (let i = 0; i < payload.count; i++) {
                state.animals.push({});
            }

            return {
                ...state,
                animals: [...state.animals]
            };
        }
        case SET: {
            // Если уже успешно загружено, то не обновлять
            // (для купирования последствий бага с двойным возвратом из await fetch в actions)
            if (state.animals[payload.index].state === STATE_OK) {
                console.log('unchanged');
                return { ...state, animals: state.animals };
            }

            console.log('changed');
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