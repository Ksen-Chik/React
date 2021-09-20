import { ADD_MESSAGE, DELETE_MESSAGE } from "./actions";

const initialState = {
    messages: [],
};

export const messagesReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ADD_MESSAGE: {
            return {
                ...state,
                messages: [
                    ...state.messages,
                    {
                        author: payload.message.author,
                        text: payload.message.text,
                        chatId: payload.chatId,
                        id: state.messages.length,
                    }
                ],
            };
        }
        case DELETE_MESSAGE: {
            const newChatMessages = state.messages.filter(
                ({ id }) => id !== payload.id
            );

            return {
                ...state,
                messages: {
                    ...state.messages,
                    newChatMessages,
                },
            };
        }

        default:
            return state;
    }
};
